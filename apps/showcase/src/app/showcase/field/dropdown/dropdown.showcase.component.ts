import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { DropdownComponent } from 'angular-ui';
import { DropdownItem, DropdownMode } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { InputVariant } from 'angular-ui';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-dropdown-showcase',

  imports: [
    DropdownComponent,
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
        <h1 class="showcase__title">Dropdown Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Dropdown (Horizontal Select) component built with Fluent 2
          Design System. All variants are responsive and accessible.
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
              <ui-dropdown
                [label]="currentLabel()"
                [placeholder]="currentPlaceholder()"
                [items]="basicItems"
                [mode]="currentMode()"
                [variant]="currentVariant()"
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

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-dropdown
                label="Single Select"
                [items]="basicItems"
                mode="single"
                variant="filled"
                placeholder="Select an option"
                helpText="Choose one option from the list"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Multi Select"
                [items]="basicItems"
                mode="multi"
                variant="filled"
                placeholder="Select options"
                helpText="Choose multiple options"
              />
            </div>
          </div>
        </div>

        <!-- With Icons -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">With Icons</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-dropdown
                label="Countries"
                [items]="countriesWithIcons"
                mode="single"
                variant="filled"
                placeholder="Select a country"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Actions"
                [items]="actionsWithIcons"
                mode="single"
                variant="filled"
                placeholder="Select an action"
              />
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-dropdown
                label="Small Dropdown"
                [items]="basicItems"
                size="small"
                variant="filled"
                placeholder="Small size"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Medium Dropdown (Default)"
                [items]="basicItems"
                size="medium"
                variant="filled"
                placeholder="Medium size"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Large Dropdown"
                [items]="basicItems"
                size="large"
                variant="filled"
                placeholder="Large size"
              />
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-dropdown
                label="Normal State"
                [items]="basicItems"
                variant="filled"
                helpText="This is a normal dropdown"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Error State"
                [items]="basicItems"
                variant="filled"
                [(errorText)]="errorStateText"
              />
            </div>
          </div>
        </div>

        <!-- Interactive States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-dropdown
                label="Disabled Dropdown"
                [items]="basicItems"
                [disabled]="true"
                variant="filled"
                helpText="This dropdown is disabled"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Required Dropdown"
                [items]="basicItems"
                [required]="true"
                variant="filled"
                helpText="This field is required"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Clearable Dropdown"
                [items]="basicItems"
                [clearable]="true"
                variant="filled"
                helpText="You can clear the selection"
              />
            </div>
          </div>
        </div>

        <!-- Searchable -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Searchable Dropdown</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-dropdown
                label="Search Countries"
                [items]="longCountryList"
                [searchable]="true"
                [clearable]="true"
                variant="filled"
                placeholder="Type to search..."
                maxHeight="200px"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Search Cities"
                [items]="cityList"
                [searchable]="true"
                mode="multi"
                variant="filled"
                placeholder="Search cities..."
              />
            </div>
          </div>
        </div>

        <!-- Variant Options -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variant Options</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-dropdown
                label="Filled Variant"
                [items]="basicItems"
                variant="filled"
                placeholder="Filled style"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Underlined Variant"
                [items]="basicItems"
                variant="underlined"
                placeholder="Underlined style"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Filled Gray Variant"
                [items]="basicItems"
                variant="filled-gray"
                placeholder="Filled gray style"
              />
            </div>
          </div>
        </div>

        <!-- Multi-Select with Tags -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Multi-Select with Tags</h2>
          <p class="showcase__description">
            In multi-select mode, selected items are displayed as dismissible tags. Click the X
            button on any tag to remove it from the selection.
          </p>

          <h3 class="showcase__subsection__title">Basic Multi-Select with Tags</h3>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-dropdown
                label="Select Skills"
                [items]="skillsWithIcons"
                mode="multi"
                variant="filled"
                placeholder="Select your skills"
                [clearable]="true"
                helpText="Selected items appear as tags"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Choose Technologies"
                [items]="technologiesWithIcons"
                mode="multi"
                variant="filled"
                placeholder="Select technologies"
                [clearable]="true"
              />
            </div>
          </div>

          <h3 class="showcase__subsection__title">Multi-Select with Tags - Different Sizes</h3>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-dropdown
                label="Small Size"
                [items]="skillsWithIcons"
                mode="multi"
                size="small"
                variant="filled"
                placeholder="Select skills"
                [clearable]="true"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Medium Size (Default)"
                [items]="skillsWithIcons"
                mode="multi"
                size="medium"
                variant="filled"
                placeholder="Select skills"
                [clearable]="true"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Large Size"
                [items]="skillsWithIcons"
                mode="multi"
                size="large"
                variant="filled"
                placeholder="Select skills"
                [clearable]="true"
              />
            </div>
          </div>

          <h3 class="showcase__subsection__title">Searchable Multi-Select with Tags</h3>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-dropdown
                label="Search and Select Tags"
                [items]="longTagList"
                mode="multi"
                [searchable]="true"
                [clearable]="true"
                variant="filled"
                placeholder="Search and select..."
                helpText="Type to search, selected items appear as tags"
              />
            </div>
            <div class="showcase__item">
              <ui-dropdown
                label="Team Members with Tags"
                [items]="teamMembersWithIcons"
                mode="multi"
                [searchable]="true"
                [clearable]="true"
                variant="filled"
                placeholder="Search team members..."
              />
            </div>
          </div>

          <h3 class="showcase__subsection__title">Interactive Example with Form Binding</h3>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form class="showcase__form">
                <ui-dropdown
                  label="Selected Tags"
                  [items]="interactiveTags"
                  [(ngModel)]="tagFormData.selectedTags"
                  [ngModelOptions]="{ standalone: true }"
                  mode="multi"
                  variant="filled"
                  placeholder="Select tags"
                  [clearable]="true"
                  (selectionChange)="onTagSelectionChange($event)"
                />
                <div class="showcase__form-output">
                  <strong>Selected Tag Values:</strong>
                  <pre>{{ tagFormData.selectedTags | json }}</pre>
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
                <ui-dropdown
                  label="Country"
                  [items]="countriesWithIcons"
                  [(ngModel)]="formData.country"
                  [ngModelOptions]="{ standalone: true }"
                  [required]="true"
                  variant="filled"
                  placeholder="Select your country"
                />
                <ui-dropdown
                  label="Preferred Languages"
                  [items]="languageList"
                  [(ngModel)]="formData.languages"
                  [ngModelOptions]="{ standalone: true }"
                  mode="multi"
                  variant="filled"
                  placeholder="Select languages"
                />
                <ui-dropdown
                  label="Department"
                  [items]="departmentItems"
                  [(ngModel)]="formData.department"
                  [ngModelOptions]="{ standalone: true }"
                  variant="filled"
                  placeholder="Select department"
                />
                <div class="showcase__form-output">
                  <strong>Selected Values:</strong>
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
export class DropdownShowcaseComponent {
  formData = {
    country: '',
    languages: [] as string[],
    department: '',
  };

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue: any = '';
  sizes: Size[] = ['small', 'medium', 'large'];
  variants: InputVariant[] = ['filled', 'filled-gray', 'filled-lighter', 'underlined'];
  modes: DropdownMode[] = ['single', 'multi'];

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
        options: this.modes.map(m => ({ value: m, label: m })),
        defaultValue: 'single',
        group: 'behavior',
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

  countriesWithIcons: DropdownItem[] = [
    {
      value: 'us',
      label: 'United States',
      icon: 'star',
    },
    {
      value: 'uk',
      label: 'United Kingdom',
      icon: 'star',
    },
    {
      value: 'fr',
      label: 'France',
      icon: 'star',
    },
  ];

  actionsWithIcons: DropdownItem[] = [
    {
      value: 'edit',
      label: 'Edit',
      icon: 'star',
    },
    {
      value: 'delete',
      label: 'Delete',
      icon: 'star',
    },
    {
      value: 'download',
      label: 'Download',
      icon: 'star',
    },
  ];

  departmentItems: DropdownItem[] = [
    { value: 'eng', label: 'Engineering' },
    { value: 'qa', label: 'Quality Assurance' },
    { value: 'devops', label: 'DevOps' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'hr', label: 'Human Resources' },
  ];

  longCountryList: DropdownItem[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
    { value: 'br', label: 'Brazil' },
    { value: 'ar', label: 'Argentina' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'it', label: 'Italy' },
    { value: 'es', label: 'Spain' },
    { value: 'pl', label: 'Poland' },
    { value: 'ua', label: 'Ukraine' },
    { value: 'jp', label: 'Japan' },
    { value: 'cn', label: 'China' },
    { value: 'in', label: 'India' },
    { value: 'au', label: 'Australia' },
  ];

  cityList: DropdownItem[] = [
    { value: 'nyc', label: 'New York City' },
    { value: 'la', label: 'Los Angeles' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'houston', label: 'Houston' },
    { value: 'phoenix', label: 'Phoenix' },
    { value: 'philadelphia', label: 'Philadelphia' },
    { value: 'san-antonio', label: 'San Antonio' },
    { value: 'san-diego', label: 'San Diego' },
    { value: 'dallas', label: 'Dallas' },
    { value: 'san-jose', label: 'San Jose' },
  ];

  languageList: DropdownItem[] = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pl', label: 'Polish' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
  ];

  errorStateText = 'Please select a valid option';

  tagFormData = {
    selectedTags: [] as (string | number)[],
  };

  skillsWithIcons: DropdownItem[] = [
    { value: 'js', label: 'JavaScript', icon: 'code' },
    { value: 'ts', label: 'TypeScript', icon: 'code' },
    { value: 'angular', label: 'Angular', icon: 'star' },
    { value: 'react', label: 'React', icon: 'star' },
    { value: 'vue', label: 'Vue.js', icon: 'star' },
    { value: 'node', label: 'Node.js', icon: 'code' },
    { value: 'python', label: 'Python', icon: 'code' },
    { value: 'java', label: 'Java', icon: 'code' },
  ];

  technologiesWithIcons: DropdownItem[] = [
    { value: 'docker', label: 'Docker', icon: 'briefcase' },
    { value: 'kubernetes', label: 'Kubernetes', icon: 'briefcase' },
    { value: 'aws', label: 'AWS', icon: 'cloud' },
    { value: 'azure', label: 'Azure', icon: 'cloud' },
    { value: 'gcp', label: 'Google Cloud', icon: 'cloud' },
    { value: 'terraform', label: 'Terraform', icon: 'code' },
    { value: 'jenkins', label: 'Jenkins', icon: 'briefcase' },
  ];

  longTagList: DropdownItem[] = [
    { value: 'tag1', label: 'Frontend Development' },
    { value: 'tag2', label: 'Backend Development' },
    { value: 'tag3', label: 'Full Stack' },
    { value: 'tag4', label: 'DevOps' },
    { value: 'tag5', label: 'UI/UX Design' },
    { value: 'tag6', label: 'Mobile Development' },
    { value: 'tag7', label: 'Data Science' },
    { value: 'tag8', label: 'Machine Learning' },
    { value: 'tag9', label: 'Cloud Architecture' },
    { value: 'tag10', label: 'Security' },
    { value: 'tag11', label: 'Testing' },
    { value: 'tag12', label: 'Documentation' },
  ];

  teamMembersWithIcons: DropdownItem[] = [
    { value: 'john', label: 'John Doe', icon: 'person' },
    { value: 'jane', label: 'Jane Smith', icon: 'person' },
    { value: 'bob', label: 'Bob Johnson', icon: 'person' },
    { value: 'alice', label: 'Alice Williams', icon: 'person' },
    { value: 'charlie', label: 'Charlie Brown', icon: 'person' },
    { value: 'diana', label: 'Diana Prince', icon: 'person' },
    { value: 'frank', label: 'Frank Miller', icon: 'person' },
  ];

  interactiveTags: DropdownItem[] = [
    { value: 'urgent', label: 'Urgent', icon: 'warning' },
    { value: 'important', label: 'Important', icon: 'star' },
    { value: 'review', label: 'Needs Review', icon: 'info' },
    { value: 'approved', label: 'Approved', icon: 'checkmark_circle' },
    { value: 'draft', label: 'Draft', icon: 'document' },
    { value: 'published', label: 'Published', icon: 'checkmark' },
  ];

  onTagSelectionChange(selectedValues: (string | number)[]): void {
    this.tagFormData.selectedTags = selectedValues;
  }
}

