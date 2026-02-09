import { Component, signal, computed } from '@angular/core';

import { ToolbarComponent } from 'angular-ui';
import { ToolbarItem, ToolbarGroup } from 'angular-ui';
import { DropdownComponent, DropdownItem } from 'angular-ui';
import { TextComponent } from 'angular-ui';
import { DividerComponent } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { Size, MenuItem } from 'angular-ui';

@Component({
  selector: 'app-toolbar-showcase',
  imports: [
    ToolbarComponent,
    DropdownComponent,
    TextComponent,
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
        <h1 class="showcase__title">Toolbar Component</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Toolbar component built with Fluent 2 Design System. The
          Toolbar provides a horizontal or vertical container for buttons and controls with grouping
          support.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            [config]="showcaseConfig"
            (valuesChange)="showcaseValues.set($event)"
          >
            <div preview>
              <ui-toolbar
                [items]="currentUseGroups() ? [] : interactiveItems()"
                [groups]="currentUseGroups() ? interactiveGroups() : []"
                [size]="currentSize()"
                [orientation]="currentOrientation()"
                (itemClick)="onItemClick($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Toolbar</h2>
          <p class="showcase__section__description">
            Simple toolbar with icon-only buttons for common actions.
          </p>
          <div class="showcase__preview">
            <ui-toolbar [items]="basicItems()" (itemClick)="onItemClick($event)" />
          </div>
        </div>

        <!-- With Labels -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Toolbar with Labels</h2>
          <p class="showcase__section__description">
            Toolbar with buttons that include both icons and labels for better clarity.
          </p>
          <div class="showcase__preview">
            <ui-toolbar [items]="labeledItems()" (itemClick)="onItemClick($event)" />
          </div>
        </div>

        <!-- With Groups and Dividers -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Grouped Toolbar</h2>
          <p class="showcase__section__description">
            Toolbar organized into groups with automatic dividers between groups.
          </p>
          <div class="showcase__preview">
            <ui-toolbar [groups]="groupedItems()" (itemClick)="onItemClick($event)" />
          </div>
        </div>

        <!-- With Selected State -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Toolbar with Selection</h2>
          <p class="showcase__section__description">
            Toolbar with toggle buttons that maintain selected state.
          </p>
          <div class="showcase__preview">
            <ui-toolbar [items]="selectedItems()" (itemClick)="onItemClick($event)" />
          </div>
        </div>

        <!-- Different Sizes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Toolbar Sizes</h2>
          <p class="showcase__section__description">
            Toolbar in different sizes: small, medium, and large.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3>Small</h3>
              <ui-toolbar [items]="basicItems()" size="small" (itemClick)="onItemClick($event)" />
            </div>
            <div class="showcase__preview-item">
              <h3>Medium</h3>
              <ui-toolbar [items]="basicItems()" size="medium" (itemClick)="onItemClick($event)" />
            </div>
            <div class="showcase__preview-item">
              <h3>Large</h3>
              <ui-toolbar [items]="basicItems()" size="large" (itemClick)="onItemClick($event)" />
            </div>
          </div>
        </div>

        <!-- With Disabled Items -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Toolbar with Disabled Items</h2>
          <p class="showcase__section__description">
            Some toolbar items can be disabled based on context or state.
          </p>
          <div class="showcase__preview">
            <ui-toolbar [items]="disabledItems()" (itemClick)="onItemClick($event)" />
          </div>
        </div>

        <!-- With Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Toolbar with Variants</h2>
          <p class="showcase__section__description">
            Toolbar items can use different variants to convey semantic meaning: primary, secondary,
            success, warning, danger, and info.
          </p>
          <div class="showcase__preview">
            <ui-toolbar [items]="variantItems()" (itemClick)="onItemClick($event)" />
          </div>
        </div>

        <!-- Vertical Toolbar -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Vertical Toolbar</h2>
          <p class="showcase__section__description">
            Toolbar can be displayed vertically for sidebars or panels.
          </p>
          <div class="showcase__preview">
            <ui-toolbar
              [items]="basicItems()"
              orientation="vertical"
              (itemClick)="onItemClick($event)"
            />
          </div>
        </div>

        <!-- With Dropdown -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Toolbar with Dropdown</h2>
          <p class="showcase__section__description">
            Toolbar integrated with dropdown component for selection controls.
          </p>
          <div class="showcase__preview">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <ui-toolbar [items]="formattingItems()" (itemClick)="onItemClick($event)" />
              <ui-dropdown
                [items]="fontSizeItems()"
                [placeholder]="'Font Size'"
                [size]="toolbarSize()"
                style="width: 120px;"
              />
              <ui-dropdown
                [items]="fontFamilyItems()"
                [placeholder]="'Font'"
                [size]="toolbarSize()"
                style="width: 150px;"
              />
            </div>
          </div>
        </div>

        <!-- With Text Input -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Toolbar with Text Input</h2>
          <p class="showcase__section__description">
            Toolbar integrated with text input for search or input fields.
          </p>
          <div class="showcase__preview">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <ui-toolbar [items]="fileActionsItems()" (itemClick)="onItemClick($event)" />
              <ui-text [placeholder]="'Search...'" [size]="toolbarSize()" style="width: 200px;" />
              <ui-toolbar [items]="viewActionsItems()" (itemClick)="onItemClick($event)" />
            </div>
          </div>
        </div>

        <!-- Rich Editor Toolbar Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Rich Editor Toolbar Example</h2>
          <p class="showcase__section__description">
            Complete example showing toolbar with buttons, dropdowns, and text inputs for a rich
            text editor.
          </p>
          <div class="showcase__preview">
            <div
              style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 8px; background: #f3f2f1; border-radius: 4px;"
            >
              <ui-toolbar [groups]="editorToolbarGroups()" (itemClick)="onItemClick($event)" />
              <ui-divider orientation="vertical" />
              <ui-dropdown
                [items]="fontSizeItems()"
                [placeholder]="'12'"
                [size]="toolbarSize()"
                style="width: 80px;"
              />
              <ui-dropdown
                [items]="fontFamilyItems()"
                [placeholder]="'Arial'"
                [size]="toolbarSize()"
                style="width: 140px;"
              />
              <ui-divider orientation="vertical" />
              <ui-text [placeholder]="'Find...'" [size]="toolbarSize()" style="width: 150px;" />
            </div>
          </div>
        </div>

        <!-- All Item Types -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">All Toolbar Item Types</h2>
          <p class="showcase__section__description">
            Comprehensive example showing all available ToolbarItem types: button (default),
            divider, toggle, custom, and split.
          </p>
          <div class="showcase__preview">
            <ui-toolbar [items]="allTypesItems()" (itemClick)="onItemClick($event)" />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ToolbarShowcaseComponent {
  sizes: Size[] = ['small', 'medium', 'large'];
  orientations = ['horizontal', 'vertical'];

  showcaseValues = signal<Record<string, any>>({});

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
        key: 'orientation',
        type: 'dropdown',
        label: 'Orientation',
        options: this.orientations.map(o => ({ value: o, label: o })),
        defaultValue: 'horizontal',
        group: 'appearance',
      },
      {
        key: 'useGroups',
        type: 'switch',
        label: 'Use Groups',
        defaultValue: false,
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

  currentSize = computed(() => (this.showcaseValues()['size'] as Size) || 'medium');
  currentOrientation = computed(
    () => (this.showcaseValues()['orientation'] as 'horizontal' | 'vertical') || 'horizontal',
  );
  currentUseGroups = computed(() => (this.showcaseValues()['useGroups'] as boolean) ?? false);

  interactiveItems = computed<ToolbarItem[]>(() => [
    {
      id: 'bold',
      icon: 'text_bold',
      tooltip: 'Bold',
      action: () => this.handleAction('Bold'),
    },
    {
      id: 'italic',
      icon: 'text_italic',
      tooltip: 'Italic',
      action: () => this.handleAction('Italic'),
    },
    {
      id: 'underline',
      icon: 'text_underline',
      tooltip: 'Underline',
      action: () => this.handleAction('Underline'),
    },
    {
      id: 'strikethrough',
      icon: 'text_strikethrough',
      tooltip: 'Strikethrough',
      action: () => this.handleAction('Strikethrough'),
    },
  ]);

  interactiveGroups = computed<ToolbarGroup[]>(() => [
    {
      id: 'file',
      items: [
        {
          id: 'new',
          icon: 'document_add',
          tooltip: 'New',
          action: () => this.handleAction('New'),
        },
        {
          id: 'open',
          icon: 'folder_open',
          tooltip: 'Open',
          action: () => this.handleAction('Open'),
        },
        {
          id: 'save',
          icon: 'save',
          tooltip: 'Save',
          action: () => this.handleAction('Save'),
        },
      ],
    },
    {
      id: 'format',
      items: [
        {
          id: 'bold',
          icon: 'text_bold',
          tooltip: 'Bold',
          action: () => this.handleAction('Bold'),
        },
        {
          id: 'italic',
          icon: 'text_italic',
          tooltip: 'Italic',
          action: () => this.handleAction('Italic'),
        },
        {
          id: 'underline',
          icon: 'text_underline',
          tooltip: 'Underline',
          action: () => this.handleAction('Underline'),
        },
      ],
    },
  ]);

  toolbarSize = signal<'small' | 'medium' | 'large'>('medium');
  basicItems = signal<ToolbarItem[]>([
    {
      id: 'bold',
      icon: 'text_bold',
      tooltip: 'Bold',
      action: () => this.handleAction('Bold'),
    },
    {
      id: 'italic',
      icon: 'text_italic',
      tooltip: 'Italic',
      action: () => this.handleAction('Italic'),
    },
    {
      id: 'underline',
      icon: 'text_underline',
      tooltip: 'Underline',
      action: () => this.handleAction('Underline'),
    },
    {
      id: 'strikethrough',
      icon: 'text_strikethrough',
      tooltip: 'Strikethrough',
      action: () => this.handleAction('Strikethrough'),
    },
  ]);

  labeledItems = signal<ToolbarItem[]>([
    {
      id: 'new',
      label: 'New',
      icon: 'document_add',
      action: () => this.handleAction('New'),
    },
    {
      id: 'open',
      label: 'Open',
      icon: 'folder_open',
      action: () => this.handleAction('Open'),
    },
    {
      id: 'save',
      label: 'Save',
      icon: 'save',
      action: () => this.handleAction('Save'),
    },
    {
      id: 'print',
      label: 'Print',
      icon: 'print',
      action: () => this.handleAction('Print'),
    },
  ]);

  groupedItems = signal<ToolbarGroup[]>([
    {
      id: 'file',
      items: [
        {
          id: 'new',
          icon: 'document_add',
          tooltip: 'New',
          action: () => this.handleAction('New'),
        },
        {
          id: 'open',
          icon: 'folder_open',
          tooltip: 'Open',
          action: () => this.handleAction('Open'),
        },
        {
          id: 'save',
          icon: 'save',
          tooltip: 'Save',
          action: () => this.handleAction('Save'),
        },
      ],
    },
    {
      id: 'edit',
      items: [
        {
          id: 'undo',
          icon: 'arrow_undo',
          tooltip: 'Undo',
          action: () => this.handleAction('Undo'),
        },
        {
          id: 'redo',
          icon: 'arrow_redo',
          tooltip: 'Redo',
          action: () => this.handleAction('Redo'),
        },
        {
          id: 'cut',
          icon: 'cut',
          tooltip: 'Cut',
          action: () => this.handleAction('Cut'),
        },
        {
          id: 'copy',
          icon: 'copy',
          tooltip: 'Copy',
          action: () => this.handleAction('Copy'),
        },
        {
          id: 'paste',
          icon: 'clipboard_paste',
          tooltip: 'Paste',
          action: () => this.handleAction('Paste'),
        },
      ],
    },
    {
      id: 'format',
      items: [
        {
          id: 'bold',
          icon: 'text_bold',
          tooltip: 'Bold',
          action: () => this.handleAction('Bold'),
        },
        {
          id: 'italic',
          icon: 'text_italic',
          tooltip: 'Italic',
          action: () => this.handleAction('Italic'),
        },
        {
          id: 'underline',
          icon: 'text_underline',
          tooltip: 'Underline',
          action: () => this.handleAction('Underline'),
        },
      ],
    },
  ]);

  selectedItems = signal<ToolbarItem[]>([
    {
      id: 'bold',
      icon: 'text_bold',
      tooltip: 'Bold',
      selected: true,
      action: () => this.toggleSelection('bold'),
    },
    {
      id: 'italic',
      icon: 'text_italic',
      tooltip: 'Italic',
      selected: false,
      action: () => this.toggleSelection('italic'),
    },
    {
      id: 'underline',
      icon: 'text_underline',
      tooltip: 'Underline',
      selected: false,
      action: () => this.toggleSelection('underline'),
    },
  ]);

  formattingItems = signal<ToolbarItem[]>([
    {
      id: 'bold',
      icon: 'text_bold',
      tooltip: 'Bold',
      action: () => this.handleAction('Bold'),
    },
    {
      id: 'italic',
      icon: 'text_italic',
      tooltip: 'Italic',
      action: () => this.handleAction('Italic'),
    },
    {
      id: 'underline',
      icon: 'text_underline',
      tooltip: 'Underline',
      action: () => this.handleAction('Underline'),
    },
  ]);

  fileActionsItems = signal<ToolbarItem[]>([
    {
      id: 'new',
      icon: 'document_add',
      tooltip: 'New',
      action: () => this.handleAction('New'),
    },
    {
      id: 'open',
      icon: 'folder_open',
      tooltip: 'Open',
      action: () => this.handleAction('Open'),
    },
    {
      id: 'save',
      icon: 'save',
      tooltip: 'Save',
      action: () => this.handleAction('Save'),
    },
  ]);

  viewActionsItems = signal<ToolbarItem[]>([
    {
      id: 'zoom-in',
      icon: 'zoom_in',
      tooltip: 'Zoom In',
      action: () => this.handleAction('Zoom In'),
    },
    {
      id: 'zoom-out',
      icon: 'zoom_out',
      tooltip: 'Zoom Out',
      action: () => this.handleAction('Zoom Out'),
    },
  ]);

  fontSizeItems = signal<DropdownItem[]>([
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '14', label: '14' },
    { value: '16', label: '16' },
    { value: '18', label: '18' },
    { value: '20', label: '20' },
    { value: '24', label: '24' },
    { value: '28', label: '28' },
    { value: '32', label: '32' },
  ]);

  fontFamilyItems = signal<DropdownItem[]>([
    { value: 'arial', label: 'Arial' },
    { value: 'calibri', label: 'Calibri' },
    { value: 'times', label: 'Times New Roman' },
    { value: 'courier', label: 'Courier New' },
    { value: 'verdana', label: 'Verdana' },
    { value: 'georgia', label: 'Georgia' },
  ]);

  editorToolbarGroups = signal<ToolbarGroup[]>([
    {
      id: 'format',
      items: [
        {
          id: 'bold',
          icon: 'text_bold',
          tooltip: 'Bold',
          action: () => this.handleAction('Bold'),
        },
        {
          id: 'italic',
          icon: 'text_italic',
          tooltip: 'Italic',
          action: () => this.handleAction('Italic'),
        },
        {
          id: 'underline',
          icon: 'text_underline',
          tooltip: 'Underline',
          action: () => this.handleAction('Underline'),
        },
        {
          id: 'strikethrough',
          icon: 'text_strikethrough',
          tooltip: 'Strikethrough',
          action: () => this.handleAction('Strikethrough'),
        },
      ],
    },
    {
      id: 'alignment',
      items: [
        {
          id: 'align-left',
          icon: 'text_align_left',
          tooltip: 'Align Left',
          action: () => this.handleAction('Align Left'),
        },
        {
          id: 'align-center',
          icon: 'text_align_center',
          tooltip: 'Align Center',
          action: () => this.handleAction('Align Center'),
        },
        {
          id: 'align-right',
          icon: 'text_align_right',
          tooltip: 'Align Right',
          action: () => this.handleAction('Align Right'),
        },
        {
          id: 'align-justify',
          icon: 'text_align_justify',
          tooltip: 'Justify',
          action: () => this.handleAction('Justify'),
        },
      ],
    },
  ]);

  disabledItems = signal<ToolbarItem[]>([
    {
      id: 'new',
      label: 'New',
      icon: 'document_add',
      action: () => this.handleAction('New'),
    },
    {
      id: 'open',
      label: 'Open',
      icon: 'folder_open',
      disabled: true,
      action: () => this.handleAction('Open'),
    },
    {
      id: 'save',
      label: 'Save',
      icon: 'save',
      disabled: true,
      action: () => this.handleAction('Save'),
    },
    {
      id: 'print',
      label: 'Print',
      icon: 'print',
      action: () => this.handleAction('Print'),
    },
  ]);

  variantItems = signal<ToolbarItem[]>([
    {
      id: 'save',
      label: 'Save',
      icon: 'save',
      variant: 'primary',
      tooltip: 'Save',
      action: () => this.handleAction('Save'),
    },
    {
      id: 'cancel',
      label: 'Cancel',
      icon: 'dismiss',
      variant: 'secondary',
      tooltip: 'Cancel',
      action: () => this.handleAction('Cancel'),
    },
    {
      id: 'approve',
      label: 'Approve',
      icon: 'checkmark',
      variant: 'success',
      tooltip: 'Approve',
      action: () => this.handleAction('Approve'),
    },
    {
      id: 'warning',
      label: 'Warning',
      icon: 'warning',
      variant: 'warning',
      tooltip: 'Warning',
      action: () => this.handleAction('Warning'),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'delete',
      variant: 'danger',
      tooltip: 'Delete',
      action: () => this.handleAction('Delete'),
    },
    {
      id: 'info',
      label: 'Info',
      icon: 'info',
      variant: 'info',
      tooltip: 'Info',
      action: () => this.handleAction('Info'),
    },
  ]);

  usageExample = `// In your component
import { ToolbarComponent } from '../toolbar';
import { ToolbarItem } from '../toolbar/models/toolbar-item.model';

@Component({
  template: \`
    <ui-toolbar
      [items]="toolbarItems()"
      (itemClick)="onItemClick($event)"
    />
  \`
})
export class MyComponent {
  toolbarItems = signal<ToolbarItem[]>([
    {
      id: 'bold',
      icon: 'text_bold',
      tooltip: 'Bold',
      action: () => console.log('Bold clicked')
    },
    {
      id: 'italic',
      icon: 'text_italic',
      tooltip: 'Italic',
      action: () => console.log('Italic clicked')
    }
  ]);
  
  onItemClick(item: ToolbarItem) {
    console.log('Item clicked:', item.id);
  }
}`;

  onItemClick(item: ToolbarItem): void {
    console.log('Toolbar item clicked:', item.id);
  }

  handleAction(actionName: string): void {
    alert(`Action executed: ${actionName}`);
  }

  toggleSelection(id: string): void {
    const items = this.selectedItems();
    const updated = items.map(item => ({
      ...item,
      selected: item.id === id ? !item.selected : item.selected,
    }));
    this.selectedItems.set(updated);
    this.handleAction(`Toggle ${id}`);
  }

  allTypesItems = signal<ToolbarItem[]>([
    {
      id: 'button-default',
      label: 'Button',
      icon: 'document_add',
      tooltip: 'Default button type',
      action: () => this.handleAction('Button clicked'),
    },
    {
      id: 'divider-1',
      type: 'divider',
    },
    {
      id: 'toggle-1',
      type: 'toggle',
      label: 'Toggle',
      icon: 'text_bold',
      selected: false,
      tooltip: 'Toggle button',
      action: () => this.handleAction('Toggle clicked'),
    },
    {
      id: 'toggle-2',
      type: 'toggle',
      label: 'Toggle Selected',
      icon: 'text_italic',
      selected: true,
      tooltip: 'Toggle button (selected)',
      action: () => this.handleAction('Toggle selected clicked'),
    },
    {
      id: 'divider-2',
      type: 'divider',
    },
    {
      id: 'split-1',
      type: 'split',
      label: 'Save',
      icon: 'save',
      variant: 'primary',
      tooltip: 'Split button',
      menuItems: [
        { id: 'save-as', label: 'Save As...', action: () => this.handleAction('Save As') },
        { id: 'save-copy', label: 'Save a Copy', action: () => this.handleAction('Save a Copy') },
        { id: 'save-all', label: 'Save All', action: () => this.handleAction('Save All') },
      ] as MenuItem[],
      action: () => this.handleAction('Save clicked'),
    },
    {
      id: 'split-2',
      type: 'split',
      label: 'Export',
      icon: 'arrow_download',
      variant: 'secondary',
      tooltip: 'Split button with menu',
      menuItems: [
        { id: 'export-pdf', label: 'Export as PDF', action: () => this.handleAction('Export PDF') },
        { id: 'export-doc', label: 'Export as DOC', action: () => this.handleAction('Export DOC') },
        { id: 'export-xls', label: 'Export as XLS', action: () => this.handleAction('Export XLS') },
      ] as MenuItem[],
      action: () => this.handleAction('Export clicked'),
    },
    {
      id: 'divider-3',
      type: 'divider',
    },
    {
      id: 'custom-1',
      type: 'custom',
    },
  ]);
}
