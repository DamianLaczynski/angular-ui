import { Component, signal, computed, viewChild } from '@angular/core';
import { CheckboxComponent } from 'angular-ui';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { Shape, Size } from 'angular-ui';

@Component({
  selector: 'app-checkbox-showcase',
  imports: [
    CheckboxComponent,
    CommonModule,
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
        <h1 class="showcase__title">Checkbox Component</h1>
        <p class="showcase__description">
          Checkbox component based on Fluent 2 Design System. Unified API: shape + size.
        </p>

        <!-- Interactive Demo -->
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
              <ui-checkbox
                [label]="currentLabel()"
                [shape]="currentShape()"
                [size]="currentSize()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [(indeterminate)]="currentIndeterminate"
                [helpText]="currentHelpText()"
                (change)="onCheckboxChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Shapes -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Shapes</h2>
          <div class="showcase__grid">
            @for (s of shapes; track s) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ s | titlecase }}</h3>
                <ui-checkbox [label]="s + ' checkbox'" [shape]="s" [(ngModel)]="shapeValues[s]" />
              </div>
            }
          </div>
        </section>

        <!-- Sizes -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Sizes</h2>
          <div class="showcase__grid">
            @for (s of sizes; track s) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ s | titlecase }}</h3>
                <ui-checkbox [label]="s + ' checkbox'" [size]="s" [(ngModel)]="sizeValues[s]" />
              </div>
            }
          </div>
        </section>

        <!-- States -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Normal</h3>
              <ui-checkbox label="Normal checkbox" [(ngModel)]="normalValue" />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Disabled</h3>
              <ui-checkbox
                label="Disabled checkbox"
                [(ngModel)]="disabledValue"
                [disabled]="true"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Required</h3>
              <ui-checkbox
                label="Required checkbox"
                [(ngModel)]="requiredValue"
                [required]="true"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Read Only</h3>
              <ui-checkbox
                label="Read only checkbox"
                [(ngModel)]="readonlyValue"
                [readonly]="true"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Indeterminate</h3>
              <ui-checkbox
                label="Indeterminate"
                [(ngModel)]="indeterminateValue"
                [(indeterminate)]="isIndeterminate"
              />
            </div>
          </div>
        </section>

        <!-- Shape + Size Combinations -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Shape + Size Combinations</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <ui-checkbox
                label="Rounded + Small"
                shape="rounded"
                size="small"
                [(ngModel)]="combo1"
              />
            </div>
            <div class="showcase__item">
              <ui-checkbox
                label="Rounded + Large"
                shape="rounded"
                size="large"
                [(ngModel)]="combo2"
              />
            </div>
            <div class="showcase__item">
              <ui-checkbox
                label="Circular + Small"
                shape="circular"
                size="small"
                [(ngModel)]="combo3"
              />
            </div>
            <div class="showcase__item">
              <ui-checkbox
                label="Circular + Large"
                shape="circular"
                size="large"
                [(ngModel)]="combo4"
              />
            </div>
          </div>
        </section>

        <!-- Form Example -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <div class="showcase__item">
            <form class="showcase__form">
              <ui-checkbox
                label="Accept Terms and Conditions"
                [(ngModel)]="formData.acceptTerms"
                [ngModelOptions]="{ standalone: true }"
                [required]="true"
                helpText="You must accept to continue"
              />
              <ui-checkbox
                label="Subscribe to Newsletter"
                [(ngModel)]="formData.subscribeNewsletter"
                [ngModelOptions]="{ standalone: true }"
                helpText="Receive our weekly newsletter"
              />
              <ui-checkbox
                label="Share Data with Partners"
                [(ngModel)]="formData.shareData"
                [ngModelOptions]="{ standalone: true }"
                shape="circular"
              />
              <div class="showcase__form-output">
                <strong>Values:</strong>
                <pre>{{ formData | json }}</pre>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class CheckboxShowcaseComponent {
  shapes: Shape[] = ['rounded', 'circular', 'square'];
  sizes: Size[] = ['small', 'medium', 'large'];

  shapeValues: Record<string, boolean> = { rounded: true, circular: false };
  sizeValues: Record<string, boolean> = { small: true, medium: true, large: true };

  normalValue = true;
  disabledValue = true;
  requiredValue = false;
  readonlyValue = true;
  indeterminateValue = false;
  isIndeterminate = true;

  combo1 = false;
  combo2 = true;
  combo3 = false;
  combo4 = true;

  formData = {
    acceptTerms: false,
    subscribeNewsletter: false,
    shareData: false,
  };

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = false;
  currentIndeterminate = false;

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-checkbox',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      {
        key: 'label',
        label: 'Label',
        type: 'text',
        description: 'Checkbox label',
        defaultValue: 'Accept terms',
        placeholder: 'Enter label',
        group: 'content',
      },
      {
        key: 'helpText',
        label: 'Help Text',
        type: 'text',
        description: 'Helper text',
        defaultValue: '',
        placeholder: 'Enter help text',
        group: 'content',
      },
      {
        key: 'shape',
        label: 'Shape',
        type: 'dropdown',
        options: this.shapes.map(s => ({ value: s, label: s })),
        defaultValue: 'rounded',
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
        key: 'disabled',
        label: 'Disabled',
        type: 'switch',
        description: 'Disable checkbox',
        defaultValue: false,
        group: 'state',
      },
      {
        key: 'readonly',
        label: 'Readonly',
        type: 'switch',
        description: 'Make readonly',
        defaultValue: false,
        group: 'state',
      },
      {
        key: 'required',
        label: 'Required',
        type: 'switch',
        description: 'Mark as required',
        defaultValue: false,
        group: 'state',
      },
    ],
  };

  private values = signal<Record<string, any>>({
    label: 'Accept terms',
    helpText: '',
    shape: 'rounded',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentSize = computed(() => this.values()['size'] as Size);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.currentValue = false;
    this.currentIndeterminate = false;
  }

  onCheckboxChange(value: boolean): void {
    this.showcase()?.logEvent('change', { checked: value });
  }
}

