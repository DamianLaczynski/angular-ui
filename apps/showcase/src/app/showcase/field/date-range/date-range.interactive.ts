import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateRangeComponent, DateRange, InputVariant, Size } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { DATE_RANGE_SHOWCASE_CONFIG } from './date-range.showcase.config';

@Component({
  selector: 'app-date-range-interactive',
  imports: [DateRangeComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (reset)="onReset()"
    >
      <div preview>
        <ui-date-range
          [label]="currentLabel()"
          [inputVariant]="currentInputVariant()"
          [size]="currentSize()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [(ngModel)]="currentValue"
          [helpText]="currentHelpText()"
          (change)="onDateRangeChange($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class DateRangeInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = DATE_RANGE_SHOWCASE_CONFIG;

  currentValue: DateRange | null = null;

  private values = signal<Record<string, unknown>>({
    label: 'Date Range',
    helpText: '',
    inputVariant: 'filled',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentInputVariant = computed(() => this.values()['inputVariant'] as InputVariant);
  currentSize = computed(() => this.values()['size'] as Size);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.currentValue = null;
  }

  onDateRangeChange(value: DateRange): void {
    this.showcase()?.logEvent('change', { value });
  }
}
