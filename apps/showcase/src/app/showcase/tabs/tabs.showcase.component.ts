import { Component, signal, viewChild, computed } from '@angular/core';
import { TabsComponent, Tab } from 'angular-ui';

import { Variant, Appearance, Shape, Size, Orientation } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';

@Component({
  selector: 'app-tabs-showcase',
  imports: [TabsComponent, TableOfContentComponent, InteractiveShowcaseComponent],
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
        <h1 class="showcase__title">Tabs Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Tabs component built with Fluent 2 Design System. Supports
          both horizontal and vertical orientations with various layouts, sizes, and interaction
          patterns.
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
              <ui-tabs
                [tabs]="interactiveTabs()"
                [selectedTabId]="selectedInteractiveTab()"
                [variant]="currentVariant()"
                [appearance]="currentAppearance()"
                [shape]="currentShape()"
                [size]="currentSize()"
                [orientation]="currentOrientation()"
                [showSelectionIndicator]="currentShowIndicator()"
                (tabChange)="onInteractiveTabChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- ========================================= -->
        <!-- HORIZONTAL TABS -->
        <!-- ========================================= -->

        <h2 class="showcase__title" style="margin-top: 48px;">Horizontal Tabs</h2>

        <!-- Basic Tabs -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Horizontal Tabs (Icon Before)</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-tabs
                [tabs]="basicTabs()"
                [selectedTabId]="selectedBasicTab()"
                (tabChange)="onBasicTabChange($event)"
              ></ui-tabs>
              <p style="margin-top: 16px;">Selected: {{ selectedBasicTab() }}</p>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Horizontal Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Small</h3>
              <ui-tabs [tabs]="sizeTabs()" size="small"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Medium (Default)</h3>
              <ui-tabs [tabs]="sizeTabs()" size="medium"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Large</h3>
              <ui-tabs [tabs]="sizeTabs()" size="large"></ui-tabs>
            </div>
          </div>
        </div>

        <!-- Appearance Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Appearance Variants</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3>Transparent (Default)</h3>
              <ui-tabs [tabs]="styleTabs()" appearance="transparent"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Subtle</h3>
              <ui-tabs [tabs]="styleTabs()" appearance="subtle"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Filled</h3>
              <ui-tabs [tabs]="styleTabs()" appearance="filled"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Outline</h3>
              <ui-tabs [tabs]="styleTabs()" appearance="outline"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Tint</h3>
              <ui-tabs [tabs]="styleTabs()" appearance="tint"></ui-tabs>
            </div>
          </div>
        </div>

        <!-- Shape Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Shape Variants</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3>Rounded (Default)</h3>
              <ui-tabs [tabs]="styleTabs()" appearance="subtle" shape="rounded"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Circular</h3>
              <ui-tabs [tabs]="styleTabs()" appearance="subtle" shape="circular"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Filled + Circular</h3>
              <ui-tabs [tabs]="styleTabs()" appearance="filled" shape="circular"></ui-tabs>
            </div>
          </div>
        </div>

        <!-- Variant (Color) Options -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variant (Color) Options</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3>Primary (Default)</h3>
              <ui-tabs [tabs]="styleTabs()" variant="primary" appearance="subtle"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Secondary</h3>
              <ui-tabs [tabs]="styleTabs()" variant="secondary" appearance="subtle"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Success</h3>
              <ui-tabs [tabs]="styleTabs()" variant="success" appearance="subtle"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Warning</h3>
              <ui-tabs [tabs]="styleTabs()" variant="warning" appearance="subtle"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Danger</h3>
              <ui-tabs [tabs]="styleTabs()" variant="danger" appearance="subtle"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Info</h3>
              <ui-tabs [tabs]="styleTabs()" variant="info" appearance="subtle"></ui-tabs>
            </div>
          </div>
        </div>

        <!-- Variant + Appearance Combinations -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variant + Appearance Combinations</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3>Success + Filled + Circular</h3>
              <ui-tabs
                [tabs]="styleTabs()"
                variant="success"
                appearance="filled"
                shape="circular"
              ></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Danger + Tint</h3>
              <ui-tabs [tabs]="styleTabs()" variant="danger" appearance="tint"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Info + Outline</h3>
              <ui-tabs [tabs]="styleTabs()" variant="info" appearance="outline"></ui-tabs>
            </div>
          </div>
        </div>

        <!-- ========================================= -->
        <!-- VERTICAL TABS -->
        <!-- ========================================= -->

        <h2 class="showcase__title" style="margin-top: 48px;">Vertical Tabs</h2>

        <!-- Basic Vertical Tabs -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Vertical Tabs (Icon Before)</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-tabs
                [tabs]="verticalBasicTabs()"
                [selectedTabId]="selectedVerticalTab()"
                orientation="vertical"
                (tabChange)="onVerticalTabChange($event)"
              ></ui-tabs>
              <p style="margin-top: 16px;">Selected: {{ selectedVerticalTab() }}</p>
            </div>
          </div>
        </div>

        <!-- Vertical Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Vertical Size Variants</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3>Small</h3>
              <ui-tabs [tabs]="verticalSizeTabs()" size="small" orientation="vertical"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Medium (Default)</h3>
              <ui-tabs [tabs]="verticalSizeTabs()" size="medium" orientation="vertical"></ui-tabs>
            </div>
          </div>
        </div>

        <!-- Vertical Appearance Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Vertical Appearance Variants</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3>Transparent (Default)</h3>
              <ui-tabs
                [tabs]="verticalStyleTabs()"
                appearance="transparent"
                orientation="vertical"
              ></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Subtle</h3>
              <ui-tabs
                [tabs]="verticalStyleTabs()"
                appearance="subtle"
                orientation="vertical"
              ></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Filled</h3>
              <ui-tabs
                [tabs]="verticalStyleTabs()"
                appearance="filled"
                orientation="vertical"
              ></ui-tabs>
            </div>
          </div>
        </div>

        <!-- Vertical Shape Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Vertical Shape Variants</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3>Subtle + Circular</h3>
              <ui-tabs
                [tabs]="verticalStyleTabs()"
                appearance="subtle"
                shape="circular"
                orientation="vertical"
              ></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Filled + Circular</h3>
              <ui-tabs
                [tabs]="verticalStyleTabs()"
                appearance="filled"
                shape="circular"
                orientation="vertical"
              ></ui-tabs>
            </div>
          </div>
        </div>

        <!-- Vertical Variant (Color) Options -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Vertical Variant (Color) Options</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3>Success + Subtle</h3>
              <ui-tabs
                [tabs]="verticalCircularTabs()"
                variant="success"
                appearance="subtle"
                orientation="vertical"
              ></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Danger + Filled + Circular</h3>
              <ui-tabs
                [tabs]="verticalCircularTabs()"
                variant="danger"
                appearance="filled"
                shape="circular"
                orientation="vertical"
              ></ui-tabs>
            </div>
          </div>
        </div>

        <!-- Mixed Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Combined Examples</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3>Horizontal: Small</h3>
              <ui-tabs [tabs]="combinedTabs()" size="small"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Vertical: Medium + Transparent</h3>
              <ui-tabs
                [tabs]="combinedTabs()"
                size="medium"
                appearance="transparent"
                orientation="vertical"
              ></ui-tabs>
            </div>
          </div>
        </div>

        <!-- With Disabled Tabs -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">With Disabled Tabs</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3>Horizontal</h3>
              <ui-tabs [tabs]="disabledTabs()"></ui-tabs>
            </div>
            <div class="showcase__item">
              <h3>Vertical</h3>
              <ui-tabs [tabs]="disabledTabs()" orientation="vertical"></ui-tabs>
            </div>
          </div>
        </div>

        <!-- Event Logging -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Event Logging</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <p><strong>Last Event:</strong> {{ lastEvent() }}</p>
              <p><strong>Selected Tab:</strong> {{ lastSelectedTab() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TabsShowcaseComponent {
  // Reference to showcase
  private showcaseRef = viewChild<InteractiveShowcaseComponent>('showcase');

  // Interactive demo options
  variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
  appearances: Appearance[] = ['transparent', 'filled', 'tint', 'outline', 'subtle'];
  shapes: Shape[] = ['rounded', 'circular', 'square'];
  sizes: Size[] = ['small', 'medium', 'large'];
  orientations: Orientation[] = ['horizontal', 'vertical'];

  // Values from showcase
  private values = signal<Record<string, any>>({});

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-tabs',
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
        key: 'orientation',
        label: 'Orientation',
        type: 'dropdown',
        options: this.orientations.map(o => ({ value: o, label: o })),
        defaultValue: 'horizontal',
        group: 'layout',
      },
      {
        key: 'showIndicator',
        label: 'Show Indicator',
        type: 'switch',
        defaultValue: true,
        group: 'appearance',
      },
    ],
  };

  // Computed values
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentSize = computed(() => this.values()['size'] as Size);
  currentOrientation = computed(() => this.values()['orientation'] as Orientation);
  currentShowIndicator = computed(() => this.values()['showIndicator'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    // Reset is handled by showcase component
  }

  selectedInteractiveTab = signal<string | number>('itab1');

  interactiveTabs = signal<Tab[]>([
    { id: 'itab1', label: 'Dashboard', icon: 'home' },
    { id: 'itab2', label: 'Analytics', icon: 'info' },
    { id: 'itab3', label: 'Settings', icon: 'settings' },
  ]);

  lastEvent = signal<string>('None');
  lastSelectedTab = signal<string>('None');
  selectedBasicTab = signal<string | number>('tab1');
  selectedVerticalTab = signal<string | number>('vtab1');

  onInteractiveTabChange(tab: Tab): void {
    this.selectedInteractiveTab.set(tab.id);
  }

  removeTab(): void {
    const tabs = this.interactiveTabs();
    if (tabs.length > 1) {
      this.interactiveTabs.set(tabs.slice(0, -1));
      this.lastEvent.set(`Removed last tab`);
    }
  }

  // Basic tabs
  basicTabs = signal<Tab[]>([
    { id: 'tab1', label: 'First tab', icon: 'home' },
    { id: 'tab2', label: 'Second tab', icon: 'settings' },
    { id: 'tab3', label: 'Third tab', icon: 'settings' },
    { id: 'tab4', label: 'Fourth tab', icon: 'settings' },
    { id: 'tab5', label: 'Fifth tab', icon: 'settings' },
  ]);

  // Size tabs
  sizeTabs = signal<Tab[]>([
    { id: 1, label: 'Home', icon: 'home' },
    { id: 2, label: 'Profile', icon: 'person' },
    { id: 3, label: 'Settings', icon: 'settings' },
  ]);

  // Layout tabs
  layoutTabs = signal<Tab[]>([
    { id: 'a', label: 'Dashboard', icon: 'home' },
    { id: 'b', label: 'Analytics', icon: 'document' },
    { id: 'c', label: 'Reports', icon: 'home' },
    { id: 'd', label: 'Team', icon: 'home' },
  ]);

  // Style tabs
  styleTabs = signal<Tab[]>([
    { id: 'style1', label: 'Overview', icon: 'book' },
    { id: 'style2', label: 'Details', icon: 'book' },
    { id: 'style3', label: 'Settings', icon: 'settings' },
  ]);

  // Vertical basic tabs
  verticalBasicTabs = signal<Tab[]>([
    { id: 'vtab1', label: 'First tab', icon: 'home' },
    { id: 'vtab2', label: 'Second tab', icon: 'settings' },
    { id: 'vtab3', label: 'Third tab', icon: 'settings' },
    { id: 'vtab4', label: 'Fourth tab', icon: 'settings' },
    { id: 'vtab5', label: 'Fifth tab', icon: 'settings' },
  ]);

  // Vertical size tabs
  verticalSizeTabs = signal<Tab[]>([
    { id: 'vsize1', label: 'Home', icon: 'home' },
    { id: 'vsize2', label: 'Profile', icon: 'person' },
    { id: 'vsize3', label: 'Settings', icon: 'settings' },
  ]);

  // Vertical layout tabs
  verticalLayoutTabs = signal<Tab[]>([
    { id: 'vlayout1', label: 'Dashboard', icon: 'home' },
    { id: 'vlayout2', label: 'Analytics', icon: 'line' },
    { id: 'vlayout3', label: 'Reports', icon: 'document_copy' },
    { id: 'vlayout4', label: 'Team', icon: 'people_team' },
  ]);

  // Vertical style tabs
  verticalStyleTabs = signal<Tab[]>([
    { id: 'vstyle1', label: 'Overview', icon: 'book' },
    { id: 'vstyle2', label: 'Details', icon: 'book' },
    { id: 'vstyle3', label: 'Settings', icon: 'settings' },
  ]);

  // Vertical circular tabs
  verticalCircularTabs = signal<Tab[]>([
    { id: 'vcir1', label: 'First tab', icon: 'home' },
    { id: 'vcir2', label: 'Second tab', icon: 'settings' },
    { id: 'vcir3', label: 'Third tab', icon: 'settings' },
    { id: 'vcir4', label: 'Fourth tab', icon: 'settings' },
    { id: 'vcir5', label: 'Fifth tab', icon: 'settings' },
  ]);

  // Disabled tabs
  disabledTabs = signal<Tab[]>([
    { id: 'd1', label: 'Active', icon: 'home' },
    { id: 'd2', label: 'Disabled', disabled: true },
    { id: 'd3', label: 'Active', icon: 'home' },
    { id: 'd4', label: 'Disabled', disabled: true },
  ]);

  // Combined tabs
  combinedTabs = signal<Tab[]>([
    { id: 'cb1', label: 'All', icon: 'home' },
    { id: 'cb2', label: 'Active', icon: 'home' },
    { id: 'cb3', label: 'Completed', icon: 'home' },
  ]);

  // Event handlers
  onBasicTabChange(tab: Tab): void {
    this.selectedBasicTab.set(tab.id);
    this.lastEvent.set(`Horizontal tab changed: ${tab.label}`);
    this.lastSelectedTab.set(tab.label);
    console.log('Horizontal tab changed:', tab);
  }

  onVerticalTabChange(tab: Tab): void {
    this.selectedVerticalTab.set(tab.id);
    this.lastEvent.set(`Vertical tab changed: ${tab.label}`);
    this.lastSelectedTab.set(tab.label);
    console.log('Vertical tab changed:', tab);
  }
}
