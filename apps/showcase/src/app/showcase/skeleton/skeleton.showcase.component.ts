import { Component, signal, viewChild, computed } from '@angular/core';
import { SkeletonComponent } from 'angular-ui';
import { CommonModule } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { Shape } from 'angular-ui';

@Component({
  selector: 'app-skeleton-showcase',
  imports: [SkeletonComponent, CommonModule, TableOfContentComponent, InteractiveShowcaseComponent],
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
        <h1 class="showcase__title">Skeleton Component</h1>
        <p class="showcase__description">
          Skeleton component for loading states. Unified API: shape (rounded/circular).
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            [showEventLog]="false"
            (valuesChange)="onValuesChange($event)"
            (reset)="onReset()"
          >
            <div preview>
              <ui-skeleton
                [shape]="currentShape()"
                [animated]="currentAnimated()"
                [width]="currentWidth()"
                [height]="currentHeight()"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Shapes -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Shapes</h2>
          <div class="showcase__grid">
            @for (s of shapes; track s) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ s | titlecase }}</h3>
                <ui-skeleton [shape]="s" width="120px" height="120px" [animated]="true" />
              </div>
            }
          </div>
        </section>

        <!-- Animation -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Animation</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Animated</h3>
              <ui-skeleton shape="rounded" width="200px" height="100px" [animated]="true" />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Static</h3>
              <ui-skeleton shape="rounded" width="200px" height="100px" [animated]="false" />
            </div>
          </div>
        </section>

        <!-- Sizes -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Sizes</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Small (24px)</h3>
              <ui-skeleton shape="circular" width="24px" height="24px" />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Medium (48px)</h3>
              <ui-skeleton shape="circular" width="48px" height="48px" />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Large (96px)</h3>
              <ui-skeleton shape="circular" width="96px" height="96px" />
            </div>
          </div>
        </section>

        <!-- Text Lines -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Text Lines</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Single Line</h3>
              <ui-skeleton shape="rounded" width="100%" height="16px" />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Multiple Lines</h3>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <ui-skeleton shape="rounded" width="100%" height="16px" />
                <ui-skeleton shape="rounded" width="90%" height="16px" />
                <ui-skeleton shape="rounded" width="75%" height="16px" />
              </div>
            </div>
          </div>
        </section>

        <!-- Card Layout -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Card Layout Example</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <div
                style="display: flex; flex-direction: column; gap: 12px; padding: 16px; border: 1px solid var(--color-neutral-stroke-rest); border-radius: 8px;"
              >
                <ui-skeleton shape="rounded" width="100%" height="200px" borderRadius="4px" />
                <ui-skeleton shape="rounded" width="70%" height="24px" />
                <ui-skeleton shape="rounded" width="100%" height="16px" />
                <ui-skeleton shape="rounded" width="90%" height="16px" />
              </div>
            </div>
            <div class="showcase__item">
              <div
                style="display: flex; gap: 12px; padding: 16px; border: 1px solid var(--color-neutral-stroke-rest); border-radius: 8px;"
              >
                <ui-skeleton shape="circular" width="64px" height="64px" />
                <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
                  <ui-skeleton shape="rounded" width="60%" height="20px" />
                  <ui-skeleton shape="rounded" width="100%" height="14px" />
                  <ui-skeleton shape="rounded" width="80%" height="14px" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- List Layout -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">List Layout Example</h2>
          <div class="showcase__item">
            <div style="display: flex; flex-direction: column; gap: 12px;">
              @for (item of [1, 2, 3]; track item) {
                <div
                  style="display: flex; gap: 12px; align-items: center; padding: 12px; border: 1px solid var(--color-neutral-stroke-rest); border-radius: 4px;"
                >
                  <ui-skeleton shape="circular" width="40px" height="40px" />
                  <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                    <ui-skeleton shape="rounded" width="40%" height="16px" />
                    <ui-skeleton shape="rounded" width="80%" height="12px" />
                  </div>
                </div>
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class SkeletonShowcaseComponent {
  shapes: Shape[] = ['rounded', 'circular', 'square'];
  widths = ['50px', '100px', '150px', '200px', '100%'];
  heights = ['20px', '40px', '80px', '120px', '200px'];

  // Values from showcase
  private values = signal<Record<string, any>>({});

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-skeleton',
    controls: [
      {
        key: 'shape',
        label: 'Shape',
        type: 'dropdown',
        options: this.shapes.map(s => ({ value: s, label: s })),
        defaultValue: 'rounded',
      },
      {
        key: 'animated',
        label: 'Animated',
        type: 'switch',
        defaultValue: true,
      },
      {
        key: 'width',
        label: 'Width',
        type: 'dropdown',
        options: this.widths.map(w => ({ value: w, label: w })),
        defaultValue: '150px',
      },
      {
        key: 'height',
        label: 'Height',
        type: 'dropdown',
        options: this.heights.map(h => ({ value: h, label: h })),
        defaultValue: '80px',
      },
    ],
  };

  // Computed values
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentAnimated = computed(() => this.values()['animated'] as boolean);
  currentWidth = computed(() => this.values()['width'] as string);
  currentHeight = computed(() => this.values()['height'] as string);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    // Reset is handled by showcase component
  }
}

