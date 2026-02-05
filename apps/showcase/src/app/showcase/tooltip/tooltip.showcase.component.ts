import { Component, signal, computed, viewChild } from '@angular/core';
import { TooltipComponent } from 'angular-ui';

import { ButtonComponent } from 'angular-ui';
import { IconComponent } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { IconName } from 'angular-ui';
import { TooltipPosition, TooltipSize } from 'angular-ui';

@Component({
  selector: 'app-tooltip-showcase',
  standalone: true,
  imports: [
    TooltipComponent,
    ButtonComponent,
    IconComponent,
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
        <h1 class="showcase__title">Tooltip Component</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Tooltip component built with Fluent 2 Design System. The
          Tooltip component displays helpful contextual information when users hover over or focus
          on an element. Tooltips are positioned relative to their trigger element and support
          multiple positions and sizes.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            [showEventLog]="false"
            (valuesChange)="onValuesChange($event)"
            (reset)="onReset()"
          >
            <div preview>
              <ui-tooltip
                [text]="currentText()"
                [position]="currentPosition()"
                [size]="currentSize()"
                [disabled]="currentDisabled()"
                [delay]="currentDelay()"
              >
                <ui-button variant="primary">Hover me</ui-button>
              </ui-tooltip>
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Usage -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Usage</h2>
          <p class="showcase__section__description">
            Simple tooltips that appear on hover or focus with default top positioning.
          </p>
          <div class="showcase__preview">
            <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
              <ui-tooltip text="This is a helpful tooltip">
                <ui-button variant="primary">Hover me</ui-button>
              </ui-tooltip>

              <ui-tooltip text="Another tooltip example">
                <ui-button appearance="outline">Hover me too</ui-button>
              </ui-tooltip>

              <ui-tooltip text="Tooltip on icon button">
                <ui-button appearance="subtle" icon="info"/>
              </ui-tooltip>
            </div>
          </div>
        </div>

        <!-- Position Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Position Variants</h2>
          <p class="showcase__section__description">
            Tooltips can be positioned above, below, to the left, or to the right of the trigger
            element.
          </p>
          <div class="showcase__preview">
            <div
              style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; align-items: center; justify-items: center; padding: 64px;"
            >
              <!-- Top -->
              <div style="grid-column: 2; grid-row: 1;">
                <ui-tooltip text="Tooltip on top" position="top">
                  <ui-button appearance="outline">Top</ui-button>
                </ui-tooltip>
              </div>

              <!-- Left -->
              <div style="grid-column: 1; grid-row: 2;">
                <ui-tooltip text="Tooltip on left" position="left">
                  <ui-button appearance="outline">Left</ui-button>
                </ui-tooltip>
              </div>

              <!-- Center placeholder -->
              <div style="grid-column: 2; grid-row: 2;"></div>

              <!-- Right -->
              <div style="grid-column: 3; grid-row: 2;">
                <ui-tooltip text="Tooltip on right" position="right">
                  <ui-button appearance="outline">Right</ui-button>
                </ui-tooltip>
              </div>

              <!-- Bottom -->
              <div style="grid-column: 2; grid-row: 3;">
                <ui-tooltip text="Tooltip on bottom" position="bottom">
                  <ui-button appearance="outline">Bottom</ui-button>
                </ui-tooltip>
              </div>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <p class="showcase__section__description">
            Different sizes available: small, medium (default), and large. Large tooltips support
            multiline text.
          </p>
          <div class="showcase__preview">
            <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
              <ui-tooltip text="Small tooltip" size="small">
                <ui-button appearance="outline">Small</ui-button>
              </ui-tooltip>

              <ui-tooltip text="Medium tooltip (default)" size="medium">
                <ui-button appearance="outline">Medium</ui-button>
              </ui-tooltip>

              <ui-tooltip
                text="Large tooltip with longer text that can wrap to multiple lines for better readability and context."
                size="large"
              >
                <ui-button appearance="outline">Large</ui-button>
              </ui-tooltip>
            </div>
          </div>
        </div>

        <!-- With Different Content Types -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">With Different Content Types</h2>
          <p class="showcase__section__description">
            Tooltips work with various trigger elements like buttons, icons, links, and form fields.
          </p>
          <div class="showcase__preview">
            <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
              <ui-tooltip text="Click to save your changes">
                <ui-button variant="primary">Save</ui-button>
              </ui-tooltip>

              <ui-tooltip text="Delete this item permanently">
                <ui-button appearance="outline">Delete</ui-button>
              </ui-tooltip>

              <div style="display: flex; gap: 8px; align-items: center;">
                <label for="tooltip-input">Username:</label>
                <ui-tooltip text="Enter your username or email address">
                  <input
                    id="tooltip-input"
                    type="text"
                    placeholder="Enter username"
                    style="padding: 8px 12px; border: 1px solid #D1D1D1; border-radius: 4px;"
                  />
                </ui-tooltip>
              </div>

              <div style="display: flex; gap: 8px; align-items: center;">
                <ui-tooltip text="More information about this feature">
                  <ui-icon
                    [icon]="'info'"
                    [size]="'medium'"
                    style="cursor: pointer; color: #0078D4;"
                  />
                </ui-tooltip>
                <span>Click the icon for more info</span>
              </div>

              <ui-tooltip text="This link opens in a new window">
                <a href="#" style="color: #0078D4; text-decoration: none;">Learn more →</a>
              </ui-tooltip>
            </div>
          </div>
        </div>

        <!-- Disabled State -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Disabled State</h2>
          <p class="showcase__section__description">
            Tooltips can be disabled to prevent them from showing, even on hover or focus.
          </p>
          <div class="showcase__preview">
            <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
              <ui-tooltip text="This tooltip is enabled">
                <ui-button appearance="outline">Enabled Tooltip</ui-button>
              </ui-tooltip>

              <ui-tooltip text="This tooltip is disabled" [disabled]="true">
                <ui-button appearance="outline">Disabled Tooltip</ui-button>
              </ui-tooltip>
            </div>
          </div>
        </div>

        <!-- Custom Delay -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Custom Delay</h2>
          <p class="showcase__section__description">
            Tooltips can have custom delay before appearing. Default is 300ms.
          </p>
          <div class="showcase__preview">
            <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
              <ui-tooltip text="Immediate tooltip (0ms delay)" [delay]="0">
                <ui-button appearance="outline">No Delay</ui-button>
              </ui-tooltip>

              <ui-tooltip text="Default tooltip (300ms delay)" [delay]="300">
                <ui-button appearance="outline">Default Delay</ui-button>
              </ui-tooltip>

              <ui-tooltip text="Slow tooltip (1000ms delay)" [delay]="1000">
                <ui-button appearance="outline">Slow Delay</ui-button>
              </ui-tooltip>
            </div>
          </div>
        </div>

        <!-- In Context Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">In Context Examples</h2>
          <p class="showcase__section__description">
            Real-world examples of how to use tooltips in common UI patterns.
          </p>
          <div class="showcase__preview">
            <div style="background: #F3F2F1; padding: 24px; border-radius: 8px;">
              <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
                Form with Tooltips
              </h3>
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; gap: 8px; align-items: center;">
                  <label for="email-field" style="min-width: 120px;">Email Address:</label>
                  <ui-tooltip
                    text="Enter a valid email address (e.g., user@example.com)"
                    position="right"
                  >
                    <input
                      id="email-field"
                      type="email"
                      placeholder="user@example.com"
                      style="flex: 1; padding: 8px 12px; border: 1px solid #D1D1D1; border-radius: 4px;"
                    />
                  </ui-tooltip>
                  <ui-tooltip text="Required field" position="top">
                    <span style="color: #D13438;">*</span>
                  </ui-tooltip>
                </div>

                <div style="display: flex; gap: 8px; align-items: center;">
                  <label for="password-field" style="min-width: 120px;">Password:</label>
                  <ui-tooltip
                    text="Password must be at least 8 characters long and include uppercase, lowercase, and numbers"
                    position="right"
                    size="large"
                  >
                    <input
                      id="password-field"
                      type="password"
                      placeholder="Enter password"
                      style="flex: 1; padding: 8px 12px; border: 1px solid #D1D1D1; border-radius: 4px;"
                    />
                  </ui-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Usage Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Usage Example</h2>
          <p class="showcase__section__description">
            Example of how to use the Tooltip component in your application:
          </p>
          <div class="showcase__code">
            <pre><code>{{ usageExample }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TooltipShowcaseComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  positions: TooltipPosition[] = ['top', 'bottom', 'left', 'right'];
  sizes: TooltipSize[] = ['small', 'medium', 'large'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-tooltip',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as IconName, expanded: true },
      { id: 'appearance', label: 'Appearance', icon: 'color' as IconName, expanded: true },
      { id: 'behavior', label: 'Behavior', icon: 'settings' as IconName },
    ],
    controls: [
      {
        key: 'text',
        label: 'Text',
        type: 'text',
        description: 'Tooltip text content',
        defaultValue: 'This is a helpful tooltip',
        placeholder: 'Enter tooltip text',
        group: 'content',
      },
      {
        key: 'position',
        label: 'Position',
        type: 'dropdown',
        description: 'Tooltip position relative to trigger',
        options: this.positions.map(p => ({ value: p, label: p })),
        defaultValue: 'top',
        group: 'appearance',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        description: 'Tooltip size',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'appearance',
      },
      {
        key: 'disabled',
        label: 'Disabled',
        type: 'switch',
        description: 'Disable tooltip',
        defaultValue: false,
        group: 'behavior',
      },
      {
        key: 'delay',
        label: 'Delay (ms)',
        type: 'number',
        description: 'Delay before showing tooltip',
        defaultValue: 300,
        min: 0,
        max: 5000,
        step: 100,
        group: 'behavior',
      },
    ],
  };

  private values = signal<Record<string, any>>({
    text: 'This is a helpful tooltip',
    position: 'top',
    size: 'medium',
    disabled: false,
    delay: 300,
  });

  currentText = computed(() => this.values()['text'] as string);
  currentPosition = computed(() => this.values()['position'] as TooltipPosition);
  currentSize = computed(() => this.values()['size'] as TooltipSize);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentDelay = computed(() => this.values()['delay'] as number);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    // Values are reset by the showcase component
  }

  usageExample = `// In your component
import { TooltipComponent } from '../tooltip';
import { ButtonComponent } from '../button';

@Component({
  template: \`
    <!-- Basic tooltip -->
    <ui-tooltip text="This is a helpful tooltip">
      <ui-button variant="primary">Hover me</ui-button>
    </ui-tooltip>

    <!-- Tooltip with custom position -->
    <ui-tooltip text="Tooltip on the right" position="right">
      <ui-button appearance="outline">Hover me</ui-button>
    </ui-tooltip>

    <!-- Tooltip with custom size -->
    <ui-tooltip 
      text="Large tooltip with longer text that wraps to multiple lines" 
      size="large"
    >
      <ui-button appearance="outline">Hover me</ui-button>
    </ui-tooltip>

    <!-- Tooltip with custom delay -->
    <ui-tooltip text="Slow tooltip" [delay]="1000">
      <ui-button appearance="outline">Hover me</ui-button>
    </ui-tooltip>

    <!-- Disabled tooltip -->
    <ui-tooltip text="This won't show" [disabled]="true">
      <ui-button appearance="outline">Disabled</ui-button>
    </ui-tooltip>

    <!-- Tooltip on input field -->
    <ui-tooltip text="Enter your username or email">
      <input type="text" placeholder="Username" />
    </ui-tooltip>

    <!-- Tooltip on icon -->
    <ui-tooltip text="More information">
      <ui-icon [icon]="'info'" [size]="'medium'" />
    </ui-tooltip>
  \`
})
export class MyComponent {}`;
}

