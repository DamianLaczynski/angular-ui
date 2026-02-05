import { Component, signal, viewChild, computed } from '@angular/core';
import { BreadcrumbComponent, Breadcrumb } from 'angular-ui';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { Variant, Appearance, Shape, Size, Orientation } from 'angular-ui';

@Component({
  selector: 'app-breadcrumb-showcase',
  imports: [
    BreadcrumbComponent,
    CommonModule,
    ButtonComponent,
    TableOfContentComponent,
    InteractiveShowcaseComponent,
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
        <h1 class="showcase__title">Breadcrumb Component</h1>
        <p class="showcase__description">
          Breadcrumb navigation based on Fluent 2 Design System. Unified API: variant + appearance +
          shape + size.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            [showEventLog]="true"
            (valuesChange)="onValuesChange($event)"
            (reset)="onReset()"
          >
            <div preview>
              <ui-breadcrumb
                [items]="interactivePath()"
                [variant]="currentVariant()"
                [appearance]="currentAppearance()"
                [shape]="currentShape()"
                [size]="currentSize()"
                [showIcons]="currentShowIcons()"
                [showSelectionIndicator]="currentShowIndicator()"
                [indicatorPosition]="currentIndicatorPosition()"
                (itemClick)="onNavigate($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Sizes -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Sizes</h2>
          <div class="showcase__grid showcase__grid--vertical">
            @for (s of sizes; track s) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ s | titlecase }}</h3>
                <ui-breadcrumb
                  [items]="basicBreadcrumb()"
                  [size]="s"
                  (itemClick)="onItemClick($event)"
                />
              </div>
            }
          </div>
        </section>

        <!-- Appearances -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Appearances</h2>
          <div class="showcase__grid showcase__grid--vertical">
            @for (a of appearances; track a) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ a | titlecase }}</h3>
                <ui-breadcrumb
                  [items]="basicBreadcrumb()"
                  [appearance]="a"
                  (itemClick)="onItemClick($event)"
                />
              </div>
            }
          </div>
        </section>

        <!-- Shapes -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Shapes</h2>
          <div class="showcase__grid">
            @for (s of shapes; track s) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ s | titlecase }}</h3>
                <ui-breadcrumb
                  [items]="basicBreadcrumb()"
                  appearance="subtle"
                  [shape]="s"
                  (itemClick)="onItemClick($event)"
                />
              </div>
            }
          </div>
        </section>

        <!-- Variants -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Variants (Semantic Colors)</h2>
          <div class="showcase__grid showcase__grid--vertical">
            @for (v of variants; track v) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ v | titlecase }}</h3>
                <ui-breadcrumb
                  [items]="basicBreadcrumb()"
                  [variant]="v"
                  appearance="subtle"
                  (itemClick)="onItemClick($event)"
                />
              </div>
            }
          </div>
        </section>

        <!-- Variant + Appearance Combinations -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Variant + Appearance Combinations</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Success + Filled + Circular</h3>
              <ui-breadcrumb
                [items]="basicBreadcrumb()"
                variant="success"
                appearance="filled"
                shape="circular"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Danger + Tint</h3>
              <ui-breadcrumb
                [items]="basicBreadcrumb()"
                variant="danger"
                appearance="tint"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Info + Outline</h3>
              <ui-breadcrumb
                [items]="basicBreadcrumb()"
                variant="info"
                appearance="outline"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Warning + Subtle + Circular</h3>
              <ui-breadcrumb
                [items]="basicBreadcrumb()"
                variant="warning"
                appearance="subtle"
                shape="circular"
                (itemClick)="onItemClick($event)"
              />
            </div>
          </div>
        </section>

        <!-- States -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Normal</h3>
              <ui-breadcrumb [items]="basicBreadcrumb()" (itemClick)="onItemClick($event)" />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Disabled Item</h3>
              <ui-breadcrumb [items]="disabledBreadcrumb()" (itemClick)="onItemClick($event)" />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Selected Item</h3>
              <ui-breadcrumb [items]="selectedBreadcrumb()" (itemClick)="onItemClick($event)" />
            </div>
          </div>
        </section>

        <!-- Selection Indicators -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Selection Indicators</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Horizontal Indicator</h3>
              <ui-breadcrumb
                [items]="selectedBreadcrumb()"
                [showSelectionIndicator]="true"
                indicatorPosition="horizontal"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Vertical Indicator</h3>
              <ui-breadcrumb
                [items]="selectedBreadcrumb()"
                [showSelectionIndicator]="true"
                indicatorPosition="vertical"
                (itemClick)="onItemClick($event)"
              />
            </div>
          </div>
        </section>

        <!-- Real-World Examples -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Real-World Examples</h2>
          <div class="showcase__grid showcase__grid--vertical">
            <div class="showcase__item">
              <h3 class="showcase__item__title">File System Navigation</h3>
              <ui-breadcrumb
                [items]="fileSystemBreadcrumb()"
                size="small"
                appearance="subtle"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">E-commerce Category</h3>
              <ui-breadcrumb
                [items]="ecommerceBreadcrumb()"
                appearance="transparent"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Settings Panel</h3>
              <ui-breadcrumb
                [items]="settingsBreadcrumb()"
                appearance="subtle"
                shape="circular"
                (itemClick)="onItemClick($event)"
              />
            </div>
          </div>
        </section>

        <!-- Event Log -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Event Log</h2>
          <div class="showcase__item">
            <div class="showcase__event-log">
              @for (log of eventLog(); track $index) {
                <div class="event-log-item">{{ log }}</div>
              }
              @if (eventLog().length === 0) {
                <div class="event-log-empty">Click on breadcrumb items to see events...</div>
              }
            </div>
            <ui-button size="small" appearance="outline" (click)="clearEventLog()">
              Clear Log
            </ui-button>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class BreadcrumbShowcaseComponent {
  // Reference to showcase
  private showcaseRef = viewChild<InteractiveShowcaseComponent>('showcase');

  variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
  appearances: Appearance[] = ['transparent', 'filled', 'tint', 'outline', 'subtle'];
  shapes: Shape[] = ['rounded', 'circular', 'square'];
  sizes: Size[] = ['small', 'medium', 'large'];
  indicatorPositions: Orientation[] = ['horizontal', 'vertical'];

  // Values from showcase
  private values = signal<Record<string, any>>({});

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-breadcrumb',
    controlGroups: [
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'layout', label: 'Layout', icon: 'resize' as any },
    ],
    controls: [
      {
        key: 'variant',
        label: 'Variant',
        type: 'dropdown',
        options: this.variants.map(v => ({ value: v, label: v })),
        defaultValue: 'primary',
        group: 'appearance',
      },
      {
        key: 'appearance',
        label: 'Appearance',
        type: 'dropdown',
        options: this.appearances.map(a => ({ value: a, label: a })),
        defaultValue: 'subtle',
        group: 'appearance',
      },
      {
        key: 'shape',
        label: 'Shape',
        type: 'dropdown',
        options: this.shapes.map(s => ({ value: s, label: s })),
        defaultValue: 'rounded',
        group: 'appearance',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'layout',
      },
      {
        key: 'showIcons',
        label: 'Show Icons',
        type: 'switch',
        defaultValue: true,
        group: 'appearance',
      },
      {
        key: 'showIndicator',
        label: 'Show Indicator',
        type: 'switch',
        defaultValue: false,
        group: 'appearance',
      },
      {
        key: 'indicatorPosition',
        label: 'Indicator Position',
        type: 'dropdown',
        options: this.indicatorPositions.map(p => ({ value: p, label: p })),
        defaultValue: 'horizontal',
        group: 'appearance',
      },
    ],
  };

  // Computed values
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShowIcons = computed(() => this.values()['showIcons'] as boolean);
  currentShowIndicator = computed(() => this.values()['showIndicator'] as boolean);
  currentIndicatorPosition = computed(() => this.values()['indicatorPosition'] as Orientation);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    // Reset is handled by showcase component
  }

  lastClickedItem = signal<string>('None');
  eventLog = signal<string[]>([]);

  // Interactive path for demo
  private fullPath: Breadcrumb[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'documents', label: 'Documents', icon: 'folder' },
    { id: 'projects', label: 'Projects', icon: 'folder' },
    { id: 'webapp', label: 'WebApp', icon: 'folder' },
    { id: 'src', label: 'src', icon: 'folder' },
  ];

  interactivePath = signal<Breadcrumb[]>([...this.fullPath]);

  basicBreadcrumb = signal<Breadcrumb[]>([
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'products', label: 'Products', icon: 'shopping_bag' },
    { id: 'electronics', label: 'Electronics', icon: 'device_eq' },
  ]);

  selectedBreadcrumb = signal<Breadcrumb[]>([
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'products', label: 'Products', icon: 'shopping_bag' },
    { id: 'electronics', label: 'Electronics', icon: 'device_eq', selected: true },
  ]);

  disabledBreadcrumb = signal<Breadcrumb[]>([
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'products', label: 'Products', icon: 'shopping_bag', disabled: true },
    { id: 'electronics', label: 'Electronics', icon: 'device_eq' },
  ]);

  fileSystemBreadcrumb = signal<Breadcrumb[]>([
    { id: 'root', label: 'My Computer', icon: 'counter' },
    { id: 'users', label: 'Users', icon: 'people' },
    { id: 'documents', label: 'Documents', icon: 'folder' },
  ]);

  ecommerceBreadcrumb = signal<Breadcrumb[]>([
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'shop', label: 'Shop', icon: 'shopping_bag' },
    { id: 'phones', label: 'Phones', icon: 'phone' },
  ]);

  settingsBreadcrumb = signal<Breadcrumb[]>([
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'account', label: 'Account', icon: 'person' },
    { id: 'security', label: 'Security', icon: 'shield' },
  ]);

  onItemClick(item: Breadcrumb): void {
    this.lastClickedItem.set(item.label);
    this.addToEventLog(`Clicked: "${item.label}" (id: ${item.id})`);
  }

  onNavigate(item: Breadcrumb): void {
    this.lastClickedItem.set(item.label);

    // Truncate path to clicked item
    const currentPath = this.interactivePath();
    const index = currentPath.findIndex(p => p.id === item.id);
    if (index !== -1) {
      this.interactivePath.set(currentPath.slice(0, index + 1));
    }
  }

  private addToEventLog(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.update(log => [`[${timestamp}] ${message}`, ...log.slice(0, 19)]);
  }

  clearEventLog(): void {
    this.eventLog.set([]);
  }
}

