import { Component, computed, signal } from '@angular/core';
import { ButtonComponent, TooltipComponent, TooltipPosition, TooltipSize } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { TOOLTIP_SHOWCASE_CONFIG } from './tooltip.showcase.config';

@Component({
  selector: 'app-tooltip-interactive',
  imports: [TooltipComponent, ButtonComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      [config]="showcaseConfig"
      [showEventLog]="false"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-tooltip
          [text]="currentText()"
          [position]="currentPosition()"
          [size]="currentSize()"
          [disabled]="currentDisabled()"
          [delay]="currentDelay()"
        >
          <ui-button variant="primary">Hover me</ui-button>
        </ui-tooltip>
      </div>
    </app-interactive-showcase>
  `,
})
export class TooltipInteractiveComponent {
  showcaseConfig: ShowcaseConfig = TOOLTIP_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    text: 'This is a helpful tooltip',
    position: 'top',
    size: 'medium',
    disabled: false,
    delay: 300,
  });

  currentText = computed(() => this.values()['text'] as string);
  currentPosition = computed(() => this.values()['position'] as TooltipPosition);
  currentSize = computed(() => this.values()['size'] as TooltipSize);
  currentDisabled = computed(() => !!this.values()['disabled']);
  currentDelay = computed(() => this.values()['delay'] as number);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}
}
