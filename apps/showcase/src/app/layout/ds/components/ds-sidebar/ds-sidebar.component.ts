import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ButtonComponent, NavComponent, NavNode, SearchComponent } from 'angular-ui';
import { ThemeMode, ThemeService } from '@shared/theme/theme.service';

@Component({
  selector: 'app-ds-sidebar',
  imports: [NavComponent, SearchComponent, FormsModule, ButtonComponent],
  templateUrl: './ds-sidebar.component.html',
})
export class DsSidebarComponent {
  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);

  selectedItemId = signal<string | null>(null);
  private _searchQuery = signal<string>('');

  get searchQuery(): string {
    return this._searchQuery();
  }

  set searchQuery(value: string) {
    this._searchQuery.set(value);
  }

  isDarkMode = computed(() => this.themeService.$themeMode() === ThemeMode.Dark);
  themeLabel = computed(() => (this.isDarkMode() ? 'Light mode' : 'Dark mode'));
  themeIcon = computed(() => (this.isDarkMode() ? 'weather_sunny' : 'weather_moon'));

  private readonly allNavItems: NavNode[] = [
    { id: 'design-system', isSectionHeader: true, label: 'Design System' },
    { id: 'colors', label: 'Colors', icon: 'color' },
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
    { id: 'radio', label: 'Radio', icon: 'checkmark_circle' },
    { id: 'slider', label: 'Slider', icon: 'arrow_maximize' },
    { id: 'switch', label: 'Switch', icon: 'tap_single' },
    { id: 'text', label: 'Text', icon: 'text_align_left' },
    { id: 'email', label: 'Email', icon: 'mail' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'tel', label: 'Tel', icon: 'call' },
    { id: 'textarea', label: 'Textarea', icon: 'text_field' },
    { id: 'totp', label: 'TOTP', icon: 'lock_closed' },
    { id: 'url', label: 'URL', icon: 'link' },
    { id: 'layout-components', isSectionHeader: true, label: 'Layout Components' },
    { id: 'accordion', label: 'Accordion', icon: 'slide_text' },
    { id: 'card', label: 'Card', icon: 'contact_card' },
    { id: 'dialog', label: 'Dialog', icon: 'window' },
    { id: 'divider', label: 'Divider', icon: 'divider_tall' },
    { id: 'scroll-panel', label: 'Scroll Panel', icon: 'dual_screen_vertical_scroll' },
    { id: 'scroll-container', label: 'Scroll Container', icon: 'dual_screen_vertical_scroll' },
    { id: 'splitter', label: 'Splitter', icon: 'split_vertical' },
    { id: 'navigation', isSectionHeader: true, label: 'Navigation' },
    { id: 'breadcrumb', label: 'Breadcrumb', icon: 'arrow_routing' },
    { id: 'menu', label: 'Menu', icon: 'group_list' },
    { id: 'nav', label: 'Nav', icon: 'navigation' },
    { id: 'table-of-content', label: 'Table of Content', icon: 'list' },
    { id: 'tabs', label: 'Tabs', icon: 'tabs' },
    { id: 'feedback', isSectionHeader: true, label: 'Feedback' },
    { id: 'progress-bar', label: 'Progress Bar', icon: 'spacebar' },
    { id: 'skeleton', label: 'Skeleton', icon: 'checkbox_indeterminate' },
    { id: 'spinner', label: 'Spinner', icon: 'replay' },
    { id: 'toast', label: 'Toast', icon: 'alert' },
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
    { id: 'actions', isSectionHeader: true, label: 'Actions' },
    { id: 'button', label: 'Button', icon: 'button' },
    { id: 'command-palette', label: 'Command Palette', icon: 'keyboard' },
    { id: 'stepper', label: 'Stepper', icon: 'timeline' },
    { id: 'carousel', label: 'Carousel', icon: 'arrow_circle_right' },
    { id: 'drawer', label: 'Drawer', icon: 'panel_left' },
    { id: 'video', label: 'Video', icon: 'video' },
    { id: 'calendar-components', isSectionHeader: true, label: 'Calendar Components' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar_month' },
    { id: 'time', label: 'Time', icon: 'clock' },
  ];

  filteredNavItems = computed<NavNode[]>(() => {
    const query = this._searchQuery().toLowerCase().trim();
    if (!query) return this.allNavItems;

    return this.allNavItems.filter(item => {
      if (item.isSectionHeader) {
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
      return item.label.toLowerCase().includes(query);
    });
  });

  navItems = computed<NavNode[]>(() =>
    this.filteredNavItems().map(item => ({
      ...item,
      onClick:
        item.children ?
          undefined
        : () => {
            this.selectedItemId.set(item.id as string);
            this.router.navigate(['ds', item.id]);
          },
      selected: this.selectedItemId() === item.id,
      children: item.children?.map(child => ({
        ...child,
        onClick: () => {
          this.selectedItemId.set(child.id as string);
          this.router.navigate(['ds', child.id]);
        },
        selected: this.selectedItemId() === child.id,
      })),
    })),
  );

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(event => {
        const segment = event.url.split('/').pop();
        const item = this.navItems().find(item => item.id === segment);
        if (item) this.selectedItemId.set(item.id as string);
      });
  }

  onDarkModeToggle(): void {
    this.themeService.toggleTheme();
  }
}
