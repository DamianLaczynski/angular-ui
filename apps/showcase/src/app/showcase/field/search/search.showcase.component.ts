import { Component, signal, computed, viewChild } from '@angular/core';
import { SearchComponent } from 'angular-ui';
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
  selector: 'app-search-showcase',
  imports: [
    SearchComponent,
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
        <h1 class="showcase__title">Search Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Search component built with Fluent 2 Design System. All
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
              <ui-search
                [label]="currentLabel()"
                [placeholder]="currentPlaceholder()"
                [variant]="currentVariant()"
                [size]="currentSize()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (change)="onSearchChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-search
                label="Search"
                placeholder="Search..."
                helpText="Enter your search query"
              ></ui-search>
            </div>
            <div class="showcase__item">
              <ui-search
                label="With Default Value"
                placeholder="Search..."
                [(ngModel)]="defaultValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="Search field with default value"
              ></ui-search>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-search
                label="Small Search Field"
                placeholder="Search..."
                size="small"
                helpText="This is a small search field"
                variant="underlined"
              ></ui-search>
            </div>
            <div class="showcase__item">
              <ui-search
                label="Medium Search Field"
                placeholder="Search..."
                size="medium"
                helpText="This is a medium search field"
                variant="filled-gray"
              ></ui-search>
            </div>
            <div class="showcase__item">
              <ui-search
                label="Large Search Field"
                placeholder="Search..."
                size="large"
                helpText="This is a large search field"
                variant="filled"
              ></ui-search>
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-search
                label="Normal State"
                placeholder="Search..."
                helpText="This is a normal search field"
              ></ui-search>
            </div>
            <div class="showcase__item">
              <ui-search
                label="Error State"
                placeholder="Search..."
                [(errorText)]="errorStateText"
              ></ui-search>
            </div>
          </div>
        </div>

        <!-- Interactive States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-search
                label="Disabled Field"
                placeholder="Search..."
                [disabled]="true"
                helpText="This field is disabled"
              ></ui-search>
            </div>
            <div class="showcase__item">
              <ui-search
                label="Read Only Field"
                placeholder="Search..."
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                helpText="This field is read only"
              ></ui-search>
            </div>
            <div class="showcase__item">
              <ui-search
                label="Required Field"
                placeholder="Search..."
                [required]="true"
                helpText="This field is required"
              ></ui-search>
            </div>
          </div>
        </div>

        <!-- Form Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form class="showcase__form">
                <ui-search
                  label="Product Search"
                  placeholder="Search products..."
                  [(ngModel)]="formData.productSearch"
                  [ngModelOptions]="{ standalone: true }"
                  helpText="Search for products"
                ></ui-search>
                <ui-search
                  label="User Search"
                  placeholder="Search users..."
                  [(ngModel)]="formData.userSearch"
                  [ngModelOptions]="{ standalone: true }"
                  helpText="Search for users"
                ></ui-search>
                <ui-search
                  label="Document Search"
                  placeholder="Search documents..."
                  [(ngModel)]="formData.documentSearch"
                  [ngModelOptions]="{ standalone: true }"
                  helpText="Search for documents"
                ></ui-search>
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
              <ui-search
                label="Small + Error"
                placeholder="Search..."
                size="small"
                [(errorText)]="smallErrorText"
              ></ui-search>
            </div>
            <div class="showcase__item">
              <ui-search
                label="Small + Disabled"
                placeholder="Search..."
                size="small"
                [disabled]="true"
                helpText="Small disabled field"
              ></ui-search>
            </div>
            <div class="showcase__item">
              <ui-search
                label="Medium + Read Only"
                placeholder="Search..."
                size="medium"
                [readonly]="true"
                [(ngModel)]="value"
                [ngModelOptions]="{ standalone: true }"
                helpText="Medium read only field"
              ></ui-search>
            </div>
            <div class="showcase__item">
              <ui-search
                label="Large + Required"
                placeholder="Search..."
                size="large"
                [required]="true"
                helpText="Large required field"
              ></ui-search>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SearchShowcaseComponent {
  value = 'Sample search query';
  defaultValue = 'Default search';

  errorStateText = 'Search query is too short';
  smallErrorText = 'Invalid search';

  formData = {
    productSearch: '',
    userSearch: '',
    documentSearch: '',
  };

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = '';
  sizes: Size[] = ['small', 'medium', 'large'];
  variants: InputVariant[] = ['filled', 'filled-gray', 'filled-lighter', 'underlined'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-search',
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
        defaultValue: 'Search',
        placeholder: 'Enter label',
        group: 'content',
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text',
        description: 'Placeholder text',
        defaultValue: 'Search...',
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
    label: 'Search',
    placeholder: 'Search...',
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

  onSearchChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}
