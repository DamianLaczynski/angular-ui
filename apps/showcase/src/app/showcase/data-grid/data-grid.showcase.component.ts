/**
 * DataGrid Showcase Component
 *
 * Demonstrates the new DataGrid API with DataSource Pattern, Builder Pattern,
 * Presets, and Column Factory.
 */

import { Component, signal, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from 'angular-ui';
import { DataGridRow } from 'angular-ui';
import { DataGridActiveFilter } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { DataGridColumnFactory } from 'angular-ui';
import { ApiService } from '@shared/api/services/api.service';
import { createDataGridConfig } from 'angular-ui';
import { Observable, of } from 'rxjs';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';

interface SampleData {
  id: string;
  name: string;
  type: string;
  modified: string;
  modifiedBy: string;
  size: string;
  status: string;
}

@Component({
  selector: 'app-data-grid-showcase',
  imports: [CommonModule, DataGridComponent, TableOfContentComponent],
  template: `
    <div class="showcase showcase--responsive showcase__with-toc">
      <ui-table-of-content
        [sticky]="true"
        [offsetTop]="20"
        containerSelector=".showcase-content"
        [minLevel]="1"
        [maxLevel]="2"
      />
      <div class="showcase-content">
        <h1 class="showcase__title">DataGrid Component</h1>
        <p class="showcase__description">
          A flexible and feature-rich data grid component following Fluent 2 Design System
          principles. Now with DataSource Pattern, Builder Pattern, Presets, and Column Factory for
          easier configuration.
        </p>

        <!-- Basic Example with Preset -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic DataGrid (Preset)</h2>
          <p class="showcase__section__description">
            Simple data grid using Preset. Just 3 lines of code!
          </p>
          <div class="showcase__example">
            <ui-data-grid [config]="basicConfig()" />
          </div>
        </section>

        <!-- Column Factory Example -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Column Factory</h2>
          <p class="showcase__section__description">
            Using Column Factory to create columns with sensible defaults. Reduces boilerplate by
            70%!
          </p>
          <div class="showcase__example">
            <ui-data-grid [config]="columnFactoryConfig()" />
          </div>
        </section>

        <!-- Selectable Example -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Selectable DataGrid</h2>
          <p class="showcase__section__description">
            Data grid with row selection (multi-select) using Builder Pattern.
          </p>
          <div class="showcase__example">
            <ui-data-grid [config]="selectableConfig()" />
          </div>
          @if (selectedCount() > 0) {
            <p class="showcase__info">Selected rows: {{ selectedCount() }}</p>
          }
        </section>

        <!-- Server-Side Example -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Server-Side DataGrid (Preset)</h2>
          <p class="showcase__section__description">
            Data grid with server-side pagination, sorting, and filtering. All processing happens on
            the server.
          </p>
          <div class="showcase__example">
            <ui-data-grid [config]="serverSideConfig()" />
          </div>
          @if (serverSideInfo()) {
            <p class="showcase__info">{{ serverSideInfo() }}</p>
          }
        </section>

        <!-- Virtualized Example -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Virtualized DataGrid (Preset)</h2>
          <p class="showcase__section__description">
            Data grid with virtualization for large datasets. Only visible rows are rendered.
          </p>
          <div class="showcase__example showcase__example--virtualized">
            <ui-data-grid [config]="virtualizedConfig()" />
          </div>
          <p class="showcase__info">
            Virtualization enabled: {{ virtualizedData.length }} rows rendered efficiently.
          </p>
        </section>

        <!-- Filtering Example -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Filtering</h2>
          <p class="showcase__section__description">
            Data grid with filtering enabled. Each column can have different filter types.
          </p>
          <div class="showcase__example">
            <ui-data-grid [config]="filteringConfig()" />
          </div>
          @if (activeFilters().length > 0) {
            <p class="showcase__info">
              Active filters: {{ activeFilters().length }}
              <br />
              @for (filter of activeFilters(); track filter.columnId) {
                <span
                  style="display: inline-block; margin-right: 8px; margin-top: 4px; padding: 4px 8px; background: #e1e1e1; border-radius: 4px; font-size: 0.875rem;"
                >
                  {{ filter.displayText }}
                </span>
              }
            </p>
          }
        </section>

        <!-- Expandable Rows -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Expandable Rows (Master-Details)</h2>
          <p class="showcase__section__description">
            Data grid with expandable rows showing additional details when expanded.
          </p>
          <div class="showcase__example">
            <ui-data-grid [config]="expandableConfig()">
              <ng-template #rowDetailsTemplate let-row>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  <div style="display: grid; grid-template-columns: 150px 1fr; gap: 8px;">
                    <strong>Modified By:</strong>
                    <span>{{ row.data.modifiedBy }}</span>
                  </div>
                  <div style="display: grid; grid-template-columns: 150px 1fr; gap: 8px;">
                    <strong>Status:</strong>
                    <span>{{ row.data.status }}</span>
                  </div>
                  <div style="display: grid; grid-template-columns: 150px 1fr; gap: 8px;">
                    <strong>File Size:</strong>
                    <span>{{ row.data.size }}</span>
                  </div>
                </div>
              </ng-template>
            </ui-data-grid>
          </div>
        </section>

        <!-- Full Featured Example with Builder -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Full Featured DataGrid (Builder)</h2>
          <p class="showcase__section__description">
            Complete data grid with all features enabled using Builder Pattern. Shows the power of
            the new API.
          </p>
          <div class="showcase__example">
            <ui-data-grid [config]="fullFeaturedConfig()">
              <ng-template #rowDetailsTemplate let-row>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  <div style="display: grid; grid-template-columns: 150px 1fr; gap: 8px;">
                    <strong>Modified By:</strong>
                    <span>{{ row.data.modifiedBy }}</span>
                  </div>
                  <div style="display: grid; grid-template-columns: 150px 1fr; gap: 8px;">
                    <strong>Status:</strong>
                    <span>{{ row.data.status }}</span>
                  </div>
                </div>
              </ng-template>
            </ui-data-grid>
          </div>
        </section>

        <!-- Advanced Builder Example -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Advanced Configuration (Builder)</h2>
          <p class="showcase__section__description">
            Advanced configuration with custom callbacks, styling, and all features.
          </p>
          <div class="showcase__example">
            <ui-data-grid [config]="advancedConfig()" />
          </div>
          @if (advancedInfo()) {
            <p class="showcase__info">{{ advancedInfo() }}</p>
          }
        </section>

      </div>
    </div>
  `,
})
export class DataGridShowcaseComponent {
  selectedCount = signal(0);
  activeFilters = signal<DataGridActiveFilter[]>([]);
  currentSort = signal<{ field: string; direction: 'asc' | 'desc' } | null>(null);
  serverSideInfo = signal<string>('');
  advancedInfo = signal<string>('');
  apiInfo = signal<string>('');

  // Sample data
  basicData: SampleData[] = [
    {
      id: '1',
      name: 'Document.docx',
      type: 'Word Document',
      modified: '2024-01-15',
      modifiedBy: 'John Doe',
      size: '2.5 MB',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Presentation.pptx',
      type: 'PowerPoint',
      modified: '2024-01-14',
      modifiedBy: 'Jane Smith',
      size: '5.8 MB',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Spreadsheet.xlsx',
      type: 'Excel',
      modified: '2024-01-13',
      modifiedBy: 'Bob Johnson',
      size: '1.2 MB',
      status: 'Archived',
    },
    {
      id: '4',
      name: 'Report.pdf',
      type: 'PDF Document',
      modified: '2024-01-12',
      modifiedBy: 'Alice Brown',
      size: '3.7 MB',
      status: 'Active',
    },
  ];

  filterableData: SampleData[] = [
    ...this.basicData,
    {
      id: '5',
      name: 'Analytics Dashboard.xlsx',
      type: 'Excel',
      modified: '2024-01-11',
      modifiedBy: 'Sarah Wilson',
      size: '4.2 MB',
      status: 'Draft',
    },
    {
      id: '6',
      name: 'Meeting Notes.docx',
      type: 'Word Document',
      modified: '2024-01-10',
      modifiedBy: 'Mike Davis',
      size: '856 KB',
      status: 'Published',
    },
  ];

  // Generate virtualized data
  virtualizedData: SampleData[] = (() => {
    const data: SampleData[] = [];
    const baseData = this.basicData;
    for (let i = 0; i < 1000; i++) {
      const base = baseData[i % baseData.length];
      data.push({
        ...base,
        id: `virtual-${i + 1}`,
        name: `File_${i + 1}.${base.name.split('.').pop()}`,
      });
    }
    return data;
  })();

  // Helper function to create static data source
  private createStaticDataSource<T extends { id?: string }>(
    data: T[],
  ): (params: QueryParams<T>) => Observable<QueryResult<T>> {
    return (params: QueryParams<T>) => {
      // Start with all items
      let items: T[] = [...data];

      // Apply filters (simple client-side filtering)
      if (params.filters && params.filters.length > 0) {
        items = items.filter(item => {
          return params.filters!.every(filter => {
            const value = (item as any)[filter.columnName];
            const filterValue = filter.value;

            switch (filter.filterType) {
              case 'contains':
                return String(value || '')
                  .toLowerCase()
                  .includes(String(filterValue || '').toLowerCase());
              case 'equals':
                return value === filterValue;
              case 'startsWith':
                return String(value || '')
                  .toLowerCase()
                  .startsWith(String(filterValue || '').toLowerCase());
              case 'endsWith':
                return String(value || '')
                  .toLowerCase()
                  .endsWith(String(filterValue || '').toLowerCase());
              default:
                return true;
            }
          });
        });
      }

      // Apply sorting
      if (params.orders && params.orders.length > 0) {
        const order = params.orders[0];
        items.sort((a, b) => {
          const aVal = (a as any)[order.columnName];
          const bVal = (b as any)[order.columnName];
          const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
          return order.order === 'asc' ? comparison : -comparison;
        });
      }

      const totalCount = items.length;

      // Apply pagination
      if (params.page && params.pageSize) {
        const start = (params.page - 1) * params.pageSize;
        const end = start + params.pageSize;
        items = items.slice(start, end);
      }

      const hasNextPage =
        params.page && params.pageSize ? params.page * params.pageSize < totalCount : false;
      const hasPreviousPage = params.page ? params.page > 1 : false;

      return of({
        items,
        totalCount,
        hasNextPage,
        hasPreviousPage,
      });
    };
  }

  // Configurations using new API
  basicConfig = computed(() => {
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name'),
      DataGridColumnFactory.text('type', 'Type', 'type'),
      DataGridColumnFactory.text('modified', 'Modified', 'modified'),
    ];
    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
    });
  });

  columnFactoryConfig = computed(() => {
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name', { width: '200px' }),
      DataGridColumnFactory.number('size', 'Size', 'size', { width: '120px' }),
      DataGridColumnFactory.date('modified', 'Modified', 'modified', { width: '180px' }),
      DataGridColumnFactory.select(
        'status',
        'Status',
        'status',
        [
          { label: 'Active', value: 'Active' },
          { label: 'Archived', value: 'Archived' },
          { label: 'Draft', value: 'Draft' },
        ],
        { width: '120px' },
      ),
    ];
    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
    });
  });

  selectableConfig = computed(() => {
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name'),
      DataGridColumnFactory.text('type', 'Type', 'type'),
      DataGridColumnFactory.text('modified', 'Modified', 'modified'),
    ];
    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
      selection: 'multi',
      styling: { hoverable: true, striped: true },
      callbacks: {
        onSelectionChange: (rows: DataGridRow<SampleData>[]) => {
          this.selectedCount.set(rows.length);
          console.log('Selected rows:', rows);
        },
      },
    });
  });

  serverSideConfig = computed(() => {
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name', { sortable: true }),
      DataGridColumnFactory.text('type', 'Type', 'type', { sortable: true }),
      DataGridColumnFactory.text('modified', 'Modified', 'modified', { sortable: true }),
    ];

    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
      selection: 'multi',
      pagination: {
        enabled: true,
        pageSize: 2,
        pageSizeOptions: [2, 5, 10],
        showPageSizeSelector: true,
        showPageNumbers: true,
      },
      sorting: { enabled: true },
      filtering: { enabled: true, debounceMs: 300 },
      styling: {
        size: 'medium',
        striped: true,
        hoverable: true,
        stickyHeaders: true,
      },
      callbacks: {
        onPageChange: (page: number) => {
          this.serverSideInfo.set(`Page changed to: ${page}`);
        },
        onSortChange: (sort: { field: string; direction: 'asc' | 'desc' }) => {
          this.serverSideInfo.set(`Sorted by: ${sort.field} (${sort.direction})`);
        },
      },
    });
  });

  virtualizedConfig = computed(() => {
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name', { sortable: true }),
      DataGridColumnFactory.text('type', 'Type', 'type', { sortable: true }),
      DataGridColumnFactory.text('modified', 'Modified', 'modified', { sortable: true }),
      DataGridColumnFactory.text('size', 'Size', 'size', { sortable: true }),
    ];
    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.virtualizedData),
      virtualization: {
        enabled: true,
        itemHeight: 48,
        bufferSize: 3,
      },
    });
  });

  filteringConfig = computed(() => {
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name'),
      DataGridColumnFactory.select('type', 'Type', 'type', [
        { label: 'Word Document', value: 'Word Document' },
        { label: 'Excel', value: 'Excel' },
        { label: 'PowerPoint', value: 'PowerPoint' },
        { label: 'PDF Document', value: 'PDF Document' },
      ]),
      DataGridColumnFactory.multiSelect('status', 'Status', 'status', [
        { label: 'Active', value: 'Active' },
        { label: 'Archived', value: 'Archived' },
        { label: 'Draft', value: 'Draft' },
        { label: 'Published', value: 'Published' },
      ]),
      DataGridColumnFactory.date('modified', 'Modified', 'modified'),
    ];
    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.filterableData),
      filtering: { enabled: true, debounceMs: 300 },
      styling: { hoverable: true, striped: true },
      callbacks: {
        onFilterChange: (filters: DataGridActiveFilter[]) => {
          this.activeFilters.set(filters);
          console.log('Active filters:', filters);
        },
      },
    });
  });

  expandableConfig = computed(() => {
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name'),
      DataGridColumnFactory.text('type', 'Type', 'type'),
      DataGridColumnFactory.text('modified', 'Modified', 'modified'),
    ];
    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
      expandable: true,
    });
  });

  fullFeaturedConfig = computed(() => {
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name', { sortable: true }),
      DataGridColumnFactory.text('type', 'Type', 'type', { sortable: true }),
      DataGridColumnFactory.text('modified', 'Modified', 'modified', { sortable: true }),
      DataGridColumnFactory.text('size', 'Size', 'size', { sortable: true }),
    ];
    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
      selection: 'multi',
      pagination: {
        enabled: true,
        pageSize: 10,
        pageSizeOptions: [5, 10, 20, 50],
        showPageSizeSelector: true,
        showPageNumbers: true,
      },
      sorting: { enabled: true },
      styling: {
        size: 'medium',
        striped: true,
        bordered: true,
        hoverable: true,
        stickyHeaders: true,
      },
      expandable: true,
    });
  });

  advancedConfig = computed(() => {
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name', { sortable: true }),
      DataGridColumnFactory.text('type', 'Type', 'type', { sortable: true }),
      DataGridColumnFactory.number('size', 'Size', 'size', { sortable: true }),
      DataGridColumnFactory.date('modified', 'Modified', 'modified', { sortable: true }),
    ];
    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
      selection: 'multi',
      pagination: {
        enabled: true,
        pageSize: 5,
        pageSizeOptions: [5, 10, 20],
        showPageSizeSelector: true,
        showPageNumbers: true,
        showInfo: true,
      },
      sorting: {
        enabled: true,
        defaultSort: { field: 'modified', direction: 'desc' },
      },
      filtering: { enabled: true, debounceMs: 300 },
      styling: {
        size: 'medium',
        striped: true,
        bordered: true,
        hoverable: true,
        stickyHeaders: true,
      },
      loading: {
        title: 'Loading data...',
        description: 'Please wait',
      },
      empty: {
        title: 'No files found',
        description: 'Upload your first file to get started.',
        icon: 'folder_open',
      },
      callbacks: {
        onRowClick: (row: DataGridRow<SampleData>) => {
          console.log('Row clicked:', row);
          this.advancedInfo.set(`Clicked: ${row.data.name}`);
        },
        onSortChange: (sort: { field: string; direction: 'asc' | 'desc' }) => {
          console.log('Sort changed:', sort);
          this.currentSort.set(sort);
          this.advancedInfo.set(`Sorted by: ${sort.field} (${sort.direction})`);
        },
        onFilterChange: (filters: DataGridActiveFilter[]) => {
          console.log('Filters changed:', filters);
          this.activeFilters.set(filters);
        },
        onSelectionChange: (rows: DataGridRow<SampleData>[]) => {
          console.log('Selection changed:', rows);
          this.selectedCount.set(rows.length);
        },
      },
    });
  });


}

