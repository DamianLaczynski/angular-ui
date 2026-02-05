import { Component, signal, computed, viewChild } from '@angular/core';
import { EmailComponent } from 'angular-ui';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { InputVariant } from 'angular-ui';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-email-showcase',
  imports: [
    EmailComponent,
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
        <h1 class="showcase__title">Email Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Email component built with Fluent 2 Design System. All
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
              <ui-email
                [label]="currentLabel()"
                [placeholder]="currentPlaceholder()"
                [variant]="currentVariant()"
                [size]="currentSize()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (change)="onEmailChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-email
                label="Email Address"
                placeholder="example@domain.com"
                helpText="Enter a valid email address"
              ></ui-email>
            </div>
            <div class="showcase__item">
              <ui-email
                label="With Default Value"
                placeholder="example@domain.com"
                [(ngModel)]="defaultValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="Email field with default value"
              ></ui-email>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-email
                label="Small Email Field"
                placeholder="example@domain.com"
                size="small"
                helpText="This is a small email field"
                variant="underlined"
              ></ui-email>
            </div>
            <div class="showcase__item">
              <ui-email
                label="Medium Email Field"
                placeholder="example@domain.com"
                size="medium"
                helpText="This is a medium email field"
                variant="filled-gray"
              ></ui-email>
            </div>
            <div class="showcase__item">
              <ui-email
                label="Large Email Field"
                placeholder="example@domain.com"
                size="large"
                helpText="This is a large email field"
                variant="filled"
              ></ui-email>
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-email
                label="Normal State"
                placeholder="example@domain.com"
                helpText="This is a normal email field"
              ></ui-email>
            </div>
            <div class="showcase__item">
              <ui-email
                label="Error State"
                placeholder="example@domain.com"
                [(errorText)]="errorStateText"
              ></ui-email>
            </div>
          </div>
        </div>

        <!-- Interactive States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-email
                label="Disabled Field"
                placeholder="example@domain.com"
                [disabled]="true"
                helpText="This field is disabled"
              ></ui-email>
            </div>
            <div class="showcase__item">
              <ui-email
                label="Read Only Field"
                placeholder="example@domain.com"
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                helpText="This field is read only"
              ></ui-email>
            </div>
            <div class="showcase__item">
              <ui-email
                label="Required Field"
                placeholder="example@domain.com"
                [required]="true"
                helpText="This field is required"
              ></ui-email>
            </div>
          </div>
        </div>

        <!-- Form Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form class="showcase__form" [formGroup]="formData">
                <ui-email
                  label="Primary Email"
                  placeholder="primary@example.com"
                  formControlName="primaryEmail"
                  [required]="true"
                  helpText="Enter your primary email address"
                ></ui-email>
                <ui-email
                  label="Secondary Email"
                  placeholder="secondary@example.com"
                  formControlName="secondaryEmail"
                  helpText="Enter your secondary email address (optional)"
                ></ui-email>
                <ui-email
                  label="Work Email"
                  placeholder="work@company.com"
                  formControlName="workEmail"
                  helpText="Enter your work email address"
                ></ui-email>
                <div class="showcase__form-output">
                  <strong>Form Values:</strong>
                  <pre>{{ formData.value | json }}</pre>
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
              <ui-email
                label="Small + Error"
                placeholder="example@domain.com"
                size="small"
                [(errorText)]="smallErrorText"
              ></ui-email>
            </div>
            <div class="showcase__item">
              <ui-email
                label="Small + Disabled"
                placeholder="example@domain.com"
                size="small"
                [disabled]="true"
                helpText="Small disabled field"
              ></ui-email>
            </div>
            <div class="showcase__item">
              <ui-email
                label="Medium + Read Only"
                placeholder="example@domain.com"
                size="medium"
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                helpText="Medium read only field"
              ></ui-email>
            </div>
            <div class="showcase__item">
              <ui-email
                label="Large + Required"
                placeholder="example@domain.com"
                size="large"
                [required]="true"
                helpText="Large required field"
              ></ui-email>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class EmailShowcaseComponent {
  value = 'user@example.com';
  defaultValue = 'contact@microsoft.com';

  formData = new FormGroup({
    primaryEmail: new FormControl('', [Validators.required, Validators.email]),
    secondaryEmail: new FormControl('', [Validators.required, Validators.email]),
    workEmail: new FormControl(''),
  });

  errorStateText = 'Invalid email format';
  smallErrorText = 'Invalid email';

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = '';
  sizes: Size[] = ['small', 'medium', 'large'];
  variants: InputVariant[] = ['filled', 'filled-gray', 'filled-lighter', 'underlined'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-email',
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
        description: 'Field label',
        defaultValue: 'Email Address',
        placeholder: 'Enter label',
        group: 'content',
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        description: 'Placeholder text',
        defaultValue: 'example@domain.com',
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
    label: 'Email Address',
    placeholder: 'example@domain.com',
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

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.currentValue = '';
  }

  onEmailChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}

