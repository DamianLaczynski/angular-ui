import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwitchComponent, Size, ContentPosition } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { SWITCH_SHOWCASE_CONFIG } from './switch.showcase.config';

@Component({
  selector: 'app-switch-interactive',
  imports: [SwitchComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (reset)="onReset()"
    >
      <div preview>
        <ui-switch
          [label]="currentLabel()"
          [labelPosition]="currentLabelPosition()"
          [size]="currentSize()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [(ngModel)]="currentValue"
          [helpText]="currentHelpText()"
          (change)="onSwitchChange($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class SwitchInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = SWITCH_SHOWCASE_CONFIG;

  currentValue = false;

  private values = signal<Record<string, unknown>>({
    label: 'Enable notifications',
    helpText: '',
    labelPosition: 'after',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentLabelPosition = computed(() => this.values()['labelPosition'] as ContentPosition);
  currentSize = computed(() => this.values()['size'] as Size);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.currentValue = false;
  }

  onSwitchChange(value: boolean): void {
    this.showcase()?.logEvent('change', { checked: value });
  }
}
