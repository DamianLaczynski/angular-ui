import { Component, signal, viewChild, TemplateRef, computed } from '@angular/core';
import {
  AccordionComponent,
  ButtonComponent,
  TextComponent,
  EmailComponent,
  TableOfContentComponent,
  Size,
  Appearance,
  Shape,
  ChevronPosition,
  Orientation,
  IconName,
} from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';

@Component({
  selector: 'app-accordion-showcase',
  imports: [
    AccordionComponent,
    ButtonComponent,
    TextComponent,
    EmailComponent,
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
        <h1 class="showcase__title">Accordion Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Accordion component built with Fluent 2 Design System.
          Accordions support expand/collapse functionality, multiple sizes, appearance variants,
          selection indicators, and quick actions.
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
              <ui-accordion
                [label]="'Interactive Accordion'"
                [size]="currentSize()"
                [appearance]="currentAppearance()"
                [shape]="currentShape()"
                [chevronPosition]="currentChevronPosition()"
                [icon]="currentIcon()"
                [showSelectionIndicator]="currentShowIndicator()"
                [indicatorPosition]="currentIndicatorPosition()"
                [disabled]="currentDisabled()"
                (toggle)="onInteractiveToggle($event)"
              >
                <p>This is the content inside the interactive accordion.</p>
                <p>You can customize all properties using the controls above.</p>
              </ui-accordion>
            </div>
          </app-interactive-showcase>
        </section>

        <!-- ========================================= -->
        <!-- BASIC ACCORDIONS -->
        <!-- ========================================= -->

        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Accordions</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Collapsed</h3>
              <ui-accordion label="Basic Accordion (Collapsed)">
                <p>This is the content inside the accordion panel.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>Expanded</h3>
              <ui-accordion label="Basic Accordion (Expanded)">
                <p>This is the content inside the accordion panel.</p>
                <p>You can put any content here.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>With Icon</h3>
              <ui-accordion label="Accordion with Icon" icon="folder">
                <p>This accordion has an icon in the header.</p>
              </ui-accordion>
            </div>
          </div>
        </div>

        <!-- ========================================= -->
        <!-- SIZE VARIANTS -->
        <!-- ========================================= -->

        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Small</h3>
              <ui-accordion label="Small Accordion" size="small">
                <p>Small size accordion content.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>Medium (Default)</h3>
              <ui-accordion label="Medium Accordion" size="medium">
                <p>Medium size accordion content.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>Large</h3>
              <ui-accordion label="Large Accordion" size="large">
                <p>Large size accordion content.</p>
              </ui-accordion>
            </div>
          </div>
        </div>

        <!-- ========================================= -->
        <!-- APPEARANCE VARIANTS -->
        <!-- ========================================= -->

        <div class="showcase__section">
          <h2 class="showcase__section__title">Appearance Variants</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Transparent (Default)</h3>
              <ui-accordion label="Transparent Accordion" appearance="transparent">
                <p>Transparent variant accordion.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>Subtle</h3>
              <ui-accordion label="Subtle Accordion" appearance="subtle">
                <p>Subtle variant accordion.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>Subtle Circular</h3>
              <ui-accordion label="Subtle Circular Accordion" variant="subtle-circular">
                <p>Subtle circular variant accordion.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>Filled Circular</h3>
              <ui-accordion label="Filled Circular Accordion" variant="filled-circular">
                <p>Filled circular variant accordion.</p>
              </ui-accordion>
            </div>
          </div>
        </div>

        <!-- ========================================= -->
        <!-- CHEVRON POSITIONS -->
        <!-- ========================================= -->

        <div class="showcase__section">
          <h2 class="showcase__section__title">Chevron Positions</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Before (Default)</h3>
              <ui-accordion label="Chevron Before" chevronPosition="before">
                <p>Chevron icon appears before the label.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>After</h3>
              <ui-accordion label="Chevron After" chevronPosition="after">
                <p>Chevron icon appears after the label.</p>
              </ui-accordion>
            </div>
          </div>
        </div>

        <!-- ========================================= -->
        <!-- CUSTOM CHEVRON ICONS -->
        <!-- ========================================= -->

        <div class="showcase__section">
          <h2 class="showcase__section__title">Custom Chevron Icons</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Custom Icons</h3>
              <ui-accordion
                label="Custom Chevron Icons"
                chevronIconCollapsed="arrow_right"
                chevronIconExpanded="arrow_down"
              >
                <p>Accordion with custom chevron icons.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>Custom Icons (After)</h3>
              <ui-accordion
                label="Custom Icons After"
                chevronPosition="after"
                chevronIconCollapsed="star"
                chevronIconExpanded="phone"
              >
                <p>Custom chevron icons in after position.</p>
              </ui-accordion>
            </div>
          </div>
        </div>

        <!-- ========================================= -->
        <!-- SELECTION INDICATORS -->
        <!-- ========================================= -->

        <div class="showcase__section">
          <h2 class="showcase__section__title">Selection Indicators</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Horizontal Indicator</h3>
              <ui-accordion
                label="Horizontal Indicator"
                [showSelectionIndicator]="true"
                indicatorPosition="horizontal"
              >
                <p>Accordion with horizontal selection indicator.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>Vertical Indicator</h3>
              <ui-accordion
                label="Vertical Indicator"
                [showSelectionIndicator]="true"
                indicatorPosition="vertical"
              >
                <p>Accordion with vertical selection indicator.</p>
              </ui-accordion>
            </div>
          </div>
        </div>

        <!-- ========================================= -->
        <!-- DISABLED STATE -->
        <!-- ========================================= -->

        <div class="showcase__section">
          <h2 class="showcase__section__title">Disabled State</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Disabled (Collapsed)</h3>
              <ui-accordion label="Disabled Accordion" [disabled]="true">
                <p>This content won't be visible because accordion is disabled.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>Disabled (Expanded)</h3>
              <ui-accordion label="Disabled Accordion (Expanded)" [disabled]="true">
                <p>This accordion is disabled but was expanded programmatically.</p>
              </ui-accordion>
            </div>
          </div>
        </div>

        <!-- ========================================= -->
        <!-- QUICK ACTIONS -->
        <!-- ========================================= -->

        <div class="showcase__section">
          <h2 class="showcase__section__title">Quick Actions</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>With Quick Actions</h3>
              <ui-accordion
                label="Accordion with Quick Actions"
                [showQuickActions]="true"
                [quickActionsTemplate]="quickActionsTemplate"
              >
                <p>This accordion has quick actions in the header.</p>
              </ui-accordion>
            </div>
          </div>
        </div>

        <!-- ========================================= -->
        <!-- COMBINED EXAMPLES -->
        <!-- ========================================= -->

        <div class="showcase__section">
          <h2 class="showcase__section__title">Combined Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Small + Subtle Circular + Chevron After</h3>
              <ui-accordion
                label="Small Subtle Circular"
                size="small"
                variant="subtle-circular"
                chevronPosition="after"
              >
                <p>Combined example with multiple options.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>Large + Filled Circular + Icon</h3>
              <ui-accordion
                label="Large Filled Circular"
                size="large"
                variant="filled-circular"
                icon="folder"
              >
                <p>Combined example with size, variant, and icon.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>Medium + Subtle + Horizontal Indicator</h3>
              <ui-accordion
                label="Medium Subtle with Indicator"
                size="medium"
                appearance="subtle"
                [showSelectionIndicator]="true"
                indicatorPosition="horizontal"
              >
                <p>Combined example with appearance and indicator.</p>
              </ui-accordion>
            </div>
          </div>
        </div>

        <!-- ========================================= -->
        <!-- CONTENT EXAMPLES -->
        <!-- ========================================= -->

        <div class="showcase__section">
          <h2 class="showcase__section__title">Content Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Simple Text</h3>
              <ui-accordion label="Simple Text Content">
                <p>This is simple text content inside the accordion.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>Multiple Paragraphs</h3>
              <ui-accordion label="Multiple Paragraphs">
                <p>First paragraph of content.</p>
                <p>Second paragraph of content.</p>
                <p>Third paragraph of content.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>Form Content</h3>
              <ui-accordion label="Form Content">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <ui-text label="Name" placeholder="Enter your name" size="small" />
                  <ui-email label="Email" placeholder="Enter your email" size="small" />
                  <ui-button variant="primary" size="small">Submit</ui-button>
                </div>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3>List Content</h3>
              <ui-accordion label="List Content">
                <ul>
                  <li>Item 1</li>
                  <li>Item 2</li>
                  <li>Item 3</li>
                </ul>
              </ui-accordion>
            </div>
          </div>
        </div>

        <!-- ========================================= -->
        <!-- EVENT TRACKING -->
        <!-- ========================================= -->

        <div class="showcase__section">
          <h2 class="showcase__section__title">Event Tracking</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Toggle Events</h3>
              <ui-accordion label="Track Toggle Events" (toggle)="onToggle($event)">
                <p>Open the browser console to see toggle events.</p>
                <p>Expanded: {{ trackedAccordionExpanded() ? 'Yes' : 'No' }}</p>
              </ui-accordion>
              <div style="margin-top: 8px; padding: 8px; background: #f5f5f5; border-radius: 4px;">
                <p style="font-size: 12px; margin: 0;">
                  <strong>Toggle Count:</strong> {{ toggleCount() }}
                </p>
                <p style="font-size: 12px; margin: 4px 0 0 0;">
                  <strong>Last Event:</strong> {{ lastToggleEvent() }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions Template -->
        <ng-template #quickActionsTemplate let-node>
          <div style="display: flex; gap: 4px; align-items: center;">
            <ui-button
              variant="primary"
              size="small"
              (click)="onQuickActionClick('edit'); $event.stopPropagation()"
            >
              Edit
            </ui-button>
            <ui-button
              variant="primary"
              size="small"
              (click)="onQuickActionClick('delete'); $event.stopPropagation()"
            >
              Delete
            </ui-button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class AccordionShowcaseComponent {
  quickActionsTemplate = viewChild<TemplateRef<any>>('quickActionsTemplate');

  // Reference to showcase
  private showcaseRef = viewChild<InteractiveShowcaseComponent>('showcase');

  // Values from showcase
  private values = signal<Record<string, any>>({});

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-accordion',
    controlGroups: [
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'layout', label: 'Layout', icon: 'resize' as any },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        options: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ],
        defaultValue: 'medium',
        group: 'layout',
      },
      {
        key: 'appearance',
        label: 'Appearance',
        type: 'dropdown',
        options: [
          { value: 'transparent', label: 'Transparent' },
          { value: 'subtle', label: 'Subtle' },
        ],
        defaultValue: 'subtle',
        group: 'appearance',
      },
      {
        key: 'shape',
        label: 'Shape',
        type: 'dropdown',
        options: [
          { value: 'rounded', label: 'Rounded' },
          { value: 'circular', label: 'Circular' },
          { value: 'square', label: 'Square' },
        ],
        defaultValue: 'rounded',
        group: 'appearance',
      },
      {
        key: 'chevronPosition',
        label: 'Chevron Position',
        type: 'dropdown',
        options: [
          { value: 'before', label: 'Before' },
          { value: 'after', label: 'After' },
        ],
        defaultValue: 'before',
        group: 'layout',
      },
      {
        key: 'icon',
        label: 'Icon',
        type: 'dropdown',
        options: [
          { value: '', label: 'None' },
          { value: 'folder', label: 'Folder' },
          { value: 'settings', label: 'Settings' },
          { value: 'info', label: 'Info' },
          { value: 'star', label: 'Star' },
        ],
        defaultValue: '',
        group: 'appearance',
      },
      {
        key: 'showIndicator',
        label: 'Show Indicator',
        type: 'switch',
        defaultValue: false,
        group: 'appearance',
      },
      {
        key: 'indicatorPosition',
        label: 'Indicator Position',
        type: 'dropdown',
        options: [
          { value: 'horizontal', label: 'Horizontal' },
          { value: 'vertical', label: 'Vertical' },
        ],
        defaultValue: 'vertical',
        group: 'appearance',
      },
      {
        key: 'disabled',
        label: 'Disabled',
        type: 'switch',
        defaultValue: false,
        group: 'state',
      },
    ],
  };

  // Computed values
  currentSize = computed(() => this.values()['size'] as Size);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentChevronPosition = computed(() => this.values()['chevronPosition'] as ChevronPosition);
  currentIcon = computed(() => {
    const icon = this.values()['icon'] as string;
    return icon ? (icon as IconName) : undefined;
  });
  currentShowIndicator = computed(() => this.values()['showIndicator'] as boolean);
  currentIndicatorPosition = computed(() => this.values()['indicatorPosition'] as Orientation);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    // Reset is handled by showcase component
  }

  expandedAccordion = signal<boolean>(true);
  trackedAccordionExpanded = signal<boolean>(false);
  toggleCount = signal<number>(0);
  lastToggleEvent = signal<string>('None');

  onInteractiveToggle(expanded: boolean): void {
    // Event logging is handled by showcase component
  }

  onToggle(expanded: boolean): void {
    this.trackedAccordionExpanded.set(expanded);
    this.toggleCount.update(count => count + 1);
    this.lastToggleEvent.set(`Toggled: ${expanded ? 'Expanded' : 'Collapsed'}`);
    console.log('Accordion toggled:', expanded);
  }

  onQuickActionClick(action: string): void {
    console.log('Quick action clicked:', action);
    alert(`Quick action: ${action}`);
  }
}
