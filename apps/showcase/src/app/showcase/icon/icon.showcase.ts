import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ALL_ICON_NAMES,
  IconComponent,
  IconName,
  SearchComponent,
  Size,
  TableOfContentComponent,
  ToastContainerComponent,
  ToastService,
} from 'angular-ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { ICON_DRAWER_CONFIGS, ICON_VARIANTS } from './icon.showcase.config';
import { IconInteractiveComponent } from './icon.interactive';

@Component({
  selector: 'app-icon-showcase',
  imports: [
    CommonModule,
    FormsModule,
    IconComponent,
    SearchComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    IconInteractiveComponent,
    ToastContainerComponent,
  ],
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
        <app-showcase-header title="Icon" />
        <p class="showcase__description">
          The Icon component renders Fluent icons in regular or filled style with preset sizes
          (small, medium, large) and optional custom pixel sizing. Use icons to support navigation,
          actions, and status communication across UI components.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Matrix of common icons across every size and variant combination. Use the drawer to toggle labels for easier scanning."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (column of overviewColumns; track column.variant + column.size) {
                <div
                  class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header showcase__icons-matrix__cell--header-multi"
                >
                  <span>{{ column.variant | titlecase }}</span>
                  <span>{{ column.size | titlecase }}</span>
                </div>
              }
            </div>
            @for (iconName of overviewIcons; track iconName) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ iconName }}
                </div>
                @for (column of overviewColumns; track column.variant + column.size) {
                  <div class="showcase__icons-matrix__cell">
                    <div class="showcase__icon-showcase__icon-wrapper">
                      <ui-icon [icon]="iconName" [size]="column.size" [variant]="column.variant" />
                    </div>
                    @if (overviewForm().showLabels) {
                      <div class="showcase__icon-showcase__name">{{ iconName }}</div>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Compare small, medium, and large icon sizes for a single icon and variant."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__icon-showcase__item">
                <div class="showcase__icon-showcase__icon-wrapper">
                  <ui-icon [icon]="sizeForm().icon" [size]="size" [variant]="sizeForm().variant" />
                </div>
                @if (sizeForm().showLabels) {
                  <div class="showcase__icon-showcase__name">{{ size | titlecase }}</div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Variant"
          sectionDescription="Compare regular and filled variants for the selected icon and size."
          [formConfig]="variantDrawerFormConfig"
          [formValues]="variantFormValues()"
          (formValuesChange)="variantFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (variant of iconVariants; track variant) {
              <div class="showcase__icon-showcase__item">
                <div class="showcase__icon-showcase__icon-wrapper">
                  <ui-icon
                    [icon]="variantForm().icon"
                    [size]="variantForm().size"
                    [variant]="variant"
                  />
                </div>
                @if (variantForm().showLabels) {
                  <div class="showcase__icon-showcase__name">{{ variant | titlecase }}</div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Icon Browser"
          sectionDescription="Search through all available icons. Click any icon to copy its name. Use the drawer to change preview size and variant for the browser grid."
          [formConfig]="browserDrawerFormConfig"
          [formValues]="browserFormValues()"
          (formValuesChange)="browserFormValues.set($event)"
        >
          <div class="showcase__icon-showcase__search">
            <ui-search
              placeholder="Search icons..."
              [(ngModel)]="searchQueryValue"
              [ngModelOptions]="{ standalone: true }"
            />
          </div>

          <div class="showcase__icon-showcase__results">
            <p>
              Showing <strong>{{ displayedIcons().length }}</strong> of
              <strong>{{ filteredIcons().length }}</strong> icons
              @if (filteredIcons().length < ALL_ICON_NAMES.length) {
                <span>(filtered from {{ ALL_ICON_NAMES.length }})</span>
              }
            </p>
          </div>

          @if (filteredIcons().length > 0) {
            <div class="showcase__icon-showcase__grid" #scrollContainer (scroll)="onScroll()">
              @for (iconName of displayedIcons(); track iconName) {
                <button
                  type="button"
                  class="showcase__icon-showcase__item"
                  [title]="iconName"
                  (click)="copyIconName(iconName)"
                >
                  <div class="showcase__icon-showcase__icon-wrapper">
                    <ui-icon
                      [icon]="iconName"
                      [size]="browserForm().size"
                      [variant]="browserForm().variant"
                    />
                  </div>
                  <div class="showcase__icon-showcase__name">{{ iconName }}</div>
                </button>
              }
            </div>

            @if (isLoadingMore()) {
              <div class="showcase__icon-showcase__loading">
                <p>Loading more icons...</p>
              </div>
            }

            @if (hasMoreIcons() === false && displayedIcons().length > 0) {
              <div class="showcase__icon-showcase__end">
                <p>All icons loaded</p>
              </div>
            }
          } @else {
            <div class="showcase__icon-showcase__empty">
              <p>No icons found matching "{{ searchQueryValue }}"</p>
            </div>
          }
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with icon inputs in real time. Set icon name, size, variant, and optional
            pixel override.
          </p>
          <app-icon-interactive />
        </section>
      </div>

      <ui-toast-container position="top-right"></ui-toast-container>
    </div>
  `,
})
export class IconShowcaseComponent {
  readonly ALL_ICON_NAMES = ALL_ICON_NAMES;

  private toastService = inject(ToastService);
  private searchQuery = signal('');

  sizes = SIZES;
  iconVariants = ICON_VARIANTS;

  overviewIcons: IconName[] = ['home', 'search', 'settings', 'info', 'checkmark', 'delete'];
  overviewColumns: Array<{ size: Size; variant: (typeof ICON_VARIANTS)[number] }> =
    ICON_VARIANTS.flatMap(variant => SIZES.map(size => ({ size, variant })));

  overviewDrawerFormConfig = ICON_DRAWER_CONFIGS.overview;
  sizeDrawerFormConfig = ICON_DRAWER_CONFIGS.size;
  variantDrawerFormConfig = ICON_DRAWER_CONFIGS.variant;
  browserDrawerFormConfig = ICON_DRAWER_CONFIGS.browser;

  readonly batchSize = 48;
  displayedCount = signal<number>(this.batchSize);
  isLoadingMore = signal<boolean>(false);
  scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  get searchQueryValue(): string {
    return this.searchQuery();
  }
  set searchQueryValue(value: string) {
    this.searchQuery.set(value);
  }

  overviewFormValues = signal<Record<string, unknown>>({
    showLabels: true,
  });

  overviewForm = computed(() => {
    const values = this.overviewFormValues();
    return {
      showLabels: !!values['showLabels'],
    };
  });

  sizeFormValues = signal<Record<string, unknown>>({
    sampleIcon: 'home',
    variant: 'regular',
    showLabels: true,
  });

  sizeForm = computed(() => {
    const values = this.sizeFormValues();
    return {
      icon: (values['sampleIcon'] as IconName) || ('home' as IconName),
      variant: values['variant'] as (typeof ICON_VARIANTS)[number],
      showLabels: !!values['showLabels'],
    };
  });

  variantFormValues = signal<Record<string, unknown>>({
    sampleIcon: 'home',
    size: 'medium',
    showLabels: true,
  });

  variantForm = computed(() => {
    const values = this.variantFormValues();
    return {
      icon: (values['sampleIcon'] as IconName) || ('home' as IconName),
      size: values['size'] as Size,
      showLabels: !!values['showLabels'],
    };
  });

  browserFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    variant: 'regular',
  });

  browserForm = computed(() => {
    const values = this.browserFormValues();
    return {
      size: values['size'] as Size,
      variant: values['variant'] as (typeof ICON_VARIANTS)[number],
    };
  });

  filteredIcons = computed<IconName[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return this.ALL_ICON_NAMES as IconName[];
    }
    return this.ALL_ICON_NAMES.filter(iconName =>
      iconName.toLowerCase().includes(query),
    ) as IconName[];
  });

  displayedIcons = computed<IconName[]>(() => {
    return this.filteredIcons().slice(0, this.displayedCount());
  });

  hasMoreIcons = computed<boolean>(() => this.displayedCount() < this.filteredIcons().length);

  constructor() {
    effect(() => {
      const filteredLength = this.filteredIcons().length;
      this.displayedCount.set(Math.min(this.batchSize, filteredLength));

      queueMicrotask(() => {
        const container = this.scrollContainer()?.nativeElement;
        if (container) {
          container.scrollTop = 0;
        }
      });
    });
  }

  onScroll(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container || this.isLoadingMore() || !this.hasMoreIcons()) {
      return;
    }

    const scrollPercentage =
      (container.scrollTop + container.clientHeight) / container.scrollHeight;
    if (scrollPercentage > 0.8) {
      this.loadMoreIcons();
    }
  }

  copyIconName(iconName: IconName): void {
    navigator.clipboard
      .writeText(iconName)
      .then(() => {
        this.toastService.success('Copied!', `Icon name "${iconName}" copied to clipboard`, {
          duration: 3000,
        });
      })
      .catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = iconName;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();

        try {
          document.execCommand('copy');
          this.toastService.success('Copied!', `Icon name "${iconName}" copied to clipboard`, {
            duration: 3000,
          });
        } catch {
          this.toastService.error('Failed to copy', 'Unable to copy icon name to clipboard');
        } finally {
          document.body.removeChild(textArea);
        }
      });
  }

  private loadMoreIcons(): void {
    if (this.isLoadingMore() || !this.hasMoreIcons()) {
      return;
    }

    this.isLoadingMore.set(true);
    setTimeout(() => {
      const newCount = Math.min(
        this.displayedCount() + this.batchSize,
        this.filteredIcons().length,
      );
      this.displayedCount.set(newCount);
      this.isLoadingMore.set(false);
    }, 100);
  }
}
