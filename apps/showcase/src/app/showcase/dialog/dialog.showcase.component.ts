import { Component, signal, model, computed } from '@angular/core';
import { DialogComponent, DialogBackdrop } from 'angular-ui';
import { ButtonComponent } from 'angular-ui';
import { QuickAction } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';

@Component({
  selector: 'app-dialog-showcase',

  imports: [
    DialogComponent,
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
        <h1 class="showcase__title">Dialog Component</h1>
        <p class="showcase__description">
          Dialog component based on Fluent 2 Design System - displays modal dialogs with
          customizable content and actions.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            [config]="showcaseConfig"
            [showEventLog]="false"
            (valuesChange)="onValuesChange($event)"
            (reset)="onReset()"
          >
            <div preview>
              <ui-button variant="primary" (click)="openInteractiveDialog()">
                Open Interactive Dialog
              </ui-button>

              <ui-dialog
                [title]="currentTitle()"
                [bodyText]="currentBodyText()"
                [(visible)]="interactiveDialogVisible"
                [closable]="currentClosable()"
                [backdrop]="currentBackdrop()"
                [fullscreen]="currentFullscreen()"
                [width]="currentWidth()"
                [primaryAction]="interactivePrimaryAction()"
                [secondaryAction]="interactiveSecondaryAction()"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Dialog -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic Dialog</h2>
          <p class="showcase__section__description">
            Simple dialog with title, body text and action buttons.
          </p>

          <div class="showcase__demo">
            <ui-button variant="primary" (click)="showBasicDialog()"> Open Basic Dialog </ui-button>

            <ui-dialog
              title="Main question or action"
              bodyText="Here is more about the consequences of the main action, if details are needed."
              [(visible)]="basicDialogVisible"
              [primaryAction]="basicPrimaryAction()"
              [secondaryAction]="basicSecondaryAction()"
            />
          </div>
        </section>

        <!-- Dialog with Custom Content -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Dialog with Custom Content</h2>
          <p class="showcase__section__description">
            Dialog with projected content instead of simple body text.
          </p>

          <div class="showcase__demo">
            <ui-button variant="primary" (click)="showCustomContentDialog()">
              Open Custom Content Dialog
            </ui-button>

            <ui-dialog
              title="Main question or action"
              [(visible)]="customContentDialogVisible"
              [primaryAction]="customPrimaryAction()"
              [secondaryAction]="customSecondaryAction()"
            >
              <div
                style="background: #EBF3FC; min-width: 100%; min-height: 100%; padding: 40px; text-align: center; border-radius: 4px;"
              >
                <p style="color: #0F6CBD; font-size: 14px; margin: 0;">
                  Custom content area - you can place any component or HTML here
                </p>
              </div>
            </ui-dialog>
          </div>
        </section>

        <!-- Dialog Sizes -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Dialog Sizes</h2>
          <p class="showcase__section__description">
            Different dialog sizes: small (320px), medium (600px), large (800px).
          </p>

          <div class="showcase__demo" style="display: flex; gap: 8px;">
            <ui-button appearance="outline" (click)="showSmallDialog()"> Small Dialog </ui-button>

            <ui-button appearance="outline" (click)="showMediumDialog()"> Medium Dialog </ui-button>

            <ui-button appearance="outline" (click)="showLargeDialog()"> Large Dialog </ui-button>

            <ui-dialog
              title="Small Dialog (320px)"
              bodyText="This is a small dialog suitable for mobile devices or simple confirmations."
              size="small"
              [(visible)]="smallDialogVisible"
              [primaryAction]="sizePrimaryAction()"
              [secondaryAction]="sizeSecondaryAction()"
            />

            <ui-dialog
              title="Medium Dialog (600px)"
              bodyText="This is a medium dialog - the default size for most use cases."
              size="medium"
              [(visible)]="mediumDialogVisible"
              [primaryAction]="sizePrimaryAction()"
              [secondaryAction]="sizeSecondaryAction()"
            />

            <ui-dialog
              title="Large Dialog (800px)"
              bodyText="This is a large dialog suitable for complex forms or detailed information."
              size="large"
              [(visible)]="largeDialogVisible"
              [primaryAction]="sizePrimaryAction()"
              [secondaryAction]="sizeSecondaryAction()"
            />
          </div>
        </section>

        <!-- Non-Closable Dialog -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Non-Closable Dialog</h2>
          <p class="showcase__section__description">
            Dialog that can only be closed via action buttons (no close button, no ESC key, no
            backdrop click).
          </p>

          <div class="showcase__demo">
            <ui-button variant="primary" (click)="showNonClosableDialog()">
              Open Non-Closable Dialog
            </ui-button>

            <ui-dialog
              title="Important Action Required"
              bodyText="You must take one of the actions below. This dialog cannot be dismissed."
              [closable]="false"
              backdrop="static"
              [(visible)]="nonClosableDialogVisible"
              [primaryAction]="nonClosablePrimaryAction()"
              [secondaryAction]="nonClosableSecondaryAction()"
            />
          </div>
        </section>

        <!-- Multiple Actions -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Multiple Actions</h2>
          <p class="showcase__section__description">
            Dialog with additional action buttons beyond primary and secondary.
          </p>

          <div class="showcase__demo">
            <ui-button variant="primary" (click)="showMultipleActionsDialog()">
              Open Multi-Action Dialog
            </ui-button>

            <ui-dialog
              title="Choose an action"
              bodyText="This dialog has multiple action buttons to choose from."
              [(visible)]="multipleActionsDialogVisible"
              [primaryAction]="multiplePrimaryAction()"
              [secondaryAction]="multipleSecondaryAction()"
              [additionalActions]="additionalActions()"
            />
          </div>
        </section>

        <!-- No Actions Dialog -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Information Only Dialog</h2>
          <p class="showcase__section__description">
            Dialog without action buttons - informational only.
          </p>

          <div class="showcase__demo">
            <ui-button variant="primary" (click)="showInfoDialog()"> Open Info Dialog </ui-button>

            <ui-dialog
              title="Information"
              bodyText="This is an informational dialog. Close it by clicking the X button, pressing ESC, or clicking the backdrop."
              [(visible)]="infoDialogVisible"
            />
          </div>
        </section>
      </div>
    </div>
  `,
})
export class DialogShowcaseComponent {
  // Basic Dialog
  basicDialogVisible = model(false);
  basicPrimaryAction = signal<QuickAction>({
    label: 'Take action',
    variant: 'primary',
    action: () => {
      console.log('Primary action clicked');
      this.basicDialogVisible.set(false);
    },
  });
  basicSecondaryAction = signal<QuickAction>({
    label: 'Different action',
    variant: 'secondary',
    action: () => {
      console.log('Secondary action clicked');
      this.basicDialogVisible.set(false);
    },
  });

  // Custom Content Dialog
  customContentDialogVisible = model(false);
  customPrimaryAction = signal<QuickAction>({
    label: 'Confirm',
    variant: 'primary',
    action: () => {
      this.customContentDialogVisible.set(false);
    },
  });
  customSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.customContentDialogVisible.set(false);
    },
  });

  // Size Dialogs
  smallDialogVisible = model(false);
  mediumDialogVisible = model(false);
  largeDialogVisible = model(false);
  sizePrimaryAction = signal<QuickAction>({
    label: 'OK',
    variant: 'primary',
    action: () => {
      this.smallDialogVisible.set(false);
      this.mediumDialogVisible.set(false);
      this.largeDialogVisible.set(false);
    },
  });
  sizeSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.smallDialogVisible.set(false);
      this.mediumDialogVisible.set(false);
      this.largeDialogVisible.set(false);
    },
  });

  // Non-Closable Dialog
  nonClosableDialogVisible = model(false);
  nonClosablePrimaryAction = signal<QuickAction>({
    label: 'Accept',
    variant: 'primary',
    action: () => {
      console.log('Accepted');
      this.nonClosableDialogVisible.set(false);
    },
  });
  nonClosableSecondaryAction = signal<QuickAction>({
    label: 'Decline',
    variant: 'secondary',
    action: () => {
      console.log('Declined');
      this.nonClosableDialogVisible.set(false);
    },
  });

  // Multiple Actions Dialog
  multipleActionsDialogVisible = model(false);
  multiplePrimaryAction = signal<QuickAction>({
    label: 'Primary',
    variant: 'primary',
    action: () => {
      console.log('Primary clicked');
      this.multipleActionsDialogVisible.set(false);
    },
  });
  multipleSecondaryAction = signal<QuickAction>({
    label: 'Secondary',
    variant: 'secondary',
    action: () => {
      console.log('Secondary clicked');
      this.multipleActionsDialogVisible.set(false);
    },
  });
  additionalActions = signal<QuickAction[]>([
    {
      label: 'Option A',
      variant: 'secondary',
      appearance: 'outline',
      action: () => {
        console.log('Option A clicked');
        this.multipleActionsDialogVisible.set(false);
      },
    },
    {
      label: 'Option B',
      variant: 'secondary',
      appearance: 'subtle',
      action: () => {
        console.log('Option B clicked');
        this.multipleActionsDialogVisible.set(false);
      },
    },
  ]);

  // Info Dialog
  infoDialogVisible = model(false);

  // Interactive showcase
  backdrops: DialogBackdrop[] = ['dynamic', 'static'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-dialog',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any, expanded: true },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any },
      { id: 'behavior', label: 'Behavior', icon: 'settings' as any },
    ],
    controls: [
      {
        key: 'title',
        label: 'Title',
        type: 'text',
        defaultValue: 'Dialog Title',
        placeholder: 'Enter title',
        group: 'content',
      },
      {
        key: 'bodyText',
        label: 'Body Text',
        type: 'textarea',
        defaultValue: 'This is the dialog body text. You can customize it using the controls.',
        placeholder: 'Enter body text',
        rows: 3,
        group: 'content',
      },
      {
        key: 'width',
        label: 'Width',
        type: 'text',
        defaultValue: '600px',
        placeholder: 'e.g., 600px, 50%',
        group: 'appearance',
      },
      {
        key: 'fullscreen',
        label: 'Fullscreen',
        type: 'switch',
        defaultValue: false,
        group: 'appearance',
      },
      {
        key: 'closable',
        label: 'Closable',
        type: 'switch',
        defaultValue: true,
        group: 'behavior',
      },
      {
        key: 'backdrop',
        label: 'Backdrop',
        type: 'dropdown',
        options: this.backdrops.map(b => ({ value: b, label: b })),
        defaultValue: 'dynamic',
        group: 'behavior',
      },
    ],
  };

  private values = signal<Record<string, any>>({
    title: 'Dialog Title',
    bodyText: 'This is the dialog body text. You can customize it using the controls.',
    width: '600px',
    fullscreen: false,
    closable: true,
    backdrop: 'dynamic',
  });

  currentTitle = computed(() => this.values()['title'] as string);
  currentBodyText = computed(() => this.values()['bodyText'] as string);
  currentWidth = computed(() => this.values()['width'] as string);
  currentFullscreen = computed(() => this.values()['fullscreen'] as boolean);
  currentClosable = computed(() => this.values()['closable'] as boolean);
  currentBackdrop = computed(() => this.values()['backdrop'] as DialogBackdrop);

  interactiveDialogVisible = model(false);
  interactivePrimaryAction = signal<QuickAction>({
    label: 'Confirm',
    variant: 'primary',
    action: () => {
      console.log('Interactive dialog confirmed');
      this.interactiveDialogVisible.set(false);
    },
  });
  interactiveSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      console.log('Interactive dialog cancelled');
      this.interactiveDialogVisible.set(false);
    },
  });

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    // Reset is handled by showcase component
  }

  openInteractiveDialog(): void {
    this.interactiveDialogVisible.set(true);
  }

  // Methods
  showBasicDialog(): void {
    this.basicDialogVisible.set(true);
  }

  showCustomContentDialog(): void {
    this.customContentDialogVisible.set(true);
  }

  showSmallDialog(): void {
    this.smallDialogVisible.set(true);
  }

  showMediumDialog(): void {
    this.mediumDialogVisible.set(true);
  }

  showLargeDialog(): void {
    this.largeDialogVisible.set(true);
  }

  showNonClosableDialog(): void {
    this.nonClosableDialogVisible.set(true);
  }

  showMultipleActionsDialog(): void {
    this.multipleActionsDialogVisible.set(true);
  }

  showInfoDialog(): void {
    this.infoDialogVisible.set(true);
  }
}
