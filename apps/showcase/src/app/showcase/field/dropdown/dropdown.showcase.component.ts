import { Component, signal, computed, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from 'angular-ui';
import { DropdownItem, DropdownMode } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { InputVariant } from 'angular-ui';
import { Size } from 'angular-ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import {
  DROPDOWN_VARIANT_DRAWER_FORM_CONFIG,
  DROPDOWN_SIZE_DRAWER_FORM_CONFIG,
  DROPDOWN_MODE_DRAWER_FORM_CONFIG,
  DROPDOWN_STATES_DRAWER_FORM_CONFIG,
  DROPDOWN_INPUT_VARIANTS,
  DROPDOWN_MODES,
} from './dropdown-drawer-form.config';
import { SIZES } from '@shared/utils/showcase/component-options.utils';

@Component({
  selector: 'app-dropdown-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
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
        <app-showcase-header title="Dropdown" />

        <app-section-with-drawer
          sectionTitle="Variant"
          [formConfig]="variantDrawerFormConfig"
          [formValues]="variantFormValues()"
          (formValuesChange)="variantFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (variant of inputVariants; track variant) {
              <div class="showcase__item">
                <ui-dropdown
                  [label]="variant"
                  [items]="basicItems"
                  [inputVariant]="variant"
                  [size]="variantForm().size"
                  [mode]="variantForm().mode"
                  [searchable]="variantForm().searchable"
                  [clearable]="variantForm().clearable"
                  [disabled]="variantForm().disabled"
                  [required]="variantForm().required"
                  placeholder="Select..."
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <ui-dropdown
                  [label]="size"
                  [items]="basicItems"
                  [inputVariant]="sizeForm().variant"
                  [size]="size"
                  [mode]="sizeForm().mode"
                  [searchable]="sizeForm().searchable"
                  [clearable]="sizeForm().clearable"
                  [disabled]="sizeForm().disabled"
                  [required]="sizeForm().required"
                  placeholder="Select..."
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Mode"
          [formConfig]="modeDrawerFormConfig"
          [formValues]="modeFormValues()"
          (formValuesChange)="modeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (mode of modes; track mode) {
              <div class="showcase__item">
                <ui-dropdown
                  [label]="mode"
                  [items]="basicItems"
                  [inputVariant]="modeForm().variant"
                  [size]="modeForm().size"
                  [mode]="mode"
                  [searchable]="modeForm().searchable"
                  [clearable]="modeForm().clearable"
                  [disabled]="modeForm().disabled"
                  [required]="modeForm().required"
                  placeholder="Select..."
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <ui-dropdown
                  [label]="state.label"
                  [items]="basicItems"
                  [inputVariant]="statesForm().variant"
                  [size]="statesForm().size"
                  [mode]="statesForm().mode"
                  [searchable]="statesForm().searchable"
                  [clearable]="statesForm().clearable"
                  [disabled]="state.disabled"
                  [required]="state.required"
                  placeholder="Select..."
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            [showEventLog]="true"
            (valuesChange)="onValuesChange($event)"
            (reset)="onReset()"
          >
            <div preview>
              <ui-dropdown
                [label]="currentLabel()"
                [placeholder]="currentPlaceholder()"
                [items]="basicItems"
                [mode]="currentMode()"
                [inputVariant]="currentVariant()"
                [size]="currentSize()"
                [searchable]="currentSearchable()"
                [clearable]="currentClearable()"
                [disabled]="currentDisabled()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (selectionChange)="onSelectionChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>
      </div>
    </div>
  `,
})
export class DropdownShowcaseComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue: string | (string | number)[] = '';
  inputVariants = DROPDOWN_INPUT_VARIANTS;
  sizes = SIZES;
  modes = DROPDOWN_MODES;

  variantDrawerFormConfig = DROPDOWN_VARIANT_DRAWER_FORM_CONFIG;
  sizeDrawerFormConfig = DROPDOWN_SIZE_DRAWER_FORM_CONFIG;
  modeDrawerFormConfig = DROPDOWN_MODE_DRAWER_FORM_CONFIG;
  statesDrawerFormConfig = DROPDOWN_STATES_DRAWER_FORM_CONFIG;

  statePresets = [
    { id: 'normal', label: 'Normal', disabled: false, required: false },
    { id: 'disabled', label: 'Disabled', disabled: true, required: false },
    { id: 'required', label: 'Required', disabled: false, required: true },
  ];

  variantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    mode: 'single',
    searchable: false,
    clearable: false,
    disabled: false,
    required: false,
  });
  variantForm = computed(() => this.toDropdownForm(this.variantFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    mode: 'single',
    searchable: false,
    clearable: false,
    disabled: false,
    required: false,
  });
  sizeForm = computed(() => this.toDropdownForm(this.sizeFormValues()));

  modeFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    size: 'medium',
    searchable: false,
    clearable: false,
    disabled: false,
    required: false,
  });
  modeForm = computed(() => this.toDropdownForm(this.modeFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    size: 'medium',
    mode: 'single',
    searchable: false,
    clearable: false,
  });
  statesForm = computed(() => this.toDropdownForm(this.statesFormValues()));

  private toDropdownForm(v: Record<string, unknown>) {
    return {
      variant: (v['variant'] as InputVariant) ?? 'filled',
      size: (v['size'] as Size) ?? 'medium',
      mode: (v['mode'] as DropdownMode) ?? 'single',
      searchable: !!v['searchable'],
      clearable: !!v['clearable'],
      disabled: !!v['disabled'],
      required: !!v['required'],
    };
  }

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-dropdown',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'behavior', label: 'Behavior', icon: 'settings' as any },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      {
        key: 'label',
        label: 'Label',
        type: 'text',
        description: 'Field label',
        defaultValue: 'Select Option',
        placeholder: 'Enter label',
        group: 'content',
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        description: 'Placeholder text',
        defaultValue: 'Choose...',
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
        key: 'mode',
        label: 'Mode',
        type: 'dropdown',
        options: [
          { value: 'single', label: 'single' },
          { value: 'multi', label: 'multi' },
        ],
        defaultValue: 'single',
        group: 'behavior',
      },
      {
        key: 'variant',
        label: 'Variant',
        type: 'dropdown',
        options: DROPDOWN_INPUT_VARIANTS.map(v => ({ value: v, label: v })),
        defaultValue: 'filled',
        group: 'appearance',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        options: SIZES.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'appearance',
      },
      {
        key: 'searchable',
        label: 'Searchable',
        type: 'switch',
        description: 'Enable search',
        defaultValue: false,
        group: 'behavior',
      },
      {
        key: 'clearable',
        label: 'Clearable',
        type: 'switch',
        description: 'Show clear button',
        defaultValue: false,
        group: 'behavior',
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
    label: 'Select Option',
    placeholder: 'Choose...',
    helpText: '',
    mode: 'single',
    variant: 'filled',
    size: 'medium',
    searchable: false,
    clearable: false,
    disabled: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentPlaceholder = computed(() => this.values()['placeholder'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentMode = computed(() => this.values()['mode'] as DropdownMode);
  currentVariant = computed(() => this.values()['variant'] as InputVariant);
  currentSize = computed(() => this.values()['size'] as Size);
  currentSearchable = computed(() => this.values()['searchable'] as boolean);
  currentClearable = computed(() => this.values()['clearable'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
    const mode = newValues['mode'] as DropdownMode;
    if (mode === 'single' && Array.isArray(this.currentValue)) {
      this.currentValue = '';
    } else if (mode === 'multi' && !Array.isArray(this.currentValue)) {
      this.currentValue = [];
    }
  }

  onReset(): void {
    this.currentValue = this.currentMode() === 'single' ? '' : [];
  }

  onSelectionChange(value: any): void {
    this.showcase()?.logEvent('selectionChange', { value });
  }

  basicItems: DropdownItem[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4', disabled: true },
    { value: '5', label: 'Option 5' },
  ];
}
