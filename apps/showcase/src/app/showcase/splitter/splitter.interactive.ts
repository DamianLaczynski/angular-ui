import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SplitterComponent,
  SplitterPanelDirective,
  SplitterPanel,
  SplitterResizeEvent,
} from 'angular-ui';
import { CardComponent } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { SPLITTER_SHOWCASE_CONFIG } from './splitter.showcase.config';
import type { Orientation } from 'angular-ui';

@Component({
  selector: 'app-splitter-interactive',
  imports: [
    CommonModule,
    SplitterComponent,
    SplitterPanelDirective,
    CardComponent,
    InteractiveShowcaseComponent,
  ],
  template: `
    <app-interactive-showcase
      [config]="showcaseConfig"
      [showEventLog]="false"
      (valuesChange)="onValuesChange($event)"
      (reset)="onReset()"
    >
      <div preview [style.height]="'400px'">
        <ui-splitter
          [orientation]="currentOrientation()"
          [gutterSize]="currentGutterSize()"
          [panels]="interactivePanels()"
          (panelResize)="onInteractivePanelResize($event)"
        >
          <ng-template uiSplitterPanel="panel-1">
            <div class="panel-content">
              <ui-card>
                <div class="card-content">
                  <h3>Panel 1</h3>
                  <p>Resizable panel with interactive controls.</p>
                  <p>Current size: {{ interactivePanelSizes()[0] | number: '1.0-1' }}%</p>
                </div>
              </ui-card>
            </div>
          </ng-template>

          <ng-template uiSplitterPanel="panel-2">
            <div class="panel-content">
              <ui-card>
                <div class="card-content">
                  <h3>Panel 2</h3>
                  <p>Middle panel.</p>
                  <p>Current size: {{ interactivePanelSizes()[1] | number: '1.0-1' }}%</p>
                </div>
              </ui-card>
            </div>
          </ng-template>

          <ng-template uiSplitterPanel="panel-3">
            <div class="panel-content">
              <ui-card>
                <div class="card-content">
                  <h3>Panel 3</h3>
                  <p>Right/bottom panel.</p>
                  <p>Current size: {{ interactivePanelSizes()[2] | number: '1.0-1' }}%</p>
                </div>
              </ui-card>
            </div>
          </ng-template>
        </ui-splitter>
      </div>
    </app-interactive-showcase>
  `,
})
export class SplitterInteractiveComponent {
  showcaseConfig: ShowcaseConfig = SPLITTER_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    orientation: 'horizontal',
    gutterSize: 6,
  });

  currentOrientation = computed(() => this.values()['orientation'] as Orientation);
  currentGutterSize = computed(() => this.values()['gutterSize'] as number);

  interactivePanels = signal<SplitterPanel[]>([
    { id: 'panel-1', size: 30, minSize: 200 },
    { id: 'panel-2', size: 40 },
    { id: 'panel-3', size: 30, maxSize: 400 },
  ]);

  interactivePanelSizes = signal<number[]>([30, 40, 30]);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.interactivePanelSizes.set([30, 40, 30]);
  }

  onInteractivePanelResize(event: SplitterResizeEvent): void {
    const sizes = [...this.interactivePanelSizes()];
    sizes[event.panelIndex] = event.newSize;
    this.interactivePanelSizes.set(sizes);
  }
}
