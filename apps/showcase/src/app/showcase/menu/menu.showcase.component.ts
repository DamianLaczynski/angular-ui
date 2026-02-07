import { Component, signal, computed, ViewChild } from '@angular/core';

import {
  MenuComponent,
  MenuListComponent,
  MenuItem,
  MenuSection,
  TableOfContentComponent,
  Variant,
  Appearance,
  Size,
  Shape,
  IconName,
} from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';

@Component({
  selector: 'app-menu-showcase',
  imports: [
    MenuComponent,
    MenuListComponent,
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
        <h1 class="showcase__title">Menu Component</h1>
        <p class="showcase__description">
          ui-menu = przyciski: triggerVariant="dropdown" (dropdown z chevron),
          triggerVariant="split" (akcja + dropdown) lub triggerVariant="button" (pojedynczy przycisk
          bez chevron). ui-menu-list = lista pozycji (sekcje, ikony, skróty, submenu), używana w
          overlay i submenu.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo (ui-menu)</h2>
          <p class="showcase__section__description">
            TriggerVariant: dropdown / split (trigger z dropdown) lub button (przycisk bez chevron).
            Wariant, appearance, size.
          </p>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            [showEventLog]="true"
            (valuesChange)="onValuesChange($event)"
            (reset)="onReset()"
          >
            <div preview>
              <ui-menu
                [triggerVariant]="currentTriggerVariant()"
                [text]="currentText()"
                [icon]="currentIcon()"
                [menuItems]="interactiveMenuItems"
                [variant]="currentVariant()"
                [appearance]="currentAppearance()"
                [size]="currentSize()"
                [shape]="currentShape()"
                [fullWidth]="currentFullWidth()"
                [disabled]="currentDisabled()"
                [selected]="currentSelected()"
                [ariaLabel]="currentAriaLabel()"
                [menuMaxHeight]="currentMenuMaxHeight()"
                (menuItemClick)="
                  onInteractiveItemClick($event); logMenuEvent('menuItemClick', $event)
                "
                (primaryClick)="onInteractiveButtonClick($event); logMenuEvent('primaryClick')"
                (menuOpened)="logMenuEvent('menuOpened')"
                (menuClosed)="logMenuEvent('menuClosed')"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">ui-menu-list (lista)</h2>
          <p class="showcase__section__description">
            Lista pozycji menu: sekcje File, Edit, View, ikony, skróty, split, submenu.
          </p>
          <div class="showcase__preview">
            <ui-menu-list
              [sections]="editorMenuSections"
              [size]="'medium'"
              [variant]="'primary'"
              [appearance]="'subtle'"
              (itemClick)="onItemClick($event)"
              (submenuClick)="onSubmenuClick($event)"
            />
          </div>
          @if (lastAction) {
            <p class="showcase__section__feedback">
              <strong>Ostatnia akcja:</strong> {{ lastAction }}
            </p>
          }
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Trigger menu i split</h2>
          <p class="showcase__section__description">
            ui-menu z triggerVariant="dropdown" lub triggerVariant="split", text / ikona. CDK
            Overlay – pozycjonowanie i zachowanie przy overflow.
          </p>
          <div class="showcase__preview showcase__preview--integrations">
            <ui-menu
              triggerVariant="dropdown"
              text="File"
              [menuItems]="fileMenuItems"
              [size]="'medium'"
              (menuItemClick)="onItemClick($event)"
            />
            <ui-menu
              triggerVariant="dropdown"
              text="Edit (z submenu)"
              [menuItems]="nestedSubmenuItems"
              icon="edit"
              variant="secondary"
              appearance="subtle"
              (menuItemClick)="onItemClick($event)"
            />
            <ui-menu
              triggerVariant="split"
              text="Save"
              [menuItems]="saveMenuItems"
              variant="primary"
              (primaryClick)="handleAction('Zapisz')"
              (menuItemClick)="onItemClick($event)"
            />
            <ui-menu
              triggerVariant="split"
              text="Export"
              [menuItems]="exportMenuItems"
              icon="arrow_download"
              (primaryClick)="handleAction('Export')"
              (menuItemClick)="onItemClick($event)"
            />
            <ui-menu
              triggerVariant="dropdown"
              [menuItems]="rowContextMenuItems"
              icon="more_horizontal"
              size="small"
              [ariaLabel]="'Menu'"
              (menuItemClick)="onItemClick($event)"
            />
            <ui-menu
              triggerVariant="dropdown"
              [menuItems]="editorMenuItemsFlat"
              icon="more_vertical"
              size="small"
              [ariaLabel]="'Menu'"
              (menuItemClick)="onItemClick($event)"
            />
          </div>
          <p class="showcase__section__description" style="margin-top: 1rem;">
            Menu w kontenerze z overflow – overlay renderuje się poza kontenerem.
          </p>
          <div class="showcase__preview showcase__preview--overflow">
            <ui-menu
              triggerVariant="dropdown"
              text="Menu w overflow"
              [menuItems]="fileMenuItems"
              (menuItemClick)="onItemClick($event)"
            />
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      .showcase__section__feedback {
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        background: var(--color-neutral-background2-rest, #fafafa);
        border-radius: 4px;
        font-size: 14px;
      }
      .showcase__preview--integrations {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
      }
      .showcase__preview--overflow {
        overflow: hidden;
        height: 100px;
        border: 2px dashed var(--color-neutral-stroke-rest, #d1d1d1);
        position: relative;
        border-radius: 4px;
      }
      .showcase__preview--overflow ui-menu {
        position: absolute;
        bottom: 0.5rem;
        left: 0.5rem;
      }
    `,
  ],
})
export class MenuShowcaseComponent {
  lastAction = '';

  variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
  appearances: Appearance[] = ['filled', 'tint', 'outline', 'subtle', 'transparent'];
  sizes: Size[] = ['small', 'medium', 'large'];
  shapes: Shape[] = ['rounded', 'circular', 'square'];

  @ViewChild(InteractiveShowcaseComponent) interactiveShowcase?: InteractiveShowcaseComponent;

  private values = signal<Record<string, any>>({
    triggerVariant: 'dropdown',
    text: 'Open Menu',
    icon: '',
    variant: 'primary',
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded',
    fullWidth: false,
    disabled: false,
    selected: false,
    ariaLabel: 'Open menu',
    menuMaxHeight: '300px',
  });

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-menu',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'document' as any, expanded: true },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any },
      { id: 'layout', label: 'Layout', icon: 'resize' as any },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      {
        key: 'triggerVariant',
        label: 'Trigger variant',
        type: 'dropdown',
        options: [
          { value: 'dropdown', label: 'dropdown (trigger)' },
          { value: 'split', label: 'split (trigger)' },
          { value: 'button', label: 'button (bez chevron)' },
        ],
        defaultValue: 'dropdown',
        group: 'content',
      },
      {
        key: 'text',
        label: 'Text',
        type: 'text',
        defaultValue: 'Open Menu',
        placeholder: 'Button text',
        group: 'content',
      },
      {
        key: 'icon',
        label: 'Icon',
        type: 'dropdown',
        options: [
          { value: '', label: 'None' },
          { value: 'edit', label: 'edit' },
          { value: 'folder', label: 'folder' },
          { value: 'more_horizontal', label: 'more_horizontal' },
        ],
        defaultValue: '',
        group: 'content',
      },
      {
        key: 'variant',
        label: 'Variant',
        type: 'dropdown',
        options: this.variants.map(v => ({ value: v, label: v })),
        defaultValue: 'primary',
        group: 'appearance',
      },
      {
        key: 'appearance',
        label: 'Appearance',
        type: 'dropdown',
        options: this.appearances.map(a => ({ value: a, label: a })),
        defaultValue: 'filled',
        group: 'appearance',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'layout',
      },
      {
        key: 'shape',
        label: 'Shape',
        type: 'dropdown',
        options: this.shapes.map(s => ({ value: s, label: s })),
        defaultValue: 'rounded',
        group: 'layout',
      },
      {
        key: 'fullWidth',
        label: 'Full Width',
        type: 'switch',
        defaultValue: false,
        group: 'state',
      },
      {
        key: 'disabled',
        label: 'Disabled',
        type: 'switch',
        defaultValue: false,
        group: 'state',
      },
      {
        key: 'selected',
        label: 'Selected',
        type: 'switch',
        defaultValue: false,
        group: 'state',
      },
      {
        key: 'ariaLabel',
        label: 'Aria label',
        type: 'text',
        defaultValue: 'Open menu',
        placeholder: 'Accessibility label',
        group: 'content',
      },
      {
        key: 'menuMaxHeight',
        label: 'Menu max height',
        type: 'text',
        defaultValue: '300px',
        placeholder: 'e.g. 300px',
        group: 'layout',
      },
    ],
  };

  currentTriggerVariant = computed(
    () => (this.values()['triggerVariant'] as 'dropdown' | 'split' | 'button') ?? 'dropdown',
  );
  currentText = computed(() => (this.values()['text'] as string) ?? 'Open Menu');
  currentIcon = computed((): IconName | undefined => {
    const icon = this.values()['icon'] as string;
    return icon ? (icon as IconName) : undefined;
  });
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => (this.values()['shape'] as Shape) ?? 'rounded');
  currentFullWidth = computed(() => this.values()['fullWidth'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentSelected = computed(() => this.values()['selected'] as boolean);
  currentAriaLabel = computed(() => (this.values()['ariaLabel'] as string) ?? 'Open menu');
  currentMenuMaxHeight = computed(() => (this.values()['menuMaxHeight'] as string) ?? '300px');

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  interactiveMenuItems: MenuItem[] = [
    { id: 'new', label: 'New File', icon: 'document', shortcut: 'Ctrl+N' },
    { id: 'open', label: 'Open File', icon: 'folder', shortcut: 'Ctrl+O' },
    { id: 'save', label: 'Save', icon: 'save', shortcut: 'Ctrl+S' },
    { id: 'export', label: 'Export', icon: 'arrow_download' },
  ];

  onInteractiveItemClick(_item: MenuItem): void {}

  onInteractiveButtonClick(_event: MouseEvent): void {}

  logMenuEvent(name: string, data?: MenuItem | MouseEvent): void {
    const payload =
      data && typeof data === 'object' && 'label' in data
        ? { label: (data as MenuItem).label, id: (data as MenuItem).id }
        : undefined;
    this.interactiveShowcase?.logEvent(name, payload);
  }

  fileMenuItems: MenuItem[] = [
    { id: 'new', label: 'New', icon: 'document', shortcut: 'Ctrl+N' },
    { id: 'open', label: 'Open', icon: 'folder', shortcut: 'Ctrl+O' },
    { id: 'save', label: 'Save', icon: 'save', shortcut: 'Ctrl+S' },
    { id: 'close', label: 'Close', icon: 'dismiss' },
  ];

  saveMenuItems: MenuItem[] = [
    { id: 'save', label: 'Save', icon: 'save', shortcut: 'Ctrl+S' },
    { id: 'save-as', label: 'Save As...', icon: 'save', shortcut: 'Ctrl+Shift+S' },
    { id: 'save-all', label: 'Save All', icon: 'save', shortcut: 'Ctrl+Alt+S' },
  ];

  exportMenuItems: MenuItem[] = [
    { id: 'pdf', label: 'Export as PDF', icon: 'document' },
    { id: 'docx', label: 'Export as Word', icon: 'document' },
    { id: 'xlsx', label: 'Export as Excel', icon: 'document' },
    { id: 'csv', label: 'Export as CSV', icon: 'document' },
  ];

  rowContextMenuItems: MenuItem[] = [
    { id: 'edit', label: 'Edit', icon: 'edit' },
    { id: 'duplicate', label: 'Duplicate', icon: 'document' },
    { id: 'delete', label: 'Delete', icon: 'delete', disabled: true },
  ];

  nestedSubmenuItems: MenuItem[] = [
    {
      id: 'file',
      label: 'File',
      icon: 'document',
      submenuItems: [
        { id: 'file-new', label: 'New', icon: 'document', shortcut: 'Ctrl+N' },
        { id: 'file-open', label: 'Open', icon: 'folder', shortcut: 'Ctrl+O' },
        { id: 'file-save', label: 'Save', icon: 'save', shortcut: 'Ctrl+S' },
        { id: 'file-close', label: 'Close', icon: 'dismiss' },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: 'edit',
      submenuItems: [
        { id: 'edit-cut', label: 'Cut', icon: 'document', shortcut: 'Ctrl+X' },
        { id: 'edit-copy', label: 'Copy', icon: 'document', shortcut: 'Ctrl+C' },
        { id: 'edit-paste', label: 'Paste', icon: 'document', shortcut: 'Ctrl+V' },
        { id: 'edit-delete', label: 'Delete', icon: 'delete', shortcut: 'Del' },
      ],
    },
    {
      id: 'view',
      label: 'View',
      icon: 'document',
      submenuItems: [
        { id: 'view-zoom-in', label: 'Zoom In', icon: 'document', shortcut: 'Ctrl++' },
        { id: 'view-zoom-out', label: 'Zoom Out', icon: 'document', shortcut: 'Ctrl+-' },
        { id: 'view-reset', label: 'Reset Zoom', icon: 'document', shortcut: 'Ctrl+0' },
      ],
    },
  ];

  editorMenuSections: MenuSection[] = [
    {
      header: 'File',
      items: [
        {
          id: 'file-new',
          label: 'New',
          icon: 'document',
          shortcut: 'Ctrl+N',
          submenuItems: [
            {
              id: 'new-text',
              label: 'Text File',
              icon: 'document',
              action: () => this.handleAction('New → Text File'),
            },
            {
              id: 'new-folder',
              label: 'Folder',
              icon: 'folder',
              action: () => this.handleAction('New → Folder'),
            },
            {
              id: 'new-project',
              label: 'Project',
              icon: 'document',
              action: () => this.handleAction('New → Project'),
            },
          ],
        },
        {
          id: 'file-open',
          label: 'Open',
          icon: 'folder',
          shortcut: 'Ctrl+O',
          action: () => this.handleAction('Open'),
        },
        {
          id: 'file-recent',
          label: 'Open Recent',
          icon: 'folder',
          submenuItems: [
            {
              id: 'recent-1',
              label: 'Report.docx',
              icon: 'document',
              action: () => this.handleAction('Open Report.docx'),
            },
            {
              id: 'recent-2',
              label: 'Budget.xlsx',
              icon: 'document',
              action: () => this.handleAction('Open Budget.xlsx'),
            },
            {
              id: 'recent-3',
              label: 'Slides.pptx',
              icon: 'document',
              action: () => this.handleAction('Open Slides.pptx'),
            },
          ],
        },
        {
          id: 'file-save',
          label: 'Save',
          icon: 'save',
          shortcut: 'Ctrl+S',
          action: () => this.handleAction('Save'),
        },
        {
          id: 'file-doc',
          type: 'split',
          label: 'Report.docx',
          icon: 'document',
          shortcut: 'Ctrl+1',
          action: () => this.handleAction('Open Report.docx'),
          submenuAction: () => this.handleAction('Submenu: Report.docx'),
          submenuItems: [
            {
              id: 'doc-open',
              label: 'Open',
              icon: 'document',
              action: () => this.handleAction('Open Report.docx'),
            },
            {
              id: 'doc-location',
              label: 'Open File Location',
              icon: 'folder',
              action: () => this.handleAction('Open location'),
            },
            {
              id: 'doc-copy',
              label: 'Copy path',
              icon: 'document',
              action: () => this.handleAction('Copy path'),
            },
          ],
        },
        {
          id: 'file-sheet',
          type: 'split',
          label: 'Budget.xlsx',
          icon: 'document',
          shortcut: 'Ctrl+2',
          action: () => this.handleAction('Open Budget.xlsx'),
          submenuAction: () => this.handleAction('Submenu: Budget.xlsx'),
          submenuItems: [
            {
              id: 'sheet-open',
              label: 'Open',
              icon: 'document',
              action: () => this.handleAction('Open Budget.xlsx'),
            },
            {
              id: 'sheet-export',
              label: 'Export',
              icon: 'arrow_download',
              action: () => this.handleAction('Export Budget'),
            },
          ],
        },
        {
          id: 'file-close',
          label: 'Close',
          icon: 'dismiss',
          action: () => this.handleAction('Close'),
        },
      ],
      divider: true,
    },
    {
      header: 'Edit',
      items: [
        {
          id: 'edit-undo',
          label: 'Undo',
          icon: 'document',
          shortcut: 'Ctrl+Z',
          action: () => this.handleAction('Undo'),
        },
        { id: 'edit-redo', label: 'Redo', icon: 'document', shortcut: 'Ctrl+Y', disabled: true },
        {
          id: 'edit-cut',
          label: 'Cut',
          icon: 'document',
          shortcut: 'Ctrl+X',
          action: () => this.handleAction('Cut'),
        },
        {
          id: 'edit-copy',
          label: 'Copy',
          icon: 'document',
          shortcut: 'Ctrl+C',
          action: () => this.handleAction('Copy'),
        },
        {
          id: 'edit-paste',
          label: 'Paste',
          icon: 'document',
          shortcut: 'Ctrl+V',
          action: () => this.handleAction('Paste'),
          selected: true,
        },
        {
          id: 'edit-find',
          label: 'Find',
          icon: 'document',
          submenuItems: [
            {
              id: 'find-file',
              label: 'Find in File',
              icon: 'document',
              shortcut: 'Ctrl+F',
              action: () => this.handleAction('Find in File'),
            },
            {
              id: 'find-project',
              label: 'Find in Project',
              icon: 'document',
              shortcut: 'Ctrl+Shift+F',
              action: () => this.handleAction('Find in Project'),
            },
            {
              id: 'find-replace',
              label: 'Replace',
              icon: 'document',
              shortcut: 'Ctrl+H',
              action: () => this.handleAction('Replace'),
            },
          ],
        },
      ],
      divider: true,
    },
    {
      header: 'View',
      items: [
        {
          id: 'view-zoom-in',
          label: 'Zoom In',
          icon: 'document',
          shortcut: 'Ctrl++',
          action: () => this.handleAction('Zoom In'),
        },
        {
          id: 'view-zoom-out',
          label: 'Zoom Out',
          icon: 'document',
          shortcut: 'Ctrl+-',
          action: () => this.handleAction('Zoom Out'),
        },
        {
          id: 'view-reset',
          label: 'Reset Zoom',
          icon: 'document',
          shortcut: 'Ctrl+0',
          disabled: true,
        },
      ],
    },
  ];

  get editorMenuItemsFlat(): MenuItem[] {
    return this.editorMenuSections.flatMap(s => s.items);
  }

  onItemClick(item: MenuItem): void {
    this.lastAction = `Klik: ${item.label}`;
  }

  onSubmenuClick(item: MenuItem): void {
    this.lastAction = `Submenu: ${item.label}`;
  }

  handleAction(action: string): void {
    this.lastAction = action;
  }
}
