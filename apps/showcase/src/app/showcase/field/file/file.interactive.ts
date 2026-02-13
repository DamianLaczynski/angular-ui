import { Component, signal, computed, viewChild } from '@angular/core';
import { FileComponent, FileComponentMode, InputVariant, Size } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { FILE_SHOWCASE_CONFIG } from './file.showcase.config';

@Component({
  selector: 'app-file-interactive',
  imports: [FileComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (reset)="onReset()"
    >
      <div preview>
        <ui-file
          [label]="currentLabel()"
          [mode]="currentMode()"
          [inputVariant]="currentVariant()"
          [size]="currentSize()"
          [multiple]="currentMultiple()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [helpText]="currentHelpText()"
          (fileSelect)="onFileSelect($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class FileInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = FILE_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    label: 'Upload File',
    helpText: '',
    mode: 'area',
    variant: 'filled',
    size: 'medium',
    multiple: false,
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentMode = computed(() => this.values()['mode'] as FileComponentMode);
  currentVariant = computed(() => this.values()['variant'] as InputVariant);
  currentSize = computed(() => this.values()['size'] as Size);
  currentMultiple = computed(() => this.values()['multiple'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  onFileSelect(files: File[]): void {
    this.showcase()?.logEvent('fileSelect', { count: files.length });
  }
}
