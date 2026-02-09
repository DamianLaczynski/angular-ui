import { Component, signal } from '@angular/core';
import { CommandPaletteComponent, CommandPaletteItem } from 'angular-ui';
import { ButtonComponent } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-command-palette-showcase',
  imports: [CommandPaletteComponent, ButtonComponent, TableOfContentComponent],
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
        <h1 class="showcase__title">Command Palette Component</h1>
        <p class="showcase__description">
          Command Palette component based on Fluent 2 Design System - provides a searchable
          interface for executing commands and actions. Supports keyboard navigation and fuzzy
          search.
        </p>

        <!-- Basic Command Palette -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic Command Palette</h2>
          <p class="showcase__section__description">
            Simple command palette with basic navigation commands.
          </p>

          <div class="showcase__preview">
            <ui-button variant="primary" (click)="openBasicCommandPalette()">
              Open Command Palette
            </ui-button>

            <ui-command-palette
              [(visible)]="basicVisible"
              [items]="basicCommands()"
              placeholder="Type a command..."
              (commandExecuted)="onCommandExecuted($event)"
              (closed)="onClosed()"
            />
          </div>
        </section>

        <!-- Command Palette with Groups -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Grouped Commands</h2>
          <p class="showcase__section__description">
            Commands organized into groups for better discoverability.
          </p>

          <div class="showcase__preview">
            <ui-button variant="primary" (click)="openGroupedCommandPalette()">
              Open Grouped Commands
            </ui-button>

            <ui-command-palette
              [(visible)]="groupedVisible"
              [items]="groupedCommands()"
              placeholder="Search commands..."
              (commandExecuted)="onCommandExecuted($event)"
              (closed)="onClosed()"
            />
          </div>
        </section>

        <!-- Command Palette with Icons -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Commands with Icons</h2>
          <p class="showcase__section__description">
            Commands with visual icons for better recognition.
          </p>

          <div class="showcase__preview">
            <ui-button variant="primary" (click)="openIconCommandPalette()">
              Open Commands with Icons
            </ui-button>

            <ui-command-palette
              [(visible)]="iconVisible"
              [items]="iconCommands()"
              placeholder="Search commands..."
              (commandExecuted)="onCommandExecuted($event)"
              (closed)="onClosed()"
            />
          </div>
        </section>

        <!-- Command Palette with Disabled Items -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Disabled Commands</h2>
          <p class="showcase__section__description">
            Some commands can be disabled based on application state.
          </p>

          <div class="showcase__preview">
            <ui-button variant="primary" (click)="openDisabledCommandPalette()">
              Open Commands with Disabled Items
            </ui-button>

            <ui-command-palette
              [(visible)]="disabledVisible"
              [items]="disabledCommands()"
              placeholder="Search commands..."
              (commandExecuted)="onCommandExecuted($event)"
              (closed)="onClosed()"
            />
          </div>
        </section>

        <!-- Custom Configuration -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Custom Configuration</h2>
          <p class="showcase__section__description">
            Command palette with custom placeholder and empty text.
          </p>

          <div class="showcase__preview">
            <ui-button variant="primary" (click)="openCustomCommandPalette()">
              Open Custom Command Palette
            </ui-button>

            <ui-command-palette
              [(visible)]="customVisible"
              [items]="customCommands()"
              placeholder="What would you like to do?"
              emptyText="No matching actions found"
              [maxResults]="5"
              (commandExecuted)="onCommandExecuted($event)"
              (closed)="onClosed()"
            />
          </div>
        </section>

        <!-- Keyboard Shortcuts Info -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Keyboard Navigation</h2>
          <p class="showcase__section__description">
            The command palette supports full keyboard navigation.
          </p>

          <div class="showcase__keyboard-shortcuts">
            <div class="showcase__keyboard-shortcut">
              <kbd>↑</kbd><kbd>↓</kbd>
              <span>Navigate between commands</span>
            </div>
            <div class="showcase__keyboard-shortcut">
              <kbd>Enter</kbd>
              <span>Execute selected command</span>
            </div>
            <div class="showcase__keyboard-shortcut">
              <kbd>Esc</kbd>
              <span>Close command palette</span>
            </div>
            <div class="showcase__keyboard-shortcut">
              <kbd>Ctrl+K</kbd>
              <span>Open command palette (when implemented)</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      .showcase__keyboard-shortcuts {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 16px;
      }

      .showcase__keyboard-shortcut {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        background: var(--color-neutral-background2-rest);
        border-radius: 4px;
      }

      .showcase__keyboard-shortcut kbd {
        background: var(--color-neutral-background-rest);
        border: 1px solid var(--color-neutral-stroke-rest);
        border-radius: 3px;
        padding: 2px 6px;
        font-size: 12px;
        font-family: monospace;
        color: var(--color-neutral-foreground-rest);
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
      }

      .showcase__keyboard-shortcut span {
        color: var(--color-neutral-foreground2-rest);
        font-size: 14px;
      }
    `,
  ],
})
export class CommandPaletteShowcaseComponent {
  private router = signal<Router>({} as Router);

  // Visibility signals
  basicVisible = signal(false);
  groupedVisible = signal(false);
  iconVisible = signal(false);
  disabledVisible = signal(false);
  customVisible = signal(false);

  // Basic commands
  basicCommands = signal<CommandPaletteItem[]>([
    {
      id: 'dashboard',
      label: 'Go to Dashboard',
      description: 'Navigate to the main dashboard',
      action: () => this.navigateTo('/app/dashboard'),
    },
    {
      id: 'projects',
      label: 'View Projects',
      description: 'Browse all projects',
      action: () => this.navigateTo('/app/projects'),
    },
    {
      id: 'settings',
      label: 'Open Settings',
      description: 'Configure application settings',
      action: () => this.navigateTo('/app/settings'),
    },
    {
      id: 'help',
      label: 'Show Help',
      description: 'Display help documentation',
      action: () => console.log('Help opened'),
    },
  ]);

  // Grouped commands
  groupedCommands = signal<CommandPaletteItem[]>([
    // Navigation group
    {
      id: 'nav-dashboard',
      label: 'Dashboard',
      description: 'Go to main dashboard',
      group: 'Navigation',
      action: () => this.navigateTo('/app/dashboard'),
    },
    {
      id: 'nav-projects',
      label: 'Projects',
      description: 'Browse projects',
      group: 'Navigation',
      action: () => this.navigateTo('/app/projects'),
    },
    {
      id: 'nav-settings',
      label: 'Settings',
      description: 'Application settings',
      group: 'Navigation',
      action: () => this.navigateTo('/app/settings'),
    },

    // Actions group
    {
      id: 'action-new-project',
      label: 'Create New Project',
      description: 'Start a new project',
      group: 'Actions',
      action: () => console.log('New project created'),
    },
    {
      id: 'action-export',
      label: 'Export Data',
      description: 'Export current data',
      group: 'Actions',
      action: () => console.log('Data exported'),
    },
    {
      id: 'action-import',
      label: 'Import Data',
      description: 'Import data from file',
      group: 'Actions',
      action: () => console.log('Import started'),
    },

    // Tools group
    {
      id: 'tool-search',
      label: 'Global Search',
      description: 'Search across all content',
      group: 'Tools',
      action: () => console.log('Global search opened'),
    },
    {
      id: 'tool-shortcuts',
      label: 'Keyboard Shortcuts',
      description: 'Show keyboard shortcuts',
      group: 'Tools',
      action: () => console.log('Shortcuts displayed'),
    },
  ]);

  // Commands with icons
  iconCommands = signal<CommandPaletteItem[]>([
    {
      id: 'dashboard',
      label: 'Dashboard',
      description: 'Navigate to dashboard',
      icon: 'apps',
      action: () => this.navigateTo('/app/dashboard'),
    },
    {
      id: 'projects',
      label: 'Projects',
      description: 'Manage projects',
      icon: 'folder',
      action: () => this.navigateTo('/app/projects'),
    },
    {
      id: 'users',
      label: 'Users',
      description: 'User management',
      icon: 'person',
      action: () => this.navigateTo('/app/users'),
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Application settings',
      icon: 'settings',
      action: () => this.navigateTo('/app/settings'),
    },
    {
      id: 'search',
      label: 'Search',
      description: 'Global search',
      icon: 'search',
      action: () => console.log('Search opened'),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      description: 'View notifications',
      icon: 'alert',
      action: () => console.log('Notifications opened'),
    },
  ]);

  // Commands with disabled items
  disabledCommands = signal<CommandPaletteItem[]>([
    {
      id: 'enabled-action',
      label: 'Enabled Action',
      description: 'This action is available',
      action: () => console.log('Enabled action executed'),
    },
    {
      id: 'disabled-action',
      label: 'Disabled Action',
      description: 'This action is currently unavailable',
      disabled: true,
      action: () => {},
    },
    {
      id: 'another-enabled',
      label: 'Another Enabled Action',
      description: 'This one works too',
      action: () => console.log('Another enabled action executed'),
    },
    {
      id: 'premium-feature',
      label: 'Premium Feature',
      description: 'Requires premium subscription',
      disabled: true,
      action: () => {},
    },
  ]);

  // Custom commands
  customCommands = signal<CommandPaletteItem[]>([
    {
      id: 'quick-format',
      label: 'Format Document',
      description: 'Auto-format the current document',
      keywords: ['code', 'format', 'beautify'],
      action: () => console.log('Document formatted'),
    },
    {
      id: 'quick-save',
      label: 'Save All',
      description: 'Save all open documents',
      keywords: ['save', 'persist', 'store'],
      action: () => console.log('All documents saved'),
    },
    {
      id: 'quick-build',
      label: 'Build Project',
      description: 'Compile and build the project',
      keywords: ['compile', 'build', 'make'],
      action: () => console.log('Project built'),
    },
    {
      id: 'quick-deploy',
      label: 'Deploy Application',
      description: 'Deploy to production environment',
      keywords: ['deploy', 'publish', 'release'],
      action: () => console.log('Application deployed'),
    },
    {
      id: 'quick-test',
      label: 'Run Tests',
      description: 'Execute all test suites',
      keywords: ['test', 'qa', 'verify'],
      action: () => console.log('Tests executed'),
    },
  ]);

  // Methods
  openBasicCommandPalette(): void {
    this.basicVisible.set(true);
  }

  openGroupedCommandPalette(): void {
    this.groupedVisible.set(true);
  }

  openIconCommandPalette(): void {
    this.iconVisible.set(true);
  }

  openDisabledCommandPalette(): void {
    this.disabledVisible.set(true);
  }

  openCustomCommandPalette(): void {
    this.customVisible.set(true);
  }

  onCommandExecuted(command: CommandPaletteItem): void {
    console.log('Command executed:', command.label);
  }

  onClosed(): void {
    console.log('Command palette closed');
  }

  private navigateTo(path: string): void {
    this.router().navigate([path]);
  }
}
