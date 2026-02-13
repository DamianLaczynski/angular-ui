import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaComponent, InputVariant, Size } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { TEXTAREA_SHOWCASE_CONFIG } from './textarea.showcase.config';

@Component({
  selector: 'app-textarea-interactive',
  imports: [TextareaComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (reset)="onReset()"
    >
      <div preview>
        <ui-textarea
          [label]="currentLabel()"
          [placeholder]="currentPlaceholder()"
          [inputVariant]="currentVariant()"
          [size]="currentSize()"
          [rows]="currentRows()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [(ngModel)]="currentValue"
          [helpText]="currentHelpText()"
          (change)="onTextareaChange($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class TextareaInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = TEXTAREA_SHOWCASE_CONFIG;

  currentValue = '';

  private values = signal<Record<string, unknown>>({
    label: 'Comments',
    placeholder: 'Enter your comments...',
    helpText: '',
    variant: 'filled',
    size: 'medium',
    rows: 4,
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentPlaceholder = computed(() => this.values()['placeholder'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentVariant = computed(() => this.values()['variant'] as InputVariant);
  currentSize = computed(() => this.values()['size'] as Size);
  currentRows = computed(() => (this.values()['rows'] as number) ?? 4);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.currentValue = '';
  }

  onTextareaChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}
