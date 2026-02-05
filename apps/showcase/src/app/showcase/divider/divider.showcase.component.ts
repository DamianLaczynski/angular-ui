import { Component, signal, computed } from '@angular/core';
import { DividerComponent } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { Orientation, Alignment } from 'angular-ui';

@Component({
  selector: 'app-divider-showcase',

  imports: [DividerComponent, TableOfContentComponent, InteractiveShowcaseComponent],
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
        <h1 class="showcase__title">Divider Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Divider component built with Fluent 2 Design System. All
          variants are responsive and accessible.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            [config]="showcaseConfig"
            [showEventLog]="false"
            (valuesChange)="onValuesChange($event)"
            (reset)="onReset()"
          >
            <div
              preview
              [style.height]="currentOrientation() === 'vertical' ? '150px' : 'auto'"
              [style.width]="'100%'"
            >
              <ui-divider
                [orientation]="currentOrientation()"
                [alignment]="currentAlignment()"
                [text]="currentText()"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-divider />
            </div>
            <div class="showcase__item">
              <ui-divider [text]="'OR'" />
            </div>
          </div>
        </div>

        <!-- Horizontal Dividers -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Horizontal Dividers</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Center (Default)</h3>
              <div style="width: 100%; padding: 20px 0;">
                <ui-divider [text]="'Text'" [orientation]="'horizontal'" [alignment]="'center'" />
              </div>
            </div>
            <div class="showcase__item">
              <h3>Start</h3>
              <div style="width: 100%; padding: 20px 0;">
                <ui-divider [text]="'Text'" [orientation]="'horizontal'" [alignment]="'start'" />
              </div>
            </div>
            <div class="showcase__item">
              <h3>End</h3>
              <div style="width: 100%; padding: 20px 0;">
                <ui-divider [text]="'Text'" [orientation]="'horizontal'" [alignment]="'end'" />
              </div>
            </div>
            <div class="showcase__item">
              <h3>Without Text</h3>
              <div style="width: 100%; padding: 20px 0;">
                <ui-divider [orientation]="'horizontal'" />
              </div>
            </div>
          </div>
        </div>

        <!-- Vertical Dividers -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Vertical Dividers</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <div style="display: flex; gap: 20px; align-items: center;">
                <div>
                  <h3>Center</h3>
                  <ui-divider [text]="'Text'" [orientation]="'vertical'" [alignment]="'center'" />
                </div>
                <div>
                  <h3>Start</h3>
                  <ui-divider [text]="'Text'" [orientation]="'vertical'" [alignment]="'start'" />
                </div>
                <div>
                  <h3>End</h3>
                  <ui-divider [text]="'Text'" [orientation]="'vertical'" [alignment]="'end'" />
                </div>
                <div>
                  <h3>Without Text</h3>
                  <ui-divider [orientation]="'vertical'" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Usage Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Usage Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Separating Content</h3>
              <div style="padding: 20px;">
                <p>Content above the divider</p>
                <ui-divider [text]="'Section Separator'" />
                <p>Content below the divider</p>
              </div>
            </div>
            <div class="showcase__item">
              <h3>In a List</h3>
              <div style="padding: 20px;">
                <div>Item 1</div>
                <ui-divider />
                <div>Item 2</div>
                <ui-divider />
                <div>Item 3</div>
              </div>
            </div>
            <div class="showcase__item">
              <h3>With Custom Text</h3>
              <div style="padding: 20px;">
                <ui-divider [text]="'OR'" [alignment]="'center'" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DividerShowcaseComponent {
  orientations: Orientation[] = ['horizontal', 'vertical'];
  alignments: Alignment[] = ['start', 'center', 'end'];

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-divider',
    controlGroups: [
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'content', label: 'Content', icon: 'text_font' as any },
    ],
    controls: [
      {
        key: 'orientation',
        label: 'Orientation',
        type: 'dropdown',
        options: this.orientations.map(o => ({ value: o, label: o })),
        defaultValue: 'horizontal',
        group: 'appearance',
      },
      {
        key: 'alignment',
        label: 'Alignment',
        type: 'dropdown',
        options: this.alignments.map(a => ({ value: a, label: a })),
        defaultValue: 'center',
        group: 'appearance',
      },
      {
        key: 'text',
        label: 'Text',
        type: 'text',
        defaultValue: 'OR',
        placeholder: 'Enter divider text',
        group: 'content',
      },
    ],
  };

  private values = signal<Record<string, any>>({
    orientation: 'horizontal',
    alignment: 'center',
    text: 'OR',
  });

  currentOrientation = computed(() => this.values()['orientation'] as Orientation);
  currentAlignment = computed(() => this.values()['alignment'] as Alignment);
  currentText = computed(() => this.values()['text'] as string);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    // Reset is handled by showcase component
  }
}

