import { Component, signal, computed } from '@angular/core';
import { TimeComponent } from 'angular-ui';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-time-showcase',
  imports: [
    TimeComponent,
    CommonModule,
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
        <h1 class="showcase__title">Time Component Showcase</h1>
        <p class="showcase__description">
          Standalone time picker component built with Fluent 2 Design System. Provides intuitive
          time selection with hour and minute spinners, supporting both 12-hour and 24-hour formats.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            [config]="showcaseConfig"
            (valuesChange)="showcaseValues.set($event)"
          >
            <div preview>
              <ui-time
                [value]="interactiveTime()"
                [size]="currentSize()"
                [use24HourFormat]="currentUse24Hour()"
                [inline]="currentInline()"
                [showLabel]="currentShowLabel()"
                [label]="'Select Time'"
                [disabled]="currentDisabled()"
                [step]="currentStep()"
                (timeChange)="onInteractiveTimeChange($event)"
              />
              <p style="margin-top: 12px; text-align: center;">
                Selected time: <strong>{{ interactiveTime() || 'Not set' }}</strong>
              </p>
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>24-Hour Format (Default)</h3>
              <ui-time
                [value]="timeValues.twentyFourHour()"
                [use24HourFormat]="true"
                (timeChange)="timeValues.twentyFourHour.set($event)"
              ></ui-time>
              <div class="showcase__form-output">
                <strong>Value:</strong> {{ timeValues.twentyFourHour() }}
              </div>
            </div>
            <div class="showcase__item">
              <h3>12-Hour Format</h3>
              <ui-time
                [value]="timeValues.twelveHour()"
                [use24HourFormat]="false"
                (timeChange)="timeValues.twelveHour.set($event)"
              ></ui-time>
              <div class="showcase__form-output">
                <strong>Value:</strong> {{ timeValues.twelveHour() }}
              </div>
            </div>
            <div class="showcase__item">
              <h3>With Initial Value</h3>
              <ui-time
                value="14:30"
                [use24HourFormat]="true"
                (timeChange)="timeValues.withInitial.set($event)"
              ></ui-time>
              <div class="showcase__form-output">
                <strong>Value:</strong> {{ timeValues.withInitial() }}
              </div>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Small</h3>
              <ui-time
                [value]="timeValues.small()"
                [size]="'small'"
                (timeChange)="timeValues.small.set($event)"
              ></ui-time>
            </div>
            <div class="showcase__item">
              <h3>Medium (Default)</h3>
              <ui-time
                [value]="timeValues.medium()"
                [size]="'medium'"
                (timeChange)="timeValues.medium.set($event)"
              ></ui-time>
            </div>
            <div class="showcase__item">
              <h3>Large</h3>
              <ui-time
                [value]="timeValues.large()"
                [size]="'large'"
                (timeChange)="timeValues.large.set($event)"
              ></ui-time>
            </div>
          </div>
        </div>

        <!-- Step Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Step Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>1 Minute Steps (Default)</h3>
              <ui-time
                [value]="timeValues.minuteSteps()"
                [step]="60"
                (timeChange)="timeValues.minuteSteps.set($event)"
              ></ui-time>
              <div class="showcase__form-output">
                <strong>Value:</strong> {{ timeValues.minuteSteps() }}
              </div>
            </div>
            <div class="showcase__item">
              <h3>15 Minute Steps</h3>
              <ui-time
                [value]="timeValues.fifteenMinuteSteps()"
                [step]="900"
                (timeChange)="timeValues.fifteenMinuteSteps.set($event)"
              ></ui-time>
              <div class="showcase__form-output">
                <strong>Value:</strong> {{ timeValues.fifteenMinuteSteps() }}
              </div>
            </div>
            <div class="showcase__item">
              <h3>30 Minute Steps</h3>
              <ui-time
                [value]="timeValues.thirtyMinuteSteps()"
                [step]="1800"
                (timeChange)="timeValues.thirtyMinuteSteps.set($event)"
              ></ui-time>
              <div class="showcase__form-output">
                <strong>Value:</strong> {{ timeValues.thirtyMinuteSteps() }}
              </div>
            </div>
          </div>
        </div>

        <!-- Inline Mode -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Inline Mode</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Standard Mode</h3>
              <ui-time
                [value]="timeValues.standard()"
                [inline]="false"
                (timeChange)="timeValues.standard.set($event)"
              ></ui-time>
            </div>
            <div class="showcase__item">
              <h3>Inline Mode</h3>
              <ui-time
                [value]="timeValues.inline()"
                [inline]="true"
                (timeChange)="timeValues.inline.set($event)"
              ></ui-time>
            </div>
            <div class="showcase__item">
              <h3>Inline with Label</h3>
              <ui-time
                [value]="timeValues.inlineLabel()"
                [inline]="true"
                [showLabel]="true"
                label="Meeting Time"
                (timeChange)="timeValues.inlineLabel.set($event)"
              ></ui-time>
            </div>
          </div>
        </div>

        <!-- Disabled State -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Disabled State</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Disabled Time Picker</h3>
              <ui-time
                value="09:30"
                [disabled]="true"
                (timeChange)="timeValues.disabled.set($event)"
              ></ui-time>
            </div>
          </div>
        </div>

        <!-- Practical Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Practical Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Business Hours</h3>
              <ui-time
                [value]="practicalExamples.businessHours()"
                [use24HourFormat]="true"
                [step]="900"
                [showLabel]="true"
                label="Business Hours"
                (timeChange)="practicalExamples.businessHours.set($event)"
              ></ui-time>
              <div class="showcase__form-output">
                <strong>Time:</strong> {{ practicalExamples.businessHours() }}
              </div>
            </div>
            <div class="showcase__item">
              <h3>Meeting Time</h3>
              <ui-time
                [value]="practicalExamples.meetingTime()"
                [use24HourFormat]="false"
                [showLabel]="true"
                label="Meeting Time"
                (timeChange)="practicalExamples.meetingTime.set($event)"
              ></ui-time>
              <div class="showcase__form-output">
                <strong>Time:</strong> {{ practicalExamples.meetingTime() }}
              </div>
            </div>
            <div class="showcase__item">
              <h3>Appointment Time</h3>
              <ui-time
                [value]="practicalExamples.appointmentTime()"
                [use24HourFormat]="true"
                [step]="1800"
                [showLabel]="true"
                label="Appointment Time"
                (timeChange)="practicalExamples.appointmentTime.set($event)"
              ></ui-time>
              <div class="showcase__form-output">
                <strong>Time:</strong> {{ practicalExamples.appointmentTime() }}
              </div>
            </div>
          </div>
        </div>

        <!-- All Values -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">All Time Values</h2>
          <div class="showcase__form-output">
            <pre>{{ timeValues | json }}</pre>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TimeShowcaseComponent {
  sizes: Size[] = ['small', 'medium', 'large'];
  steps = [60, 300, 900, 1800]; // 1min, 5min, 15min, 30min

  showcaseValues = signal<Record<string, any>>({});
  interactiveTime = signal<string>('');

  showcaseConfig: ShowcaseConfig = {
    controls: [
      {
        key: 'size',
        type: 'dropdown',
        label: 'Size',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'appearance',
      },
      {
        key: 'step',
        type: 'dropdown',
        label: 'Step',
        options: this.steps.map(s => ({ value: s, label: `${s / 60} min` })),
        defaultValue: 60,
        group: 'appearance',
      },
      {
        key: 'use24Hour',
        type: 'switch',
        label: '24-Hour Format',
        defaultValue: true,
        group: 'options',
      },
      {
        key: 'inline',
        type: 'switch',
        label: 'Inline',
        defaultValue: false,
        group: 'options',
      },
      {
        key: 'showLabel',
        type: 'switch',
        label: 'Show Label',
        defaultValue: false,
        group: 'options',
      },
      {
        key: 'disabled',
        type: 'switch',
        label: 'Disabled',
        defaultValue: false,
        group: 'options',
      },
    ],
    controlGroups: [
      {
        id: 'appearance',
        label: 'Appearance',
        expanded: true,
      },
      {
        id: 'options',
        label: 'Options',
        expanded: true,
      },
    ],
  };

  currentSize = computed(() => (this.showcaseValues()['size'] as Size) || 'medium');
  currentStep = computed(() => (this.showcaseValues()['step'] as number) || 60);
  currentUse24Hour = computed(() => (this.showcaseValues()['use24Hour'] as boolean) ?? true);
  currentInline = computed(() => (this.showcaseValues()['inline'] as boolean) ?? false);
  currentShowLabel = computed(() => (this.showcaseValues()['showLabel'] as boolean) ?? false);
  currentDisabled = computed(() => (this.showcaseValues()['disabled'] as boolean) ?? false);

  onInteractiveTimeChange(time: string): void {
    this.interactiveTime.set(time);
  }

  setCurrentTime(): void {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.interactiveTime.set(`${hours}:${minutes}`);
  }

  timeValues = {
    twentyFourHour: signal<string>(''),
    twelveHour: signal<string>(''),
    withInitial: signal<string>('14:30'),
    small: signal<string>(''),
    medium: signal<string>(''),
    large: signal<string>(''),
    minuteSteps: signal<string>(''),
    fifteenMinuteSteps: signal<string>(''),
    thirtyMinuteSteps: signal<string>(''),
    standard: signal<string>(''),
    inline: signal<string>(''),
    inlineLabel: signal<string>(''),
    disabled: signal<string>('09:30'),
  };

  practicalExamples = {
    businessHours: signal<string>('09:00'),
    meetingTime: signal<string>(''),
    appointmentTime: signal<string>(''),
  };
}

