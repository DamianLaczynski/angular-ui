import { Component, signal, computed, viewChild } from '@angular/core';
import { ColorComponent, ColorFormat } from 'angular-ui';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-color-showcase',

  imports: [
    ColorComponent,
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
        <h1 class="showcase__title">Color Picker Component - Fluent 2 Design</h1>

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
              <ui-color
                [label]="currentLabel()"
                [placeholder]="currentPlaceholder()"
                [format]="currentFormat()"
                [variant]="currentVariant()"
                [size]="currentSize()"
                [showAlpha]="currentShowAlpha()"
                [showEyeDropper]="currentShowEyeDropper()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (change)="onColorChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic Usage</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-color
                label="Pick a color"
                placeholder="Select color"
                [(disabled)]="disabled"
                [(readonly)]="readonly"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Color Formats</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-color label="HEX Format" [format]="'hex'" [formControl]="hexColorControl" />
            </div>
            <div class="showcase__item">
              <ui-color label="RGB Format" [format]="'rgb'" [formControl]="rgbColorControl" />
            </div>
            <div class="showcase__item">
              <ui-color label="HSL Format" [format]="'hsl'" [formControl]="hslColorControl" />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">With Alpha Channel</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-color
                label="Color with opacity"
                [format]="'hex'"
                [showAlpha]="true"
                [formControl]="alphaHexControl"
              />
            </div>
            <div class="showcase__item">
              <ui-color
                label="RGBA Format"
                [format]="'rgb'"
                [showAlpha]="true"
                [formControl]="alphaRgbControl"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Without Presets or Eye Dropper</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-color label="No presets" [formControl]="noPresetsControl" />
            </div>
            <div class="showcase__item">
              <ui-color
                label="No eye dropper"
                [showEyeDropper]="false"
                [formControl]="noEyeDropperControl"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Sizes</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-color label="Small" size="small" [formControl]="smallSizeControl" />
            </div>
            <div class="showcase__item">
              <ui-color label="Medium" size="medium" [formControl]="mediumSizeControl" />
            </div>
            <div class="showcase__item">
              <ui-color label="Large" size="large" [formControl]="largeSizeControl" />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-color label="Filled" variant="filled" [formControl]="filledControl" />
            </div>
            <div class="showcase__item">
              <ui-color
                label="Filled Gray"
                variant="filled-gray"
                [formControl]="filledGrayControl"
              />
            </div>
            <div class="showcase__item">
              <ui-color label="Underlined" variant="underlined" [formControl]="underlinedControl" />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-color label="Default" [formControl]="defaultStateControl" />
            </div>
            <div class="showcase__item">
              <ui-color
                label="Error State"
                [(errorText)]="errorStateText"
                [formControl]="errorStateControl"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Disabled & Read-only</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-color label="Disabled" [disabled]="true" [formControl]="disabledControl" />
            </div>
            <div class="showcase__item">
              <ui-color label="Read-only" [readonly]="true" [formControl]="readonlyControl" />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Required Field</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-color
                label="Favorite Color"
                [required]="true"
                helpText="Please select your favorite color"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Form Integration</h2>
          <form [formGroup]="colorForm" class="showcase__form">
            <ui-color
              label="Brand Primary"
              formControlName="primaryColor"
              helpText="Main brand color"
              [format]="'hex'"
            />
            <ui-color
              label="Brand Secondary"
              formControlName="secondaryColor"
              helpText="Secondary brand color"
              [format]="'hex'"
            />
            <ui-color
              label="Accent Color"
              formControlName="accentColor"
              helpText="Accent color with opacity"
              [format]="'hex'"
              [showAlpha]="true"
            />

            <div class="showcase__form-output">
              <h4>Form Values:</h4>
              <pre>{{ colorForm.value | json }}</pre>
            </div>
          </form>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Controls</h2>
          <div class="showcase__controls">
            <label>
              <input
                type="checkbox"
                [(ngModel)]="disabled"
                [ngModelOptions]="{ standalone: true }"
              />
              Disabled
            </label>
            <label>
              <input
                type="checkbox"
                [(ngModel)]="readonly"
                [ngModelOptions]="{ standalone: true }"
              />
              Read-only
            </label>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class ColorShowcaseComponent {
  disabled = signal(false);
  readonly = signal(false);

  // Color format controls
  hexColorControl = new FormControl('#3B82F6');
  rgbColorControl = new FormControl('rgb(239, 68, 68)');
  hslColorControl = new FormControl('hsl(142, 71%, 45%)');

  // Alpha channel controls
  alphaHexControl = new FormControl('#FF0000CC');
  alphaRgbControl = new FormControl('rgba(0, 128, 255, 0.5)');

  // Feature controls
  noPresetsControl = new FormControl('#9C27B0');
  noEyeDropperControl = new FormControl('#4CAF50');

  // Size controls
  smallSizeControl = new FormControl('#E91E63');
  mediumSizeControl = new FormControl('#2196F3');
  largeSizeControl = new FormControl('#FF9800');

  // Variant controls
  filledControl = new FormControl('#00BCD4');
  filledGrayControl = new FormControl('#8BC34A');
  underlinedControl = new FormControl('#FFEB3B');

  // State controls
  defaultStateControl = new FormControl('#607D8B');
  errorStateControl = new FormControl('#F44336');
  warningStateControl = new FormControl('#FFC107');
  successStateControl = new FormControl('#4CAF50');

  // Disabled & readonly controls
  disabledControl = new FormControl({ value: '#9E9E9E', disabled: true }, { nonNullable: false });
  readonlyControl = new FormControl('#795548', { nonNullable: false });

  colorForm = new FormGroup({
    primaryColor: new FormControl('#0078D4'),
    secondaryColor: new FormControl('#107C10'),
    accentColor: new FormControl('#881798CC'),
  });

  errorStateText = 'Invalid color';

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = '#3B82F6';
  sizes: Size[] = ['small', 'medium', 'large'];
  variants = ['filled', 'filled-gray', 'filled-lighter', 'underlined'];
  formats: ColorFormat[] = ['hex', 'rgb', 'hsl'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-color',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'features', label: 'Features', icon: 'settings' as any },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      {
        key: 'label',
        label: 'Label',
        type: 'text',
        defaultValue: 'Pick a color',
        group: 'content',
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        defaultValue: 'Select color',
        group: 'content',
      },
      { key: 'helpText', label: 'Help Text', type: 'text', defaultValue: '', group: 'content' },
      {
        key: 'format',
        label: 'Format',
        type: 'dropdown',
        options: this.formats.map(f => ({ value: f, label: f })),
        defaultValue: 'hex',
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
        key: 'showAlpha',
        label: 'Show Alpha',
        type: 'switch',
        defaultValue: false,
        group: 'features',
      },
      {
        key: 'showEyeDropper',
        label: 'Show Eye Dropper',
        type: 'switch',
        defaultValue: true,
        group: 'features',
      },
      { key: 'disabled', label: 'Disabled', type: 'switch', defaultValue: false, group: 'state' },
      { key: 'readonly', label: 'Readonly', type: 'switch', defaultValue: false, group: 'state' },
      { key: 'required', label: 'Required', type: 'switch', defaultValue: false, group: 'state' },
    ],
  };

  private values = signal<Record<string, any>>({
    label: 'Pick a color',
    placeholder: 'Select color',
    helpText: '',
    format: 'hex',
    variant: 'filled',
    size: 'medium',
    showAlpha: false,
    showEyeDropper: true,
    disabled: false,
    readonly: false,
    required: false,
  });
  currentLabel = computed(() => this.values()['label'] as string);
  currentPlaceholder = computed(() => this.values()['placeholder'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentFormat = computed(() => this.values()['format'] as ColorFormat);
  currentVariant = computed(() => this.values()['variant'] as any);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShowAlpha = computed(() => this.values()['showAlpha'] as boolean);
  currentShowEyeDropper = computed(() => this.values()['showEyeDropper'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }
  onReset(): void {
    this.currentValue = '#3B82F6';
  }
  onColorChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}
