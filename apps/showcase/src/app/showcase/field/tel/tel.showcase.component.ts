import { Component, signal, computed, viewChild } from '@angular/core';
import { TelComponent } from 'angular-ui';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { InputVariant } from 'angular-ui';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-tel-showcase',
  imports: [
    TelComponent,
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
        <h1 class="showcase__title">Telephone Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Telephone component built with Fluent 2 Design System. All
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
              <ui-tel
                [label]="currentLabel()"
                [placeholder]="currentPlaceholder()"
                [variant]="currentVariant()"
                [size]="currentSize()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (change)="onTelChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-tel
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                helpText="Enter a valid phone number"
              ></ui-tel>
            </div>
            <div class="showcase__item">
              <ui-tel
                label="With Default Value"
                placeholder="+1 (555) 123-4567"
                [(ngModel)]="defaultValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="Telephone field with default value"
              ></ui-tel>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-tel
                label="Small Phone Field"
                placeholder="+1 (555) 123-4567"
                size="small"
                helpText="This is a small phone field"
                variant="underlined"
              ></ui-tel>
            </div>
            <div class="showcase__item">
              <ui-tel
                label="Medium Phone Field"
                placeholder="+1 (555) 123-4567"
                size="medium"
                helpText="This is a medium phone field"
                variant="filled-gray"
              ></ui-tel>
            </div>
            <div class="showcase__item">
              <ui-tel
                label="Large Phone Field"
                placeholder="+1 (555) 123-4567"
                size="large"
                helpText="This is a large phone field"
                variant="filled"
              ></ui-tel>
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-tel
                label="Normal State"
                placeholder="+1 (555) 123-4567"
                helpText="This is a normal phone field"
              ></ui-tel>
            </div>
            <div class="showcase__item">
              <ui-tel
                label="Error State"
                placeholder="+1 (555) 123-4567"
                [(errorText)]="errorStateText"
              ></ui-tel>
            </div>
          </div>
        </div>

        <!-- Interactive States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-tel
                label="Disabled Field"
                placeholder="+1 (555) 123-4567"
                [disabled]="true"
                helpText="This field is disabled"
              ></ui-tel>
            </div>
            <div class="showcase__item">
              <ui-tel
                label="Read Only Field"
                placeholder="+1 (555) 123-4567"
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                helpText="This field is read only"
              ></ui-tel>
            </div>
            <div class="showcase__item">
              <ui-tel
                label="Required Field"
                placeholder="+1 (555) 123-4567"
                [required]="true"
                helpText="This field is required"
              ></ui-tel>
            </div>
          </div>
        </div>

        <!-- Form Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form class="showcase__form">
                <ui-tel
                  label="Mobile Phone"
                  placeholder="+1 (555) 123-4567"
                  [(ngModel)]="formData.mobile"
                  [ngModelOptions]="{ standalone: true }"
                  [required]="true"
                  helpText="Enter your mobile phone number"
                ></ui-tel>
                <ui-tel
                  label="Home Phone"
                  placeholder="+1 (555) 123-4567"
                  [(ngModel)]="formData.home"
                  [ngModelOptions]="{ standalone: true }"
                  helpText="Enter your home phone number (optional)"
                ></ui-tel>
                <ui-tel
                  label="Work Phone"
                  placeholder="+1 (555) 123-4567"
                  [(ngModel)]="formData.work"
                  [ngModelOptions]="{ standalone: true }"
                  helpText="Enter your work phone number"
                ></ui-tel>
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
              <ui-tel
                label="Small + Error"
                placeholder="+1 (555) 123-4567"
                size="small"
                [(errorText)]="smallErrorText"
              ></ui-tel>
            </div>
            <div class="showcase__item">
              <ui-tel
                label="Small + Disabled"
                placeholder="+1 (555) 123-4567"
                size="small"
                [disabled]="true"
                helpText="Small disabled field"
              ></ui-tel>
            </div>
            <div class="showcase__item">
              <ui-tel
                label="Medium + Read Only"
                placeholder="+1 (555) 123-4567"
                size="medium"
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                helpText="Medium read only field"
              ></ui-tel>
            </div>
            <div class="showcase__item">
              <ui-tel
                label="Large + Required"
                placeholder="+1 (555) 123-4567"
                size="large"
                [required]="true"
                helpText="Large required field"
              ></ui-tel>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TelShowcaseComponent {
  value = '+1 (555) 123-4567';
  defaultValue = '+1 (555) 987-6543';

  formData = {
    mobile: '',
    home: '',
    work: '',
  };

  errorStateText = 'Invalid phone number format';
  smallErrorText = 'Invalid phone';

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = '';
  sizes: Size[] = ['small', 'medium', 'large'];
  variants: InputVariant[] = ['filled', 'filled-gray', 'filled-lighter', 'underlined'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-tel',
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
        defaultValue: 'Phone Number',
        group: 'content',
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        defaultValue: '+1 (555) 123-4567',
        group: 'content',
      },
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
      { key: 'disabled', label: 'Disabled', type: 'switch', defaultValue: false, group: 'state' },
      { key: 'readonly', label: 'Readonly', type: 'switch', defaultValue: false, group: 'state' },
      { key: 'required', label: 'Required', type: 'switch', defaultValue: false, group: 'state' },
    ],
  };

  private values = signal<Record<string, any>>({
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
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
  onTelChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}

