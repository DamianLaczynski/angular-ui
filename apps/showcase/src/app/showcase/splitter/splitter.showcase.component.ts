import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SplitterComponent,
  SplitterPanelDirective,
  SplitterPanel,
  SplitterResizeEvent,
} from 'angular-ui';
import { CardComponent } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { Orientation } from 'angular-ui';

@Component({
  selector: 'app-splitter-showcase',

  imports: [
    CommonModule,
    SplitterComponent,
    SplitterPanelDirective,
    CardComponent,
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
        <h1 class="showcase__title">Splitter Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Splitter component built with Fluent 2 Design System. All
          variants are responsive and accessible. Resizable panel component following Fluent 2
          Design System.
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
            <div preview [style.height]="'400px'">
              <ui-splitter
                [orientation]="currentOrientation()"
                [gutterSize]="currentGutterSize()"
                [panels]="interactivePanels()"
                (panelResize)="onInteractivePanelResize($event)"
              >
                <ng-template appSplitterPanel="panel-1">
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

                <ng-template appSplitterPanel="panel-2">
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

                <ng-template appSplitterPanel="panel-3">
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
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Horizontal Splitter</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <p>
                Resize panels by dragging the gutter between them. Use keyboard arrows for precise
                control.
              </p>
              <div class="showcase__example" style="height: 400px;">
                <ui-splitter
                  [panels]="horizontalPanels()"
                  orientation="horizontal"
                  [gutterSize]="6"
                  (panelResize)="onPanelResize($event)"
                >
                  <ng-template appSplitterPanel="panel-1">
                    <div class="panel-content">
                      <ui-card>
                        <div class="card-content">
                          <h3>Panel 1</h3>
                          <p>This is the left panel. It has a minimum width of 200px.</p>
                          <p>
                            Try resizing by dragging the gutter or using keyboard navigation (Tab +
                            Arrow keys).
                          </p>
                          <p>Current size: {{ panelSizes()[0] | number: '1.0-1' }}%</p>
                        </div>
                      </ui-card>
                    </div>
                  </ng-template>

                  <ng-template appSplitterPanel="panel-2">
                    <div class="panel-content">
                      <ui-card>
                        <div class="card-content">
                          <h3>Panel 2</h3>
                          <p>This is the middle panel with no size restrictions.</p>
                          <p>Current size: {{ panelSizes()[1] | number: '1.0-1' }}%</p>
                        </div>
                      </ui-card>
                    </div>
                  </ng-template>

                  <ng-template appSplitterPanel="panel-3">
                    <div class="panel-content">
                      <ui-card>
                        <div class="card-content">
                          <h3>Panel 3</h3>
                          <p>This is the right panel. It has a maximum width of 400px.</p>
                          <p>Current size: {{ panelSizes()[2] | number: '1.0-1' }}%</p>
                        </div>
                      </ui-card>
                    </div>
                  </ng-template>
                </ui-splitter>
              </div>
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Vertical Splitter</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <p>Splitter can also be oriented vertically.</p>
              <div class="showcase__example" style="height: 500px;">
                <ui-splitter
                  [panels]="verticalPanels()"
                  orientation="vertical"
                  [gutterSize]="8"
                  (panelResize)="onVerticalPanelResize($event)"
                >
                  <ng-template appSplitterPanel="top-panel">
                    <div class="panel-content">
                      <ui-card>
                        <div class="card-content">
                          <h3>Top Panel</h3>
                          <p>This is the top panel.</p>
                          <p>Current size: {{ verticalPanelSizes()[0] | number: '1.0-1' }}%</p>
                        </div>
                      </ui-card>
                    </div>
                  </ng-template>

                  <ng-template appSplitterPanel="bottom-panel">
                    <div class="panel-content">
                      <ui-card>
                        <div class="card-content">
                          <h3>Bottom Panel</h3>
                          <p>This is the bottom panel. It has a minimum height of 150px.</p>
                          <p>Current size: {{ verticalPanelSizes()[1] | number: '1.0-1' }}%</p>
                        </div>
                      </ui-card>
                    </div>
                  </ng-template>
                </ui-splitter>
              </div>
            </div>
          </div>
        </div>

        <!-- Complex Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Nested Splitter</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <p>Splitters can be nested to create complex layouts.</p>
              <div class="showcase__example" style="height: 500px;">
                <ui-splitter
                  [panels]="nestedOuterPanels()"
                  orientation="horizontal"
                  [gutterSize]="6"
                >
                  <ng-template appSplitterPanel="left">
                    <div class="panel-content">
                      <ui-card>
                        <div class="card-content">
                          <h3>Sidebar</h3>
                          <p>This is a fixed-width sidebar (min 150px, max 300px).</p>
                          <ul>
                            <li>Navigation Item 1</li>
                            <li>Navigation Item 2</li>
                            <li>Navigation Item 3</li>
                            <li>Navigation Item 4</li>
                          </ul>
                        </div>
                      </ui-card>
                    </div>
                  </ng-template>

                  <ng-template appSplitterPanel="main">
                    <div class="panel-content" style="padding: 0;">
                      <ui-splitter
                        [panels]="nestedInnerPanels()"
                        orientation="vertical"
                        [gutterSize]="6"
                      >
                        <ng-template appSplitterPanel="header">
                          <div class="panel-content">
                            <ui-card>
                              <div class="card-content">
                                <h3>Header</h3>
                                <p>This is the header section with minimum height of 100px.</p>
                              </div>
                            </ui-card>
                          </div>
                        </ng-template>

                        <ng-template appSplitterPanel="content">
                          <ui-splitter
                            [panels]="nestedOuterPanels()"
                            orientation="horizontal"
                            [gutterSize]="6"
                          >
                            <ng-template appSplitterPanel="left">
                              <div class="panel-content">
                                <ui-card>
                                  <div class="card-content">
                                    <h3>Sidebar</h3>
                                    <p>This is a fixed-width sidebar (min 150px, max 300px).</p>
                                    <ul>
                                      <li>Navigation Item 1</li>
                                      <li>Navigation Item 2</li>
                                      <li>Navigation Item 3</li>
                                      <li>Navigation Item 4</li>
                                    </ul>
                                  </div>
                                </ui-card>
                              </div>
                            </ng-template>

                            <ng-template appSplitterPanel="main">
                              <div class="panel-content" style="padding: 0;">
                                <ui-splitter
                                  [panels]="nestedInnerPanels()"
                                  orientation="vertical"
                                  [gutterSize]="6"
                                >
                                  <ng-template appSplitterPanel="header">
                                    <div class="panel-content">
                                      <ui-card>
                                        <div class="card-content">
                                          <h3>Header</h3>
                                          <p>
                                            This is the header section with minimum height of 100px.
                                          </p>
                                        </div>
                                      </ui-card>
                                    </div>
                                  </ng-template>

                                  <ng-template appSplitterPanel="content">
                                    <div class="panel-content">
                                      <ui-card>
                                        <div class="card-content">
                                          <h3>Main Content</h3>
                                          <p>This is the main content area.</p>
                                          <p>It takes up the remaining vertical space.</p>
                                        </div>
                                      </ui-card>
                                    </div>
                                  </ng-template>

                                  <ng-template appSplitterPanel="footer">
                                    <div class="panel-content">
                                      <ui-card>
                                        <div class="card-content">
                                          <h3>Footer</h3>
                                          <p>Fixed height footer (min 80px, max 150px).</p>
                                        </div>
                                      </ui-card>
                                    </div>
                                  </ng-template>
                                </ui-splitter>
                              </div>
                            </ng-template>
                          </ui-splitter>
                        </ng-template>

                        <ng-template appSplitterPanel="footer">
                          <div class="panel-content">
                            <ui-card>
                              <div class="card-content">
                                <h3>Footer</h3>
                                <p>Fixed height footer (min 80px, max 150px).</p>
                              </div>
                            </ui-card>
                          </div>
                        </ng-template>
                      </ui-splitter>
                    </div>
                  </ng-template>
                </ui-splitter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SplitterShowcaseComponent {
  orientations: Orientation[] = ['horizontal', 'vertical'];

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-splitter',
    controlGroups: [
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'behavior', label: 'Behavior', icon: 'settings' as any },
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
        key: 'gutterSize',
        label: 'Gutter Size',
        type: 'number',
        defaultValue: 6,
        min: 2,
        max: 20,
        step: 1,
        group: 'appearance',
      },
    ],
  };

  private values = signal<Record<string, any>>({
    orientation: 'horizontal',
    gutterSize: 6,
  });

  currentOrientation = computed(() => this.values()['orientation'] as Orientation);
  currentGutterSize = computed(() => this.values()['gutterSize'] as number);

  // Interactive panels
  interactivePanels = signal<SplitterPanel[]>([
    { id: 'panel-1', size: 30, minSize: 200 },
    { id: 'panel-2', size: 40 },
    { id: 'panel-3', size: 30, maxSize: 400 },
  ]);

  interactivePanelSizes = signal<number[]>([30, 40, 30]);

  onValuesChange(newValues: Record<string, any>): void {
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

  // Horizontal splitter panels
  horizontalPanels = signal<SplitterPanel[]>([
    {
      id: 'panel-1',
      size: 30,
      minSize: 200,
    },
    {
      id: 'panel-2',
      size: 40,
    },
    {
      id: 'panel-3',
      size: 30,
      maxSize: 400,
    },
  ]);

  panelSizes = signal<number[]>([30, 40, 30]);

  // Vertical splitter panels
  verticalPanels = signal<SplitterPanel[]>([
    {
      id: 'top-panel',
      size: 60,
      minSize: 150,
    },
    {
      id: 'bottom-panel',
      size: 40,
      minSize: 150,
    },
  ]);

  verticalPanelSizes = signal<number[]>([60, 40]);

  // Nested splitter panels
  nestedOuterPanels = signal<SplitterPanel[]>([
    {
      id: 'left',
      size: 20,
    },
    {
      id: 'main',
      size: 80,
    },
  ]);

  nestedInnerPanels = signal<SplitterPanel[]>([
    {
      id: 'header',
      size: 20,
      resizable: false,
    },
    {
      id: 'content',
      size: 60,
      resizable: false,
    },
    {
      id: 'footer',
      size: 20,
      resizable: false,
    },
  ]);

  onPanelResize(event: SplitterResizeEvent): void {
    console.log('Panel resized:', event);
    const sizes = [...this.panelSizes()];
    sizes[event.panelIndex] = event.newSize;
    this.panelSizes.set(sizes);
  }

  onVerticalPanelResize(event: SplitterResizeEvent): void {
    console.log('Vertical panel resized:', event);
    const sizes = [...this.verticalPanelSizes()];
    sizes[event.panelIndex] = event.newSize;
    this.verticalPanelSizes.set(sizes);
  }
}
