import {
  Component,
  input,
  output,
  model,
  HostListener,
  computed,
  signal,
  effect,
} from '@angular/core';

import { A11yModule } from '@angular/cdk/a11y';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../field/search';
import { IconComponent, IconName } from '../icon';

export interface CommandPaletteItem {
  id: string;
  label: string;
  description?: string;
  icon?: IconName;
  keywords?: string[];
  action: () => void;
  disabled?: boolean;
  group?: string;
}

export interface CommandPaletteGroup {
  id: string;
  label: string;
  items: CommandPaletteItem[];
}

@Component({
  selector: 'ui-command-palette',
  templateUrl: './command-palette.component.html',
  imports: [A11yModule, FormsModule, SearchComponent, IconComponent],
})
export class CommandPaletteComponent {
  visible = model<boolean>(false);
  items = input<CommandPaletteItem[]>([]);
  placeholder = input<string>('Type a command or search...');
  emptyText = input<string>('No commands found');
  maxResults = input<number>(10);

  // Outputs
  commandExecuted = output<CommandPaletteItem>();
  closed = output<void>();

  // Internal state
  _searchQuery = signal<string>('');
  private _selectedIndex = signal<number>(0);

  // Computed filtered and grouped results
  filteredItems = computed<CommandPaletteItem[]>(() => {
    const query = this._searchQuery().toLowerCase().trim();
    const allItems = this.items();

    if (!query) {
      return allItems.slice(0, this.maxResults());
    }

    const scored = allItems.map(item => {
      const label = item.label.toLowerCase();
      const description = item.description?.toLowerCase() || '';
      const keywords = item.keywords?.join(' ').toLowerCase() || '';
      const searchableText = `${label} ${description} ${keywords}`;

      // Calculate relevance score
      let score = 0;
      const queryWords = query.split(' ');

      for (const word of queryWords) {
        if (label.startsWith(word)) {
          score += 10; // Exact prefix match
        } else if (label.includes(word)) {
          score += 5; // Contains in label
        } else if (description.includes(word)) {
          score += 3; // Contains in description
        } else if (keywords.includes(word)) {
          score += 2; // Contains in keywords
        } else if (searchableText.includes(word)) {
          score += 1; // Fuzzy match
        }
      }

      return { item, score };
    });

    return scored
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, this.maxResults())
      .map(result => result.item);
  });

  groupedItems = computed<CommandPaletteGroup[]>(() => {
    const filtered = this.filteredItems();
    const groups: { [key: string]: CommandPaletteItem[] } = {};

    // Group items by group property or 'default'
    filtered.forEach(item => {
      const groupId = item.group || 'default';
      if (!groups[groupId]) {
        groups[groupId] = [];
      }
      groups[groupId].push(item);
    });

    // Convert to array format
    return Object.entries(groups).map(([groupId, items]) => ({
      id: groupId,
      label: groupId === 'default' ? '' : groupId,
      items,
    }));
  });

  // Reset selection when items change
  constructor() {
    effect(() => {
      this.filteredItems();
      this._selectedIndex.set(0);
    });
  }

  // Keyboard navigation
  @HostListener('document:keydown.arrowdown', ['$event'])
  onArrowDown(event: KeyboardEvent): void {
    if (!this.visible()) return;
    event.preventDefault();
    const maxIndex = this.filteredItems().length - 1;
    this._selectedIndex.update(index => Math.min(index + 1, maxIndex));
  }

  @HostListener('document:keydown.arrowup', ['$event'])
  onArrowUp(event: KeyboardEvent): void {
    if (!this.visible()) return;
    event.preventDefault();
    this._selectedIndex.update(index => Math.max(index - 1, 0));
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent): void {
    if (!this.visible()) return;
    event.preventDefault();
    this.executeSelectedCommand();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent): void {
    if (!this.visible()) return;
    event.preventDefault();
    this.close();
  }

  // Methods
  open(): void {
    if (!this.visible()) {
      this.visible.set(true);
      this._searchQuery.set('');
      this._selectedIndex.set(0);
    }
  }

  close(): void {
    this.visible.set(false);
    this.closed.emit();
  }

  onSearchChange(query: string): void {
    this._searchQuery.set(query);
    this._selectedIndex.set(0); // Reset selection on search
  }

  onItemClick(item: CommandPaletteItem): void {
    if (item.disabled) return;
    this.executeCommand(item);
  }

  private executeSelectedCommand(): void {
    const items = this.filteredItems();
    const selectedItem = items[this._selectedIndex()];
    if (selectedItem && !selectedItem.disabled) {
      this.executeCommand(selectedItem);
    }
  }

  private executeCommand(item: CommandPaletteItem): void {
    item.action();
    this.commandExecuted.emit(item);
    this.close();
  }

  // Computed classes and styles
  backdropClasses(): string {
    const classes = ['command-palette__backdrop'];
    if (!this.visible()) {
      classes.push('command-palette__backdrop--hidden');
    }
    return classes.join(' ');
  }

  containerClasses(): string {
    const classes = ['command-palette'];
    if (!this.visible()) {
      classes.push('command-palette--hidden');
    }
    return classes.join(' ');
  }

  isItemSelected(item: CommandPaletteItem): boolean {
    const items = this.filteredItems();
    return items[this._selectedIndex()] === item;
  }

  trackByItemId(index: number, item: CommandPaletteItem): string {
    return item.id;
  }

  trackByGroupId(index: number, group: CommandPaletteGroup): string {
    return group.id;
  }
}
