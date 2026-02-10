import { Component, signal, computed, viewChild } from '@angular/core';
import { TotpComponent } from 'angular-ui';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-totp-showcase',

  imports: [
    TotpComponent,
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
        <h1 class="showcase__title">TOTP Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the TOTP (Time-based One-Time Password) component built with
          Fluent 2 Design System. Features automatic focus management, paste support, and keyboard
          navigation. All variants are responsive and accessible.
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
              <ui-totp
                [label]="currentLabel()"
                [placeholder]="currentPlaceholder()"
                [digitsCount]="currentDigitsCount()"
                [inputVariant]="currentVariant()"
                [size]="currentSize()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (change)="onTotpChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-totp
                label="One-Time Password"
                helpText="Enter the 6-digit code from your authenticator app"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="TOTP Code"
                helpText="You can paste the full code or type digit by digit"
                [(ngModel)]="defaultTotp"
                [ngModelOptions]="{ standalone: true }"
              ></ui-totp>
            </div>
          </div>
        </div>

        <!-- Digit Count Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Digit Count Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-totp
                label="4-Digit Code"
                [digitsCount]="4"
                helpText="4-digit verification code"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="6-Digit Code (Default)"
                [digitsCount]="6"
                helpText="6-digit TOTP code (standard)"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="8-Digit Code"
                [digitsCount]="8"
                helpText="8-digit verification code"
              ></ui-totp>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-totp
                label="Small TOTP Field"
                size="small"
                helpText="Small size TOTP field"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="Medium TOTP Field"
                size="medium"
                helpText="Medium size TOTP field (default)"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="Large TOTP Field"
                size="large"
                helpText="Large size TOTP field"
              ></ui-totp>
            </div>
          </div>
        </div>

        <!-- Variant Styles -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variant Styles</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-totp
                label="Filled Variant"
                inputVariant="filled"
                helpText="Default filled variant"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="Filled Gray Variant"
                inputVariant="filled-gray"
                helpText="Filled with gray background"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="Underlined Variant"
                inputVariant="underlined"
                helpText="Minimal underlined variant"
              ></ui-totp>
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-totp label="Normal State" helpText="This is a normal TOTP field"></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp label="Error State" [(errorText)]="errorStateText"></ui-totp>
            </div>
          </div>
        </div>

        <!-- Interactive States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-totp
                label="Disabled Field"
                [disabled]="true"
                helpText="This field is disabled"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="Read Only Field"
                [readonly]="true"
                [(ngModel)]="readonlyTotp"
                [ngModelOptions]="{ standalone: true }"
                helpText="This field is read only"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="Required Field"
                [required]="true"
                helpText="This field is required"
              ></ui-totp>
            </div>
          </div>
        </div>

        <!-- Features Demo -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Features Demo</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-totp
                label="Keyboard Navigation"
                helpText="Use arrow keys to navigate between digits, Backspace to go back"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="Paste Support"
                helpText="Try pasting a code (Ctrl+V or Cmd+V). It will auto-fill all digits."
                [(ngModel)]="pasteDemoTotp"
                [ngModelOptions]="{ standalone: true }"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="Auto Focus"
                helpText="After entering a digit, focus automatically moves to the next field"
              ></ui-totp>
            </div>
          </div>
        </div>

        <!-- Form Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Two-Factor Authentication Form Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form class="showcase__form">
                <ui-totp
                  label="Verification Code"
                  placeholder="Enter 6-digit code"
                  [(ngModel)]="formData.totpCode"
                  [ngModelOptions]="{ standalone: true }"
                  [required]="true"
                  [(errorText)]="totpErrorText"
                  [helpText]="
                    totpValidationState === 'success'
                      ? 'Code verified!'
                      : 'Enter the 6-digit code from your authenticator app'
                  "
                ></ui-totp>
                <div class="showcase__form-output">
                  <strong>Form Value:</strong>
                  <pre>{{ { totpCode: formData.totpCode || '(empty)' } | json }}</pre>
                  <div>
                    <strong>Code Length:</strong>
                    {{ formData.totpCode.length || 0 }}/6
                  </div>
                  <div>
                    <strong>Is Valid:</strong>
                    {{ totpValidationState === 'success' ? 'Yes' : 'No' }}
                  </div>
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
              <ui-totp label="Small + Error" size="small" [(errorText)]="smallErrorText"></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="Small + Disabled"
                size="small"
                [disabled]="true"
                helpText="Small disabled field"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="Medium + Read Only"
                size="medium"
                [readonly]="true"
                [(ngModel)]="readonlyTotp"
                [ngModelOptions]="{ standalone: true }"
                helpText="Medium read only field"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="Large + Required + Underlined"
                size="large"
                inputVariant="underlined"
                [required]="true"
                helpText="Large required underlined field"
              ></ui-totp>
            </div>
          </div>
        </div>

        <!-- Real-World Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Real-World Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-totp
                label="Google Authenticator Code"
                helpText="Enter the 6-digit code from Google Authenticator"
                [required]="true"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="Microsoft Authenticator"
                helpText="Enter code from Microsoft Authenticator app"
                inputVariant="filled-gray"
              ></ui-totp>
            </div>
            <div class="showcase__item">
              <ui-totp
                label="SMS Verification Code"
                [digitsCount]="4"
                helpText="Enter the 4-digit code sent to your phone"
                inputVariant="underlined"
              ></ui-totp>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TotpShowcaseComponent {
  defaultTotp = '123456';
  readonlyTotp = '654321';
  pasteDemoTotp = '';

  formData = {
    totpCode: '',
  };

  get totpValidationState(): 'error' | 'warning' | 'success' | 'info' {
    const code = this.formData.totpCode;
    if (!code) return 'info';
    if (code.length < 6) return 'warning';
    // Simple validation: check if all digits and length is 6
    if (code.length === 6 && /^\d{6}$/.test(code)) {
      // In real app, you would verify against server here
      return 'success';
    }
    return 'error';
  }

  get totpErrorText(): string {
    const state = this.totpValidationState;
    return state === 'error' ? 'Invalid verification code' : '';
  }

  errorStateText = 'Invalid code. Please try again.';
  smallErrorText = 'Invalid code';

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = '';
  sizes: Size[] = ['small', 'medium', 'large'];
  variants = ['filled', 'filled-gray', 'filled-lighter', 'underlined'];
  digitCounts = [4, 6, 8];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-totp',
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
        defaultValue: 'Verification Code',
        group: 'content',
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        defaultValue: 'Enter code',
        group: 'content',
      },
      { key: 'helpText', label: 'Help Text', type: 'text', defaultValue: '', group: 'content' },
      {
        key: 'digitsCount',
        label: 'Digits Count',
        type: 'dropdown',
        options: this.digitCounts.map(d => ({ value: d, label: d.toString() })),
        defaultValue: 6,
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
      { key: 'disabled', label: 'Disabled', type: 'switch', defaultValue: false, group: 'state' },
      { key: 'readonly', label: 'Readonly', type: 'switch', defaultValue: false, group: 'state' },
      { key: 'required', label: 'Required', type: 'switch', defaultValue: false, group: 'state' },
    ],
  };

  private values = signal<Record<string, any>>({
    label: 'Verification Code',
    placeholder: 'Enter code',
    helpText: '',
    digitsCount: 6,
    variant: 'filled',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  currentLabel = computed(() => this.values()['label'] as string);
  currentPlaceholder = computed(() => this.values()['placeholder'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentDigitsCount = computed(() => this.values()['digitsCount'] as number);
  currentVariant = computed(() => this.values()['variant'] as any);
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
  onTotpChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}
