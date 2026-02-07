import { Component, signal, viewChild, TemplateRef } from '@angular/core';

import { delay, of } from 'rxjs';
import { ScrollContainerComponent, ScrollContainerDataSource } from 'angular-ui';
import { ButtonComponent } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { Node } from 'angular-ui';
import { IconName } from 'angular-ui';

interface MockItem {
  id: number;
  label: string;
  icon?: IconName;
  description?: string;
}

@Component({
  selector: 'app-scroll-container-showcase',
  imports: [ScrollContainerComponent, ButtonComponent, TableOfContentComponent],
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
        <h1 class="showcase__title">Scroll Container Component</h1>
        <p class="showcase__description">
          Scroll Container provides infinite scroll functionality with automatic data loading. It
          supports displaying items using Node components or custom templates, following the Fluent
          2 Design System.
        </p>

        <!-- Basic Usage -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic Usage with Node Component</h2>
          <p class="showcase__section__description">
            Basic scroll container using Node component for item display.
          </p>
          <div class="showcase__example">
            <ui-scroll-container
              [dataSource]="basicDataSource"
              [pageSize]="20"
              [maxHeight]="'400px'"
            />
          </div>
        </section>

        <!-- With Icons -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">With Icons</h2>
          <p class="showcase__section__description">Scroll container with icon nodes.</p>
          <div class="showcase__example">
            <ui-scroll-container
              [dataSource]="iconDataSource"
              [pageSize]="15"
              [maxHeight]="'400px'"
            />
          </div>
        </section>

        <!-- With Selection Indicator -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">With Selection Indicator</h2>
          <p class="showcase__section__description">
            Scroll container with selection indicators and click handling.
          </p>
          <div class="showcase__example">
            <ui-scroll-container
              [dataSource]="selectionDataSource"
              [pageSize]="20"
              [maxHeight]="'400px'"
              [showSelectionIndicator]="true"
              [indicatorPosition]="'horizontal'"
              (itemSelect)="onItemSelect($event)"
            />
            @if (selectedItem()) {
              <p style="margin-top: 12px; padding: 12px; background: #ebf3fc; border-radius: 4px;">
                Selected: {{ selectedItem()?.node?.label }}
              </p>
            }
          </div>
        </section>

        <!-- Custom Template -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Custom Item Template</h2>
          <p class="showcase__section__description">
            Using custom template instead of Node component.
          </p>
          <div class="showcase__example">
            <ui-scroll-container
              [dataSource]="customTemplateDataSource"
              [pageSize]="15"
              [maxHeight]="'400px'"
              [useNodeComponent]="false"
            >
              <ng-template #itemTemplate let-item let-index="index">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    background: #f5f5f5;
                    border-radius: 4px;
                    margin-bottom: 4px;
                  "
                >
                  <span style="font-weight: 600;">#{{ index + 1 }}</span>
                  <div style="flex: 1;">
                    <div style="font-weight: 500;">{{ item.label }}</div>
                    @if (item.description) {
                      <div style="font-size: 12px; color: #666; margin-top: 4px;">
                        {{ item.description }}
                      </div>
                    }
                  </div>
                </div>
              </ng-template>
            </ui-scroll-container>
          </div>
        </section>

        <!-- Size Variants -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Small Nodes</h3>
              <ui-scroll-container
                [dataSource]="sizeDataSource"
                [pageSize]="25"
                [maxHeight]="'300px'"
                [nodeSize]="'small'"
              />
            </div>
            <div class="showcase__item">
              <h3>Medium Nodes (Default)</h3>
              <ui-scroll-container
                [dataSource]="sizeDataSource"
                [pageSize]="20"
                [maxHeight]="'300px'"
                [nodeSize]="'medium'"
              />
            </div>
            <div class="showcase__item">
              <h3>Large Nodes</h3>
              <ui-scroll-container
                [dataSource]="sizeDataSource"
                [pageSize]="15"
                [maxHeight]="'300px'"
                [nodeSize]="'large'"
              />
            </div>
          </div>
        </section>

        <!-- Appearance Variants -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Appearance Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Transparent</h3>
              <ui-scroll-container
                [dataSource]="variantDataSource"
                [pageSize]="20"
                [maxHeight]="'300px'"
                [appearance]="'transparent'"
              />
            </div>
            <div class="showcase__item">
              <h3>Subtle</h3>
              <ui-scroll-container
                [dataSource]="variantDataSource"
                [pageSize]="20"
                [maxHeight]="'300px'"
                [appearance]="'subtle'"
              />
            </div>
            <div class="showcase__item">
              <h3>Subtle Circular</h3>
              <ui-scroll-container
                [dataSource]="variantDataSource"
                [pageSize]="20"
                [maxHeight]="'300px'"
                [appearance]="'subtle'"
                [shape]="'circular'"
              />
            </div>
            <div class="showcase__item">
              <h3>Filled Circular</h3>
              <ui-scroll-container
                [dataSource]="variantDataSource"
                [pageSize]="20"
                [maxHeight]="'300px'"
                [appearance]="'filled'"
                [shape]="'circular'"
              />
            </div>
          </div>
        </section>

        <!-- As Button -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">As Button</h2>
          <p class="showcase__section__description">
            Nodes rendered as buttons with click handling.
          </p>
          <div class="showcase__example">
            <ui-scroll-container
              [dataSource]="buttonDataSource"
              [pageSize]="20"
              [maxHeight]="'400px'"
              [asButton]="true"
              (itemClick)="onItemClick($event)"
            />
            @if (clickedItem()) {
              <p style="margin-top: 12px; padding: 12px; background: #ebf3fc; border-radius: 4px;">
                Clicked: {{ clickedItem()?.node?.label }}
              </p>
            }
          </div>
        </section>

        <!-- Programmatic Control -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Programmatic Control</h2>
          <p class="showcase__section__description">
            Control scrolling and refresh data programmatically.
          </p>
          <div class="showcase__example">
            <div style="margin-bottom: 12px; display: flex; gap: 8px;">
              <ui-button (click)="scrollToTop()" size="small">Scroll to Top</ui-button>
              <ui-button (click)="scrollToBottom()" size="small">Scroll to Bottom</ui-button>
              <ui-button (click)="refresh()" size="small">Refresh</ui-button>
            </div>
            <ui-scroll-container
              #programmaticScroll
              [dataSource]="programmaticDataSource"
              [pageSize]="20"
              [maxHeight]="'400px'"
            />
          </div>
        </section>

        <!-- Event Logging -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Event Logging</h2>
          <div class="showcase__example">
            <ui-scroll-container
              [dataSource]="eventDataSource"
              [pageSize]="20"
              [maxHeight]="'400px'"
              (loadMore)="onLoadMore($event)"
              (loadComplete)="onLoadComplete()"
            />
            <div style="margin-top: 12px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
              <p style="margin: 0 0 8px 0; font-size: 12px;">
                <strong>Load More Events:</strong> {{ loadMoreCount() }}
              </p>
              <p style="margin: 0; font-size: 12px;">
                <strong>Load Complete:</strong> {{ loadCompleteCount() > 0 ? 'Yes' : 'No' }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class ScrollContainerShowcaseComponent {
  programmaticScroll = viewChild<ScrollContainerComponent>('programmaticScroll');
  customItemTemplate = signal<TemplateRef<any> | null>(null);

  selectedItem = signal<{ item: MockItem; node: Node | null } | null>(null);
  clickedItem = signal<{ item: MockItem; node: Node | null } | null>(null);
  loadMoreCount = signal<number>(0);
  loadCompleteCount = signal<number>(0);

  // Mock data generators
  private generateMockItems(startId: number, count: number, withIcons = false): MockItem[] {
    const icons: IconName[] = [
      'home',
      'settings',
      'accessibility',
      'document',
      'folder',
      'image',
      'mail',
      'calendar',
    ];
    return Array.from({ length: count }, (_, i) => ({
      id: startId + i,
      label: `Item ${startId + i}`,
      icon: withIcons ? icons[(startId + i) % icons.length] : undefined,
      description: withIcons ? `Description for item ${startId + i}` : undefined,
    }));
  }

  // Data sources
  basicDataSource: ScrollContainerDataSource<MockItem> = (page: number, pageSize: number) => {
    const startId = (page - 1) * pageSize + 1;
    const items = this.generateMockItems(startId, pageSize);
    return of({
      items,
      hasNextPage: page < 5,
      hasPreviousPage: page > 1,
      totalCount: 100,
    }).pipe(delay(500));
  };

  iconDataSource: ScrollContainerDataSource<MockItem> = (page: number, pageSize: number) => {
    const startId = (page - 1) * pageSize + 1;
    const items = this.generateMockItems(startId, pageSize, true);
    return of({
      items,
      hasNextPage: page < 4,
      hasPreviousPage: page > 1,
      totalCount: 60,
    }).pipe(delay(500));
  };

  selectionDataSource: ScrollContainerDataSource<MockItem> = (page: number, pageSize: number) => {
    const startId = (page - 1) * pageSize + 1;
    const items = this.generateMockItems(startId, pageSize, true);
    return of({
      items,
      hasNextPage: page < 5,
      hasPreviousPage: page > 1,
      totalCount: 100,
    }).pipe(delay(500));
  };

  customTemplateDataSource: ScrollContainerDataSource<MockItem> = (
    page: number,
    pageSize: number,
  ) => {
    const startId = (page - 1) * pageSize + 1;
    const items = this.generateMockItems(startId, pageSize, true);
    return of({
      items,
      hasNextPage: page < 4,
      hasPreviousPage: page > 1,
      totalCount: 60,
    }).pipe(delay(500));
  };

  sizeDataSource: ScrollContainerDataSource<MockItem> = (page: number, pageSize: number) => {
    const startId = (page - 1) * pageSize + 1;
    const items = this.generateMockItems(startId, pageSize, true);
    return of({
      items,
      hasNextPage: page < 3,
      hasPreviousPage: page > 1,
      totalCount: 75,
    }).pipe(delay(400));
  };

  variantDataSource: ScrollContainerDataSource<MockItem> = (page: number, pageSize: number) => {
    const startId = (page - 1) * pageSize + 1;
    const items = this.generateMockItems(startId, pageSize, true);
    return of({
      items,
      hasNextPage: page < 3,
      hasPreviousPage: page > 1,
      totalCount: 60,
    }).pipe(delay(400));
  };

  buttonDataSource: ScrollContainerDataSource<MockItem> = (page: number, pageSize: number) => {
    const startId = (page - 1) * pageSize + 1;
    const items = this.generateMockItems(startId, pageSize, true);
    return of({
      items,
      hasNextPage: page < 5,
      hasPreviousPage: page > 1,
      totalCount: 100,
    }).pipe(delay(500));
  };

  programmaticDataSource: ScrollContainerDataSource<MockItem> = (
    page: number,
    pageSize: number,
  ) => {
    const startId = (page - 1) * pageSize + 1;
    const items = this.generateMockItems(startId, pageSize, true);
    return of({
      items,
      hasNextPage: page < 5,
      hasPreviousPage: page > 1,
      totalCount: 100,
    }).pipe(delay(500));
  };

  eventDataSource: ScrollContainerDataSource<MockItem> = (page: number, pageSize: number) => {
    const startId = (page - 1) * pageSize + 1;
    const items = this.generateMockItems(startId, pageSize);
    return of({
      items,
      hasNextPage: page < 3,
      hasPreviousPage: page > 1,
      totalCount: 60,
    }).pipe(delay(500));
  };

  // Event handlers
  onItemSelect(event: { item: MockItem; node: Node | null }): void {
    this.selectedItem.set(event);
  }

  onItemClick(event: { item: MockItem; node: Node | null }): void {
    this.clickedItem.set(event);
  }

  onLoadMore(event: { page: number; items: MockItem[] }): void {
    this.loadMoreCount.update(count => count + 1);
  }

  onLoadComplete(): void {
    this.loadCompleteCount.update(count => count + 1);
  }

  scrollToTop(): void {
    this.programmaticScroll()?.scrollToTop();
  }

  scrollToBottom(): void {
    this.programmaticScroll()?.scrollToBottom();
  }

  refresh(): void {
    this.programmaticScroll()?.refresh();
  }
}
