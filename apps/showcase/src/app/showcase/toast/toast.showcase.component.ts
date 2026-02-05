import { Component, inject, signal, computed, viewChild } from '@angular/core';
import { ToastComponent } from 'angular-ui';
import { ToastContainerComponent } from 'angular-ui';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'angular-ui';
import { ToastService } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { Variant, Appearance, Size } from 'angular-ui';

@Component({
  selector: 'app-toast-showcase',
  imports: [
    ToastComponent,
    ToastContainerComponent,
    CommonModule,
    ButtonComponent,
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
        <h1 class="showcase__title">Toast Component</h1>
        <p class="showcase__description">
          Toast notifications built with Fluent 2 Design System. Unified API: variant + appearance +
          size.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            (valuesChange)="onValuesChange($event)"
            (reset)="onReset()"
          >
            <!-- Preview -->
            <div preview>
              <ui-toast
                [variant]="currentVariant()"
                [appearance]="currentAppearance()"
                [size]="currentSize()"
                [title]="currentTitle()"
                [message]="currentMessage()"
                [dismissible]="currentDismissible()"
                [showIcon]="currentShowIcon()"
                [showProgress]="currentShowProgress()"
                [visible]="true"
                (dismiss)="onInteractiveDismiss()"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Toast Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variants (Semantic Colors)</h2>
          <div class="showcase__grid">
            @for (v of variants; track v) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ v | titlecase }}</h3>
                <ui-toast
                  [variant]="v"
                  [title]="v + ' Toast'"
                  [message]="'This is a ' + v + ' message'"
                  [visible]="true"
                ></ui-toast>
              </div>
            }
          </div>
        </div>

        <!-- Toast Appearances -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Appearances</h2>
          <div class="showcase__grid">
            @for (a of appearances; track a) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ a | titlecase }}</h3>
                <ui-toast
                  variant="info"
                  [appearance]="a"
                  [title]="a + ' Appearance'"
                  [message]="'This is ' + a + ' style'"
                  [visible]="true"
                ></ui-toast>
              </div>
            }
          </div>
        </div>

        <!-- Toast Sizes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Sizes</h2>
          <div class="showcase__grid">
            @for (s of sizes; track s) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ s | titlecase }}</h3>
                <ui-toast
                  variant="success"
                  [size]="s"
                  [title]="s + ' Toast'"
                  [message]="'This is a ' + s + ' toast'"
                  [visible]="true"
                ></ui-toast>
              </div>
            }
          </div>
        </div>

        <!-- Variant + Appearance Combinations -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variant + Appearance Combinations</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <ui-toast
                variant="success"
                appearance="filled"
                title="Success Filled"
                message="Colored background"
                [visible]="true"
              ></ui-toast>
            </div>
            <div class="showcase__item">
              <ui-toast
                variant="warning"
                appearance="outline"
                title="Warning Outline"
                message="Border only"
                [visible]="true"
              ></ui-toast>
            </div>
            <div class="showcase__item">
              <ui-toast
                variant="danger"
                appearance="subtle"
                title="Danger Subtle"
                message="Neutral background"
                [visible]="true"
              ></ui-toast>
            </div>
            <div class="showcase__item">
              <ui-toast
                variant="info"
                appearance="transparent"
                title="Info Transparent"
                message="No background"
                [visible]="true"
              ></ui-toast>
            </div>
          </div>
        </div>

        <!-- Interactive Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive Toast Service</h2>
          <p class="showcase__section__description">
            Click the buttons below to trigger toast notifications.
          </p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-toast-container position="top-right"></ui-toast-container>
              <div class="showcase__form">
                <ui-button type="button" (click)="showInfoToast()" variant="info">
                  Show Info Toast
                </ui-button>
                <ui-button type="button" (click)="showSuccessToast()" variant="success">
                  Show Success Toast
                </ui-button>
                <ui-button type="button" (click)="showWarningToast()" variant="warning">
                  Show Warning Toast
                </ui-button>
                <ui-button type="button" (click)="showErrorToast()" variant="danger">
                  Show Error Toast
                </ui-button>
              </div>
            </div>
          </div>
        </div>

        <!-- Toast Options -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Toast Options</h2>
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Dismissible</h3>
              <ui-toast
                variant="info"
                title="Dismissible Toast"
                message="Click the X to dismiss"
                [dismissible]="true"
                [visible]="true"
              ></ui-toast>
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">With Progress Bar</h3>
              <ui-toast
                variant="success"
                title="Auto Dismiss"
                message="This toast will auto dismiss in 5s"
                [duration]="5000"
                [showProgress]="true"
                [visible]="true"
              ></ui-toast>
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Without Icon</h3>
              <ui-toast
                variant="warning"
                title="No Icon"
                message="This toast has no icon"
                [showIcon]="false"
                [visible]="true"
              ></ui-toast>
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Without Progress</h3>
              <ui-toast
                variant="info"
                title="No Progress"
                message="This toast has no progress bar"
                [showProgress]="false"
                [visible]="true"
              ></ui-toast>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ToastShowcaseComponent {
  private toastService = inject(ToastService);

  variants: Variant[] = ['info', 'success', 'warning', 'danger'];
  appearances: Appearance[] = ['filled', 'outline', 'subtle', 'transparent'];
  sizes: Size[] = ['small', 'medium', 'large'];

  // Reference to showcase for event logging
  private showcaseRef = viewChild<InteractiveShowcaseComponent>('showcase');

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-toast',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'options', label: 'Options', icon: 'settings' as any },
    ],
    controls: [
      {
        key: 'title',
        label: 'Title',
        type: 'text',
        description: 'Toast title',
        defaultValue: 'Toast Title',
        placeholder: 'Enter title',
        group: 'content',
      },
      {
        key: 'message',
        label: 'Message',
        type: 'textarea',
        description: 'Toast message',
        defaultValue: 'This is a toast message.',
        placeholder: 'Enter message',
        rows: 2,
        group: 'content',
      },
      {
        key: 'variant',
        label: 'Variant',
        type: 'dropdown',
        description: 'Toast variant',
        options: this.variants.map(v => ({ value: v, label: v })),
        defaultValue: 'info',
        group: 'appearance',
      },
      {
        key: 'appearance',
        label: 'Appearance',
        type: 'dropdown',
        description: 'Visual style',
        options: this.appearances.map(a => ({ value: a, label: a })),
        defaultValue: 'filled',
        group: 'appearance',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        description: 'Toast size',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'appearance',
      },
      {
        key: 'dismissible',
        label: 'Dismissible',
        type: 'switch',
        description: 'Show dismiss button',
        defaultValue: true,
        group: 'options',
      },
      {
        key: 'showIcon',
        label: 'Show Icon',
        type: 'switch',
        description: 'Show variant icon',
        defaultValue: true,
        group: 'options',
      },
      {
        key: 'showProgress',
        label: 'Show Progress',
        type: 'switch',
        description: 'Show progress bar',
        defaultValue: true,
        group: 'options',
      },
    ],
  };

  // Current values from showcase
  private values = signal<Record<string, any>>({
    title: 'Toast Title',
    message: 'This is a toast message.',
    variant: 'info',
    appearance: 'filled',
    size: 'medium',
    dismissible: true,
    showIcon: true,
    showProgress: true,
  });

  // Computed values for the toast
  currentTitle = computed(() => this.values()['title'] as string);
  currentMessage = computed(() => this.values()['message'] as string);
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentDismissible = computed(() => this.values()['dismissible'] as boolean);
  currentShowIcon = computed(() => this.values()['showIcon'] as boolean);
  currentShowProgress = computed(() => this.values()['showProgress'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    // Values are reset by the showcase component
  }

  onInteractiveDismiss(): void {
    this.showcaseRef()?.logEvent('dismiss', { title: this.currentTitle() });
  }

  showInfoToast() {
    this.toastService.info('Information', 'This is an informational message.');
  }

  showSuccessToast() {
    this.toastService.success('Success!', 'Your operation completed successfully.');
  }

  showWarningToast() {
    this.toastService.warn('Warning', 'Please review your input before proceeding.');
  }

  showErrorToast() {
    this.toastService.error('Error', 'Something went wrong. Please try again.');
  }
}

