import { Component, signal, computed } from '@angular/core';

import { EmptyStateComponent } from 'angular-ui';
import { QuickAction, Size } from 'angular-ui';
import { ButtonComponent } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { IconName } from 'angular-ui';

@Component({
  selector: 'app-empty-state-showcase',
  imports: [
    EmptyStateComponent,
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
        <h1 class="showcase__title">Empty State Component</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Empty State component built with Fluent 2 Design System. The
          Empty State component is used to display a message when there is no data to show, guiding
          users on what to do next.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            [config]="showcaseConfig"
            (valuesChange)="showcaseValues.set($event)"
          >
            <div preview>
              <ui-empty-state
                [title]="interactiveTitle()"
                [description]="interactiveDescription()"
                [icon]="currentIcon()"
                [size]="currentSize()"
                [primaryAction]="currentShowPrimary() ? interactivePrimaryAction() : null"
                [secondaryAction]="currentShowSecondary() ? interactiveSecondaryAction() : null"
              />
              <p style="margin-top: 12px; text-align: center;">
                Action clicks: <strong>{{ actionClickCount() }}</strong>
              </p>
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Empty State</h2>
          <p class="showcase__section__description">
            Simple empty state with title and description.
          </p>
          <div class="showcase__preview">
            <ui-empty-state
              title="No items found"
              description="There are no items to display at this time."
            />
          </div>
        </div>

        <!-- With Icon -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Empty State with Icon</h2>
          <p class="showcase__section__description">
            Empty state with an icon to provide visual context.
          </p>
          <div class="showcase__preview">
            <ui-empty-state
              title="No documents"
              description="You don't have any documents yet. Start by creating your first document."
              icon="document"
            />
          </div>
        </div>

        <!-- With Primary Action -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Empty State with Primary Action</h2>
          <p class="showcase__section__description">
            Empty state with a primary action button to guide users.
          </p>
          <div class="showcase__preview">
            <ui-empty-state
              title="No items yet"
              description="Get started by adding your first item to the list."
              icon="add"
              [primaryAction]="primaryActionOnly()"
            />
          </div>
        </div>

        <!-- With Both Actions -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Empty State with Primary and Secondary Actions</h2>
          <p class="showcase__section__description">
            Empty state with both primary and secondary action buttons.
          </p>
          <div class="showcase__preview">
            <ui-empty-state
              title="No data available"
              description="You can import data from a file or create new entries manually."
              icon="database"
              [primaryAction]="primaryAction()"
              [secondaryAction]="secondaryAction()"
            />
          </div>
        </div>

        <!-- Different Sizes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Empty State Sizes</h2>
          <p class="showcase__section__description">
            Empty state component in different sizes: small, medium, and large.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3>Small</h3>
              <ui-empty-state
                title="No results"
                description="Try adjusting your search criteria."
                icon="search"
                size="small"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>Medium</h3>
              <ui-empty-state
                title="No results"
                description="Try adjusting your search criteria."
                icon="search"
                size="medium"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>Large</h3>
              <ui-empty-state
                title="No results"
                description="Try adjusting your search criteria."
                icon="search"
                size="large"
              />
            </div>
          </div>
        </div>

        <!-- With Custom Content -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Empty State with Custom Content</h2>
          <p class="showcase__section__description">
            Empty state with custom content projection for advanced use cases.
          </p>
          <div class="showcase__preview">
            <ui-empty-state title="Custom layout">
              <ng-template #content>
                <div style="text-align: center; padding: 16px;">
                  <p style="margin-bottom: 16px;">You can add any custom content here</p>
                  <div style="display: flex; gap: 8px; justify-content: center;">
                    <ui-button appearance="outline" size="small">Learn More</ui-button>
                    <ui-button variant="primary" size="small">Get Started</ui-button>
                  </div>
                </div>
              </ng-template>
            </ui-empty-state>
          </div>
        </div>

        <!-- Different Use Cases -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Use Case Examples</h2>
          <p class="showcase__section__description">
            Various empty state examples for different scenarios.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3>No Search Results</h3>
              <ui-empty-state
                title="No results found"
                description="We couldn't find anything matching your search. Try different keywords."
                icon="search"
                [primaryAction]="searchAction()"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>Empty List</h3>
              <ui-empty-state
                title="Your list is empty"
                description="Add items to get started."
                icon="list"
                [primaryAction]="addAction()"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>No Permissions</h3>
              <ui-empty-state
                title="Access restricted"
                description="You don't have permission to view this content. Contact your administrator for access."
                icon="shield"
              />
            </div>
          </div>
        </div>

        <!-- Usage Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Usage Example</h2>
          <p class="showcase__section__description">
            Example of how to use the Empty State component in your application:
          </p>
          <div class="showcase__code">
            <pre><code>{{ usageExample }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class EmptyStateShowcaseComponent {
  sizes: Size[] = ['small', 'medium', 'large'];

  showcaseValues = signal<Record<string, any>>({});
  interactiveTitle = signal<string>('No items found');
  interactiveDescription = signal<string>('There are no items to display at this time.');
  actionClickCount = signal<number>(0);

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
        key: 'icon',
        type: 'dropdown',
        label: 'Icon',
        options: [
          { value: '', label: 'None' },
          { value: 'document', label: 'document' },
          { value: 'search', label: 'search' },
          { value: 'add', label: 'add' },
          { value: 'database', label: 'database' },
          { value: 'shield', label: 'shield' },
          { value: 'list', label: 'list' },
        ],
        defaultValue: 'document',
        group: 'appearance',
      },
      {
        key: 'showPrimary',
        type: 'switch',
        label: 'Show Primary Action',
        defaultValue: true,
        group: 'actions',
      },
      {
        key: 'showSecondary',
        type: 'switch',
        label: 'Show Secondary Action',
        defaultValue: false,
        group: 'actions',
      },
    ],
    controlGroups: [
      {
        id: 'appearance',
        label: 'Appearance',
        expanded: true,
      },
      {
        id: 'actions',
        label: 'Actions',
        expanded: true,
      },
    ],
  };

  currentSize = computed(() => (this.showcaseValues()['size'] as Size) || 'medium');
  currentIcon = computed(() => {
    const icon = this.showcaseValues()['icon'] as string;
    return icon ? (icon as IconName) : undefined;
  });
  currentShowPrimary = computed(() => (this.showcaseValues()['showPrimary'] as boolean) ?? true);
  currentShowSecondary = computed(
    () => (this.showcaseValues()['showSecondary'] as boolean) ?? false,
  );

  interactivePrimaryAction = signal<QuickAction>({
    label: 'Add Item',
    variant: 'primary',
    icon: 'add',
    action: () => {
      this.actionClickCount.update(c => c + 1);
    },
  });

  interactiveSecondaryAction = signal<QuickAction>({
    label: 'Learn More',
    variant: 'secondary',
    action: () => {
      this.actionClickCount.update(c => c + 1);
    },
  });

  primaryActionOnly = signal<QuickAction>({
    label: 'Add Item',
    variant: 'primary',
    icon: 'add',
    action: () => {
      console.log('Primary action clicked');
      alert('Primary action clicked!');
    },
  });

  primaryAction = signal<QuickAction>({
    label: 'Import Data',
    variant: 'primary',
    icon: 'send',
    action: () => {
      console.log('Import action clicked');
      alert('Import action clicked!');
    },
  });

  secondaryAction = signal<QuickAction>({
    label: 'Create Manually',
    variant: 'secondary',
    icon: 'add',
    action: () => {
      console.log('Create manually clicked');
      alert('Create manually clicked!');
    },
  });

  searchAction = signal<QuickAction>({
    label: 'Clear Search',
    variant: 'secondary',
    action: () => {
      console.log('Clear search clicked');
      alert('Clear search clicked!');
    },
  });

  addAction = signal<QuickAction>({
    label: 'Add First Item',
    variant: 'primary',
    icon: 'add',
    action: () => {
      console.log('Add item clicked');
      alert('Add item clicked!');
    },
  });

  usageExample = `// In your component
import { EmptyStateComponent } from '../empty-state';
import { QuickAction } from 'angular-ui';

@Component({
  template: \`
    @if (items().length === 0) {
      <ui-empty-state
        title="No items found"
        description="There are no items to display at this time."
        icon="document"
        [primaryAction]="addAction()"
        (actionClick)="onActionClick($event)"
      />
    } @else {
      <!-- Your content here -->
    }
  \`
})
export class MyComponent {
  items = signal([]);

  addAction = signal<QuickAction>({
    label: 'Add Item',
    variant: 'primary',
    icon: 'add',
    action: () => {
      // Handle add action
    },
  });

  onActionClick(action: QuickAction): void {
    console.log('Action clicked:', action.label);
  }
}`;

  onActionClick(action: QuickAction): void {
    console.log('Action clicked:', action.label);
  }
}

