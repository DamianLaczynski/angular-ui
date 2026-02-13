import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SplitterComponent,
  SplitterPanelDirective,
  SplitterPanel,
  SplitterResizeEvent,
} from 'angular-ui';
import { CardComponent } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SplitterInteractiveComponent } from './splitter.interactive';

@Component({
  selector: 'app-splitter-showcase',
  imports: [
    CommonModule,
    SplitterComponent,
    SplitterPanelDirective,
    CardComponent,
    TableOfContentComponent,
    ShowcaseHeaderComponent,
    SplitterInteractiveComponent,
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
        <app-showcase-header title="Splitter" />
        <p class="showcase__description">
          Resizable panel component following Fluent 2 Design System. Supports horizontal and
          vertical orientation, configurable gutter size, and nested layouts. Panels can have min
          and max size constraints. Use for split views, resizable sidebars, or complex layouts.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Horizontal Splitter</h2>
          <p class="showcase__section__description">
            Resize panels by dragging the gutter between them. Use keyboard arrows for precise
            control.
          </p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <div class="showcase__example" style="height: 400px;">
                <ui-splitter
                  [panels]="horizontalPanels()"
                  orientation="horizontal"
                  [gutterSize]="6"
                  (panelResize)="onPanelResize($event)"
                >
                  <ng-template uiSplitterPanel="panel-1">
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

                  <ng-template uiSplitterPanel="panel-2">
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

                  <ng-template uiSplitterPanel="panel-3">
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
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Vertical Splitter</h2>
          <p class="showcase__section__description">Splitter can also be oriented vertically.</p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <div class="showcase__example" style="height: 500px;">
                <ui-splitter
                  [panels]="verticalPanels()"
                  orientation="vertical"
                  [gutterSize]="8"
                  (panelResize)="onVerticalPanelResize($event)"
                >
                  <ng-template uiSplitterPanel="top-panel">
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

                  <ng-template uiSplitterPanel="bottom-panel">
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
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Nested Splitter</h2>
          <p class="showcase__section__description">
            Splitters can be nested to create complex layouts.
          </p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <div class="showcase__example" style="height: 500px;">
                <ui-splitter
                  [panels]="nestedOuterPanels()"
                  orientation="horizontal"
                  [gutterSize]="6"
                >
                  <ng-template uiSplitterPanel="left">
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

                  <ng-template uiSplitterPanel="main">
                    <div class="panel-content" style="padding: 0;">
                      <ui-splitter
                        [panels]="nestedInnerPanels()"
                        orientation="vertical"
                        [gutterSize]="6"
                      >
                        <ng-template uiSplitterPanel="header">
                          <div class="panel-content">
                            <ui-card>
                              <div class="card-content">
                                <h3>Header</h3>
                                <p>This is the header section with minimum height of 100px.</p>
                              </div>
                            </ui-card>
                          </div>
                        </ng-template>

                        <ng-template uiSplitterPanel="content">
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

                        <ng-template uiSplitterPanel="footer">
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
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with orientation and gutter size in real time. Resize panels by dragging the
            gutter or using keyboard navigation.
          </p>
          <app-splitter-interactive />
        </section>
      </div>
    </div>
  `,
})
export class SplitterShowcaseComponent {
  horizontalPanels = signal<SplitterPanel[]>([
    { id: 'panel-1', size: 30, minSize: 200 },
    { id: 'panel-2', size: 40 },
    { id: 'panel-3', size: 30, maxSize: 400 },
  ]);

  panelSizes = signal<number[]>([30, 40, 30]);

  verticalPanels = signal<SplitterPanel[]>([
    { id: 'top-panel', size: 60, minSize: 150 },
    { id: 'bottom-panel', size: 40, minSize: 150 },
  ]);

  verticalPanelSizes = signal<number[]>([60, 40]);

  nestedOuterPanels = signal<SplitterPanel[]>([
    { id: 'left', size: 20 },
    { id: 'main', size: 80 },
  ]);

  nestedInnerPanels = signal<SplitterPanel[]>([
    { id: 'header', size: 20, resizable: false },
    { id: 'content', size: 60, resizable: false },
    { id: 'footer', size: 20, resizable: false },
  ]);

  onPanelResize(event: SplitterResizeEvent): void {
    const sizes = [...this.panelSizes()];
    sizes[event.panelIndex] = event.newSize;
    this.panelSizes.set(sizes);
  }

  onVerticalPanelResize(event: SplitterResizeEvent): void {
    const sizes = [...this.verticalPanelSizes()];
    sizes[event.panelIndex] = event.newSize;
    this.verticalPanelSizes.set(sizes);
  }
}
