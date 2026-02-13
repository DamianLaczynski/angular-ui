import { Component, signal, computed, viewChild } from '@angular/core';
import { ScrollPanelComponent, CardComponent } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { SCROLL_PANEL_SHOWCASE_CONFIG } from './scroll-panel.showcase.config';
import type { ScrollPanelOrientation, ScrollPanelBehavior } from 'angular-ui';

@Component({
  selector: 'app-scroll-panel-interactive',
  imports: [ScrollPanelComponent, CardComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (reset)="onReset()"
    >
      <div preview>
        <ui-scroll-panel
          [orientation]="currentOrientation()"
          [scrollbarBehavior]="currentScrollbarBehavior()"
          [maxHeight]="currentMaxHeight()"
          (scroll)="onScroll()"
          (scrollEnd)="onScrollEnd()"
        >
          <div [class]="getContentClass()">
            @for (item of demoItems; track item.id) {
              <ui-card
                [title]="item.title"
                [subtitle]="item.subtitle"
                [bodyText]="currentOrientation() === 'horizontal' ? '' : item.body"
                [attr.style]="
                  currentOrientation() === 'horizontal'
                    ? 'min-width: 300px; flex-shrink: 0;'
                    : 'margin-bottom: 12px;'
                "
              />
            }
          </div>
        </ui-scroll-panel>
      </div>
    </app-interactive-showcase>
  `,
})
export class ScrollPanelInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = SCROLL_PANEL_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    orientation: 'vertical',
    scrollbarBehavior: 'auto',
    maxHeight: '400px',
  });

  demoItems = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    subtitle: `Subtitle ${i + 1}`,
    body: `Body content for item ${i + 1}. Scroll to see scroll and scrollEnd events.`,
  }));

  currentOrientation = computed(() => this.values()['orientation'] as ScrollPanelOrientation);
  currentScrollbarBehavior = computed(
    () => this.values()['scrollbarBehavior'] as ScrollPanelBehavior,
  );
  currentMaxHeight = computed(() => this.values()['maxHeight'] as string);

  getContentClass(): string {
    const orientation = this.currentOrientation();
    const base = 'scroll-panel-demo-content';
    if (orientation === 'horizontal') return `${base} scroll-panel-demo-content--horizontal`;
    if (orientation === 'both') return `${base} scroll-panel-demo-content--both`;
    return `${base} scroll-panel-demo-content--vertical`;
  }

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  onScroll(): void {
    this.showcase()?.logEvent('scroll', {});
  }

  onScrollEnd(): void {
    this.showcase()?.logEvent('scrollEnd', {});
  }
}
