import { Component, signal, computed, viewChild } from '@angular/core';

import { SpinnerComponent } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { Variant, ExtendedSize, ContentPosition } from 'angular-ui';

@Component({
  selector: 'app-spinner-showcase',
  imports: [SpinnerComponent, TableOfContentComponent, InteractiveShowcaseComponent],
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
        <h1 class="showcase__title">Spinner Component</h1>
        <p class="showcase__description">
          Spinner component based on Fluent 2 Design System. Unified API: variant + size +
          labelPosition.
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
              <ui-spinner
                [variant]="currentVariant()"
                [size]="currentSize()"
                [labelPosition]="currentLabelPosition()"
                [label]="currentLabel()"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Size Variants -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Sizes (ExtendedSize)</h2>
          <div class="showcase__grid">
            @for (s of sizes; track s) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ s }}</h3>
                <ui-spinner [size]="s" variant="primary" />
              </div>
            }
          </div>
        </section>

        <!-- Variant Colors -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Variants (Semantic Colors)</h2>
          <div class="showcase__grid">
            @for (v of variants; track v) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ v }}</h3>
                <ui-spinner size="large" [variant]="v" />
              </div>
            }
          </div>
        </section>

        <!-- Label Positions -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Label Positions</h2>
          <div class="showcase__grid showcase__grid--large">
            @for (p of positions; track p) {
              @if (p !== 'none') {
                <div class="showcase__item">
                  <h3 class="showcase__item__title">{{ p }}</h3>
                  <ui-spinner
                    size="medium"
                    variant="primary"
                    [labelPosition]="p"
                    label="Loading..."
                  />
                </div>
              }
            }
          </div>
        </section>

        <!-- Usage Examples -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Usage Examples</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Inline</h3>
              <div style="display: flex; align-items: center; gap: 8px;">
                <ui-spinner size="small" variant="primary" />
                <span>Loading data...</span>
              </div>
            </div>

            <div class="showcase__item">
              <h3 class="showcase__item__title">Success State</h3>
              <div
                style="display: flex; align-items: center; gap: 8px; padding: 12px; background: var(--color-shared-green-background); border-radius: 4px;"
              >
                <ui-spinner size="small" variant="success" />
                <span style="color: var(--color-shared-green-foreground);">Saving...</span>
              </div>
            </div>

            <div class="showcase__item">
              <h3 class="showcase__item__title">Danger State</h3>
              <div
                style="display: flex; align-items: center; gap: 8px; padding: 12px; background: var(--color-shared-red-background); border-radius: 4px;"
              >
                <ui-spinner size="small" variant="danger" />
                <span style="color: var(--color-shared-red-foreground);">Retrying...</span>
              </div>
            </div>

            <div class="showcase__item">
              <h3 class="showcase__item__title">Centered</h3>
              <div
                style="display: flex; flex-direction: column; align-items: center; padding: 32px; background: var(--color-neutral-background2-rest); border-radius: 8px;"
              >
                <ui-spinner
                  size="large"
                  variant="primary"
                  labelPosition="below"
                  label="Loading content..."
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class SpinnerShowcaseComponent {
  variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
  sizes: ExtendedSize[] = ['extra-small', 'small', 'medium', 'large', 'extra-large'];
  positions: ContentPosition[] = ['before', 'after', 'above', 'below', 'none'];

  // Reference to showcase
  private showcaseRef = viewChild<InteractiveShowcaseComponent>('showcase');

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-spinner',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
    ],
    controls: [
      {
        key: 'label',
        label: 'Label',
        type: 'text',
        description: 'Spinner label',
        defaultValue: 'Loading...',
        placeholder: 'Enter label',
        group: 'content',
      },
      {
        key: 'labelPosition',
        label: 'Label Position',
        type: 'dropdown',
        description: 'Position of label',
        options: this.positions.map(p => ({ value: p, label: p })),
        defaultValue: 'below',
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
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        description: 'Spinner size',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'appearance',
      },
    ],
  };

  // Current values from showcase
  private values = signal<Record<string, any>>({
    label: 'Loading...',
    labelPosition: 'below',
    variant: 'primary',
    size: 'medium',
  });

  // Computed values
  currentLabel = computed(() => this.values()['label'] as string);
  currentLabelPosition = computed(() => this.values()['labelPosition'] as ContentPosition);
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentSize = computed(() => this.values()['size'] as ExtendedSize);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    // Values are reset by the showcase component
  }
}

