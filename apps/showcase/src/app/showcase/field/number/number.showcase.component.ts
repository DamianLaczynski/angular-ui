import { Component, signal, computed, viewChild } from '@angular/core';
import { NumberComponent } from 'angular-ui';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { InputVariant } from 'angular-ui';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-number-showcase',

  imports: [
    NumberComponent,
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
        <h1 class="showcase__title">Number Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Number component built with Fluent 2 Design System. All
          variants are responsive and accessible.
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
              <ui-number
                [label]="currentLabel()"
                [placeholder]="currentPlaceholder()"
                [variant]="currentVariant()"
                [size]="currentSize()"
                [min]="currentMin()"
                [max]="currentMax()"
                [step]="currentStep()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (change)="onNumberChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-number
                label="Small Number Field"
                placeholder="Enter a number"
                size="small"
                helpText="This is a small number field"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Medium Number Field"
                placeholder="Enter a number"
                size="medium"
                helpText="This is a medium number field"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Large Number Field"
                placeholder="Enter a number"
                size="large"
                helpText="This is a large number field"
              ></ui-number>
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-number
                label="Normal State"
                placeholder="Normal state"
                helpText="This is a normal number field"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Error State"
                placeholder="Error state"
                [(errorText)]="errorStateText"
              ></ui-number>
            </div>
          </div>
        </div>

        <!-- Interactive States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-number
                label="Disabled Field"
                placeholder="Disabled field"
                [disabled]="true"
                helpText="This field is disabled"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Read Only Field"
                placeholder="Read only field"
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                helpText="This field is read only"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Required Field"
                placeholder="Required field"
                [required]="true"
                helpText="This field is required"
              ></ui-number>
            </div>
          </div>
        </div>

        <!-- Stepper Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Stepper Variants (Filled Lighter)</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-number
                label="Quantity (Step: 1)"
                placeholder="0"
                variant="filled-lighter"
                [(ngModel)]="quantity"
                [ngModelOptions]="{ standalone: true }"
                [step]="1"
                [min]="0"
                [max]="100"
                helpText="Min: 0, Max: 100, Step: 1"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Price (Step: 0.01)"
                placeholder="0.00"
                variant="filled-lighter"
                [(ngModel)]="price"
                [ngModelOptions]="{ standalone: true }"
                [step]="0.01"
                [min]="0"
                helpText="Min: 0, Step: 0.01"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Temperature (Step: 5)"
                placeholder="0"
                variant="filled-lighter"
                [(ngModel)]="temperature"
                [ngModelOptions]="{ standalone: true }"
                [step]="5"
                [min]="-50"
                [max]="50"
                helpText="Min: -50, Max: 50, Step: 5"
              ></ui-number>
            </div>
          </div>
        </div>

        <!-- Stepper Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Stepper Variants (Filled Gray)</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-number
                label="Quantity (Step: 1)"
                placeholder="0"
                variant="filled-gray"
                [(ngModel)]="quantity"
                [ngModelOptions]="{ standalone: true }"
                [step]="1"
                [min]="0"
                [max]="100"
                helpText="Min: 0, Max: 100, Step: 1"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Price (Step: 0.01)"
                placeholder="0.00"
                variant="filled-gray"
                [(ngModel)]="price"
                [ngModelOptions]="{ standalone: true }"
                [step]="0.01"
                [min]="0"
                helpText="Min: 0, Step: 0.01"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Temperature (Step: 5)"
                placeholder="0"
                variant="filled-gray"
                [(ngModel)]="temperature"
                [ngModelOptions]="{ standalone: true }"
                [step]="5"
                [min]="-50"
                [max]="50"
                helpText="Min: -50, Max: 50, Step: 5"
              ></ui-number>
            </div>
          </div>
        </div>

        <!-- Stepper Variants - Filled -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Stepper Variants (Filled)</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-number
                label="Quantity (Step: 1)"
                placeholder="0"
                variant="filled"
                [(ngModel)]="quantityFilled"
                [ngModelOptions]="{ standalone: true }"
                [step]="1"
                [min]="0"
                [max]="100"
                helpText="Min: 0, Max: 100, Step: 1"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Price (Step: 0.01)"
                placeholder="0.00"
                variant="filled"
                [(ngModel)]="priceFilled"
                [ngModelOptions]="{ standalone: true }"
                [step]="0.01"
                [min]="0"
                helpText="Min: 0, Step: 0.01"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Temperature (Step: 5)"
                placeholder="0"
                variant="filled"
                [(ngModel)]="temperatureFilled"
                [ngModelOptions]="{ standalone: true }"
                [step]="5"
                [min]="-50"
                [max]="50"
                helpText="Min: -50, Max: 50, Step: 5"
              ></ui-number>
            </div>
          </div>
        </div>

        <!-- Stepper Variants - Underlined -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Stepper Variants (Underlined)</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-number
                label="Quantity (Step: 1)"
                placeholder="0"
                variant="underlined"
                [(ngModel)]="quantityUnderline"
                [ngModelOptions]="{ standalone: true }"
                [step]="1"
                [min]="0"
                [max]="100"
                helpText="Min: 0, Max: 100, Step: 1"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Small Size (Step: 1)"
                placeholder="0"
                variant="underlined"
                size="small"
                [(ngModel)]="quantitySmall"
                [ngModelOptions]="{ standalone: true }"
                [step]="1"
                [min]="0"
                [max]="50"
                helpText="Small size with stepper"
              ></ui-number>
            </div>
          </div>
        </div>

        <!-- Form Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form class="showcase__form">
                <ui-number
                  label="Age"
                  placeholder="Enter your age"
                  [(ngModel)]="formData.age"
                  [ngModelOptions]="{ standalone: true }"
                  [required]="true"
                  [step]="1"
                  [min]="0"
                  [max]="150"
                  helpText="Enter your age in years (0-150)"
                ></ui-number>
                <ui-number
                  label="Phone Number"
                  placeholder="Enter phone number"
                  [(ngModel)]="formData.phone"
                  [ngModelOptions]="{ standalone: true }"
                  [step]="1"
                  helpText="Enter your phone number"
                ></ui-number>
                <ui-number
                  label="Salary"
                  placeholder="Enter salary"
                  [(ngModel)]="formData.salary"
                  [ngModelOptions]="{ standalone: true }"
                  [step]="1000"
                  [min]="0"
                  helpText="Enter your annual salary (step: 1000)"
                ></ui-number>
                <ui-number
                  label="Experience Years"
                  placeholder="Years of experience"
                  [(ngModel)]="formData.experience"
                  [ngModelOptions]="{ standalone: true }"
                  [step]="1"
                  [min]="0"
                  [max]="50"
                  helpText="Years of work experience (0-50)"
                ></ui-number>
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
              <ui-number
                label="Small + Error"
                placeholder="Small error"
                size="small"
                [(errorText)]="smallErrorText"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Small + Disabled"
                placeholder="Small disabled"
                size="small"
                [disabled]="true"
                helpText="Small disabled field"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Medium + Read Only"
                placeholder="Medium read only"
                size="medium"
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                helpText="Medium read only field"
              ></ui-number>
            </div>
            <div class="showcase__item">
              <ui-number
                label="Large + Required"
                placeholder="Large required"
                size="large"
                [required]="true"
                helpText="Large required field"
              ></ui-number>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NumberShowcaseComponent {
  value = 42;

  // Stepper examples - Outline
  quantity = 10;
  price = 19.99;
  temperature = 0;

  // Stepper examples - Filled
  quantityFilled = 10;
  priceFilled = 19.99;
  temperatureFilled = 0;

  // Stepper examples - Underline
  quantityUnderline = 10;
  quantitySmall = 5;

  formData = {
    age: null as number | null,
    phone: null as number | null,
    salary: null as number | null,
    experience: null as number | null,
  };

  errorStateText = 'This field has an error';
  smallErrorText = 'Small error field';

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue: number | null = 0;
  sizes: Size[] = ['small', 'medium', 'large'];
  variants: InputVariant[] = ['filled', 'filled-gray', 'filled-lighter', 'underlined'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-number',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'range', label: 'Range', icon: 'resize' as any, expanded: true },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      {
        key: 'label',
        label: 'Label',
        type: 'text',
        description: 'Field label',
        defaultValue: 'Quantity',
        placeholder: 'Enter label',
        group: 'content',
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        description: 'Placeholder text',
        defaultValue: 'Enter number...',
        placeholder: 'Enter placeholder',
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
        key: 'min',
        label: 'Min',
        type: 'number',
        description: 'Minimum value',
        defaultValue: 0,
        group: 'range',
      },
      {
        key: 'max',
        label: 'Max',
        type: 'number',
        description: 'Maximum value',
        defaultValue: 100,
        group: 'range',
      },
      {
        key: 'step',
        label: 'Step',
        type: 'number',
        description: 'Step increment',
        defaultValue: 1,
        group: 'range',
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
        key: 'disabled',
        label: 'Disabled',
        type: 'switch',
        description: 'Disable field',
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
    label: 'Quantity',
    placeholder: 'Enter number...',
    helpText: '',
    min: 0,
    max: 100,
    step: 1,
    variant: 'filled',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentPlaceholder = computed(() => this.values()['placeholder'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentMin = computed(() => this.values()['min'] as number);
  currentMax = computed(() => this.values()['max'] as number);
  currentStep = computed(() => this.values()['step'] as number);
  currentVariant = computed(() => this.values()['variant'] as InputVariant);
  currentSize = computed(() => this.values()['size'] as Size);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.currentValue = 0;
  }

  onNumberChange(value: number): void {
    this.showcase()?.logEvent('change', { value });
  }
}

