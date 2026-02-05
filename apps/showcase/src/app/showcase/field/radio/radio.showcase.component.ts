import { Component, signal, computed, viewChild } from '@angular/core';
import { RadioGroupComponent, RadioItem } from 'angular-ui';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { Size, Orientation, ContentPosition } from 'angular-ui';

@Component({
  selector: 'app-radio-showcase',

  imports: [
    RadioGroupComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
        <h1 class="showcase__title">Radio Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Radio component built with Fluent 2 Design System. All
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
              <ui-radio-group
                [label]="currentLabel()"
                [orientation]="currentOrientation()"
                [size]="currentSize()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [items]="basicOptions"
                [helpText]="currentHelpText()"
                name="interactive-radio"
                (change)="onRadioChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-radio-group
                orientation="vertical"
                label="Choose an option"
                helpText="Select one of the following options"
                [(ngModel)]="basicValue"
                name="basic-group"
                [items]="basicOptions"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                orientation="horizontal"
                label="Quick Selection"
                [(ngModel)]="horizontalValue"
                name="horizontal-group"
                [items]="basicOptions"
              ></ui-radio-group>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-radio-group
                size="small"
                label="Small Radio Group"
                [(ngModel)]="sizeValue1"
                name="size-small"
                [items]="basicOptions"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                size="medium"
                label="Medium Radio Group"
                [(ngModel)]="sizeValue2"
                name="size-medium"
                [items]="basicOptions"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                size="large"
                label="Large Radio Group"
                [(ngModel)]="sizeValue3"
                name="size-large"
                [items]="basicOptions"
              ></ui-radio-group>
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-radio-group
                label="Error State"
                [(errorText)]="errorStateText"
                [(ngModel)]="stateValue1"
                name="state-error"
                [items]="basicOptions"
              ></ui-radio-group>
            </div>
          </div>
        </div>

        <!-- Interactive States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-radio-group
                orientation="vertical"
                label="Disabled Selection"
                [disabled]="true"
                [(ngModel)]="disabledValue"
                name="disabled-group"
                [items]="basicOptions"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                orientation="vertical"
                label="Required Selection"
                [required]="true"
                helpText="You must select an option"
                [(ngModel)]="requiredValue"
                name="required-group"
                [items]="yesNoOptions"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                orientation="vertical"
                label="Read Only Selection"
                [readonly]="true"
                [(ngModel)]="readonlyValue"
                name="readonly-group"
                [items]="basicOptions"
              ></ui-radio-group>
            </div>
          </div>
        </div>

        <!-- Label Position Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Label Position Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-radio-group
                orientation="vertical"
                label="Label After (Default)"
                [(ngModel)]="layoutValue1"
                name="layout-after"
                [items]="layoutAfterOptions"
                helpText="Label positioned after the radio button"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                orientation="vertical"
                label="Label Before"
                [(ngModel)]="layoutValue3"
                name="layout-before"
                [items]="layoutBeforeOptions"
                helpText="Label positioned before the radio button"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                orientation="horizontal"
                label="Label Above"
                [(ngModel)]="layoutValue4"
                name="layout-above"
                [items]="layoutAboveOptions"
                helpText="Label positioned above the radio button"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                orientation="horizontal"
                label="Label Below"
                [(ngModel)]="layoutValue2"
                name="layout-below"
                [items]="layoutBelowOptions"
                helpText="Label positioned below the radio button"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                orientation="vertical"
                label="No Visible Label"
                [(ngModel)]="layoutValue5"
                name="layout-none"
                [items]="layoutIconOptions"
                helpText="No visible label (aria-label only)"
              ></ui-radio-group>
            </div>
          </div>
        </div>

        <!-- Form Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form class="showcase__form">
                <ui-radio-group
                  label="Delivery Method"
                  [(ngModel)]="formData.deliveryMethod"
                  [ngModelOptions]="{ standalone: true }"
                  name="delivery-group"
                  [items]="deliveryOptions"
                  [required]="true"
                  helpText="Choose your preferred delivery method"
                />
                <ui-radio-group
                  label="Payment Method"
                  orientation="vertical"
                  [(ngModel)]="formData.paymentMethod"
                  [ngModelOptions]="{ standalone: true }"
                  name="payment-group"
                  [items]="paymentOptions"
                  helpText="Select your payment preference"
                />
                <ui-radio-group
                  label="Language Preference"
                  orientation="vertical"
                  [(ngModel)]="formData.language"
                  [ngModelOptions]="{ standalone: true }"
                  name="language-group"
                  [items]="languageOptions"
                  helpText="Choose your preferred language"
                />
                <div class="showcase__form-output">
                  <strong>Selected Values:</strong>
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
              <ui-radio-group
                size="small"
                label="Small + Before + Error"
                [(errorText)]="smallErrorText"
                [(ngModel)]="comboValue1"
                name="combo-1"
                [items]="comboBeforeOptions"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                size="medium"
                label="Medium + Above"
                [(ngModel)]="comboValue2"
                name="combo-2"
                [items]="comboAboveOptions"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                size="large"
                label="Large + After"
                [(ngModel)]="comboValue3"
                name="combo-3"
                [items]="comboAfterOptions"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                size="small"
                label="Small + Disabled"
                [disabled]="true"
                [(ngModel)]="comboValue4"
                name="combo-4"
                [items]="basicOptions"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                size="medium"
                label="Medium + Required"
                [required]="true"
                [(ngModel)]="comboValue5"
                name="combo-5"
                [items]="basicOptions"
              ></ui-radio-group>
            </div>
            <div class="showcase__item">
              <ui-radio-group
                size="large"
                label="Large + Read Only"
                [readonly]="true"
                [(ngModel)]="comboValue6"
                name="combo-6"
                [items]="basicOptions"
              ></ui-radio-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RadioShowcaseComponent {
  errorStateText = 'Please select an option';
  smallErrorText = 'Small error radio';

  // Basic options
  basicOptions: RadioItem[] = [
    { id: 1, label: 'Option 1', value: 'option1' },
    { id: 2, label: 'Option 2', value: 'option2' },
    { id: 3, label: 'Option 3', value: 'option3' },
  ];

  yesNoOptions: RadioItem[] = [
    { id: 1, label: 'Yes', value: 'yes' },
    { id: 2, label: 'No', value: 'no' },
  ];

  layoutAfterOptions: RadioItem[] = [
    { id: 1, label: 'Grid View', value: 'grid', labelPosition: 'after' },
    { id: 2, label: 'List View', value: 'list', labelPosition: 'after' },
    { id: 3, label: 'Compact View', value: 'compact', labelPosition: 'after' },
  ];

  layoutBeforeOptions: RadioItem[] = [
    { id: 1, label: 'Option A', value: 'a', labelPosition: 'before' },
    { id: 2, label: 'Option B', value: 'b', labelPosition: 'before' },
    { id: 3, label: 'Option C', value: 'c', labelPosition: 'before' },
  ];

  layoutAboveOptions: RadioItem[] = [
    { id: 1, label: 'Desktop', value: 'desktop', labelPosition: 'above' },
    { id: 2, label: 'Tablet', value: 'tablet', labelPosition: 'above' },
    { id: 3, label: 'Mobile', value: 'mobile', labelPosition: 'above' },
  ];

  layoutBelowOptions: RadioItem[] = [
    { id: 1, label: 'Day', value: 'day', labelPosition: 'below' },
    { id: 2, label: 'Week', value: 'week', labelPosition: 'below' },
    { id: 3, label: 'Month', value: 'month', labelPosition: 'below' },
  ];

  layoutIconOptions: RadioItem[] = [
    { id: 1, label: '', value: 'icon1', labelPosition: 'none', ariaLabel: 'Icon option 1' },
    { id: 2, label: '', value: 'icon2', labelPosition: 'none', ariaLabel: 'Icon option 2' },
    { id: 3, label: '', value: 'icon3', labelPosition: 'none', ariaLabel: 'Icon option 3' },
  ];

  // Values for different examples
  basicValue = 'option2';
  horizontalValue = 'option1';
  layoutValue1 = 'grid';
  layoutValue2 = 'week';
  layoutValue3 = 'a';
  layoutValue4 = 'desktop';
  layoutValue5 = 'icon1';
  sizeValue1 = 'option1';
  sizeValue2 = 'option2';
  sizeValue3 = 'option3';
  stateValue1 = '';
  stateValue2 = 'option1';
  stateValue3 = 'option2';
  requiredValue = '';
  disabledValue = 'option2';
  readonlyValue = 'option1';
  comboValue1 = '';
  comboValue2 = 'option2';
  comboValue3 = 'option3';
  comboValue4 = 'option1';
  comboValue5 = '';
  comboValue6 = 'option2';

  deliveryOptions: RadioItem[] = [
    { id: 1, label: 'Standard Shipping', value: 'standard' },
    { id: 2, label: 'Express Shipping', value: 'express' },
    { id: 3, label: 'Overnight Shipping', value: 'overnight' },
  ];

  paymentOptions: RadioItem[] = [
    { id: 1, label: 'Credit Card', value: 'credit' },
    { id: 2, label: 'PayPal', value: 'paypal' },
    { id: 3, label: 'Bank Transfer', value: 'bank' },
  ];

  languageOptions: RadioItem[] = [
    { id: 1, label: 'English', value: 'en' },
    { id: 2, label: 'Spanish', value: 'es' },
    { id: 3, label: 'French', value: 'fr' },
  ];

  comboBeforeOptions: RadioItem[] = [
    { id: 1, label: 'Option 1', value: 'option1', labelPosition: 'before' },
    { id: 2, label: 'Option 2', value: 'option2', labelPosition: 'before' },
    { id: 3, label: 'Option 3', value: 'option3', labelPosition: 'before' },
  ];

  comboAboveOptions: RadioItem[] = [
    { id: 1, label: 'Option 1', value: 'option1', labelPosition: 'above' },
    { id: 2, label: 'Option 2', value: 'option2', labelPosition: 'above' },
    { id: 3, label: 'Option 3', value: 'option3', labelPosition: 'above' },
  ];

  comboAfterOptions: RadioItem[] = [
    { id: 1, label: 'Option 1', value: 'option1', labelPosition: 'after' },
    { id: 2, label: 'Option 2', value: 'option2', labelPosition: 'after' },
    { id: 3, label: 'Option 3', value: 'option3', labelPosition: 'after' },
  ];

  formData = {
    deliveryMethod: '',
    paymentMethod: '',
    language: 'en',
  };

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = '';
  sizes: Size[] = ['small', 'medium', 'large'];
  orientations: Orientation[] = ['vertical', 'horizontal'];
  labelPositions: ContentPosition[] = ['before', 'after', 'above', 'below', 'none'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-radio-group',
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
        description: 'Radio group label',
        defaultValue: 'Choose an option',
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
        key: 'orientation',
        label: 'Orientation',
        type: 'dropdown',
        options: this.orientations.map(o => ({ value: o, label: o })),
        defaultValue: 'vertical',
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
        description: 'Disable radio group',
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
    label: 'Choose an option',
    helpText: '',
    orientation: 'vertical',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentOrientation = computed(() => this.values()['orientation'] as Orientation);
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

  onRadioChange(value: any): void {
    this.showcase()?.logEvent('change', { value });
  }
}

