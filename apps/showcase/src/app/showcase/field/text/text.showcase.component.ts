import { Component, signal, computed, viewChild } from '@angular/core';
import { TextComponent } from 'angular-ui';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { Size } from 'angular-ui';
import { InputVariant } from 'angular-ui';

@Component({
  selector: 'app-text-showcase',

  imports: [
    TextComponent,
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
        <h1 class="showcase__title">Text Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Text component built with Fluent 2 Design System. All
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
              <ui-text
                [label]="currentLabel()"
                [placeholder]="currentPlaceholder()"
                [variant]="currentVariant()"
                [size]="currentSize()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (change)="onTextChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-text
                label="Standard Text Field"
                placeholder="Enter text"
                helpText="This is a standard text field"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <ui-text
                label="With Default Value"
                placeholder="Enter text"
                [(ngModel)]="defaultValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="Text field with default value"
              ></ui-text>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-text
                label="Small Text Field"
                placeholder="Small text input"
                size="small"
                helpText="This is a small text field"
                variant="underlined"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <ui-text
                label="Medium Text Field"
                placeholder="Medium text input"
                size="medium"
                helpText="This is a medium text field"
                variant="filled-gray"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <ui-text
                label="Large Text Field"
                placeholder="Large text input"
                size="large"
                helpText="This is a large text field"
                variant="filled-lighter"
              ></ui-text>
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-text
                label="Normal State"
                placeholder="Normal state"
                helpText="This is a normal text field"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <ui-text
                label="Error State"
                placeholder="Error state"
                [(errorText)]="errorStateText"
              ></ui-text>
            </div>
          </div>
        </div>

        <!-- Interactive States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-text
                label="Disabled Field"
                placeholder="Disabled field"
                [disabled]="true"
                helpText="This field is disabled"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <ui-text
                label="Read Only Field"
                placeholder="Read only field"
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                helpText="This field is read only"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <ui-text
                label="Required Field"
                placeholder="Required field"
                [required]="true"
                helpText="This field is required"
              ></ui-text>
            </div>
          </div>
        </div>

        <!-- Form Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form class="showcase__form">
                <ui-text
                  label="First Name"
                  placeholder="Enter first name"
                  [(ngModel)]="formData.firstName"
                  [ngModelOptions]="{ standalone: true }"
                  [required]="true"
                  helpText="Enter your first name"
                ></ui-text>
                <ui-text
                  label="Last Name"
                  placeholder="Enter last name"
                  [(ngModel)]="formData.lastName"
                  [ngModelOptions]="{ standalone: true }"
                  [required]="true"
                  helpText="Enter your last name"
                ></ui-text>
                <ui-text
                  label="Email Address"
                  placeholder="Enter email address"
                  [(ngModel)]="formData.email"
                  [ngModelOptions]="{ standalone: true }"
                  [required]="true"
                  helpText="Enter your email address"
                ></ui-text>
                <ui-text
                  label="Comments"
                  placeholder="Enter your comments"
                  [(ngModel)]="formData.comments"
                  [ngModelOptions]="{ standalone: true }"
                  helpText="Optional comments"
                ></ui-text>
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
              <ui-text
                label="Small + Error"
                placeholder="Small error"
                size="small"
                [(errorText)]="smallErrorText"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <ui-text
                label="Small + Disabled"
                placeholder="Small disabled"
                size="small"
                [disabled]="true"
                helpText="Small disabled field"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <ui-text
                label="Medium + Read Only"
                placeholder="Medium read only"
                size="medium"
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                helpText="Medium read only field"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <ui-text
                label="Large + Required"
                placeholder="Large required"
                size="large"
                [required]="true"
                helpText="Large required field"
              ></ui-text>
            </div>
          </div>
        </div>

        <!-- Variant Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variant Examples</h2>
          <p class="showcase__section__description">
            Different visual variants of the text input component.
          </p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Filled Variant</h3>
              <ui-text
                label="Filled Text Field"
                placeholder="Enter text"
                variant="filled"
                helpText="Filled variant with background color"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <h3>Filled Gray Variant</h3>
              <ui-text
                label="Filled Gray Text Field"
                placeholder="Enter text"
                variant="filled-gray"
                helpText="Filled gray variant"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <h3>Filled Lighter Variant</h3>
              <ui-text
                label="Filled Lighter Text Field"
                placeholder="Enter text"
                variant="filled-lighter"
                helpText="Filled lighter variant"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <h3>Underlined Variant</h3>
              <ui-text
                label="Underlined Text Field"
                placeholder="Enter text"
                variant="underlined"
                helpText="Underlined variant with bottom border"
              ></ui-text>
            </div>
          </div>
        </div>

        <!-- Advanced Features -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Advanced Features</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>With Prefix</h3>
              <ui-text
                label="Phone Number"
                placeholder="Enter phone number"
                helpText="Text field with prefix icon"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <h3>With Suffix</h3>
              <ui-text
                label="Search"
                placeholder="Search..."
                helpText="Text field with suffix icon"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <h3>With Validation</h3>
              <ui-text
                label="Email with Validation"
                placeholder="email@example.com"
                [required]="true"
                helpText="Field with email validation"
              ></ui-text>
            </div>
          </div>
          <div class="showcase__item" style="margin-top: 20px;">
            <h3>Character Counter</h3>
            <ui-text
              label="Limited Text"
              placeholder="Enter text (max 100 characters)"
              helpText="Text field with character limit"
              [(ngModel)]="limitedText"
              [ngModelOptions]="{ standalone: true }"
            ></ui-text>
            <p style="font-size: 12px; color: #666; margin-top: 4px;">
              Characters: {{ limitedText.length }}/100
            </p>
          </div>
        </div>

        <!-- Accessibility Features -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Accessibility Features</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>ARIA Labels</h3>
              <ui-text
                label="Accessible Field"
                placeholder="Enter accessible text"
                helpText="Field with proper ARIA attributes"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <h3>Keyboard Navigation</h3>
              <ui-text
                label="Keyboard Accessible"
                placeholder="Use Tab to navigate"
                helpText="Fully keyboard accessible"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <h3>Screen Reader Support</h3>
              <ui-text
                label="Screen Reader Friendly"
                placeholder="Screen reader text"
                helpText="Optimized for screen readers"
              ></ui-text>
            </div>
          </div>
        </div>

        <!-- Performance Considerations -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Performance Considerations</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Debounced Input</h3>
              <ui-text
                label="Search with Debounce"
                placeholder="Type to search..."
                helpText="Input with debounce for performance"
              ></ui-text>
            </div>
            <div class="showcase__item">
              <h3>Lazy Validation</h3>
              <ui-text
                label="Lazy Validated Field"
                placeholder="Validates on blur"
                helpText="Validation occurs on blur event"
              ></ui-text>
            </div>
          </div>
        </div>

        <!-- Best Practices -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Best Practices</h2>
          <div class="showcase__item">
            <h3>Label Placement</h3>
            <p class="showcase__section__description">
              Always provide clear, descriptive labels for text inputs.
            </p>
            <ui-text
              label="Clear Label Example"
              placeholder="Enter your information"
              helpText="Good: Clear and descriptive label"
            ></ui-text>
          </div>
          <div class="showcase__item" style="margin-top: 20px;">
            <h3>Help Text Usage</h3>
            <p class="showcase__section__description">
              Use help text to provide additional context or instructions.
            </p>
            <ui-text
              label="Help Text Example"
              placeholder="Enter value"
              helpText="Help text provides additional context and guidance to users"
            ></ui-text>
          </div>
          <div class="showcase__item" style="margin-top: 20px;">
            <h3>Error Handling</h3>
            <p class="showcase__section__description">
              Provide clear error messages when validation fails.
            </p>
            <ui-text
              label="Error Example"
              placeholder="Enter valid email"
              [(errorText)]="errorExampleText"
            ></ui-text>
          </div>
        </div>

        <!-- Integration Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Integration Examples</h2>
          <div class="showcase__item">
            <h3>With Reactive Forms</h3>
            <p class="showcase__section__description">
              Example of text input integrated with Angular reactive forms.
            </p>
            <ui-text
              label="Reactive Form Field"
              placeholder="Enter value"
              helpText="Works seamlessly with reactive forms"
            ></ui-text>
          </div>
          <div class="showcase__item" style="margin-top: 20px;">
            <h3>With Template-Driven Forms</h3>
            <p class="showcase__section__description">
              Example of text input with template-driven forms using ngModel.
            </p>
            <ui-text
              label="Template-Driven Field"
              placeholder="Enter value"
              [(ngModel)]="templateValue"
              [ngModelOptions]="{ standalone: true }"
              helpText="Works with template-driven forms"
            ></ui-text>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TextShowcaseComponent {
  value = 'This is a read-only value';
  defaultValue = 'Default value';
  limitedText = '';
  templateValue = '';

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    comments: '',
  };

  errorStateText = 'This field has an error';
  smallErrorText = 'Small error field';
  errorExampleText = 'Please enter a valid email address';

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = '';
  sizes: Size[] = ['small', 'medium', 'large'];
  variants: InputVariant[] = ['filled', 'filled-gray', 'filled-lighter', 'underlined'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-text',
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
        defaultValue: 'Text Field',
        placeholder: 'Enter label',
        group: 'content',
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        description: 'Placeholder text',
        defaultValue: 'Enter text...',
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
    label: 'Text Field',
    placeholder: 'Enter text...',
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

  onTextChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}
