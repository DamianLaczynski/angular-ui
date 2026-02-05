import { Component, signal, computed, viewChild } from '@angular/core';
import { DateComponent, DateFieldType } from 'angular-ui';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-date-showcase',
  imports: [
    DateComponent,
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
        <h1 class="showcase__title">Date Component Showcase</h1>
        <p class="showcase__description">
          Date component with CDK Overlay positioning. Test edge cases below.
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
              <ui-date
                [label]="currentLabel()"
                [dateType]="currentDateType()"
                [size]="currentSize()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                [required]="currentRequired()"
                [(ngModel)]="currentValue"
                [helpText]="currentHelpText()"
                (change)="onDateChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- EDGE CASES: Overlay Positioning -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Edge Cases: Overlay Positioning</h2>

          <!-- Inside overflow:hidden container -->
          <h3 class="showcase__subsection-title">Inside overflow:hidden Container</h3>
          <div class="edge-case edge-case--overflow">
            <ui-date
              label="Inside overflow:hidden"
              helpText="Panel should NOT be clipped"
            ></ui-date>
          </div>

          <!-- Inside scrollable container -->
          <h3 class="showcase__subsection-title">Inside Scrollable Container</h3>
          <div class="edge-case edge-case--scroll">
            <div class="scroll-content">
              <p>Scroll down to see the date picker...</p>
              <div style="height: 150px;"></div>
              <ui-date label="Inside scrollable" helpText="Panel repositions on scroll"></ui-date>
              <div style="height: 150px;"></div>
            </div>
          </div>

          <!-- Near right edge -->
          <h3 class="showcase__subsection-title">Near Right Edge</h3>
          <div class="edge-case edge-case--right">
            <ui-date label="Right edge" helpText="Panel shifts to stay in viewport"></ui-date>
          </div>

          <!-- Narrow container -->
          <h3 class="showcase__subsection-title">Narrow Container</h3>
          <div class="edge-case edge-case--narrow">
            <ui-date label="Narrow" helpText="Panel wider than container"></ui-date>
          </div>

          <!-- Multiple date pickers -->
          <h3 class="showcase__subsection-title">Multiple Date Pickers</h3>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-date label="Date 1" helpText="Click to open"></ui-date>
            </div>
            <div class="showcase__item">
              <ui-date label="Date 2" helpText="Opens, closes Date 1"></ui-date>
            </div>
            <div class="showcase__item">
              <ui-date label="Date 3" helpText="Opens, closes others"></ui-date>
            </div>
          </div>

          <!-- Z-index stacking -->
          <h3 class="showcase__subsection-title">Z-index Stacking Test</h3>
          <div class="edge-case edge-case--zindex">
            <div class="zindex-overlay">This overlay has z-index: 100</div>
            <ui-date label="Under z-index overlay" helpText="Panel should appear above"></ui-date>
          </div>

          <!-- Bottom of section (flip test) -->
          <h3 class="showcase__subsection-title">Bottom Position (Flip Test)</h3>
          <p>Scroll this section to bottom and open - panel should flip up if needed.</p>
          <div style="height: 300px;"></div>
          <ui-date
            label="At bottom"
            helpText="Panel should flip above if no space below"
          ></ui-date>
        </div>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-date label="Standard Date" helpText="Select a date"></ui-date>
            </div>
            <div class="showcase__item">
              <ui-date
                label="With Value"
                [(ngModel)]="defaultDate"
                [ngModelOptions]="{ standalone: true }"
                helpText="Pre-filled"
              ></ui-date>
            </div>
          </div>
        </div>

        <!-- Date Type Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Date Type Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-date
                label="Date"
                dateType="date"
                [(ngModel)]="dateInputs.date"
                [ngModelOptions]="{ standalone: true }"
              ></ui-date>
            </div>
            <div class="showcase__item">
              <ui-date
                label="DateTime"
                dateType="datetime-local"
                [(ngModel)]="dateInputs.datetime"
                [ngModelOptions]="{ standalone: true }"
              ></ui-date>
            </div>
            <div class="showcase__item">
              <ui-date
                label="Time"
                dateType="time"
                [(ngModel)]="dateInputs.time"
                [ngModelOptions]="{ standalone: true }"
              ></ui-date>
            </div>
            <div class="showcase__item">
              <ui-date
                label="Month"
                dateType="month"
                [(ngModel)]="dateInputs.month"
                [ngModelOptions]="{ standalone: true }"
              ></ui-date>
            </div>
            <div class="showcase__item">
              <ui-date
                label="Week"
                dateType="week"
                [(ngModel)]="dateInputs.week"
                [ngModelOptions]="{ standalone: true }"
              ></ui-date>
            </div>
          </div>
          <div class="showcase__form-output">
            <strong>Values:</strong>
            <pre>{{ dateInputs | json }}</pre>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-date label="Small" size="small"></ui-date>
            </div>
            <div class="showcase__item">
              <ui-date label="Medium" size="medium"></ui-date>
            </div>
            <div class="showcase__item">
              <ui-date label="Large" size="large"></ui-date>
            </div>
          </div>
        </div>

        <!-- States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-date label="Disabled" [disabled]="true"></ui-date>
            </div>
            <div class="showcase__item">
              <ui-date
                label="Read Only"
                [readonly]="true"
                [(ngModel)]="readonlyDate"
                [ngModelOptions]="{ standalone: true }"
              ></ui-date>
            </div>
            <div class="showcase__item">
              <ui-date label="Error" [(errorText)]="errorText"></ui-date>
            </div>
          </div>
        </div>

        <!-- Keyboard Navigation -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Keyboard Navigation</h2>
          <div class="showcase__item">
            <ui-date
              label="Test Keyboard"
              helpText="Tab to focus, Enter to open, Escape to close"
            ></ui-date>
          </div>
          <div class="keyboard-info">
            <code>Tab</code> Focus | <code>Enter/Space</code> Open | <code>Escape</code> Close |
            <code>Arrows</code> Navigate
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .edge-case {
        margin-bottom: 24px;
        padding: 16px;
        border: 2px dashed var(--color-neutral-stroke-rest);
        border-radius: 8px;
        background: var(--color-neutral-background-hover);
      }

      .edge-case--overflow {
        overflow: hidden;
        height: 80px;
      }

      .edge-case--scroll {
        height: 200px;
        overflow-y: auto;
        border: 1px solid var(--color-neutral-stroke-rest);
      }

      .scroll-content {
        padding: 16px;
      }

      .edge-case--right {
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;
      }

      .edge-case--right ui-date {
        width: 200px;
      }

      .edge-case--narrow {
        width: 150px;
      }

      .edge-case--zindex {
        position: relative;
      }

      .zindex-overlay {
        position: absolute;
        top: 0;
        right: 0;
        background: rgba(255, 0, 0, 0.3);
        padding: 8px 16px;
        z-index: 100;
        border-radius: 4px;
        font-size: 12px;
      }

      .showcase__subsection-title {
        font-size: 14px;
        font-weight: 600;
        margin: 16px 0 8px;
        color: var(--color-neutral-foreground2-rest);
      }

      .keyboard-info {
        margin-top: 16px;
        padding: 12px;
        background: var(--color-neutral-background-hover);
        border-radius: 8px;
        font-size: 14px;
      }

      .keyboard-info code {
        background: var(--color-neutral-background-rest);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: monospace;
      }
    `,
  ],
})
export class DateShowcaseComponent {
  defaultDate = '2024-03-15';
  readonlyDate = '2024-12-31';
  errorText = 'Date is required';

  dateInputs = {
    date: '',
    datetime: '',
    time: '',
    month: '',
    week: '',
  };

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentValue = '';
  sizes: Size[] = ['small', 'medium', 'large'];
  dateTypes: DateFieldType[] = ['date', 'datetime-local', 'time', 'month', 'week'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-date',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      { key: 'label', label: 'Label', type: 'text', defaultValue: 'Select Date', group: 'content' },
      { key: 'helpText', label: 'Help Text', type: 'text', defaultValue: '', group: 'content' },
      {
        key: 'dateType',
        label: 'Date Type',
        type: 'dropdown',
        options: this.dateTypes.map(t => ({ value: t, label: t })),
        defaultValue: 'date',
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
    label: 'Select Date',
    helpText: '',
    dateType: 'date',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentDateType = computed(() => this.values()['dateType'] as DateFieldType);
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
  onDateChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}

