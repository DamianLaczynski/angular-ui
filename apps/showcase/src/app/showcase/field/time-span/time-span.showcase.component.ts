import { Component, signal, computed, viewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TimeSpanComponent, TimeSpanValue } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-time-span-showcase',
  imports: [
    TimeSpanComponent,
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
        <h1 class="showcase__title">Time Span Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Time Span component built with Fluent 2 Design System. This
          component allows users to set a duration using configurable time units (years, months,
          days, hours, minutes, seconds).
        </p>

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
              <ui-time-span
                [label]="currentLabel()"
                [inputVariant]="currentVariant()"
                [size]="currentSize()"
                [showYears]="currentShowYears()"
                [showMonths]="currentShowMonths()"
                [showDays]="currentShowDays()"
                [showHours]="currentShowHours()"
                [showMinutes]="currentShowMinutes()"
                [showSeconds]="currentShowSeconds()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (change)="onTimeSpanChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-time-span
                label="Duration (Days, Hours, Minutes)"
                [showDays]="true"
                [showHours]="true"
                [showMinutes]="true"
                inputVariant="filled"
                placeholder="Set duration..."
                helpText="Select days, hours, and minutes"
                [(ngModel)]="basicValue"
                [ngModelOptions]="{ standalone: true }"
              />
              <div class="showcase__form-output">
                <strong>Value:</strong>
                <pre>{{ basicValue | json }}</pre>
              </div>
            </div>
            <div class="showcase__item">
              <ui-time-span
                label="Time Span (All Units)"
                [showYears]="true"
                [showMonths]="true"
                [showDays]="true"
                [showHours]="true"
                [showMinutes]="true"
                [showSeconds]="true"
                inputVariant="filled"
                placeholder="Set time span..."
                [(ngModel)]="fullValue"
                [ngModelOptions]="{ standalone: true }"
              />
              <div class="showcase__form-output">
                <strong>Value:</strong>
                <pre>{{ fullValue | json }}</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Configuration Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Configuration Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-time-span
                label="Hours and Minutes Only"
                [showDays]="false"
                [showHours]="true"
                [showMinutes]="true"
                inputVariant="filled"
                placeholder="Set time..."
                helpText="Only hours and minutes are available"
                [(ngModel)]="hoursMinutesValue"
                [ngModelOptions]="{ standalone: true }"
              />
              <div class="showcase__form-output">
                <strong>Value:</strong>
                <pre>{{ hoursMinutesValue | json }}</pre>
              </div>
            </div>
            <div class="showcase__item">
              <ui-time-span
                label="Days Only"
                [showDays]="true"
                [showHours]="false"
                [showMinutes]="false"
                inputVariant="filled"
                placeholder="Set days..."
                [(ngModel)]="daysOnlyValue"
                [ngModelOptions]="{ standalone: true }"
              />
              <div class="showcase__form-output">
                <strong>Value:</strong>
                <pre>{{ daysOnlyValue | json }}</pre>
              </div>
            </div>
            <div class="showcase__item">
              <ui-time-span
                label="Years and Months"
                [showYears]="true"
                [showMonths]="true"
                [showDays]="false"
                [showHours]="false"
                [showMinutes]="false"
                inputVariant="filled"
                placeholder="Set period..."
                [(ngModel)]="yearsMonthsValue"
                [ngModelOptions]="{ standalone: true }"
              />
              <div class="showcase__form-output">
                <strong>Value:</strong>
                <pre>{{ yearsMonthsValue | json }}</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-time-span
                label="Small Time Span"
                size="small"
                inputVariant="filled"
                placeholder="Small size"
                [(ngModel)]="smallValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
            <div class="showcase__item">
              <ui-time-span
                label="Medium Time Span (Default)"
                size="medium"
                inputVariant="filled"
                placeholder="Medium size"
                [(ngModel)]="mediumValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
            <div class="showcase__item">
              <ui-time-span
                label="Large Time Span"
                size="large"
                inputVariant="filled"
                placeholder="Large size"
                [(ngModel)]="largeValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-time-span
                label="Normal State"
                inputVariant="filled"
                helpText="This is a normal time span"
                [(ngModel)]="normalValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
            <div class="showcase__item">
              <ui-time-span
                label="Error State"
                inputVariant="filled"
                [errorText]="errorStateText"
                [(ngModel)]="errorValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          </div>
        </div>

        <!-- Interactive States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-time-span
                label="Disabled Time Span"
                [disabled]="true"
                inputVariant="filled"
                helpText="This time span is disabled"
                [(ngModel)]="disabledValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
            <div class="showcase__item">
              <ui-time-span
                label="Required Time Span"
                [required]="true"
                inputVariant="filled"
                helpText="This field is required"
                [(ngModel)]="requiredValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
            <div class="showcase__item">
              <ui-time-span
                label="Clearable Time Span"
                [clearable]="true"
                inputVariant="filled"
                helpText="You can clear the selection"
                [(ngModel)]="clearableValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          </div>
        </div>

        <!-- Variant Options -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variant Options</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-time-span
                label="Filled Variant"
                inputVariant="filled"
                placeholder="Filled style"
                [(ngModel)]="filledValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
            <div class="showcase__item">
              <ui-time-span
                label="Underlined Variant"
                inputVariant="underlined"
                placeholder="Underlined style"
                [(ngModel)]="underlinedValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
            <div class="showcase__item">
              <ui-time-span
                label="Filled Gray Variant"
                inputVariant="filled-gray"
                placeholder="Filled gray style"
                [(ngModel)]="filledGrayValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          </div>
        </div>

        <!-- Reactive Forms Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Reactive Forms Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form [formGroup]="reactiveForm" class="showcase__form">
                <ui-time-span
                  label="Access Token Expiration"
                  [showHours]="true"
                  [showMinutes]="true"
                  [showSeconds]="true"
                  formControlName="accessTokenExpiration"
                  inputVariant="filled"
                  placeholder="Set expiration time"
                  helpText="Output: ISO 8601 duration string (e.g., 'PT1H30M' for 1 hour 30 minutes)"
                />
                <ui-time-span
                  label="Refresh Token Expiration"
                  [showDays]="true"
                  [showHours]="true"
                  [showMinutes]="true"
                  formControlName="refreshTokenExpiration"
                  inputVariant="filled"
                  placeholder="Set expiration time"
                  helpText="Output: ISO 8601 duration string (e.g., 'P7D' for 7 days)"
                />
                <ui-time-span
                  label="Password Reset Token Expiration"
                  [showMinutes]="true"
                  [showSeconds]="true"
                  formControlName="passwordResetTokenExpiration"
                  inputVariant="filled"
                  placeholder="Set expiration time"
                  helpText="Output: ISO 8601 duration string (e.g., 'PT10M' for 10 minutes)"
                />
                <div class="showcase__form-output">
                  <strong>Form Values (Ready for API):</strong>
                  <pre>{{ reactiveForm.value | json }}</pre>
                  <strong>Form Status:</strong>
                  <pre>{{ reactiveForm.status }}</pre>
                  <strong>Access Token Value (String):</strong>
                  <pre>{{ reactiveForm.get('accessTokenExpiration')?.value || '(empty)' }}</pre>
                  <strong>Refresh Token Value (String):</strong>
                  <pre>{{ reactiveForm.get('refreshTokenExpiration')?.value || '(empty)' }}</pre>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Form Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form class="showcase__form">
                <ui-time-span
                  label="Project Duration"
                  [showYears]="true"
                  [showMonths]="true"
                  [showDays]="true"
                  [(ngModel)]="formData.projectDuration"
                  [ngModelOptions]="{ standalone: true }"
                  [required]="true"
                  inputVariant="filled"
                  placeholder="Set project duration"
                />
                <ui-time-span
                  label="Working Hours Per Day"
                  [showHours]="true"
                  [showMinutes]="true"
                  [(ngModel)]="formData.workingHours"
                  [ngModelOptions]="{ standalone: true }"
                  inputVariant="filled"
                  placeholder="Set working hours"
                />
                <ui-time-span
                  label="Break Duration"
                  [showMinutes]="true"
                  [showSeconds]="true"
                  [(ngModel)]="formData.breakDuration"
                  [ngModelOptions]="{ standalone: true }"
                  inputVariant="filled"
                  placeholder="Set break duration"
                />
                <div class="showcase__form-output">
                  <strong>Form Values:</strong>
                  <pre>{{ formData | json }}</pre>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TimeSpanShowcaseComponent {
  basicValue: TimeSpanValue = {};
  fullValue: TimeSpanValue = {};
  hoursMinutesValue: TimeSpanValue = {};
  daysOnlyValue: TimeSpanValue = {};
  yearsMonthsValue: TimeSpanValue = {};
  smallValue: TimeSpanValue = {};
  mediumValue: TimeSpanValue = {};
  largeValue: TimeSpanValue = {};
  normalValue: TimeSpanValue = {};
  errorValue: TimeSpanValue = {};
  disabledValue: TimeSpanValue = { days: 5, hours: 3, minutes: 30 };
  requiredValue: TimeSpanValue = {};
  clearableValue: TimeSpanValue = { hours: 8, minutes: 30 };
  filledValue: TimeSpanValue = {};
  underlinedValue: TimeSpanValue = {};
  filledGrayValue: TimeSpanValue = {};

  formData = {
    projectDuration: {} as TimeSpanValue,
    workingHours: {} as TimeSpanValue,
    breakDuration: {} as TimeSpanValue,
  };

  // Reactive form example
  reactiveForm = new FormGroup({
    accessTokenExpiration: new FormControl('PT1H', [Validators.required]),
    refreshTokenExpiration: new FormControl('P7D', [Validators.required]),
    passwordResetTokenExpiration: new FormControl('PT10M', [Validators.required]),
  });

  errorStateText = 'Please set a valid time span';

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue: TimeSpanValue = {};
  sizes: Size[] = ['small', 'medium', 'large'];
  variants = ['filled', 'filled-gray', 'filled-lighter', 'underlined'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-time-span',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'units', label: 'Units', icon: 'settings' as any },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      { key: 'label', label: 'Label', type: 'text', defaultValue: 'Duration', group: 'content' },
      { key: 'helpText', label: 'Help Text', type: 'text', defaultValue: '', group: 'content' },
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
        key: 'showYears',
        label: 'Show Years',
        type: 'switch',
        defaultValue: false,
        group: 'units',
      },
      {
        key: 'showMonths',
        label: 'Show Months',
        type: 'switch',
        defaultValue: false,
        group: 'units',
      },
      { key: 'showDays', label: 'Show Days', type: 'switch', defaultValue: true, group: 'units' },
      {
        key: 'showHours',
        label: 'Show Hours',
        type: 'switch',
        defaultValue: true,
        group: 'units',
      },
      {
        key: 'showMinutes',
        label: 'Show Minutes',
        type: 'switch',
        defaultValue: true,
        group: 'units',
      },
      {
        key: 'showSeconds',
        label: 'Show Seconds',
        type: 'switch',
        defaultValue: false,
        group: 'units',
      },
      { key: 'disabled', label: 'Disabled', type: 'switch', defaultValue: false, group: 'state' },
      { key: 'readonly', label: 'Readonly', type: 'switch', defaultValue: false, group: 'state' },
      { key: 'required', label: 'Required', type: 'switch', defaultValue: false, group: 'state' },
    ],
  };

  private values = signal<Record<string, any>>({
    label: 'Duration',
    helpText: '',
    variant: 'filled',
    size: 'medium',
    showYears: false,
    showMonths: false,
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: false,
    disabled: false,
    readonly: false,
    required: false,
  });
  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentVariant = computed(() => this.values()['variant'] as any);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShowYears = computed(() => this.values()['showYears'] as boolean);
  currentShowMonths = computed(() => this.values()['showMonths'] as boolean);
  currentShowDays = computed(() => this.values()['showDays'] as boolean);
  currentShowHours = computed(() => this.values()['showHours'] as boolean);
  currentShowMinutes = computed(() => this.values()['showMinutes'] as boolean);
  currentShowSeconds = computed(() => this.values()['showSeconds'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }
  onResetShowcase(): void {
    this.currentValue = {};
  }
  onTimeSpanChange(value: TimeSpanValue): void {
    this.showcase()?.logEvent('change', { value });
  }
}
