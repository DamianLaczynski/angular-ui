import { Component, signal, computed, viewChild } from '@angular/core';
import { UrlComponent } from 'angular-ui';
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
  selector: 'app-url-showcase',
  imports: [
    UrlComponent,
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
        <h1 class="showcase__title">URL Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the URL component built with Fluent 2 Design System. All
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
              <ui-url
                [label]="currentLabel()"
                [placeholder]="currentPlaceholder()"
                [variant]="currentVariant()"
                [size]="currentSize()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (change)="onUrlChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-url
                label="Website URL"
                placeholder="https://example.com"
                helpText="Enter a valid website URL"
              ></ui-url>
            </div>
            <div class="showcase__item">
              <ui-url
                label="With Default Value"
                placeholder="https://example.com"
                [(ngModel)]="defaultValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="URL field with default value"
              ></ui-url>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-url
                label="Small URL Field"
                placeholder="https://example.com"
                size="small"
                helpText="This is a small URL field"
                variant="underlined"
              ></ui-url>
            </div>
            <div class="showcase__item">
              <ui-url
                label="Medium URL Field"
                placeholder="https://example.com"
                size="medium"
                helpText="This is a medium URL field"
                variant="filled-gray"
              ></ui-url>
            </div>
            <div class="showcase__item">
              <ui-url
                label="Large URL Field"
                placeholder="https://example.com"
                size="large"
                helpText="This is a large URL field"
                variant="filled"
              ></ui-url>
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-url
                label="Normal State"
                placeholder="https://example.com"
                helpText="This is a normal URL field"
              ></ui-url>
            </div>
            <div class="showcase__item">
              <ui-url
                label="Error State"
                placeholder="https://example.com"
                [(errorText)]="errorStateText"
              ></ui-url>
            </div>
          </div>
        </div>

        <!-- Interactive States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-url
                label="Disabled Field"
                placeholder="https://example.com"
                [disabled]="true"
                helpText="This field is disabled"
              ></ui-url>
            </div>
            <div class="showcase__item">
              <ui-url
                label="Read Only Field"
                placeholder="https://example.com"
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                helpText="This field is read only"
              ></ui-url>
            </div>
            <div class="showcase__item">
              <ui-url
                label="Required Field"
                placeholder="https://example.com"
                [required]="true"
                helpText="This field is required"
              ></ui-url>
            </div>
          </div>
        </div>

        <!-- Form Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form class="showcase__form">
                <ui-url
                  label="Website URL"
                  placeholder="https://example.com"
                  [(ngModel)]="formData.website"
                  [ngModelOptions]="{ standalone: true }"
                  [required]="true"
                  helpText="Enter your website URL"
                ></ui-url>
                <ui-url
                  label="GitHub Repository"
                  placeholder="https://github.com/user/repo"
                  [(ngModel)]="formData.github"
                  [ngModelOptions]="{ standalone: true }"
                  helpText="Enter your GitHub repository URL"
                ></ui-url>
                <ui-url
                  label="LinkedIn Profile"
                  placeholder="https://linkedin.com/in/profile"
                  [(ngModel)]="formData.linkedin"
                  [ngModelOptions]="{ standalone: true }"
                  helpText="Enter your LinkedIn profile URL"
                ></ui-url>
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
              <ui-url
                label="Small + Error"
                placeholder="https://example.com"
                size="small"
                [(errorText)]="smallErrorText"
              ></ui-url>
            </div>
            <div class="showcase__item">
              <ui-url
                label="Small + Disabled"
                placeholder="https://example.com"
                size="small"
                [disabled]="true"
                helpText="Small disabled field"
              ></ui-url>
            </div>
            <div class="showcase__item">
              <ui-url
                label="Medium + Read Only"
                placeholder="https://example.com"
                size="medium"
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                helpText="Medium read only field"
              ></ui-url>
            </div>
            <div class="showcase__item">
              <ui-url
                label="Large + Required"
                placeholder="https://example.com"
                size="large"
                [required]="true"
                helpText="Large required field"
              ></ui-url>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class UrlShowcaseComponent {
  value = 'https://example.com';
  defaultValue = 'https://www.microsoft.com';

  formData = {
    website: '',
    github: '',
    linkedin: '',
  };

  errorStateText = 'Invalid URL format';
  smallErrorText = 'Invalid URL';

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = '';
  sizes: Size[] = ['small', 'medium', 'large'];
  variants: InputVariant[] = ['filled', 'filled-gray', 'filled-lighter', 'underlined'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-url',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      { key: 'label', label: 'Label', type: 'text', defaultValue: 'Website URL', group: 'content' },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        defaultValue: 'https://example.com',
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
    label: 'Website URL',
    placeholder: 'https://example.com',
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
  onUrlChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}
