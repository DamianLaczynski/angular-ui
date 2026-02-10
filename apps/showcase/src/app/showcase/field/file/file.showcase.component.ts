import { Component, signal, computed, viewChild } from '@angular/core';
import { FileComponent } from 'angular-ui';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-file-showcase',

  imports: [
    FileComponent,
    ReactiveFormsModule,
    FormsModule,
    JsonPipe,
    CommonModule,
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
        <h1 class="showcase__title">File Input Component - Fluent 2 Design</h1>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            [showEventLog]="true"
            (valuesChange)="onValuesChange($event)"
            (reset)="onResetShowcase()"
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
                (fileSelect)="onFileChangeShowcase($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic Usage</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file label="Upload File" />
            </div>
            <div class="showcase__item">
              <ui-file
                label="Upload File (Inline Mode)"
                [mode]="'inline'"
                placeholder="Click to select a file"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Component Modes</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h4>Area Mode (Default)</h4>
              <ui-file
                label="Drag & Drop Area"
                mode="area"
                uploadText="Click to upload or drag and drop"
                helpText="Area mode with drag and drop support"
              />
            </div>
            <div class="showcase__item">
              <h4>Inline Mode</h4>
              <ui-file
                label="Inline File Input"
                [mode]="'inline'"
                placeholder="Click to select a file"
                helpText="Inline mode that looks like a text input"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Multiple Files</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file
                label="Upload Multiple Files"
                [multiple]="true"
                uploadText="Click to upload or drag and drop multiple files"
                uploadHint="PDF, DOC, DOCX files up to 10MB"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Accept Types</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file
                label="Images Only"
                accept="image/*"
                uploadText="Upload images"
                uploadHint="PNG, JPG, GIF up to 5MB"
              />
            </div>
            <div class="showcase__item">
              <ui-file
                label="Documents Only"
                accept=".pdf,.doc,.docx"
                uploadText="Upload documents"
                uploadHint="PDF, DOC, DOCX files"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">File Size Limit</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file label="Max 5MB" [maxSize]="5 * 1024 * 1024" uploadHint="Files up to 5MB" />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Max Files Limit</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file
                label="Max 3 Files"
                [multiple]="true"
                [maxFiles]="3"
                uploadHint="Maximum 3 files"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Sizes</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file label="Small" size="small" />
            </div>
            <div class="showcase__item">
              <ui-file label="Medium" size="medium" />
            </div>
            <div class="showcase__item">
              <ui-file label="Large" size="large" />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file label="Filled" inputVariant="filled" />
            </div>
            <div class="showcase__item">
              <ui-file label="Filled Gray" inputVariant="filled-gray" />
            </div>
            <div class="showcase__item">
              <ui-file label="Underlined" inputVariant="underlined" />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file label="Default" />
            </div>
            <div class="showcase__item">
              <ui-file label="Error State" [(errorText)]="errorStateText" />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Disabled & Read-only</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file label="Disabled" [disabled]="true" />
            </div>
            <div class="showcase__item">
              <ui-file label="Read-only" [readonly]="true" />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Required Field</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file
                label="Required File Upload"
                [required]="true"
                helpText="Please upload a file"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Form Integration</h2>
          <form [formGroup]="fileForm" class="showcase__form">
            <ui-file
              label="Avatar"
              formControlName="avatar"
              accept="image/*"
              helpText="Upload your profile picture"
            />
            <ui-file
              label="Documents"
              formControlName="documents"
              [multiple]="true"
              accept=".pdf,.doc,.docx"
              helpText="Upload supporting documents"
              [maxSize]="10 * 1024 * 1024"
            />

            <div class="showcase__form-output">
              <h4>Form Values:</h4>
              <pre>{{ fileForm.value | json }}</pre>
            </div>
          </form>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Event Handlers</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file
                label="File Upload with Events"
                [multiple]="true"
                (fileSelect)="onFileSelect($event)"
                (fileRemove)="onFileRemove($event)"
                helpText="Check console for events"
              />
            </div>
          </div>
          @if (eventLogs().length > 0) {
            <div class="showcase__event-log">
              <h4>Event Log:</h4>
              <ul>
                @for (log of eventLogs(); track log.id) {
                  <li>{{ log.message }}</li>
                }
              </ul>
            </div>
          }
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">All Features Combined</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file
                label="Full Featured File Input"
                [multiple]="true"
                [maxFiles]="5"
                [maxSize]="10 * 1024 * 1024"
                accept="image/*,.pdf"
                size="large"
                inputVariant="filled"
                [required]="true"
                helpText="Upload up to 5 images or PDFs, max 10MB each"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class FileShowcaseComponent {
  eventLogs = signal<Array<{ id: number; message: string }>>([]);
  private eventId = 0;
  errorStateText = 'File upload failed';

  fileForm = new FormGroup({
    avatar: new FormControl<File | null>(null),
    documents: new FormControl<File[] | null>(null),
  });

  onFileSelect(files: File[]): void {
    const fileNames = files.map(f => f.name).join(', ');
    this.addEventLog(`Files selected: ${fileNames}`);
  }

  onFileRemove(file: File): void {
    this.addEventLog(`File removed: ${file.name}`);
  }

  private addEventLog(message: string): void {
    this.eventLogs.set([
      ...this.eventLogs(),
      { id: ++this.eventId, message: `${new Date().toLocaleTimeString()}: ${message}` },
    ]);
  }

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  sizes: Size[] = ['small', 'medium', 'large'];
  variants = ['filled', 'filled-gray', 'filled-lighter', 'underlined'];
  modes = ['area', 'inline'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-file',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'behavior', label: 'Behavior', icon: 'settings' as any },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      { key: 'label', label: 'Label', type: 'text', defaultValue: 'Upload File', group: 'content' },
      { key: 'helpText', label: 'Help Text', type: 'text', defaultValue: '', group: 'content' },
      {
        key: 'mode',
        label: 'Mode',
        type: 'dropdown',
        options: this.modes.map(m => ({ value: m, label: m })),
        defaultValue: 'area',
        group: 'appearance',
      },
      {
        key: 'variant',
        label: 'Variant',
        type: 'dropdown',
        options: this.variants.map(v => ({ value: v, label: v })),
        defaultValue: 'filled',
        group: 'appearance',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'appearance',
      },
      {
        key: 'multiple',
        label: 'Multiple',
        type: 'switch',
        defaultValue: false,
        group: 'behavior',
      },
      { key: 'disabled', label: 'Disabled', type: 'switch', defaultValue: false, group: 'state' },
      { key: 'readonly', label: 'Readonly', type: 'switch', defaultValue: false, group: 'state' },
      { key: 'required', label: 'Required', type: 'switch', defaultValue: false, group: 'state' },
    ],
  };

  private values = signal<Record<string, any>>({
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
  currentMode = computed(() => this.values()['mode'] as any);
  currentVariant = computed(() => this.values()['variant'] as any);
  currentSize = computed(() => this.values()['size'] as Size);
  currentMultiple = computed(() => this.values()['multiple'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }
  onResetShowcase(): void {}
  onFileChangeShowcase(files: File[]): void {
    this.showcase()?.logEvent('fileSelect', { count: files.length });
  }
}
