import { Component, signal, computed, viewChild } from '@angular/core';
import { TextareaComponent } from 'angular-ui';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { InputVariant } from 'angular-ui';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-textarea-showcase',
  imports: [
    TextareaComponent,
    FormsModule,
    JsonPipe,
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
        <h1 class="showcase__title">Textarea Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Textarea component built with Fluent 2 Design System. All
          variants are responsive and accessible.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
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
                [variant]="currentVariant()"
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
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-textarea
                label="Comments"
                placeholder="Enter your comments..."
                helpText="Enter your comments or feedback"
              ></ui-textarea>
            </div>
            <div class="showcase__item">
              <ui-textarea
                label="With Default Value"
                placeholder="Enter your text..."
                [(ngModel)]="defaultValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="Textarea field with default value"
              ></ui-textarea>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-textarea
                label="Small Textarea"
                placeholder="Enter text..."
                size="small"
                [rows]="3"
                helpText="This is a small textarea"
                variant="underlined"
              ></ui-textarea>
            </div>
            <div class="showcase__item">
              <ui-textarea
                label="Medium Textarea"
                placeholder="Enter text..."
                size="medium"
                [rows]="4"
                helpText="This is a medium textarea"
                variant="filled-gray"
              ></ui-textarea>
            </div>
            <div class="showcase__item">
              <ui-textarea
                label="Large Textarea"
                placeholder="Enter text..."
                size="large"
                [rows]="6"
                helpText="This is a large textarea"
                variant="filled"
              ></ui-textarea>
            </div>
          </div>
        </div>

        <!-- Rows Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Rows Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-textarea
                label="Small Textarea (3 rows)"
                placeholder="Enter text..."
                [rows]="3"
                helpText="Textarea with 3 rows"
              ></ui-textarea>
            </div>
            <div class="showcase__item">
              <ui-textarea
                label="Default Textarea (4 rows)"
                placeholder="Enter text..."
                [rows]="4"
                helpText="Textarea with 4 rows (default)"
              ></ui-textarea>
            </div>
            <div class="showcase__item">
              <ui-textarea
                label="Large Textarea (6 rows)"
                placeholder="Enter text..."
                [rows]="6"
                helpText="Textarea with 6 rows"
              ></ui-textarea>
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-textarea
                label="Normal State"
                placeholder="Enter text..."
                helpText="This is a normal textarea"
              ></ui-textarea>
            </div>
            <div class="showcase__item">
              <ui-textarea
                label="Error State"
                placeholder="Enter text..."
                [(errorText)]="errorStateText"
              ></ui-textarea>
            </div>
          </div>
        </div>

        <!-- Interactive States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-textarea
                label="Disabled Field"
                placeholder="Enter text..."
                [disabled]="true"
                helpText="This field is disabled"
              ></ui-textarea>
            </div>
            <div class="showcase__item">
              <ui-textarea
                label="Read Only Field"
                placeholder="Enter text..."
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                helpText="This field is read only"
              ></ui-textarea>
            </div>
            <div class="showcase__item">
              <ui-textarea
                label="Required Field"
                placeholder="Enter text..."
                [required]="true"
                helpText="This field is required"
              ></ui-textarea>
            </div>
          </div>
        </div>

        <!-- Form Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form class="showcase__form">
                <ui-textarea
                  label="Message"
                  placeholder="Enter your message..."
                  [(ngModel)]="formData.message"
                  [ngModelOptions]="{ standalone: true }"
                  [required]="true"
                  [rows]="5"
                  helpText="Enter your message"
                ></ui-textarea>
                <ui-textarea
                  label="Notes"
                  placeholder="Enter your notes..."
                  [(ngModel)]="formData.notes"
                  [ngModelOptions]="{ standalone: true }"
                  [rows]="3"
                  helpText="Optional notes"
                ></ui-textarea>
                <ui-textarea
                  label="Description"
                  placeholder="Enter description..."
                  [(ngModel)]="formData.description"
                  [ngModelOptions]="{ standalone: true }"
                  [rows]="6"
                  helpText="Detailed description"
                ></ui-textarea>
                <div class="showcase__form-output">
                  <strong>Form Values:</strong>
                  <pre>{{ formData | json }}</pre>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- All Variants Combined -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">All Variants Combined</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <ui-textarea
                label="Small + Error"
                placeholder="Enter text..."
                size="small"
                [rows]="3"
                [(errorText)]="smallErrorText"
              ></ui-textarea>
            </div>
            <div class="showcase__item">
              <ui-textarea
                label="Small + Disabled"
                placeholder="Enter text..."
                size="small"
                [disabled]="true"
                [rows]="3"
                helpText="Small disabled field"
              ></ui-textarea>
            </div>
            <div class="showcase__item">
              <ui-textarea
                label="Medium + Read Only"
                placeholder="Enter text..."
                size="medium"
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                [rows]="4"
                helpText="Medium read only field"
              ></ui-textarea>
            </div>
            <div class="showcase__item">
              <ui-textarea
                label="Large + Required"
                placeholder="Enter text..."
                size="large"
                [required]="true"
                [rows]="6"
                helpText="Large required field"
              ></ui-textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TextareaShowcaseComponent {
  value =
    'This is a read-only textarea value that spans multiple lines.\nSecond line of text.\nThird line of text.';
  defaultValue = 'Default textarea value';

  formData = {
    message: '',
    notes: '',
    description: '',
  };

  errorStateText = 'This field has an error';
  smallErrorText = 'Small error field';

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = '';
  sizes: Size[] = ['small', 'medium', 'large'];
  variants: InputVariant[] = ['filled', 'filled-gray', 'filled-lighter', 'underlined'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-textarea',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      { key: 'label', label: 'Label', type: 'text', defaultValue: 'Comments', group: 'content' },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        defaultValue: 'Enter your comments...',
        group: 'content',
      },
      { key: 'helpText', label: 'Help Text', type: 'text', defaultValue: '', group: 'content' },
      { key: 'rows', label: 'Rows', type: 'number', defaultValue: 4, group: 'appearance' },
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
      { key: 'disabled', label: 'Disabled', type: 'switch', defaultValue: false, group: 'state' },
      { key: 'readonly', label: 'Readonly', type: 'switch', defaultValue: false, group: 'state' },
      { key: 'required', label: 'Required', type: 'switch', defaultValue: false, group: 'state' },
    ],
  };

  private values = signal<Record<string, any>>({
    label: 'Comments',
    placeholder: 'Enter your comments...',
    helpText: '',
    rows: 4,
    variant: 'filled',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  currentLabel = computed(() => this.values()['label'] as string);
  currentPlaceholder = computed(() => this.values()['placeholder'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentRows = computed(() => this.values()['rows'] as number);
  currentVariant = computed(() => this.values()['variant'] as InputVariant);
  currentSize = computed(() => this.values()['size'] as Size);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }
  onReset(): void {
    this.currentValue = '';
  }
  onTextareaChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}
