import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlComponent, InputVariant, Size } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { URL_SHOWCASE_CONFIG } from './url.showcase.config';

@Component({
  selector: 'app-url-interactive',
  imports: [UrlComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-url
          [label]="currentLabel()"
          [placeholder]="currentPlaceholder()"
          [inputVariant]="currentVariant()"
          [size]="currentSize()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [(ngModel)]="currentValue"
          [helpText]="currentHelpText()"
          (change)="onUrlChange($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class UrlInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = URL_SHOWCASE_CONFIG;

  currentValue = '';

  private values = signal<Record<string, unknown>>({
    label: 'Website URL',
    placeholder: 'https://example.com',
    helpText: '',
    variant: 'filled',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentPlaceholder = computed(() => this.values()['placeholder'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentVariant = computed(() => this.values()['variant'] as InputVariant);
  currentSize = computed(() => this.values()['size'] as Size);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.currentValue = '';
  }

  onUrlChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}
