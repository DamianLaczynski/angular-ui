import { Component, signal, computed, viewChild } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { SliderComponent } from 'angular-ui';
import { FormsModule } from '@angular/forms';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-slider-showcase',

  imports: [
    CommonModule,
    SliderComponent,
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
        <h1 class="showcase__title">Slider Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Slider component built with Fluent 2 Design System. All
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
              <ui-slider
                [label]="currentLabel()"
                [size]="currentSize()"
                [min]="currentMin()"
                [max]="currentMax()"
                [step]="currentStep()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (change)="onSliderChange($event)"
              />
              <div style="margin-top: 8px; font-size: 14px; color: #666;">
                Current value: {{ currentValue }}
              </div>
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-slider
                [label]="'Volume'"
                [min]="0"
                [max]="100"
                [step]="1"
                [(ngModel)]="basicValue"
              />
            </div>
            <div class="showcase__item">
              <ui-slider
                [label]="'Brightness'"
                [min]="0"
                [max]="100"
                [(ngModel)]="basicValue2"
                helpText="Adjust screen brightness"
              />
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-slider
                [label]="'Small Slider'"
                [size]="'small'"
                [min]="0"
                [max]="100"
                [(ngModel)]="smallValue"
              />
            </div>
            <div class="showcase__item">
              <ui-slider
                [label]="'Medium Slider'"
                [size]="'medium'"
                [min]="0"
                [max]="100"
                [(ngModel)]="mediumValue"
              />
            </div>
            <div class="showcase__item">
              <ui-slider
                [label]="'Large Slider'"
                [size]="'large'"
                [min]="0"
                [max]="100"
                [(ngModel)]="largeValue"
              />
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-slider
                [label]="'Normal State'"
                [min]="0"
                [max]="100"
                [(ngModel)]="normalValue"
                helpText="This is a normal slider"
              />
            </div>
            <div class="showcase__item">
              <ui-slider
                [label]="'Error State'"
                [min]="0"
                [max]="100"
                [(errorText)]="errorStateText"
                [(ngModel)]="errorValue"
              />
            </div>
            <div class="showcase__item"></div>
          </div>

          <!-- Interactive States -->
          <div class="showcase__section">
            <h2 class="showcase__section__title">Interactive States</h2>
            <div class="showcase__grid">
              <div class="showcase__item">
                <ui-slider
                  [label]="'Disabled State'"
                  [min]="0"
                  [max]="100"
                  [disabled]="true"
                  [(ngModel)]="disabledValue"
                  helpText="This slider is disabled"
                />
              </div>
              <div class="showcase__item">
                <ui-slider
                  [label]="'Read-only State'"
                  [min]="0"
                  [max]="100"
                  [readonly]="true"
                  [(ngModel)]="readonlyValue"
                  helpText="This slider is read only"
                />
              </div>
              <div class="showcase__item">
                <ui-slider
                  [label]="'Required Slider'"
                  [min]="0"
                  [max]="100"
                  [required]="true"
                  [(ngModel)]="requiredValue"
                  helpText="This field is required"
                />
              </div>
            </div>
          </div>

          <!-- Different Ranges -->
          <div class="showcase__section">
            <h2 class="showcase__section__title">Different Ranges</h2>
            <div class="showcase__grid">
              <div class="showcase__item">
                <ui-slider
                  [label]="'Rating (0-10)'"
                  [min]="0"
                  [max]="10"
                  [step]="1"
                  [(ngModel)]="range10Value"
                  helpText="Rate from 0 to 10"
                />
              </div>
              <div class="showcase__item">
                <ui-slider
                  [label]="'Opacity (0-1)'"
                  [min]="0"
                  [max]="1"
                  [step]="0.1"
                  [(ngModel)]="range1Value"
                  helpText="Adjust opacity from 0 to 1"
                />
              </div>
              <div class="showcase__item">
                <ui-slider
                  [label]="'Custom Range (50-150)'"
                  [min]="50"
                  [max]="150"
                  [step]="5"
                  [(ngModel)]="customRangeValue"
                  helpText="Custom range with step 5"
                />
              </div>
            </div>
          </div>

          <!-- Form Example -->
          <div class="showcase__section">
            <h2 class="showcase__section__title">Form Example</h2>
            <div class="showcase__grid">
              <div class="showcase__item">
                <form class="showcase__form">
                  <ui-slider
                    [label]="'Volume'"
                    [min]="0"
                    [max]="100"
                    [helpText]="'Adjust the volume level'"
                    [(ngModel)]="formData.volume"
                    [ngModelOptions]="{ standalone: true }"
                  />
                  <ui-slider
                    [label]="'Temperature'"
                    [min]="-20"
                    [max]="40"
                    [step]="1"
                    [(ngModel)]="formData.temperature"
                    [ngModelOptions]="{ standalone: true }"
                    helpText="Temperature in Celsius"
                  />
                  <ui-slider
                    [label]="'Price Range'"
                    [min]="0"
                    [max]="1000"
                    [step]="10"
                    [(ngModel)]="formData.price"
                    [ngModelOptions]="{ standalone: true }"
                    helpText="Price range in dollars"
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
                <ui-slider
                  [label]="'Small + Error'"
                  [size]="'small'"
                  [min]="0"
                  [max]="100"
                  [(errorText)]="smallErrorText"
                  [(ngModel)]="comboValue1"
                />
              </div>
              <div class="showcase__item">
                <ui-slider
                  [label]="'Medium + Warning'"
                  [size]="'medium'"
                  [min]="0"
                  [max]="100"
                  [(ngModel)]="comboValue2"
                />
              </div>
              <div class="showcase__item">
                <ui-slider
                  [label]="'Large'"
                  [size]="'large'"
                  [min]="0"
                  [max]="100"
                  [(ngModel)]="comboValue3"
                />
              </div>
              <div class="showcase__item">
                <ui-slider
                  [label]="'Small + Disabled'"
                  [size]="'small'"
                  [disabled]="true"
                  [min]="0"
                  [max]="100"
                  [(ngModel)]="comboValue4"
                />
              </div>
              <div class="showcase__item">
                <ui-slider
                  [label]="'Medium + Read Only'"
                  [size]="'medium'"
                  [readonly]="true"
                  [min]="0"
                  [max]="100"
                  [(ngModel)]="comboValue5"
                />
              </div>
              <div class="showcase__item">
                <ui-slider
                  [label]="'Large + Required'"
                  [size]="'large'"
                  [required]="true"
                  [min]="0"
                  [max]="100"
                  [(ngModel)]="comboValue6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SliderShowcaseComponent {
  // Basic values
  basicValue = signal(50);
  basicValue2 = signal(75);

  // Size variants
  smallValue = signal(30);
  mediumValue = signal(50);
  largeValue = signal(70);

  // State variants
  normalValue = signal(50);
  errorValue = signal(90);
  warningValue = signal(75);
  successValue = signal(80);
  disabledValue = signal(50);
  readonlyValue = signal(50);
  requiredValue = signal(50);

  // Different ranges
  range10Value = signal(5);
  range1Value = signal(0.5);
  customRangeValue = signal(100);

  // Combo values
  comboValue1 = signal(30);
  comboValue2 = signal(60);
  comboValue3 = signal(70);
  comboValue4 = signal(40);
  comboValue5 = signal(50);
  comboValue6 = signal(80);

  formData = {
    volume: 50,
    temperature: 20,
    price: 500,
  };

  errorStateText = 'Value out of safe range';
  smallErrorText = 'Small error slider';

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = 50;
  sizes: Size[] = ['small', 'medium', 'large'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-slider',
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
        description: 'Slider label',
        defaultValue: 'Volume',
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
        description: 'Disable slider',
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
    label: 'Volume',
    helpText: '',
    min: 0,
    max: 100,
    step: 1,
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentMin = computed(() => this.values()['min'] as number);
  currentMax = computed(() => this.values()['max'] as number);
  currentStep = computed(() => this.values()['step'] as number);
  currentSize = computed(() => this.values()['size'] as Size);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
    const min = newValues['min'] as number;
    const max = newValues['max'] as number;
    if (this.currentValue < min) this.currentValue = min;
    if (this.currentValue > max) this.currentValue = max;
  }

  onReset(): void {
    this.currentValue = 50;
  }

  onSliderChange(value: number): void {
    this.showcase()?.logEvent('change', { value });
  }
}
