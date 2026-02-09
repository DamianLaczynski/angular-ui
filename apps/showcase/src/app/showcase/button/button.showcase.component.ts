import { Component, signal, computed, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Appearance,
  ButtonComponent,
  IconName,
  Shape,
  Size,
  TableOfContentComponent,
  Variant,
} from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';

@Component({
  selector: 'app-button-showcase',
  imports: [ButtonComponent, CommonModule, TableOfContentComponent, InteractiveShowcaseComponent],
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
        <h1 class="showcase__title">Button Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Button component built with Fluent 2 Design System. Buttons
          support multiple variants (colors), appearances (styles), sizes, and shapes.
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
            <!-- Preview -->
            <div preview>
              <ui-button
                [variant]="currentVariant()"
                [appearance]="currentAppearance()"
                [size]="currentSize()"
                [shape]="currentShape()"
                [icon]="currentIcon()"
                [text]="currentText() || undefined"
                [disabled]="currentDisabled()"
                [loading]="currentLoading()"
                [selected]="selectedModel()"
                (selectedChange)="selectedModel.set($event)"
                [selectable]="currentSelectable()"
                [fullWidth]="currentFullWidth()"
                (click)="onButtonClick()"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Filled Appearance -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Filled Appearance (Default)</h2>

          <h3 class="showcase__subsection__title">All Variants</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" appearance="filled">Primary</ui-button>
              <ui-button variant="secondary" appearance="filled">Secondary</ui-button>
              <ui-button variant="success" appearance="filled">Success</ui-button>
              <ui-button variant="warning" appearance="filled">Warning</ui-button>
              <ui-button variant="danger" appearance="filled">Danger</ui-button>
              <ui-button variant="info" appearance="filled">Info</ui-button>
            </div>
          </div>

          <h3 class="showcase__subsection__title">With Icons</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" appearance="filled" icon="star">Primary</ui-button>
              <ui-button variant="success" appearance="filled" icon="checkmark">Success</ui-button>
              <ui-button variant="danger" appearance="filled" icon="delete">Danger</ui-button>
              <ui-button variant="info" appearance="filled" icon="info">Info</ui-button>
            </div>
          </div>
        </div>

        <!-- Tint Appearance -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Tint Appearance</h2>

          <h3 class="showcase__subsection__title">All Variants</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" appearance="tint">Primary</ui-button>
              <ui-button variant="secondary" appearance="tint">Secondary</ui-button>
              <ui-button variant="success" appearance="tint">Success</ui-button>
              <ui-button variant="warning" appearance="tint">Warning</ui-button>
              <ui-button variant="danger" appearance="tint">Danger</ui-button>
              <ui-button variant="info" appearance="tint">Info</ui-button>
            </div>
          </div>

          <h3 class="showcase__subsection__title">With Icons</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" appearance="tint" icon="star">Primary</ui-button>
              <ui-button variant="success" appearance="tint" icon="checkmark">Success</ui-button>
              <ui-button variant="danger" appearance="tint" icon="delete">Danger</ui-button>
              <ui-button variant="info" appearance="tint" icon="info">Info</ui-button>
            </div>
          </div>
        </div>

        <!-- Outline Appearance -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Outline Appearance</h2>

          <h3 class="showcase__subsection__title">All Variants</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" appearance="outline">Primary</ui-button>
              <ui-button variant="secondary" appearance="outline">Secondary</ui-button>
              <ui-button variant="success" appearance="outline">Success</ui-button>
              <ui-button variant="warning" appearance="outline">Warning</ui-button>
              <ui-button variant="danger" appearance="outline">Danger</ui-button>
              <ui-button variant="info" appearance="outline">Info</ui-button>
            </div>
          </div>

          <h3 class="showcase__subsection__title">With Icons</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" appearance="outline" icon="star">Primary</ui-button>
              <ui-button variant="success" appearance="outline" icon="checkmark">Success</ui-button>
              <ui-button variant="danger" appearance="outline" icon="delete">Danger</ui-button>
              <ui-button variant="info" appearance="outline" icon="info">Info</ui-button>
            </div>
          </div>
        </div>

        <!-- Subtle Appearance -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Subtle Appearance</h2>

          <h3 class="showcase__subsection__title">All Variants</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" appearance="subtle">Primary</ui-button>
              <ui-button variant="secondary" appearance="subtle">Secondary</ui-button>
              <ui-button variant="success" appearance="subtle">Success</ui-button>
              <ui-button variant="warning" appearance="subtle">Warning</ui-button>
              <ui-button variant="danger" appearance="subtle">Danger</ui-button>
              <ui-button variant="info" appearance="subtle">Info</ui-button>
            </div>
          </div>

          <h3 class="showcase__subsection__title">With Icons</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" appearance="subtle" icon="star">Primary</ui-button>
              <ui-button variant="success" appearance="subtle" icon="checkmark">Success</ui-button>
              <ui-button variant="danger" appearance="subtle" icon="delete">Danger</ui-button>
              <ui-button variant="info" appearance="subtle" icon="info">Info</ui-button>
            </div>
          </div>
        </div>

        <!-- Transparent Appearance -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Transparent Appearance</h2>

          <h3 class="showcase__subsection__title">All Variants</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" appearance="transparent">Primary</ui-button>
              <ui-button variant="secondary" appearance="transparent">Secondary</ui-button>
              <ui-button variant="success" appearance="transparent">Success</ui-button>
              <ui-button variant="warning" appearance="transparent">Warning</ui-button>
              <ui-button variant="danger" appearance="transparent">Danger</ui-button>
              <ui-button variant="info" appearance="transparent">Info</ui-button>
            </div>
          </div>
        </div>

        <!-- Sizes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Sizes</h2>

          <h3 class="showcase__subsection__title">Filled</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" size="small">Small</ui-button>
              <ui-button variant="primary" size="medium">Medium</ui-button>
              <ui-button variant="primary" size="large">Large</ui-button>
            </div>
          </div>

          <h3 class="showcase__subsection__title">With Icons</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" size="small" icon="star">Small</ui-button>
              <ui-button variant="primary" size="medium" icon="star">Medium</ui-button>
              <ui-button variant="primary" size="large" icon="star">Large</ui-button>
            </div>
          </div>

          <h3 class="showcase__subsection__title">Icon Only</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" size="small" icon="star"></ui-button>
              <ui-button variant="primary" size="medium" icon="star"></ui-button>
              <ui-button variant="primary" size="large" icon="star"></ui-button>
            </div>
          </div>
        </div>

        <!-- Shapes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Shapes</h2>

          <h3 class="showcase__subsection__title">Rounded (Default)</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" shape="rounded">Rounded</ui-button>
              <ui-button variant="primary" shape="rounded" icon="star"></ui-button>
            </div>
          </div>

          <h3 class="showcase__subsection__title">Circular</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" shape="circular">Circular</ui-button>
              <ui-button variant="primary" shape="circular" icon="star"></ui-button>
            </div>
          </div>
        </div>

        <!-- States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">States</h2>

          <h3 class="showcase__subsection__title">Primary Filled</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary">Normal</ui-button>
              <ui-button variant="primary" [selected]="true">Selected</ui-button>
              <ui-button variant="primary" [disabled]="true">Disabled</ui-button>
              <ui-button variant="primary" [loading]="true">Loading</ui-button>
            </div>
          </div>

          <h3 class="showcase__subsection__title">Secondary Outline</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="secondary" appearance="outline">Normal</ui-button>
              <ui-button variant="secondary" appearance="outline" [selected]="true"
                >Selected</ui-button
              >
              <ui-button variant="secondary" appearance="outline" [disabled]="true"
                >Disabled</ui-button
              >
              <ui-button variant="secondary" appearance="outline" [loading]="true"
                >Loading</ui-button
              >
            </div>
          </div>

          <h3 class="showcase__subsection__title">Danger Subtle</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="danger" appearance="subtle">Normal</ui-button>
              <ui-button variant="danger" appearance="subtle" [selected]="true">Selected</ui-button>
              <ui-button variant="danger" appearance="subtle" [disabled]="true">Disabled</ui-button>
              <ui-button variant="danger" appearance="subtle" [loading]="true">Loading</ui-button>
            </div>
          </div>
        </div>

        <!-- Selectable -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Selectable</h2>
          <p class="showcase__section__description">
            With <code>selectable</code> enabled, the button switches <code>selected</code> on each
            click. Use <code>[(selected)]</code> to bind the state.
          </p>

          <h3 class="showcase__subsection__title">Filled</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button
                variant="primary"
                [selectable]="true"
                [selected]="toggle1Selected()"
                (selectedChange)="toggle1Selected.set($event)"
              >
                Toggle ({{ toggle1Selected() ? 'on' : 'off' }})
              </ui-button>
              <ui-button
                variant="secondary"
                [selectable]="true"
                [selected]="toggle2Selected()"
                (selectedChange)="toggle2Selected.set($event)"
                icon="star"
              >
                With icon
              </ui-button>
            </div>
          </div>

          <h3 class="showcase__subsection__title">Outline</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button
                variant="primary"
                appearance="outline"
                [selectable]="true"
                [selected]="toggle3Selected()"
                (selectedChange)="toggle3Selected.set($event)"
              >
                Outline toggle
              </ui-button>
              <ui-button
                variant="secondary"
                appearance="outline"
                [selectable]="true"
                [selected]="toggle4Selected()"
                (selectedChange)="toggle4Selected.set($event)"
                icon="checkmark"
              ></ui-button>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Loading State</h2>
          <p class="showcase__section__description">
            Buttons can display a loading spinner while processing an action. The button is
            automatically disabled during loading and the icon is replaced with a spinner.
          </p>

          <h3 class="showcase__subsection__title">All Variants</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" [loading]="true">Loading</ui-button>
              <ui-button variant="secondary" [loading]="true">Loading</ui-button>
              <ui-button variant="success" [loading]="true">Loading</ui-button>
              <ui-button variant="warning" [loading]="true">Loading</ui-button>
              <ui-button variant="danger" [loading]="true">Loading</ui-button>
              <ui-button variant="info" [loading]="true">Loading</ui-button>
            </div>
          </div>

          <h3 class="showcase__subsection__title">With Icons</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" icon="star" [loading]="true">Save</ui-button>
              <ui-button variant="success" icon="checkmark" [loading]="true">Submit</ui-button>
              <ui-button variant="danger" icon="delete" [loading]="true">Delete</ui-button>
              <ui-button variant="info" icon="info" [loading]="true">Process</ui-button>
            </div>
          </div>

          <h3 class="showcase__subsection__title">Different Sizes</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" size="small" [loading]="true">Small</ui-button>
              <ui-button variant="primary" size="medium" [loading]="true">Medium</ui-button>
              <ui-button variant="primary" size="large" [loading]="true">Large</ui-button>
            </div>
          </div>

          <h3 class="showcase__subsection__title">Icon Only</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" size="small" icon="star" [loading]="true"></ui-button>
              <ui-button variant="primary" size="medium" icon="star" [loading]="true"></ui-button>
              <ui-button variant="primary" size="large" icon="star" [loading]="true"></ui-button>
            </div>
          </div>

          <h3 class="showcase__subsection__title">Different Appearances</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-button variant="primary" appearance="filled" [loading]="true">Filled</ui-button>
              <ui-button variant="primary" appearance="outline" [loading]="true">Outline</ui-button>
              <ui-button variant="primary" appearance="subtle" [loading]="true">Subtle</ui-button>
              <ui-button variant="primary" appearance="tint" [loading]="true">Tint</ui-button>
              <ui-button variant="primary" appearance="transparent" [loading]="true"
                >Transparent</ui-button
              >
            </div>
          </div>
        </div>

        <!-- Full Width -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Full Width</h2>
          <div class="showcase__preview">
            <ui-button variant="primary" [fullWidth]="true" icon="star">
              Full Width Button
            </ui-button>
          </div>
          <div class="showcase__preview" style="margin-top: 8px;">
            <ui-button variant="secondary" appearance="outline" [fullWidth]="true">
              Full Width Outline
            </ui-button>
          </div>
        </div>

        <!-- Appearance Comparison by Variant -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Appearance Comparison by Variant</h2>

          @for (variant of variants; track variant) {
            <h3 class="showcase__subsection__title">{{ variant | titlecase }}</h3>
            <div class="showcase__preview">
              <div class="showcase__grid">
                <ui-button [variant]="variant" appearance="filled">Filled</ui-button>
                <ui-button [variant]="variant" appearance="tint">Tint</ui-button>
                <ui-button [variant]="variant" appearance="outline">Outline</ui-button>
                <ui-button [variant]="variant" appearance="subtle">Subtle</ui-button>
                <ui-button [variant]="variant" appearance="transparent">Transparent</ui-button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ButtonShowcaseComponent {
  variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
  appearances: Appearance[] = ['filled', 'tint', 'outline', 'subtle', 'transparent'];
  sizes: Size[] = ['small', 'medium', 'large'];
  shapes: Shape[] = ['rounded', 'circular', 'square'];

  // Reference to showcase for event logging
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-button',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'layout', label: 'Layout', icon: 'resize' as any },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      {
        key: 'text',
        label: 'Text',
        type: 'text',
        description: 'Button label text',
        defaultValue: 'Button',
        placeholder: 'Enter button text',
        group: 'content',
      },
      {
        key: 'icon',
        label: 'Icon',
        type: 'dropdown',
        description: 'Icon name',
        options: [
          { value: '', label: 'None' },
          { value: 'star', label: 'star' },
          { value: 'checkmark', label: 'checkmark' },
          { value: 'delete', label: 'delete' },
          { value: 'info', label: 'info' },
          { value: 'settings', label: 'settings' },
          { value: 'home', label: 'home' },
        ],
        defaultValue: '',
        group: 'content',
      },
      {
        key: 'variant',
        label: 'Variant',
        type: 'dropdown',
        description: 'Color variant',
        options: this.variants.map(v => ({ value: v, label: v })),
        defaultValue: 'primary',
        group: 'appearance',
      },
      {
        key: 'appearance',
        label: 'Appearance',
        type: 'dropdown',
        description: 'Visual style',
        options: this.appearances.map(a => ({ value: a, label: a })),
        defaultValue: 'filled',
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
        key: 'shape',
        label: 'Shape',
        type: 'dropdown',
        options: this.shapes.map(s => ({ value: s, label: s })),
        defaultValue: 'rounded',
        group: 'layout',
      },
      {
        key: 'fullWidth',
        label: 'Full Width',
        type: 'switch',
        description: 'Full width button',
        defaultValue: false,
        group: 'layout',
      },
      {
        key: 'disabled',
        label: 'Disabled',
        type: 'switch',
        description: 'Disable button',
        defaultValue: false,
        group: 'state',
      },
      {
        key: 'selectable',
        label: 'Selectable',
        type: 'switch',
        description: 'Click toggles selected state',
        defaultValue: false,
        group: 'state',
      },
      {
        key: 'selected',
        label: 'Selected',
        type: 'switch',
        description: 'Selected state',
        defaultValue: false,
        group: 'state',
      },
      {
        key: 'loading',
        label: 'Loading',
        type: 'switch',
        description: 'Loading state with spinner',
        defaultValue: false,
        group: 'state',
      },
    ],
  };

  toggle1Selected = signal(false);
  toggle2Selected = signal(false);
  toggle3Selected = signal(false);
  toggle4Selected = signal(false);

  private values = signal<Record<string, any>>({
    text: 'Button',
    variant: 'primary',
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded',
    icon: '',
    disabled: false,
    selectable: false,
    selected: false,
    loading: false,
    fullWidth: false,
  });

  selectedModel = signal(false);

  // Computed values for the button
  currentText = computed(() => this.values()['text'] as string);
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentIcon = computed(() => {
    const icon = this.values()['icon'];
    return icon ? (icon as IconName) : undefined;
  });
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentSelectable = computed(() => this.values()['selectable'] as boolean);
  currentLoading = computed(() => this.values()['loading'] as boolean);
  currentFullWidth = computed(() => this.values()['fullWidth'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
    if ('selected' in newValues) {
      this.selectedModel.set(newValues['selected'] as boolean);
    }
  }

  onReset(): void {
    // Values are reset by the showcase component
  }

  onButtonClick(): void {
    this.showcase()?.logEvent('click', { text: this.currentText() });
  }
}
