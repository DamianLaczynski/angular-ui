import { Component, signal, computed, viewChild } from '@angular/core';
import { SwitchComponent } from 'angular-ui';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { Size, ContentPosition } from 'angular-ui';

@Component({
  selector: 'app-switch-showcase',

  imports: [
    SwitchComponent,
    CommonModule,
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
        <h1 class="showcase__title">Switch Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Switch component built with Fluent 2 Design System. All
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
              <ui-switch
                [label]="currentLabel()"
                [labelPosition]="currentLabelPosition()"
                [size]="currentSize()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (change)="onSwitchChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Label Position Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Label Position Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-switch
                label="Label After (Default)"
                labelPosition="after"
                helpText="Label positioned after the switch"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Label Before"
                labelPosition="before"
                helpText="Label positioned before the switch"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Label Above"
                labelPosition="above"
                helpText="Label positioned above the switch"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                labelPosition="below"
                label="Label Below"
                helpText="Label positioned below the switch"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                labelPosition="none"
                ariaLabel="Switch without visible label"
                helpText="No visible label (aria-label only)"
              ></ui-switch>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-switch
                label="Small Switch"
                size="small"
                helpText="This is a small switch"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Medium Switch"
                size="medium"
                helpText="This is a medium switch (default)"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Large Switch"
                size="large"
                helpText="This is a large switch"
              ></ui-switch>
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-switch label="Normal State" helpText="This is a normal switch"></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch label="Error State" [(errorText)]="errorStateText"></ui-switch>
            </div>
          </div>
        </div>

        <!-- Interactive States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-switch
                label="Disabled Switch (Off)"
                [disabled]="true"
                helpText="This switch is disabled"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Disabled Switch (On)"
                [disabled]="true"
                [(ngModel)]="disabledValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="This switch is disabled and checked"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Read Only Switch"
                [readonly]="true"
                [(ngModel)]="readonlyValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="This switch is read only"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Required Switch"
                [required]="true"
                helpText="This switch is required"
              ></ui-switch>
            </div>
          </div>
        </div>

        <!-- Form Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <form class="showcase__form">
                <ui-switch
                  label="Email Notifications"
                  [(ngModel)]="formData.emailNotifications"
                  [ngModelOptions]="{ standalone: true }"
                  helpText="Receive email notifications"
                ></ui-switch>
                <ui-switch
                  label="SMS Notifications"
                  [(ngModel)]="formData.smsNotifications"
                  [ngModelOptions]="{ standalone: true }"
                  helpText="Receive SMS notifications"
                ></ui-switch>
                <ui-switch
                  label="Push Notifications"
                  [(ngModel)]="formData.pushNotifications"
                  [ngModelOptions]="{ standalone: true }"
                  helpText="Receive push notifications"
                ></ui-switch>
                <ui-switch
                  label="Marketing Emails"
                  [(ngModel)]="formData.marketingEmails"
                  [ngModelOptions]="{ standalone: true }"
                  helpText="Receive marketing emails"
                ></ui-switch>
                <div class="showcase__form-output">
                  <strong>Selected Values:</strong>
                  <pre>{{ formData | json }}</pre>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Checked/Unchecked States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Checked & Unchecked States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-switch
                label="Unchecked Switch"
                [(ngModel)]="uncheckedValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="This switch is currently off"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Checked Switch"
                [(ngModel)]="checkedValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="This switch is currently on"
              ></ui-switch>
            </div>
          </div>
        </div>

        <!-- Checked/Unchecked States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Checked & Unchecked States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-switch
                label="Unchecked Switch"
                [(ngModel)]="uncheckedValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="This switch is currently off"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Checked Switch"
                [(ngModel)]="checkedValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="This switch is currently on"
              ></ui-switch>
            </div>
          </div>
        </div>

        <!-- All Variants Combined -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">All Variants Combined</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <ui-switch
                label="Small + Before + Error"
                size="small"
                labelPosition="before"
                [(errorText)]="smallErrorText"
                [(ngModel)]="comboValue1"
                [ngModelOptions]="{ standalone: true }"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Medium + Above"
                size="medium"
                labelPosition="above"
                [(ngModel)]="comboValue2"
                [ngModelOptions]="{ standalone: true }"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Large + After"
                size="large"
                labelPosition="after"
                [(ngModel)]="comboValue3"
                [ngModelOptions]="{ standalone: true }"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Small + Disabled"
                size="small"
                [disabled]="true"
                helpText="Small disabled switch"
                [(ngModel)]="comboValue4"
                [ngModelOptions]="{ standalone: true }"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Medium + Read Only"
                size="medium"
                [readonly]="true"
                [(ngModel)]="comboValue5"
                [ngModelOptions]="{ standalone: true }"
                helpText="Medium read only switch"
              ></ui-switch>
            </div>
            <div class="showcase__item">
              <ui-switch
                label="Large + Required"
                size="large"
                [required]="true"
                helpText="Large required switch"
                [(ngModel)]="comboValue6"
                [ngModelOptions]="{ standalone: true }"
              ></ui-switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SwitchShowcaseComponent {
  uncheckedValue = false;
  checkedValue = true;
  disabledValue = true;
  readonlyValue = true;
  comboValue1 = false;
  errorStateText = 'This switch has an error';
  smallErrorText = 'Small error switch';
  comboValue2 = true;
  comboValue3 = false;
  comboValue4 = true;
  comboValue5 = true;
  comboValue6 = false;

  formData = {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
  };

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = false;
  sizes: Size[] = ['small', 'medium', 'large'];
  labelPositions: ContentPosition[] = ['before', 'after', 'above', 'below', 'none'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-switch',
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
        description: 'Switch label',
        defaultValue: 'Enable notifications',
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
        key: 'labelPosition',
        label: 'Label Position',
        type: 'dropdown',
        options: this.labelPositions.map(p => ({ value: p, label: p })),
        defaultValue: 'after',
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
        description: 'Disable switch',
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
    label: 'Enable notifications',
    helpText: '',
    labelPosition: 'after',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentLabelPosition = computed(() => this.values()['labelPosition'] as ContentPosition);
  currentSize = computed(() => this.values()['size'] as Size);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.currentValue = false;
  }

  onSwitchChange(value: boolean): void {
    this.showcase()?.logEvent('change', { checked: value });
  }
}
