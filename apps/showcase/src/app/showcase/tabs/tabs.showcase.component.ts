import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsComponent, Tab } from 'angular-ui';
import type { Appearance, Orientation, Shape, Size, Variant } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import {
  TABS_APPEARANCE_DRAWER_FORM_CONFIG,
  TABS_VARIANT_DRAWER_FORM_CONFIG,
  TABS_SIZE_DRAWER_FORM_CONFIG,
  TABS_SHAPE_DRAWER_FORM_CONFIG,
  TABS_ORIENTATION_DRAWER_FORM_CONFIG,
  TABS_ORIENTATIONS,
} from './tabs-drawer-form.config';
import {
  APPEARANCES,
  SHAPES,
  SIZES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { DEFAULT_TABS, EXTENDED_TABS, LABELS_ONLY_TABS } from './tabs-showcase-presets';

@Component({
  selector: 'app-tabs-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabsComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
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
        <app-showcase-header title="Tabs" />

        <app-section-with-drawer
          sectionTitle="Appearance"
          [formConfig]="appearanceDrawerFormConfig"
          [formValues]="appearanceFormValues()"
          (formValuesChange)="appearanceFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (appearance of appearances; track appearance) {
              <div class="showcase__item">
                <ui-tabs
                  [tabs]="defaultTabs"
                  [variant]="appearanceForm().variant"
                  [appearance]="appearance"
                  [size]="appearanceForm().size"
                  [shape]="appearanceForm().shape"
                  [orientation]="appearanceForm().orientation"
                  [showSelectionIndicator]="appearanceForm().showSelectionIndicator"
                  [fullWidth]="appearanceForm().fullWidth"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Variant"
          [formConfig]="variantDrawerFormConfig"
          [formValues]="variantFormValues()"
          (formValuesChange)="variantFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (variant of variants; track variant) {
              <div class="showcase__item">
                <ui-tabs
                  [tabs]="defaultTabs"
                  [variant]="variant"
                  [appearance]="variantForm().appearance"
                  [size]="variantForm().size"
                  [shape]="variantForm().shape"
                  [orientation]="variantForm().orientation"
                  [showSelectionIndicator]="variantForm().showSelectionIndicator"
                  [fullWidth]="variantForm().fullWidth"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <ui-tabs
                  [tabs]="defaultTabs"
                  [variant]="sizeForm().variant"
                  [appearance]="sizeForm().appearance"
                  [size]="size"
                  [shape]="sizeForm().shape"
                  [orientation]="sizeForm().orientation"
                  [showSelectionIndicator]="sizeForm().showSelectionIndicator"
                  [fullWidth]="sizeForm().fullWidth"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shape"
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <div class="showcase__item">
                <ui-tabs
                  [tabs]="defaultTabs"
                  [variant]="shapeForm().variant"
                  [appearance]="shapeForm().appearance"
                  [size]="shapeForm().size"
                  [shape]="shape"
                  [orientation]="shapeForm().orientation"
                  [showSelectionIndicator]="shapeForm().showSelectionIndicator"
                  [fullWidth]="shapeForm().fullWidth"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Orientation"
          [formConfig]="orientationDrawerFormConfig"
          [formValues]="orientationFormValues()"
          (formValuesChange)="orientationFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (orientation of orientations; track orientation) {
              <div class="showcase__item">
                <ui-tabs
                  [tabs]="defaultTabs"
                  [variant]="orientationForm().variant"
                  [appearance]="orientationForm().appearance"
                  [size]="orientationForm().size"
                  [shape]="orientationForm().shape"
                  [orientation]="orientation"
                  [showSelectionIndicator]="orientationForm().showSelectionIndicator"
                  [fullWidth]="orientationForm().fullWidth"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section id="tab-options" class="showcase__section">
          <h2 class="showcase__section__title">Tab options</h2>
          <div class="showcase__option-section__box">
            <div class="showcase__grid">
              <div class="showcase__item">
                <span class="showcase__item-label">Default set</span>
                <ui-tabs [tabs]="defaultTabs" variant="primary" appearance="subtle" />
              </div>
              <div class="showcase__item">
                <span class="showcase__item-label">With disabled and closable</span>
                <ui-tabs
                  [tabs]="extendedTabs()"
                  variant="primary"
                  appearance="subtle"
                  (tabClose)="onTabClose($event)"
                />
              </div>
              <div class="showcase__item">
                <span class="showcase__item-label">Labels only</span>
                <ui-tabs [tabs]="labelsOnlyTabs" variant="primary" appearance="subtle" />
              </div>
            </div>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
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
                (tabClose)="onTabClose($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>
      </div>
    </div>
  `,
})
export class TabsShowcaseComponent {
  defaultTabs = DEFAULT_TABS;
  labelsOnlyTabs = LABELS_ONLY_TABS;
  extendedTabs = signal<Tab[]>([...EXTENDED_TABS]);
  appearances = APPEARANCES;
  variants = VARIANTS;
  sizes = SIZES;
  shapes = SHAPES;
  orientations = TABS_ORIENTATIONS;

  appearanceDrawerFormConfig = TABS_APPEARANCE_DRAWER_FORM_CONFIG;
  variantDrawerFormConfig = TABS_VARIANT_DRAWER_FORM_CONFIG;
  sizeDrawerFormConfig = TABS_SIZE_DRAWER_FORM_CONFIG;
  shapeDrawerFormConfig = TABS_SHAPE_DRAWER_FORM_CONFIG;
  orientationDrawerFormConfig = TABS_ORIENTATION_DRAWER_FORM_CONFIG;

  appearanceFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    size: 'medium',
    shape: 'rounded',
    orientation: 'horizontal',
    showSelectionIndicator: true,
    fullWidth: false,
  });

  appearanceForm = computed(() => this.toTabsForm(this.appearanceFormValues()));

  variantFormValues = signal<Record<string, unknown>>({
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    orientation: 'horizontal',
    showSelectionIndicator: true,
    fullWidth: false,
  });

  variantForm = computed(() => this.toTabsForm(this.variantFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    shape: 'rounded',
    orientation: 'horizontal',
    showSelectionIndicator: true,
    fullWidth: false,
  });

  sizeForm = computed(() => this.toTabsForm(this.sizeFormValues()));

  shapeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    orientation: 'horizontal',
    showSelectionIndicator: true,
    fullWidth: false,
  });

  shapeForm = computed(() => this.toTabsForm(this.shapeFormValues()));

  orientationFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    showSelectionIndicator: true,
    fullWidth: false,
  });

  orientationForm = computed(() => this.toTabsForm(this.orientationFormValues()));

  private toTabsForm(v: Record<string, unknown>) {
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      size: v['size'] as Size,
      shape: v['shape'] as Shape,
      orientation: (v['orientation'] as Orientation) ?? 'horizontal',
      showSelectionIndicator: !!v['showSelectionIndicator'],
      fullWidth: !!v['fullWidth'],
    };
  }

  private values = signal<Record<string, unknown>>({});
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentSize = computed(() => this.values()['size'] as Size);
  currentOrientation = computed(() => this.values()['orientation'] as Orientation);
  currentShowIndicator = computed(() => this.values()['showIndicator'] as boolean);

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-tabs',
    controlGroups: [
      {
        id: 'appearance',
        label: 'Appearance',
        icon: 'color' as import('angular-ui').IconName,
        expanded: true,
      },
      { id: 'layout', label: 'Layout', icon: 'resize' as import('angular-ui').IconName },
    ],
    controls: [
      {
        key: 'tabSet',
        label: 'Tab set',
        type: 'dropdown',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'extended', label: 'Extended (disabled, closable)' },
          { value: 'labelsOnly', label: 'Labels only' },
        ],
        defaultValue: 'default',
        group: 'layout',
      },
      {
        key: 'variant',
        label: 'Variant',
        type: 'dropdown',
        options: VARIANTS.map(v => ({ value: v, label: v })),
        defaultValue: 'primary',
        group: 'appearance',
      },
      {
        key: 'appearance',
        label: 'Appearance',
        type: 'dropdown',
        options: APPEARANCES.map(a => ({ value: a, label: a })),
        defaultValue: 'subtle',
        group: 'appearance',
      },
      {
        key: 'shape',
        label: 'Shape',
        type: 'dropdown',
        options: SHAPES.map(s => ({ value: s, label: s })),
        defaultValue: 'rounded',
        group: 'appearance',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        options: SIZES.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'layout',
      },
      {
        key: 'orientation',
        label: 'Orientation',
        type: 'dropdown',
        options: [
          { value: 'horizontal', label: 'horizontal' },
          { value: 'vertical', label: 'vertical' },
        ],
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

  selectedInteractiveTab = signal<string | number>('itab1');
  interactiveTabs = computed<Tab[]>(() => {
    const set = this.values()['tabSet'] as string;
    if (set === 'extended') return this.extendedTabs();
    if (set === 'labelsOnly') return LABELS_ONLY_TABS;
    return DEFAULT_TABS;
  });

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  onInteractiveTabChange(tab: Tab): void {
    this.selectedInteractiveTab.set(tab.id);
  }

  onTabClose(tab: Tab): void {
    this.extendedTabs.update(list => {
      const next = list.filter(t => t.id !== tab.id);
      if (this.selectedInteractiveTab() === tab.id && next.length > 0) {
        this.selectedInteractiveTab.set(next[0].id);
      }
      return next;
    });
  }
}
