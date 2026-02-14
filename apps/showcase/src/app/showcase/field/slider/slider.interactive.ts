import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent, Size } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { SLIDER_SHOWCASE_CONFIG } from './slider.showcase.config';

@Component({
  selector: 'app-slider-interactive',
  imports: [SliderComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-slider
          [label]="currentLabel()"
          [size]="currentSize()"
          [min]="currentMin()"
          [max]="currentMax()"
          [step]="currentStep()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [(ngModel)]="currentValue"
          [helpText]="currentHelpText()"
          (change)="onSliderChange($event)"
        />
        <div style="margin-top: 8px; font-size: 14px; color: #666;">
          Current value: {{ currentValue }}
        </div>
      </div>
    </app-interactive-showcase>
  `,
})
export class SliderInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = SLIDER_SHOWCASE_CONFIG;

  currentValue = 50;

  private values = signal<Record<string, unknown>>({
    label: 'Volume',
    helpText: '',
    min: 0,
    max: 100,
    step: 1,
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentMin = computed(() => this.values()['min'] as number);
  currentMax = computed(() => this.values()['max'] as number);
  currentStep = computed(() => this.values()['step'] as number);
  currentSize = computed(() => this.values()['size'] as Size);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
    const min = newValues['min'] as number;
    const max = newValues['max'] as number;
    if (typeof min === 'number' && typeof max === 'number') {
      if (this.currentValue < min) this.currentValue = min;
      if (this.currentValue > max) this.currentValue = max;
    }
  }

  onReset(): void {
    this.currentValue = 50;
  }

  onSliderChange(value: number): void {
    this.showcase()?.logEvent('change', { value });
  }
}
