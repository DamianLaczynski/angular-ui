import { Component, signal, computed } from '@angular/core';
import {
  StateContainerComponent,
  SpinnerComponent,
  IconComponent,
  QuickAction,
  Size,
  TableOfContentComponent,
} from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { State, errorState, initialState, loadedState, loadingState } from 'angular-ui';

interface User {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-state-container-showcase',
  imports: [
    StateContainerComponent,
    SpinnerComponent,
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
        <h1 class="showcase__title">State Container Component</h1>
        <p class="showcase__description">
          A composable container that orchestrates loading, empty, error, and data states using the
          shared Fluent 2 status components. Bind it to your asynchronous data model and provide
          projected templates for the rendered data or to customise each state.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            [config]="showcaseConfig"
            (valuesChange)="showcaseValues.set($event)"
          >
            <div preview>
              <ui-state-container
                [state]="currentState()"
                [size]="currentSize()"
                [loadingTitle]="'Loading users...'"
                [loadingDescription]="'Please wait while we fetch the latest people data.'"
                [emptyTitle]="'No users yet'"
                [emptyIcon]="'people_add'"
                [emptyDescription]="'Invite your team or add your first user to get started.'"
                [emptyPrimaryAction]="emptyPrimaryAction()"
                [errorTitle]="'Unable to load users'"
                [errorPrimaryAction]="errorPrimaryAction()"
                [errorSecondaryAction]="errorSecondaryAction()"
                [showEmptyOnInitial]="true"
                (errorActionClick)="onErrorAction($event)"
                (emptyActionClick)="onEmptyAction($event)"
              >
                <div
                  style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;"
                >
                  @for (user of currentState().data; track user.id) {
                    <div
                      style="padding: 16px; border-radius: 12px; border: 1px solid var(--Neutral-Stroke-rest, #EDEBE9); background: var(--Neutral-Background-rest, #FFFFFF); display: flex; flex-direction: column; gap: 4px;"
                    >
                      <strong>{{ user.name }}</strong>
                      <span style="color: var(--color-neutral-foreground2-rest, #605E5C);">{{
                        user.role
                      }}</span>
                    </div>
                  }
                </div>
              </ui-state-container>
            </div>
          </app-interactive-showcase>
        </section>

        <div class="showcase__section">
          <h2 class="showcase__section__title">Custom State Templates</h2>
          <p class="showcase__section__description">
            Override any state completely by providing named templates. This example replaces the
            loading and empty renderings with bespoke markup while keeping the default data branch.
          </p>

          <div class="showcase__preview">
            <ui-state-container
              [state]="customState()"
              [showEmptyOnInitial]="true"
              [loadingTitle]="'Synchronising records'"
              [emptyTitle]="'All caught up!'"
            >
              <ng-template #loadingState>
                <div style="padding: 32px; text-align: center;">
                  <ui-spinner size="small" />
                  <p style="margin-top: 12px; margin-bottom: 0;">
                    Fetching data from the service...
                  </p>
                </div>
              </ng-template>

              <ng-template #emptyState>
                <div style="padding: 32px; text-align: center;">
                  <ui-icon icon="checkmark_circle" size="large" />
                  <p style="margin-top: 12px; margin-bottom: 0;">
                    There is nothing to show right now.
                  </p>
                </div>
              </ng-template>

              <ng-template #dataState let-data>
                <div style="padding: 24px; text-align: center;">
                  <strong>Data loaded successfully.</strong>
                  <p style="margin-top: 8px; margin-bottom: 0;">Records: {{ data?.length || 0 }}</p>
                </div>
              </ng-template>
            </ui-state-container>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StateContainerShowcaseComponent {
  private readonly sampleUsers: User[] = [
    { id: 1, name: 'Anna Kowalska', role: 'Administrator' },
    { id: 2, name: 'Piotr Nowak', role: 'Project Manager' },
    { id: 3, name: 'Zofia Wiśniewska', role: 'Product Designer' },
    { id: 4, name: 'Tomasz Zieliński', role: 'Developer' },
  ];

  sizes: Size[] = ['small', 'medium', 'large'];
  states = ['initial', 'loading', 'empty', 'loaded', 'error'];

  showcaseValues = signal<Record<string, any>>({});
  customState = signal<State<User[]>>(loadingState(initialState<User[]>())); // starts in loading

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
        key: 'state',
        type: 'dropdown',
        label: 'State',
        options: this.states.map(s => ({ value: s, label: s })),
        defaultValue: 'loaded',
        group: 'data',
      },
    ],
    controlGroups: [
      {
        id: 'appearance',
        label: 'Appearance',
        expanded: true,
      },
      {
        id: 'data',
        label: 'Data State',
        expanded: true,
      },
    ],
  };

  currentSize = computed(() => (this.showcaseValues()['size'] as Size) || 'medium');
  currentStateType = computed(() => (this.showcaseValues()['state'] as string) || 'loaded');

  currentState = computed(() => {
    const stateType = this.currentStateType();
    switch (stateType) {
      case 'initial':
        return initialState<User[]>();
      case 'loading':
        return loadingState(initialState<User[]>());
      case 'empty':
        return loadedState<User[]>([]);
      case 'loaded':
        return loadedState(this.sampleUsers);
      case 'error':
        return errorState<User[]>('Nie udało się pobrać listy użytkowników. Spróbuj ponownie.');
      default:
        return loadedState(this.sampleUsers);
    }
  });

  emptyPrimaryAction = signal<QuickAction>({
    label: 'Add user',
    variant: 'primary',
    icon: 'add',
    action: () => console.log('Add user clicked'),
  });

  errorPrimaryAction = signal<QuickAction>({
    label: 'Retry',
    variant: 'primary',
    icon: 'arrow_sync',
    action: () => console.log('Retry clicked'),
  });

  errorSecondaryAction = signal<QuickAction>({
    label: 'Reset',
    variant: 'secondary',
    icon: 'dismiss',
    action: () => console.log('Reset clicked'),
  });

  constructor() {
    // Demonstrate transitions in the custom section
    setTimeout(() => {
      this.customState.set(loadedState<User[]>([]));
      setTimeout(() => {
        this.customState.set(loadedState(this.sampleUsers.slice(0, 2)));
      }, 1500);
    }, 1500);
  }

  onErrorAction(action: QuickAction): void {
    console.log('Error action clicked:', action.label);
  }

  onEmptyAction(action: QuickAction): void {
    console.log('Empty action clicked:', action.label);
  }
}
