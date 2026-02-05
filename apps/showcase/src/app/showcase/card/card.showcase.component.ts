import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'angular-ui';
import { QuickAction, Appearance, Size, Variant } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { TableOfContentComponent } from 'angular-ui';

@Component({
  selector: 'app-card-showcase',
  imports: [CommonModule, CardComponent, InteractiveShowcaseComponent, TableOfContentComponent],
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
        <h1 class="showcase__title">Card Component</h1>
        <p class="showcase__description">
          Card component based on Fluent 2 Design System. Unified API: appearance + size.
        </p>

        <!-- Variants -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Variants</h2>
          <div class="showcase__grid showcase__grid--large">
            @for (v of variants; track v) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ v | titlecase }}</h3>
                <ui-card
                  title="Card Title"
                  subtitle="Additional metadata"
                  bodyText="This is a {{ v }} card variant."
                  [headerIcon]="'image'"
                  [variant]="v"
                  appearance="filled"
                  [primaryAction]="primaryAction"
                  [secondaryAction]="secondaryAction"
                />
              </div>
            }
          </div>
        </section>

        <!-- Appearances -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Appearances</h2>
          <div class="showcase__grid showcase__grid--large">
            @for (a of appearances; track a) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ a | titlecase }}</h3>
                <ui-card
                  title="Card Title"
                  subtitle="Additional metadata"
                  bodyText="This is a {{ a }} card appearance."
                  [headerIcon]="'image'"
                  [appearance]="a"
                  [primaryAction]="primaryAction"
                  [secondaryAction]="secondaryAction"
                />
              </div>
            }
          </div>
        </section>

        <!-- Sizes -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Sizes</h2>
          <div class="showcase__grid showcase__grid--large">
            @for (s of sizes; track s) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ s | titlecase }}</h3>
                <ui-card
                  title="Card Title"
                  subtitle="Subtitle"
                  bodyText="This is a {{ s }} sized card."
                  [headerIcon]="'image'"
                  appearance="filled"
                  [size]="s"
                />
              </div>
            }
          </div>
        </section>

        <!-- States -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">States</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Clickable</h3>
              <ui-card
                title="Clickable Card"
                subtitle="Click anywhere"
                bodyText="This card responds to click events with hover effects."
                [headerIcon]="'image'"
                appearance="filled"
                [clickable]="true"
                (cardClick)="onCardClick($event)"
              />
            </div>

            <div class="showcase__item">
              <h3 class="showcase__item__title">Disabled</h3>
              <ui-card
                title="Disabled Card"
                subtitle="Cannot interact"
                bodyText="This card is disabled."
                [headerIcon]="'image'"
                appearance="filled"
                [disabled]="true"
              />
            </div>
          </div>
        </section>

        <!-- With Actions -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">With Actions</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Both Actions</h3>
              <ui-card
                title="Full Card"
                subtitle="With all features"
                bodyText="Card with header icon, quick action, and footer buttons."
                [headerIcon]="'image'"
                [showQuickAction]="true"
                appearance="filled"
                [primaryAction]="primaryAction"
                [secondaryAction]="secondaryAction"
              />
            </div>

            <div class="showcase__item">
              <h3 class="showcase__item__title">Primary Only</h3>
              <ui-card
                title="Single Action"
                subtitle="One button"
                bodyText="Card with only primary action."
                [headerIcon]="'image'"
                appearance="outline"
                [primaryAction]="primaryAction"
              />
            </div>

            <div class="showcase__item">
              <h3 class="showcase__item__title">No Footer</h3>
              <ui-card
                title="Simple Card"
                subtitle="No actions"
                bodyText="Card without footer actions."
                [headerIcon]="'image'"
                appearance="subtle"
                [showFooter]="false"
              />
            </div>
          </div>
        </section>

        <!-- Interactive -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Example</h2>
          <app-interactive-showcase
            [config]="showcaseConfig"
            (valuesChange)="showcaseValues.set($event)"
          >
            <div preview>
              <ui-card
                title="Interactive Card"
                subtitle="Change settings above"
                bodyText="This card changes based on the controls above."
                [headerIcon]="'image'"
                [showQuickAction]="currentShowQuickAction()"
                [primaryAction]="currentShowFooter() ? primaryAction : null"
                [secondaryAction]="currentShowFooter() ? secondaryAction : null"
                [disabled]="currentDisabled()"
                [clickable]="currentClickable()"
                [variant]="currentVariant()"
                [appearance]="currentAppearance()"
                [size]="currentSize()"
                [showFooter]="currentShowFooter()"
                (cardClick)="onCardClick($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Event Log -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Event Log</h2>
          <div class="event-log">
            @for (event of eventLog; track $index) {
              <div class="event-log-item">{{ event }}</div>
            }
            @if (eventLog.length === 0) {
              <div class="event-log-empty">No events yet. Interact with cards above.</div>
            }
          </div>
        </section>
      </div>
    </div>
  `,
})
export class CardShowcaseComponent {
  variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
  appearances: Appearance[] = ['transparent', 'filled', 'tint', 'outline', 'subtle'];
  sizes: Size[] = ['small', 'medium', 'large'];
  eventLog: string[] = [];

  showcaseConfig: ShowcaseConfig = {
    controls: [
      {
        key: 'variant',
        type: 'dropdown',
        label: 'Variant',
        options: this.variants.map(v => ({ value: v, label: v })),
        defaultValue: 'primary',
        group: 'appearance',
      },
      {
        key: 'appearance',
        type: 'dropdown',
        label: 'Appearance',
        options: this.appearances.map(a => ({ value: a, label: a })),
        defaultValue: 'filled',
        group: 'appearance',
      },
      {
        key: 'size',
        type: 'dropdown',
        label: 'Size',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'appearance',
      },
      {
        key: 'disabled',
        type: 'switch',
        label: 'Disabled',
        defaultValue: false,
        group: 'options',
      },
      {
        key: 'clickable',
        type: 'switch',
        label: 'Clickable',
        defaultValue: true,
        group: 'options',
      },
      {
        key: 'showQuickAction',
        type: 'switch',
        label: 'Show Quick Action',
        defaultValue: true,
        group: 'options',
      },
      {
        key: 'showFooter',
        type: 'switch',
        label: 'Show Footer',
        defaultValue: true,
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

  showcaseValues = signal<Record<string, any>>({});

  currentVariant = computed(() => (this.showcaseValues()['variant'] as Variant) || 'primary');
  currentAppearance = computed(
    () => (this.showcaseValues()['appearance'] as Appearance) || 'filled',
  );
  currentSize = computed(() => (this.showcaseValues()['size'] as Size) || 'medium');
  currentDisabled = computed(() => (this.showcaseValues()['disabled'] as boolean) || false);
  currentClickable = computed(() => (this.showcaseValues()['clickable'] as boolean) || true);
  currentShowQuickAction = computed(
    () => (this.showcaseValues()['showQuickAction'] as boolean) || true,
  );
  currentShowFooter = computed(() => (this.showcaseValues()['showFooter'] as boolean) || true);

  primaryAction: QuickAction = {
    label: 'Primary',
    action: () => this.logEvent('Primary action clicked'),
  };

  secondaryAction: QuickAction = {
    label: 'Secondary',
    action: () => this.logEvent('Secondary action clicked'),
  };

  onCardClick(event: MouseEvent): void {
    this.logEvent('Card clicked');
  }

  private logEvent(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);
    if (this.eventLog.length > 10) this.eventLog.pop();
  }
}

