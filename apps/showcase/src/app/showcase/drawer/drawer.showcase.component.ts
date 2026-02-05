import { Component, signal, model, computed, viewChild } from '@angular/core';

import { DrawerComponent, DrawerPosition } from 'angular-ui';
import { ButtonComponent } from 'angular-ui';
import { QuickAction } from 'angular-ui';
import { DividerComponent } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { IconName } from 'angular-ui';

@Component({
  selector: 'app-drawer-showcase',
  imports: [
    DrawerComponent,
    ButtonComponent,
    DividerComponent,
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
        <h1 class="showcase__title">Drawer Component</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Drawer component built with Fluent 2 Design System. The
          Drawer provides a slide-in panel from any side of the screen with customizable content and
          actions.
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
              <ui-button variant="primary" (click)="showInteractiveDrawer()">
                Open Interactive Drawer
              </ui-button>
              <ui-drawer
                [title]="currentTitle()"
                [bodyText]="currentBodyText()"
                [position]="currentPosition()"
                [size]="currentSize()"
                [closable]="currentClosable()"
                [backdrop]="currentBackdrop()"
                [(visible)]="interactiveDrawerVisible"
                [primaryAction]="interactivePrimaryAction()"
                [secondaryAction]="interactiveSecondaryAction()"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Drawer</h2>
          <p class="showcase__section__description">
            Simple drawer with title, body text and action buttons.
          </p>
          <div class="showcase__preview">
            <ui-button variant="primary" (click)="showBasicDrawer()">
              Open Basic Drawer
            </ui-button>

            <ui-drawer
              title="Drawer Title"
              bodyText="This is a basic drawer component with title and body text. You can add custom content here."
              position="right"
              [(visible)]="basicDrawerVisible"
              [primaryAction]="basicPrimaryAction()"
              [secondaryAction]="basicSecondaryAction()"
            />
          </div>
        </div>

        <!-- Drawer Positions -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Drawer Positions</h2>
          <p class="showcase__section__description">
            Drawer can slide in from any side: left, right, top, or bottom.
          </p>
          <div class="showcase__preview">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <ui-button appearance="outline" (click)="showPositionDrawer('left')">
                Left Drawer
              </ui-button>
              <ui-button appearance="outline" (click)="showPositionDrawer('right')">
                Right Drawer
              </ui-button>
              <ui-button appearance="outline" (click)="showPositionDrawer('top')">
                Top Drawer
              </ui-button>
              <ui-button appearance="outline" (click)="showPositionDrawer('bottom')">
                Bottom Drawer
              </ui-button>
            </div>

            <ui-drawer
              title="Position Drawer"
              bodyText="This drawer demonstrates different positions. It can slide in from any side of the screen."
              [position]="positionDrawerPosition()"
              [(visible)]="positionDrawerVisible"
              [primaryAction]="positionPrimaryAction()"
              [secondaryAction]="positionSecondaryAction()"
            />
          </div>
        </div>

        <!-- Drawer Sizes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Drawer Sizes</h2>
          <p class="showcase__section__description">
            Different drawer sizes: small, medium, and large.
          </p>
          <div class="showcase__preview">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <ui-button appearance="outline" (click)="showSizeDrawer('small')">
                Small Drawer
              </ui-button>
              <ui-button appearance="outline" (click)="showSizeDrawer('medium')">
                Medium Drawer
              </ui-button>
              <ui-button appearance="outline" (click)="showSizeDrawer('large')">
                Large Drawer
              </ui-button>
            </div>

            <ui-drawer
              title="Size Drawer"
              bodyText="This drawer demonstrates different sizes. Size affects the width (for left/right) or height (for top/bottom)."
              [position]="sizeDrawerPosition()"
              [size]="sizeDrawerSize()"
              [(visible)]="sizeDrawerVisible"
              [primaryAction]="sizePrimaryAction()"
              [secondaryAction]="sizeSecondaryAction()"
            />
          </div>
        </div>

        <!-- Drawer with Custom Content -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Drawer with Custom Content</h2>
          <p class="showcase__section__description">
            Drawer with projected content instead of simple body text.
          </p>
          <div class="showcase__preview">
            <ui-button variant="primary" (click)="showCustomContentDrawer()">
              Open Custom Content Drawer
            </ui-button>

            <ui-drawer
              title="Custom Content Drawer"
              position="right"
              [(visible)]="customContentDrawerVisible"
              [primaryAction]="customPrimaryAction()"
              [secondaryAction]="customSecondaryAction()"
            >
              <div style="padding: 16px 0;">
                <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">
                  Section Title
                </h3>
                <p style="margin: 0 0 16px 0; color: #616161;">
                  This is a custom content section. You can place any component or HTML here.
                </p>
                <ui-divider />
                <div style="margin-top: 16px;">
                  <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Item List</h4>
                  <ul style="margin: 0; padding-left: 24px; color: #616161;">
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                  </ul>
                </div>
              </div>
            </ui-drawer>
          </div>
        </div>

        <!-- Non-Closable Drawer -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Non-Closable Drawer</h2>
          <p class="showcase__section__description">
            Drawer that can only be closed via action buttons (no close button, no ESC key, no
            backdrop click).
          </p>
          <div class="showcase__preview">
            <ui-button variant="primary" (click)="showNonClosableDrawer()">
              Open Non-Closable Drawer
            </ui-button>

            <ui-drawer
              title="Important Action Required"
              bodyText="You must take one of the actions below. This drawer cannot be dismissed by clicking outside or pressing ESC."
              position="right"
              [closable]="false"
              backdrop="static"
              [(visible)]="nonClosableDrawerVisible"
              [primaryAction]="nonClosablePrimaryAction()"
              [secondaryAction]="nonClosableSecondaryAction()"
            />
          </div>
        </div>

        <!-- Multiple Actions -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Drawer with Multiple Actions</h2>
          <p class="showcase__section__description">
            Drawer with additional action buttons beyond primary and secondary.
          </p>
          <div class="showcase__preview">
            <ui-button variant="primary" (click)="showMultipleActionsDrawer()">
              Open Multi-Action Drawer
            </ui-button>

            <ui-drawer
              title="Choose an action"
              bodyText="This drawer has multiple action buttons to choose from."
              position="right"
              [(visible)]="multipleActionsDrawerVisible"
              [primaryAction]="multiplePrimaryAction()"
              [secondaryAction]="multipleSecondaryAction()"
              [additionalActions]="additionalActions()"
            />
          </div>
        </div>

        <!-- No Actions Drawer -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Information Only Drawer</h2>
          <p class="showcase__section__description">
            Drawer without action buttons - informational only.
          </p>
          <div class="showcase__preview">
            <ui-button variant="primary" (click)="showInfoDrawer()"> Open Info Drawer </ui-button>

            <ui-drawer
              title="Information"
              bodyText="This is an informational drawer. Close it by clicking the X button, pressing ESC, or clicking the backdrop."
              position="right"
              [(visible)]="infoDrawerVisible"
            />
          </div>
        </div>

        <!-- Usage Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Usage Example</h2>
          <p class="showcase__section__description">
            Example of how to use the Drawer in your application:
          </p>
          <div class="showcase__code">
            <pre><code>{{ usageExample }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DrawerShowcaseComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  positions: DrawerPosition[] = ['left', 'right', 'top', 'bottom'];
  sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
  backdrops: ('static' | 'dynamic')[] = ['static', 'dynamic'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-drawer',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as IconName, expanded: true },
      { id: 'appearance', label: 'Appearance', icon: 'color' as IconName, expanded: true },
      { id: 'behavior', label: 'Behavior', icon: 'settings' as IconName },
    ],
    controls: [
      {
        key: 'title',
        label: 'Title',
        type: 'text',
        description: 'Drawer title',
        defaultValue: 'Drawer Title',
        placeholder: 'Enter drawer title',
        group: 'content',
      },
      {
        key: 'bodyText',
        label: 'Body Text',
        type: 'textarea',
        description: 'Drawer body text',
        defaultValue:
          'This is a drawer component with title and body text. You can add custom content here.',
        placeholder: 'Enter body text',
        rows: 3,
        group: 'content',
      },
      {
        key: 'position',
        label: 'Position',
        type: 'dropdown',
        description: 'Drawer position',
        options: this.positions.map(p => ({ value: p, label: p })),
        defaultValue: 'right',
        group: 'appearance',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        description: 'Drawer size',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'appearance',
      },
      {
        key: 'closable',
        label: 'Closable',
        type: 'switch',
        description: 'Allow closing via close button, ESC, or backdrop',
        defaultValue: true,
        group: 'behavior',
      },
      {
        key: 'backdrop',
        label: 'Backdrop',
        type: 'dropdown',
        description: 'Backdrop behavior',
        options: this.backdrops.map(b => ({ value: b, label: b })),
        defaultValue: 'dynamic',
        group: 'behavior',
      },
    ],
  };

  private values = signal<Record<string, any>>({
    title: 'Drawer Title',
    bodyText:
      'This is a drawer component with title and body text. You can add custom content here.',
    position: 'right',
    size: 'medium',
    closable: true,
    backdrop: 'dynamic',
  });

  currentTitle = computed(() => this.values()['title'] as string);
  currentBodyText = computed(() => this.values()['bodyText'] as string);
  currentPosition = computed(() => this.values()['position'] as DrawerPosition);
  currentSize = computed(() => this.values()['size'] as 'small' | 'medium' | 'large');
  currentClosable = computed(() => this.values()['closable'] as boolean);
  currentBackdrop = computed(() => this.values()['backdrop'] as 'static' | 'dynamic');

  interactiveDrawerVisible = model(false);
  interactivePrimaryAction = signal<QuickAction>({
    label: 'Save',
    variant: 'primary',
    action: () => {
      this.interactiveDrawerVisible.set(false);
    },
  });
  interactiveSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.interactiveDrawerVisible.set(false);
    },
  });

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    // Values are reset by the showcase component
  }

  showInteractiveDrawer(): void {
    this.interactiveDrawerVisible.set(true);
  }
  // Basic Drawer
  basicDrawerVisible = model(false);
  basicPrimaryAction = signal<QuickAction>({
    label: 'Save',
    variant: 'primary',
    action: () => {
      alert('Save action executed');
      this.basicDrawerVisible.set(false);
    },
  });
  basicSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.basicDrawerVisible.set(false);
    },
  });

  // Position Drawer
  positionDrawerVisible = model(false);
  positionDrawerPosition = signal<DrawerPosition>('right');
  positionPrimaryAction = signal<QuickAction>({
    label: 'OK',
    variant: 'primary',
    action: () => {
      this.positionDrawerVisible.set(false);
    },
  });
  positionSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.positionDrawerVisible.set(false);
    },
  });

  // Size Drawer
  sizeDrawerVisible = model(false);
  sizeDrawerSize = signal<'small' | 'medium' | 'large'>('medium');
  sizeDrawerPosition = signal<DrawerPosition>('right');
  sizePrimaryAction = signal<QuickAction>({
    label: 'OK',
    variant: 'primary',
    action: () => {
      this.sizeDrawerVisible.set(false);
    },
  });
  sizeSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.sizeDrawerVisible.set(false);
    },
  });

  // Custom Content Drawer
  customContentDrawerVisible = model(false);
  customPrimaryAction = signal<QuickAction>({
    label: 'Apply',
    variant: 'primary',
    action: () => {
      alert('Custom action executed');
      this.customContentDrawerVisible.set(false);
    },
  });
  customSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.customContentDrawerVisible.set(false);
    },
  });

  // Non-Closable Drawer
  nonClosableDrawerVisible = model(false);
  nonClosablePrimaryAction = signal<QuickAction>({
    label: 'Confirm',
    variant: 'primary',
    action: () => {
      alert('Action confirmed');
      this.nonClosableDrawerVisible.set(false);
    },
  });
  nonClosableSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.nonClosableDrawerVisible.set(false);
    },
  });

  // Multiple Actions Drawer
  multipleActionsDrawerVisible = model(false);
  multiplePrimaryAction = signal<QuickAction>({
    label: 'Save',
    variant: 'primary',
    action: () => {
      alert('Save action executed');
      this.multipleActionsDrawerVisible.set(false);
    },
  });
  multipleSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.multipleActionsDrawerVisible.set(false);
    },
  });
  additionalActions = signal<QuickAction[]>([
    {
      label: 'Delete',
      appearance: 'outline',
      action: () => {
        alert('Delete action executed');
      },
    },
    {
      label: 'Copy',
      appearance: 'subtle',
      action: () => {
        alert('Copy action executed');
      },
    },
  ]);

  // Info Drawer
  infoDrawerVisible = model(false);

  showBasicDrawer(): void {
    this.basicDrawerVisible.set(true);
  }

  showPositionDrawer(position: DrawerPosition): void {
    this.positionDrawerPosition.set(position);
    this.positionDrawerVisible.set(true);
  }

  showSizeDrawer(size: 'small' | 'medium' | 'large'): void {
    this.sizeDrawerSize.set(size);
    this.sizeDrawerPosition.set(size === 'small' || size === 'medium' ? 'right' : 'right');
    this.sizeDrawerVisible.set(true);
  }

  showCustomContentDrawer(): void {
    this.customContentDrawerVisible.set(true);
  }

  showNonClosableDrawer(): void {
    this.nonClosableDrawerVisible.set(true);
  }

  showMultipleActionsDrawer(): void {
    this.multipleActionsDrawerVisible.set(true);
  }

  showInfoDrawer(): void {
    this.infoDrawerVisible.set(true);
  }

  usageExample = `// In your component
import { DrawerComponent } from '../drawer';
import { QuickAction } from 'angular-ui';

@Component({
  template: \`
    <ui-button appearance="filled" (click)="showDrawer()">Open Drawer</ui-button>
    
    <ui-drawer
      title="Drawer Title"
      bodyText="Drawer content goes here."
      position="right"
      [(visible)]="drawerVisible"
      [primaryAction]="primaryAction()"
      [secondaryAction]="secondaryAction()"
    />
  \`
})
export class MyComponent {
  drawerVisible = signal(false);
  
  primaryAction = signal<QuickAction>({
    label: 'Save',
    variant: 'primary',
    action: () => {
      console.log('Save clicked');
      this.drawerVisible.set(false);
    }
  });
  
  secondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.drawerVisible.set(false);
    }
  });
  
  showDrawer() {
    this.drawerVisible.set(true);
  }
}`;
}

