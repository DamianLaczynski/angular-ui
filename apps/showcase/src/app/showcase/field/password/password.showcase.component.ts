import { Component, signal, computed, viewChild } from '@angular/core';
import { PasswordComponent } from 'angular-ui';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { InputVariant } from 'angular-ui';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-password-showcase',

  imports: [
    PasswordComponent,
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
        <h1 class="showcase__title">Password Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Password component built with Fluent 2 Design System.
          Features password visibility toggle, all variants are responsive and accessible.
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
              <ui-password
                [label]="currentLabel()"
                [placeholder]="currentPlaceholder()"
                [variant]="currentVariant()"
                [size]="currentSize()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (change)="onPasswordChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-password
                label="Standard Password Field"
                placeholder="Enter your password"
                helpText="Password must be at least 8 characters"
              ></ui-password>
            </div>
            <div class="showcase__item">
              <ui-password
                label="Password with Value"
                placeholder="Enter password"
                [(ngModel)]="defaultPassword"
                [ngModelOptions]="{ standalone: true }"
                helpText="Toggle visibility to see password"
              ></ui-password>
            </div>
          </div>
        </div>

        <!-- Variant Styles -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variant Styles</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-password
                label="Filled Variant"
                placeholder="Enter password"
                variant="filled"
                helpText="Default filled variant"
              ></ui-password>
            </div>
            <div class="showcase__item">
              <ui-password
                label="Filled Gray Variant"
                placeholder="Enter password"
                variant="filled-gray"
                helpText="Filled with gray background"
              ></ui-password>
            </div>
            <div class="showcase__item">
              <ui-password
                label="Underlined Variant"
                placeholder="Enter password"
                variant="underlined"
                helpText="Minimal underlined variant"
              ></ui-password>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-password
                label="Small Password Field"
                placeholder="Small password input"
                size="small"
                helpText="Small size password field"
              ></ui-password>
            </div>
            <div class="showcase__item">
              <ui-password
                label="Medium Password Field"
                placeholder="Medium password input"
                size="medium"
                helpText="Medium size password field (default)"
              ></ui-password>
            </div>
            <div class="showcase__item">
              <ui-password
                label="Large Password Field"
                placeholder="Large password input"
                size="large"
                helpText="Large size password field"
              ></ui-password>
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-password
                label="Normal State"
                placeholder="Normal state"
                helpText="This is a normal password field"
              ></ui-password>
            </div>
            <div class="showcase__item">
              <ui-password
                label="Error State"
                placeholder="Error state"
                [(errorText)]="errorStateText"
              ></ui-password>
            </div>
          </div>
        </div>

        <!-- Interactive States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-password
                label="Disabled Field"
                placeholder="Disabled field"
                [disabled]="true"
                helpText="This field is disabled"
              ></ui-password>
            </div>
            <div class="showcase__item">
              <ui-password
                label="Read Only Field"
                placeholder="Read only field"
                [readonly]="true"
                [(ngModel)]="readonlyPassword"
                [ngModelOptions]="{ standalone: true }"
                helpText="This field is read only"
              ></ui-password>
            </div>
            <div class="showcase__item">
              <ui-password
                label="Required Field"
                placeholder="Required field"
                [required]="true"
                helpText="This field is required"
              ></ui-password>
            </div>
          </div>
        </div>

        <!-- Password Strength Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Password Strength Indicator Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-password
                label="Password"
                placeholder="Enter a strong password"
                [(ngModel)]="passwordWithStrength"
                [ngModelOptions]="{ standalone: true }"
                [helpText]="passwordHelpText"
                [(errorText)]="passwordErrorText"
              ></ui-password>
              <div class="showcase__password-strength-bar">
                <div
                  class="showcase__password-strength-bar__fill"
                  [attr.data-strength]="passwordStrength"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Registration Form Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form class="showcase__form">
                <ui-password
                  label="Password"
                  placeholder="Enter password"
                  [(ngModel)]="formData.password"
                  [ngModelOptions]="{ standalone: true }"
                  [required]="true"
                  helpText="Must be at least 8 characters with uppercase, lowercase, and numbers"
                ></ui-password>
                <ui-password
                  label="Confirm Password"
                  placeholder="Re-enter password"
                  [(ngModel)]="formData.confirmPassword"
                  [ngModelOptions]="{ standalone: true }"
                  [required]="true"
                  [(errorText)]="confirmPasswordErrorText"
                  [helpText]="
                    passwordsMatch && formData.confirmPassword
                      ? 'Passwords match'
                      : 'Must match the password above'
                  "
                ></ui-password>
                <div class="showcase__form-output">
                  <strong>Form Values:</strong>
                  <pre>{{
                    {
                      password: formData.password ? '***' : '',
                      confirmPassword: formData.confirmPassword ? '***' : '',
                    } | json
                  }}</pre>
                  <div><strong>Passwords Match:</strong> {{ passwordsMatch ? 'Yes' : 'No' }}</div>
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
              <ui-password
                label="Small + Error"
                placeholder="Small error"
                size="small"
                [(errorText)]="smallErrorText"
              ></ui-password>
            </div>
            <div class="showcase__item">
              <ui-password
                label="Small + Disabled"
                placeholder="Small disabled"
                size="small"
                [disabled]="true"
                helpText="Small disabled field"
              ></ui-password>
            </div>
            <div class="showcase__item">
              <ui-password
                label="Medium + Read Only"
                placeholder="Medium read only"
                size="medium"
                [readonly]="true"
                [(ngModel)]="readonlyPassword"
                [ngModelOptions]="{ standalone: true }"
                helpText="Medium read only field"
              ></ui-password>
            </div>
            <div class="showcase__item">
              <ui-password
                label="Large + Required + Underlined"
                placeholder="Large required"
                size="large"
                variant="underlined"
                [required]="true"
                helpText="Large required underlined field"
              ></ui-password>
            </div>
          </div>
        </div>

        <!-- Autocomplete Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Autocomplete Attributes</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-password
                label="New Password"
                placeholder="Create new password"
                autocomplete="new-password"
                helpText="For registration or password creation"
              ></ui-password>
            </div>
            <div class="showcase__item">
              <ui-password
                label="Current Password"
                placeholder="Enter current password"
                autocomplete="current-password"
                helpText="For login or verification"
              ></ui-password>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PasswordShowcaseComponent {
  defaultPassword = 'SecurePass123';
  readonlyPassword = 'ReadOnlyPassword';
  passwordWithStrength = '';

  formData = {
    password: '',
    confirmPassword: '',
  };

  get passwordsMatch(): boolean {
    return (
      this.formData.password === this.formData.confirmPassword && this.formData.password !== ''
    );
  }

  get passwordStrength(): 'weak' | 'medium' | 'strong' | '' {
    if (!this.passwordWithStrength) return '';

    const hasLower = /[a-z]/.test(this.passwordWithStrength);
    const hasUpper = /[A-Z]/.test(this.passwordWithStrength);
    const hasNumber = /\d/.test(this.passwordWithStrength);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(this.passwordWithStrength);
    const isLongEnough = this.passwordWithStrength.length >= 8;

    const criteria = [hasLower, hasUpper, hasNumber, hasSpecial, isLongEnough].filter(
      Boolean,
    ).length;

    if (criteria <= 2) return 'weak';
    if (criteria <= 3) return 'medium';
    return 'strong';
  }

  get passwordErrorText(): string {
    if (!this.passwordWithStrength) return '';
    const strength = this.passwordStrength;
    if (strength === 'weak')
      return 'Password is too weak. Add uppercase, numbers, and special characters.';
    return '';
  }

  get passwordHelpText(): string {
    if (!this.passwordWithStrength) return 'Enter a password to check its strength';
    const strength = this.passwordStrength;
    if (strength === 'weak') return ''; // Error text will be shown instead
    if (strength === 'medium') return 'Password strength: Medium. Consider adding more variety.';
    return 'Strong password! Good job.';
  }

  get confirmPasswordErrorText(): string {
    return !this.passwordsMatch && this.formData.confirmPassword ? 'Passwords do not match' : '';
  }

  errorStateText = 'Password must contain at least one uppercase letter';
  smallErrorText = 'Password is required';

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = '';
  sizes: Size[] = ['small', 'medium', 'large'];
  variants: InputVariant[] = ['filled', 'filled-gray', 'filled-lighter', 'underlined'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-password',
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
        defaultValue: 'Password',
        placeholder: 'Enter label',
        group: 'content',
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        description: 'Placeholder text',
        defaultValue: 'Enter password...',
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
    label: 'Password',
    placeholder: 'Enter password...',
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

  onPasswordChange(value: string): void {
    this.showcase()?.logEvent('change', { value: '***' });
  }
}
