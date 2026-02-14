import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, UrlSegment } from '@angular/router';
import { NavComponent, NavNode } from 'angular-ui';
import { filter } from 'rxjs/operators';
import { SearchComponent } from 'angular-ui';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ds-sidebar',
  imports: [NavComponent, SearchComponent, FormsModule],
  templateUrl: './ds-sidebar.component.html',
})
export class DsSidebarComponent {
  private readonly router = inject(Router);
  selectedItemId = signal<string | null>(null);
  private _searchQuery = signal<string>('');

  get searchQuery(): string {
    return this._searchQuery();
  }

  set searchQuery(value: string) {
    this._searchQuery.set(value);
  }

  private readonly allNavItems: NavNode[] = [
    // Documentation Section
    { id: 'getting-started', label: 'Getting Started', icon: 'rocket' },
    { id: 'installation', label: 'Installation', icon: 'arrow_download' },
    { id: 'roadmap', label: 'Roadmap', icon: 'timeline' },
    { id: 'divider-1', isDivider: true, label: 'divider1' },
    // Form Components Section
    { id: 'form-components', isSectionHeader: true, label: 'Form Components' },
    { id: 'checkbox', label: 'Checkbox', icon: 'checkbox_checked' },
    { id: 'color', label: 'Color', icon: 'color' },
    { id: 'date', label: 'Date', icon: 'calendar' },
    { id: 'date-range', label: 'Date Range', icon: 'calendar_month' },
    { id: 'dropdown', label: 'Dropdown', icon: 'apps_list' },
    { id: 'time-span', label: 'Time Span', icon: 'timer' },
    { id: 'file', label: 'File', icon: 'document' },
    { id: 'number', label: 'Number', icon: 'number_row' },
    { id: 'password', label: 'Password', icon: 'password' },
    { id: 'radio-button-group', label: 'Radio Button Group', icon: 'checkmark_circle' },
    { id: 'slider', label: 'Slider', icon: 'arrow_maximize' },
    { id: 'switch', label: 'Switch', icon: 'tap_single' },
    { id: 'text', label: 'Text', icon: 'text_align_left' },
    { id: 'email', label: 'Email', icon: 'mail' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'tel', label: 'Tel', icon: 'call' },
    { id: 'textarea', label: 'Textarea', icon: 'text_field' },
    { id: 'totp', label: 'TOTP', icon: 'lock_closed' },
    { id: 'url', label: 'URL', icon: 'link' },
    // Layout Components Section
    { id: 'layout-components', isSectionHeader: true, label: 'Layout Components' },
    { id: 'accordion', label: 'Accordion', icon: 'slide_text' },
    { id: 'card', label: 'Card', icon: 'contact_card' },
    { id: 'dialog', label: 'Dialog', icon: 'window' },
    { id: 'divider', label: 'Divider', icon: 'divider_tall' },
    {
      id: 'scroll-panel',
      label: 'Scroll Panel',
      icon: 'dual_screen_vertical_scroll',
    },
    {
      id: 'scroll-container',
      label: 'Scroll Container',
      icon: 'dual_screen_vertical_scroll',
    },
    { id: 'splitter', label: 'Splitter', icon: 'split_vertical' },
    // Navigation Section
    { id: 'navigation', isSectionHeader: true, label: 'Navigation' },
    { id: 'breadcrumb', label: 'Breadcrumb', icon: 'arrow_routing' },
    { id: 'menu', label: 'Menu', icon: 'group_list' },
    { id: 'nav', label: 'Nav', icon: 'navigation' },
    { id: 'table-of-content', label: 'Table of Content', icon: 'list' },
    { id: 'tabs', label: 'Tabs', icon: 'tabs' },
    // Feedback Section
    { id: 'feedback', isSectionHeader: true, label: 'Feedback' },
    { id: 'progress-bar', label: 'Progress Bar', icon: 'spacebar' },
    { id: 'skeleton', label: 'Skeleton', icon: 'checkbox_indeterminate' },
    { id: 'spinner', label: 'Spinner', icon: 'replay' },
    { id: 'toast', label: 'Toast', icon: 'alert' },
    // Data Display Section
    { id: 'data-display', isSectionHeader: true, label: 'Data Display' },
    { id: 'data-grid', label: 'Data Grid', icon: 'table' },
    { id: 'pagination', label: 'Pagination', icon: 'page_fit' },
    { id: 'toolbar', label: 'Toolbar', icon: 'navigation' },
    { id: 'tree', label: 'Tree', icon: 'text_bullet_list_tree' },
    { id: 'tree-node', label: 'Tree Node', icon: 'rectangle_landscape' },
    { id: 'node', label: 'Node', icon: 'circle' },
    { id: 'badge', label: 'Badge', icon: 'badge' },
    { id: 'tag', label: 'Tag', icon: 'tag' },
    { id: 'empty-state', label: 'Empty State', icon: 'document_dismiss' },
    { id: 'error-state', label: 'Error State', icon: 'error_circle' },
    { id: 'loading-state', label: 'Loading State', icon: 'arrow_sync' },
    { id: 'state-container', label: 'State Container', icon: 'database' },
    { id: 'icon', label: 'Icon', icon: 'star' },
    { id: 'kbd', label: 'Kbd', icon: 'keyboard' },
    { id: 'rating', label: 'Rating', icon: 'star' },
    { id: 'tooltip', label: 'Tooltip', icon: 'info' },
    { id: 'avatar', label: 'Avatar', icon: 'person' },
    // Actions Section
    { id: 'actions', isSectionHeader: true, label: 'Actions' },
    { id: 'button', label: 'Button', icon: 'button' },
    { id: 'command-palette', label: 'Command Palette', icon: 'keyboard' },
    { id: 'stepper', label: 'Stepper', icon: 'timeline' },
    { id: 'carousel', label: 'Carousel', icon: 'arrow_circle_right' },
    { id: 'drawer', label: 'Drawer', icon: 'panel_left' },
    { id: 'video', label: 'Video', icon: 'video' },
    // Calendar Section
    { id: 'calendar-components', isSectionHeader: true, label: 'Calendar Components' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar_month' },
    { id: 'time', label: 'Time', icon: 'clock' },
  ];

  // Filtered nav items based on search query
  filteredNavItems = computed<NavNode[]>(() => {
    const query = this._searchQuery().toLowerCase().trim();
    if (!query) {
      return this.allNavItems;
    }

    return this.allNavItems.filter(item => {
      // Always show section headers if any item in section matches
      if (item.isSectionHeader) {
        // Check if any item after this header matches
        const headerIndex = this.allNavItems.indexOf(item);
        const nextHeaderIndex = this.allNavItems.findIndex(
          (navItem, idx) => idx > headerIndex && navItem.isSectionHeader,
        );
        const sectionItems = this.allNavItems.slice(
          headerIndex + 1,
          nextHeaderIndex === -1 ? undefined : nextHeaderIndex,
        );
        return sectionItems.some(sectionItem => sectionItem.label.toLowerCase().includes(query));
      }
      // Filter regular items by label
      return item.label.toLowerCase().includes(query);
    });
  });

  // Nav items with handlers applied
  navItems = computed<NavNode[]>(() => {
    return this.filteredNavItems().map(item => this.buildNavNode(item));
  });

  constructor() {
    this.syncSelectedItemFromUrl(this.router.url);

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.syncSelectedItemFromUrl(event.urlAfterRedirects);
    });
  }

  private syncSelectedItemFromUrl(url: string): void {
    const activeId = this.getLastPrimarySegment(url);
    if (!activeId) {
      this.selectedItemId.set(null);
      return;
    }

    const match = this.findNavItemById(activeId, this.allNavItems);
    this.selectedItemId.set(match ? (match.id as string) : null);
  }

  private findNavItemById(id: string, items: NavNode[]): NavNode | null {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }

      if (item.children?.length) {
        const childMatch = this.findNavItemById(id, item.children);
        if (childMatch) {
          return childMatch;
        }
      }
    }

    return null;
  }

  private getLastPrimarySegment(url: string): string | null {
    try {
      const tree = this.router.parseUrl(url);
      const primarySegments: UrlSegment[] = tree.root.children['primary']?.segments ?? [];
      if (primarySegments.length === 0) {
        return null;
      }
      return primarySegments[primarySegments.length - 1].path;
    } catch {
      const normalized = url.split(/[?#]/)[0].replace(/\/+$/, '');
      const parts = normalized.split('/').filter(Boolean);
      return parts.length > 0 ? parts[parts.length - 1] : null;
    }
  }

  private buildNavNode(item: NavNode): NavNode {
    const itemId = String(item.id);
    const hasChildren = !!(item.children && item.children.length > 0);

    return {
      ...item,
      selected: this.selectedItemId() === itemId,
      onClick: hasChildren ? undefined : () => this.navigateToItem(itemId),
      children: item.children?.map(child => this.buildNavNode(child)),
    };
  }

  private navigateToItem(itemId: string): void {
    this.selectedItemId.set(itemId);
    this.router.navigate(['docs', itemId]);
  }
}
