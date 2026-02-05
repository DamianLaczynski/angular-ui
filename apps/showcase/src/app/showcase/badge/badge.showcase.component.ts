import { Component, signal, computed, viewChild } from '@angular/core';
import { BadgeComponent } from 'angular-ui';
import { CommonModule } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { Variant, Appearance, Size, Shape, ContentPosition } from 'angular-ui';
import { IconName } from 'angular-ui';

@Component({
  selector: 'app-badge-showcase',
  imports: [BadgeComponent, CommonModule, TableOfContentComponent, InteractiveShowcaseComponent],
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
        <h1 class="showcase__title">Badge Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Badge component built with Fluent 2 Design System. Badges
          support multiple variants, sizes, appearances, and optional icons.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            (valuesChange)="onValuesChange($event)"
            (reset)="onReset()"
          >
            <!-- Preview -->
            <div preview>
              <ui-badge
                [text]="currentText()"
                [variant]="currentVariant()"
                [appearance]="currentAppearance()"
                [size]="currentSize()"
                [shape]="currentShape()"
                [icon]="currentIcon()"
                [iconPosition]="currentIconPosition()"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Filled Appearance -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Filled Appearance (Default)</h2>

          <h3 class="showcase__subsection__title">All Sizes</h3>
          <div class="showcase__grid">
            <ui-badge text="Small" size="small" appearance="filled" />
            <ui-badge text="Medium" size="medium" appearance="filled" />
            <ui-badge text="Large" size="large" appearance="filled" />
          </div>

          <h3 class="showcase__subsection__title">All Variants</h3>
          <div class="showcase__grid">
            <ui-badge text="Primary" variant="primary" appearance="filled" />
            <ui-badge text="Secondary" variant="secondary" appearance="filled" />
            <ui-badge text="Success" variant="success" appearance="filled" />
            <ui-badge text="Warning" variant="warning" appearance="filled" />
            <ui-badge text="Danger" variant="danger" appearance="filled" />
            <ui-badge text="Info" variant="info" appearance="filled" />
          </div>

          <h3 class="showcase__subsection__title">With Icons</h3>
          <div class="showcase__grid">
            <ui-badge
              text="Primary"
              variant="primary"
              icon="star"
              size="large"
              appearance="filled"
            />
            <ui-badge
              text="Success"
              variant="success"
              icon="checkmark"
              size="large"
              appearance="filled"
            />
            <ui-badge
              text="Danger"
              variant="danger"
              icon="warning"
              size="large"
              appearance="filled"
            />
            <ui-badge text="Info" variant="info" icon="info" size="large" appearance="filled" />
          </div>
        </div>

        <!-- Tint Appearance -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Tint Appearance</h2>

          <h3 class="showcase__subsection__title">All Sizes</h3>
          <div class="showcase__grid">
            <ui-badge text="Small" size="small" variant="primary" appearance="tint" />
            <ui-badge text="Medium" size="medium" variant="primary" appearance="tint" />
            <ui-badge text="Large" size="large" variant="primary" appearance="tint" />
          </div>

          <h3 class="showcase__subsection__title">All Variants</h3>
          <div class="showcase__grid">
            <ui-badge text="Primary" variant="primary" appearance="tint" />
            <ui-badge text="Secondary" variant="secondary" appearance="tint" />
            <ui-badge text="Success" variant="success" appearance="tint" />
            <ui-badge text="Warning" variant="warning" appearance="tint" />
            <ui-badge text="Danger" variant="danger" appearance="tint" />
            <ui-badge text="Info" variant="info" appearance="tint" />
          </div>

          <h3 class="showcase__subsection__title">With Icons</h3>
          <div class="showcase__grid">
            <ui-badge
              text="Primary"
              variant="primary"
              icon="star"
              size="large"
              appearance="tint"
            />
            <ui-badge
              text="Success"
              variant="success"
              icon="checkmark"
              size="large"
              appearance="tint"
            />
            <ui-badge
              text="Danger"
              variant="danger"
              icon="warning"
              size="large"
              appearance="tint"
            />
            <ui-badge
              text="Warning"
              variant="warning"
              icon="warning"
              size="large"
              appearance="tint"
            />
          </div>
        </div>

        <!-- Outline Appearance -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Outline Appearance</h2>

          <h3 class="showcase__subsection__title">All Sizes</h3>
          <div class="showcase__grid">
            <ui-badge text="Small" size="small" variant="primary" appearance="outline" />
            <ui-badge text="Medium" size="medium" variant="primary" appearance="outline" />
            <ui-badge text="Large" size="large" variant="primary" appearance="outline" />
          </div>

          <h3 class="showcase__subsection__title">All Variants</h3>
          <div class="showcase__grid">
            <ui-badge text="Primary" variant="primary" appearance="outline" />
            <ui-badge text="Secondary" variant="secondary" appearance="outline" />
            <ui-badge text="Success" variant="success" appearance="outline" />
            <ui-badge text="Warning" variant="warning" appearance="outline" />
            <ui-badge text="Danger" variant="danger" appearance="outline" />
            <ui-badge text="Info" variant="info" appearance="outline" />
          </div>

          <h3 class="showcase__subsection__title">With Icons</h3>
          <div class="showcase__grid">
            <ui-badge
              text="Primary"
              variant="primary"
              icon="star"
              size="medium"
              appearance="outline"
            />
            <ui-badge
              text="Success"
              variant="success"
              icon="checkmark"
              size="medium"
              appearance="outline"
            />
            <ui-badge
              text="Danger"
              variant="danger"
              icon="warning"
              size="medium"
              appearance="outline"
            />
            <ui-badge text="Info" variant="info" icon="info" size="medium" appearance="outline" />
          </div>
        </div>

        <!-- Subtle Appearance -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Subtle Appearance</h2>

          <h3 class="showcase__subsection__title">All Sizes</h3>
          <div class="showcase__grid">
            <ui-badge text="Small" size="small" variant="primary" appearance="subtle" />
            <ui-badge text="Medium" size="medium" variant="primary" appearance="subtle" />
            <ui-badge text="Large" size="large" variant="primary" appearance="subtle" />
          </div>

          <h3 class="showcase__subsection__title">All Variants</h3>
          <div class="showcase__grid">
            <ui-badge text="Primary" variant="primary" appearance="subtle" />
            <ui-badge text="Secondary" variant="secondary" appearance="subtle" />
            <ui-badge text="Success" variant="success" appearance="subtle" />
            <ui-badge text="Warning" variant="warning" appearance="subtle" />
            <ui-badge text="Danger" variant="danger" appearance="subtle" />
            <ui-badge text="Info" variant="info" appearance="subtle" />
          </div>

          <h3 class="showcase__subsection__title">With Icons</h3>
          <div class="showcase__grid">
            <ui-badge
              text="Primary"
              variant="primary"
              icon="star"
              size="large"
              appearance="subtle"
            />
            <ui-badge
              text="Success"
              variant="success"
              icon="checkmark"
              size="large"
              appearance="subtle"
            />
            <ui-badge
              text="Danger"
              variant="danger"
              icon="warning"
              size="large"
              appearance="subtle"
            />
            <ui-badge
              text="Warning"
              variant="warning"
              icon="warning"
              size="large"
              appearance="subtle"
            />
          </div>
        </div>

        <!-- Real-world Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Real-world Examples</h2>

          <h3 class="showcase__subsection__title">Status Indicators</h3>
          <div class="showcase__grid">
            <ui-badge text="Active" variant="success" appearance="filled" icon="checkmark" />
            <ui-badge text="Pending" variant="warning" appearance="tint" icon="clock" />
            <ui-badge text="Error" variant="danger" appearance="filled" icon="warning" />
            <ui-badge text="Disabled" variant="secondary" appearance="tint" />
          </div>

          <h3 class="showcase__subsection__title">Notification Counts</h3>
          <div class="showcase__grid">
            <ui-badge text="1" variant="primary" size="small" appearance="filled" />
            <ui-badge text="5" variant="primary" size="medium" appearance="filled" />
            <ui-badge text="10" variant="danger" size="small" appearance="filled" />
            <ui-badge text="99+" variant="danger" size="medium" appearance="filled" />
          </div>

          <h3 class="showcase__subsection__title">Feature Tags</h3>
          <div class="showcase__grid">
            <ui-badge text="New" variant="primary" appearance="tint" icon="star" />
            <ui-badge text="Beta" variant="info" appearance="outline" />
            <ui-badge text="Pro" variant="secondary" appearance="filled" />
            <ui-badge text="Premium" variant="warning" appearance="tint" />
          </div>

          <h3 class="showcase__subsection__title">Priority Levels</h3>
          <div class="showcase__grid">
            <ui-badge text="Critical" variant="danger" appearance="filled" size="large" />
            <ui-badge text="High" variant="warning" appearance="filled" size="large" />
            <ui-badge text="Medium" variant="info" appearance="tint" size="large" />
            <ui-badge text="Low" variant="secondary" appearance="outline" size="large" />
          </div>
        </div>

        <!-- Size Comparison -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Comparison</h2>

          <h3 class="showcase__subsection__title">Side by Side</h3>
          <div class="showcase__grid" style="align-items: center;">
            <ui-badge text="16px" size="small" variant="primary" />
            <ui-badge text="20px" size="medium" variant="primary" />
            <ui-badge text="24px" size="large" variant="primary" />
          </div>

          <h3 class="showcase__subsection__title">With Icons - Size Comparison</h3>
          <div class="showcase__grid" style="align-items: center;">
            <ui-badge text="16px" size="small" variant="success" icon="checkmark" />
            <ui-badge text="20px" size="medium" variant="success" icon="checkmark" />
            <ui-badge text="24px" size="large" variant="success" icon="checkmark" />
          </div>
        </div>

        <!-- Shape Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Shape Variants</h2>

          <h3 class="showcase__subsection__title">Rounded (Default)</h3>
          <div class="showcase__grid">
            <ui-badge text="Primary" variant="primary" shape="rounded" />
            <ui-badge text="Success" variant="success" shape="rounded" />
            <ui-badge text="Danger" variant="danger" shape="rounded" />
          </div>

          <h3 class="showcase__subsection__title">Circular (Pill)</h3>
          <div class="showcase__grid">
            <ui-badge text="Primary" variant="primary" shape="circular" />
            <ui-badge text="Success" variant="success" shape="circular" />
            <ui-badge text="Danger" variant="danger" shape="circular" />
          </div>

          <h3 class="showcase__subsection__title">Circular with Icons</h3>
          <div class="showcase__grid">
            <ui-badge text="New" variant="primary" shape="circular" icon="star" size="large" />
            <ui-badge
              text="Done"
              variant="success"
              shape="circular"
              icon="checkmark"
              size="large"
            />
            <ui-badge text="Alert" variant="danger" shape="circular" icon="warning" size="large" />
          </div>
        </div>

        <!-- Icon Position -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Icon Position</h2>

          <h3 class="showcase__subsection__title">Before (Default)</h3>
          <div class="showcase__grid">
            <ui-badge
              text="Star"
              variant="primary"
              icon="star"
              iconPosition="before"
              size="large"
            />
            <ui-badge
              text="Check"
              variant="success"
              icon="checkmark"
              iconPosition="before"
              size="large"
            />
            <ui-badge
              text="Warning"
              variant="danger"
              icon="warning"
              iconPosition="before"
              size="large"
            />
          </div>

          <h3 class="showcase__subsection__title">After</h3>
          <div class="showcase__grid">
            <ui-badge
              text="Star"
              variant="primary"
              icon="star"
              iconPosition="after"
              size="large"
            />
            <ui-badge
              text="Check"
              variant="success"
              icon="checkmark"
              iconPosition="after"
              size="large"
            />
            <ui-badge
              text="Warning"
              variant="danger"
              icon="warning"
              iconPosition="after"
              size="large"
            />
          </div>
        </div>

        <!-- Appearance Comparison by Variant -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Appearance Comparison by Variant</h2>

          @for (variant of variants; track variant) {
            <h3 class="showcase__subsection__title">{{ variant | titlecase }}</h3>
            <div class="showcase__grid">
              <ui-badge [text]="'Filled'" [variant]="variant" appearance="filled" />
              <ui-badge [text]="'Tint'" [variant]="variant" appearance="tint" />
              <ui-badge [text]="'Outline'" [variant]="variant" appearance="outline" />
              <ui-badge [text]="'Subtle'" [variant]="variant" appearance="subtle" />
              <ui-badge [text]="'Transparent'" [variant]="variant" appearance="transparent" />
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class BadgeShowcaseComponent {
  variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
  appearances: Appearance[] = ['filled', 'tint', 'outline', 'subtle', 'transparent'];
  sizes: Size[] = ['small', 'medium', 'large'];
  shapes: Shape[] = ['rounded', 'circular', 'square'];
  iconPositions: ContentPosition[] = ['before', 'after'];

  // Reference to showcase for event logging
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-badge',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'layout', label: 'Layout', icon: 'resize' as any },
    ],
    controls: [
      {
        key: 'text',
        label: 'Text',
        type: 'text',
        description: 'Badge text',
        defaultValue: 'Badge',
        placeholder: 'Enter badge text',
        group: 'content',
      },
      {
        key: 'icon',
        label: 'Icon',
        type: 'dropdown',
        description: 'Badge icon',
        options: [
          { value: '', label: 'None' },
          { value: 'star', label: 'star' },
          { value: 'checkmark', label: 'checkmark' },
          { value: 'warning', label: 'warning' },
          { value: 'info', label: 'info' },
          { value: 'clock', label: 'clock' },
        ],
        defaultValue: '',
        group: 'content',
      },
      {
        key: 'iconPosition',
        label: 'Icon Position',
        type: 'dropdown',
        description: 'Position of icon',
        options: this.iconPositions.map(p => ({ value: p, label: p })),
        defaultValue: 'before',
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
        description: 'Badge size',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'layout',
      },
      {
        key: 'shape',
        label: 'Shape',
        type: 'dropdown',
        description: 'Badge shape',
        options: this.shapes.map(s => ({ value: s, label: s })),
        defaultValue: 'rounded',
        group: 'layout',
      },
    ],
  };

  // Current values from showcase
  private values = signal<Record<string, any>>({
    text: 'Badge',
    icon: '',
    iconPosition: 'before',
    variant: 'primary',
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded',
  });

  // Computed values for the badge
  currentText = computed(() => this.values()['text'] as string);
  currentIcon = computed(() => {
    const icon = this.values()['icon'] as string;
    return icon ? (icon as IconName) : undefined;
  });
  currentIconPosition = computed(() => this.values()['iconPosition'] as ContentPosition);
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    // Values are reset by the showcase component
  }
}

