import { Component, signal, computed } from '@angular/core';

import { ErrorStateComponent } from 'angular-ui';
import { QuickAction, Size } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { IconName } from 'angular-ui';

@Component({
  selector: 'app-error-state-showcase',
  imports: [ErrorStateComponent, TableOfContentComponent, InteractiveShowcaseComponent],
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
        <h1 class="showcase__title">Error State Component</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Error State component built with Fluent 2 Design System. The
          Error State component is used to display error messages when something goes wrong, helping
          users understand what happened and what they can do next.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            [config]="showcaseConfig"
            (valuesChange)="showcaseValues.set($event)"
          >
            <div preview>
              <ui-error-state
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
          <h2 class="showcase__section__title">Basic Error State</h2>
          <p class="showcase__section__description">
            Simple error state with title and description.
          </p>
          <div class="showcase__preview">
            <ui-error-state
              title="Something went wrong"
              description="An unexpected error occurred. Please try again later."
            />
          </div>
        </div>

        <!-- With Default Icon -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Error State with Default Icon</h2>
          <p class="showcase__section__description">
            Error state with the default error icon to provide visual context.
          </p>
          <div class="showcase__preview">
            <ui-error-state
              title="Failed to load data"
              description="We couldn't load the requested information. Please check your connection and try again."
              icon="error_circle"
            />
          </div>
        </div>

        <!-- With Custom Icon -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Error State with Custom Icon</h2>
          <p class="showcase__section__description">
            Error state with a different error icon for different scenarios.
          </p>
          <div class="showcase__preview">
            <ui-error-state
              title="Connection error"
              description="Unable to connect to the server. Please check your internet connection."
              icon="wifi_off"
            />
          </div>
        </div>

        <!-- With Primary Action -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Error State with Primary Action</h2>
          <p class="showcase__section__description">
            Error state with a primary action button to help users recover from the error.
          </p>
          <div class="showcase__preview">
            <ui-error-state
              title="Failed to save changes"
              description="Your changes could not be saved. Please try again."
              icon="error_circle"
              [primaryAction]="retryAction()"
            />
          </div>
        </div>

        <!-- With Both Actions -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Error State with Primary and Secondary Actions</h2>
          <p class="showcase__section__description">
            Error state with both primary and secondary action buttons for more options.
          </p>
          <div class="showcase__preview">
            <ui-error-state
              title="Upload failed"
              description="The file could not be uploaded. You can try again or contact support for help."
              icon="error_circle"
              [primaryAction]="retryUploadAction()"
              [secondaryAction]="contactSupportAction()"
            />
          </div>
        </div>

        <!-- Different Sizes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Error State Sizes</h2>
          <p class="showcase__section__description">
            Error state component in different sizes: small, medium, and large.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3>Small</h3>
              <ui-error-state
                title="Error occurred"
                description="Please try again."
                icon="error_circle"
                size="small"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>Medium</h3>
              <ui-error-state
                title="Error occurred"
                description="Please try again."
                icon="error_circle"
                size="medium"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>Large</h3>
              <ui-error-state
                title="Error occurred"
                description="Please try again."
                icon="error_circle"
                size="large"
              />
            </div>
          </div>
        </div>

        <!-- With Custom Content -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Error State with Custom Content</h2>
          <p class="showcase__section__description">
            Error state with custom content projection for advanced use cases.
          </p>
          <div class="showcase__preview">
            <ui-error-state title="Validation error">
              <ng-template #content>
                <div style="text-align: center; padding: 16px;">
                  <p
                    style="margin-bottom: 16px; color: var(--color-shared-red-foreground, #D13438);"
                  >
                    Please fix the following issues:
                  </p>
                  <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                    <li>Email address is required</li>
                    <li>Password must be at least 8 characters</li>
                    <li>Phone number is invalid</li>
                  </ul>
                </div>
              </ng-template>
            </ui-error-state>
          </div>
        </div>

        <!-- Different Use Cases -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Use Case Examples</h2>
          <p class="showcase__section__description">
            Various error state examples for different scenarios.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3>Network Error</h3>
              <ui-error-state
                title="Network connection failed"
                description="Unable to connect to the server. Please check your internet connection and try again."
                icon="wifi_off"
                [primaryAction]="retryAction()"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>Permission Error</h3>
              <ui-error-state
                title="Access denied"
                description="You don't have permission to access this resource. Contact your administrator if you believe this is an error."
                icon="shield"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>404 Error</h3>
              <ui-error-state
                title="Page not found"
                description="The page you're looking for doesn't exist or has been moved."
                icon="document_dismiss"
                [primaryAction]="goHomeAction()"
              />
            </div>
          </div>
        </div>

        <!-- Usage Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Usage Example</h2>
          <p class="showcase__section__description">
            Example of how to use the Error State component in your application:
          </p>
          <div class="showcase__code">
            <pre><code>{{ usageExample }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ErrorStateShowcaseComponent {
  sizes: Size[] = ['small', 'medium', 'large'];

  showcaseValues = signal<Record<string, any>>({});
  interactiveTitle = signal<string>('Something went wrong');
  interactiveDescription = signal<string>('An unexpected error occurred. Please try again later.');
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
          { value: 'error_circle', label: 'error_circle' },
          { value: 'wifi_off', label: 'wifi_off' },
          { value: 'shield', label: 'shield' },
          { value: 'document_dismiss', label: 'document_dismiss' },
        ],
        defaultValue: 'error_circle',
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
    return (icon || 'error_circle') as IconName;
  });
  currentShowPrimary = computed(() => (this.showcaseValues()['showPrimary'] as boolean) ?? true);
  currentShowSecondary = computed(
    () => (this.showcaseValues()['showSecondary'] as boolean) ?? false,
  );

  interactivePrimaryAction = signal<QuickAction>({
    label: 'Try Again',
    variant: 'primary',
    icon: 'arrow_sync',
    action: () => {
      this.actionClickCount.update(c => c + 1);
    },
  });

  interactiveSecondaryAction = signal<QuickAction>({
    label: 'Contact Support',
    variant: 'secondary',
    action: () => {
      this.actionClickCount.update(c => c + 1);
    },
  });

  retryAction = signal<QuickAction>({
    label: 'Try Again',
    variant: 'primary',
    icon: 'arrow_sync',
    action: () => {
      console.log('Retry action clicked');
      alert('Retry action clicked!');
    },
  });

  retryUploadAction = signal<QuickAction>({
    label: 'Retry Upload',
    variant: 'primary',
    icon: 'arrow_sync',
    action: () => {
      console.log('Retry upload clicked');
      alert('Retry upload clicked!');
    },
  });

  contactSupportAction = signal<QuickAction>({
    label: 'Contact Support',
    variant: 'secondary',
    icon: 'person_support',
    action: () => {
      console.log('Contact support clicked');
      alert('Contact support clicked!');
    },
  });

  goHomeAction = signal<QuickAction>({
    label: 'Go Home',
    variant: 'primary',
    icon: 'home',
    action: () => {
      console.log('Go home clicked');
      alert('Go home clicked!');
    },
  });

  usageExample = `// In your component
import { ErrorStateComponent } from '../error-state';
import { QuickAction } from 'angular-ui';

@Component({
  template: \`
    @if (error()) {
      <ui-error-state
        title="Something went wrong"
        description="An unexpected error occurred. Please try again later."
        icon="error_circle"
        [primaryAction]="retryAction()"
        (actionClick)="onActionClick($event)"
      />
    } @else {
      <!-- Your content here -->
    }
  \`
})
export class MyComponent {
  error = signal<Error | null>(null);

  retryAction = signal<QuickAction>({
    label: 'Try Again',
    variant: 'primary',
    icon: 'arrow_sync',
    action: () => {
      // Handle retry action
      this.loadData();
    },
  });

  onActionClick(action: QuickAction): void {
    console.log('Action clicked:', action.label);
  }

  loadData(): void {
    // Load data logic
  }
}`;

  onActionClick(action: QuickAction): void {
    console.log('Action clicked:', action.label);
  }
}

