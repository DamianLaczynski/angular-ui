import { Component, signal, computed, viewChild } from '@angular/core';
import { NodeComponent, Node } from 'angular-ui';
import { MenuComponent } from 'angular-ui';
import { CommonModule } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { MenuItem } from 'angular-ui';
import { Appearance, Shape, Size, Variant, Orientation } from 'angular-ui';
import { IconName } from 'angular-ui';

@Component({
  selector: 'app-node-showcase',
  imports: [
    NodeComponent,
    MenuComponent,
    CommonModule,
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
        <h1 class="showcase__title">Node Component Showcase</h1>
        <p class="showcase__description">
          Unified Node component with Fluent 2 Design System. Supports appearance, shape, size,
          selection indicators, drag & drop, and custom content.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            (valuesChange)="onValuesChange($event)"
            (reset)="onResetDemo()"
          >
            <!-- Preview -->
            <div preview>
              <ui-node
                [node]="interactiveNode()"
                [variant]="currentVariant()"
                [appearance]="currentAppearance()"
                [size]="currentSize()"
                [shape]="currentShape()"
                [showSelectionIndicator]="currentShowSelectionIndicator()"
                [indicatorPosition]="currentIndicatorPosition()"
                [asButton]="currentAsButton()"
                [selectOnClick]="currentSelectOnClick()"
                [draggable]="currentDraggable()"
                [dropZone]="currentDropZone()"
                (nodeClick)="onInteractiveNodeClick($event)"
                (nodeSelect)="onInteractiveNodeSelect($event)"
                (nodeClose)="onInteractiveNodeClose($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Appearances -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Appearances</h2>
          <div class="showcase__grid">
            @for (a of appearances; track a) {
              <div class="showcase__item">
                <h3>{{ a | titlecase }}</h3>
                <ui-node
                  [node]="{ id: a, label: a + ' appearance', icon: 'folder' }"
                  [appearance]="a"
                  variant="secondary"
                  shape="rounded"
                />
              </div>
            }
          </div>
        </div>

        <!-- Appearances Selected -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Appearances (Selected)</h2>
          <div class="showcase__grid">
            @for (a of appearances; track a) {
              <div class="showcase__item">
                <h3>{{ a | titlecase }}</h3>
                <ui-node
                  [node]="{
                    id: a + '-sel',
                    label: a + ' selected',
                    icon: 'folder',
                    selected: true,
                  }"
                  [appearance]="a"
                  shape="rounded"
                />
              </div>
            }
          </div>
        </div>

        <!-- Shapes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Shapes</h2>
          <div class="showcase__grid">
            @for (s of shapes; track s) {
              <div class="showcase__item">
                <h3>{{ s | titlecase }}</h3>
                <ui-node
                  [node]="{ id: s, label: s + ' shape', icon: 'settings' }"
                  appearance="subtle"
                  [shape]="s"
                />
              </div>
            }
          </div>
        </div>

        <!-- Appearance + Shape Combinations -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Appearance + Shape Combinations</h2>

          <h3 class="showcase__subsection__title">Circular (Not Selected)</h3>
          <div class="showcase__grid">
            @for (a of appearances; track a) {
              <div class="showcase__item">
                <h3>{{ a | titlecase }} + Circular</h3>
                <ui-node
                  [node]="{ id: a + '-circ', label: a + ' circular', icon: 'home' }"
                  [appearance]="a"
                  shape="circular"
                />
              </div>
            }
          </div>

          <h3 class="showcase__subsection__title">Circular (Selected)</h3>
          <div class="showcase__grid">
            @for (a of appearances; track a) {
              <div class="showcase__item">
                <h3>{{ a | titlecase }} + Circular</h3>
                <ui-node
                  [node]="{
                    id: a + '-circ-sel',
                    label: a + ' circular',
                    icon: 'home',
                    selected: true,
                  }"
                  [appearance]="a"
                  shape="circular"
                />
              </div>
            }
          </div>

          <h3 class="showcase__subsection__title">Rounded (Selected)</h3>
          <div class="showcase__grid">
            @for (a of appearances; track a) {
              <div class="showcase__item">
                <h3>{{ a | titlecase }} + Rounded</h3>
                <ui-node
                  [node]="{
                    id: a + '-round-sel',
                    label: a + ' rounded',
                    icon: 'folder',
                    selected: true,
                  }"
                  [appearance]="a"
                  shape="rounded"
                />
              </div>
            }
          </div>
        </div>

        <!-- Sizes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Sizes</h2>
          <div class="showcase__grid">
            @for (sz of sizes; track sz) {
              <div class="showcase__item">
                <h3>{{ sz | titlecase }}</h3>
                <ui-node
                  [node]="{ id: sz, label: sz + ' size', icon: 'document' }"
                  appearance="subtle"
                  [size]="sz"
                />
              </div>
            }
          </div>
        </div>

        <!-- Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variants (Semantic Colors)</h2>
          <div class="showcase__grid">
            @for (v of variants; track v) {
              <div class="showcase__item">
                <h3>{{ v | titlecase }}</h3>
                <ui-node
                  [node]="{ id: v, label: v + ' variant', icon: 'info', selected: true }"
                  [variant]="v"
                  appearance="subtle"
                  [showSelectionIndicator]="true"
                  indicatorPosition="horizontal"
                />
              </div>
            }
          </div>

          <h3 class="showcase__subsection__title">Variants with Filled Appearance</h3>
          <div class="showcase__grid">
            @for (v of variants; track v) {
              <div class="showcase__item">
                <h3>{{ v | titlecase }}</h3>
                <ui-node
                  [node]="{
                    id: v + '-filled',
                    label: v + ' filled',
                    icon: 'checkmark',
                    selected: true,
                  }"
                  [variant]="v"
                  appearance="filled"
                  shape="circular"
                />
              </div>
            }
          </div>

          <h3 class="showcase__subsection__title">Variants with Outline Appearance</h3>
          <div class="showcase__grid">
            @for (v of variants; track v) {
              <div class="showcase__item">
                <h3>{{ v | titlecase }}</h3>
                <ui-node
                  [node]="{
                    id: v + '-outline',
                    label: v + ' outline',
                    icon: 'warning',
                    selected: true,
                  }"
                  [variant]="v"
                  appearance="outline"
                  shape="circular"
                />
              </div>
            }
          </div>
        </div>

        <!-- Selection Indicators -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Selection Indicators</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Horizontal (Selected)</h3>
              <ui-node
                [node]="{
                  id: 'h-sel',
                  label: 'Horizontal indicator',
                  icon: 'home',
                  selected: true,
                }"
                appearance="subtle"
                [showSelectionIndicator]="true"
                indicatorPosition="horizontal"
              />
            </div>
            <div class="showcase__item">
              <h3>Horizontal (Not Selected)</h3>
              <ui-node
                [node]="{ id: 'h-unsel', label: 'Horizontal indicator', icon: 'home' }"
                appearance="subtle"
                [showSelectionIndicator]="true"
                indicatorPosition="horizontal"
              />
            </div>
            <div class="showcase__item">
              <h3>Vertical (Selected)</h3>
              <ui-node
                [node]="{ id: 'v-sel', label: 'Vertical indicator', icon: 'home', selected: true }"
                appearance="subtle"
                [showSelectionIndicator]="true"
                indicatorPosition="vertical"
              />
            </div>
            <div class="showcase__item">
              <h3>Vertical (Not Selected)</h3>
              <ui-node
                [node]="{ id: 'v-unsel', label: 'Vertical indicator', icon: 'home' }"
                appearance="subtle"
                [showSelectionIndicator]="true"
                indicatorPosition="vertical"
              />
            </div>
          </div>
        </div>

        <!-- States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Normal</h3>
              <ui-node
                [node]="{ id: 'normal', label: 'Normal state', icon: 'folder' }"
                appearance="subtle"
              />
            </div>
            <div class="showcase__item">
              <h3>Selected</h3>
              <ui-node
                [node]="{ id: 'selected', label: 'Selected state', icon: 'folder', selected: true }"
                appearance="subtle"
              />
            </div>
            <div class="showcase__item">
              <h3>Disabled</h3>
              <ui-node
                [node]="{ id: 'disabled', label: 'Disabled state', icon: 'folder', disabled: true }"
                appearance="subtle"
              />
            </div>
            <div class="showcase__item">
              <h3>Closable</h3>
              <ui-node
                [node]="{ id: 'closable', label: 'Closable node', icon: 'folder', closable: true }"
                appearance="subtle"
                (nodeClose)="onNodeClose($event)"
              />
            </div>
          </div>
        </div>

        <!-- As Button -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">As Button</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Button Mode</h3>
              <ui-node
                [node]="{ id: 'btn', label: 'Click me', icon: 'add' }"
                appearance="subtle"
                [asButton]="true"
                (nodeClick)="onNodeClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3>Button Selected</h3>
              <ui-node
                [node]="{
                  id: 'btn-sel',
                  label: 'Selected button',
                  icon: 'checkmark',
                  selected: true,
                }"
                appearance="filled"
                shape="circular"
                [asButton]="true"
              />
            </div>
          </div>
        </div>

        <!-- Interactive -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive Example</h2>
          <div class="showcase__grid">
            @for (node of interactiveNodes(); track node.id) {
              <div class="showcase__item">
                <ui-node
                  [node]="node"
                  appearance="subtle"
                  [showSelectionIndicator]="true"
                  indicatorPosition="horizontal"
                  (nodeClick)="toggleSelection(node.id)"
                />
              </div>
            }
          </div>
        </div>

        <!-- Quick Actions with Menu -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Quick Actions with Menu</h2>
          <p class="showcase__section__description">
            Node component with integrated menu button for quick actions. Menu appears on hover.
          </p>
          <div class="showcase__grid">
            @for (node of menuNodes(); track node.id) {
              <div class="showcase__item">
                <ui-node
                  [node]="node"
                  appearance="subtle"
                  [showQuickActions]="true"
                  [quickActionsTemplate]="quickActionsMenu"
                  (nodeClick)="onNodeClick($event)"
                />
              </div>
            }
          </div>

          <ng-template #quickActionsMenu let-node>
            <ui-menu
              triggerVariant="dropdown"
              [menuItems]="getNodeMenuItems(node)"
              icon="more_horizontal"
              size="small"
              [ariaLabel]="'Menu'"
              (menuItemClick)="onMenuAction($event, node)"
            />
          </ng-template>
        </div>

        <!-- Event Log -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Event Log</h2>
          <div class="showcase__log">
            @if (eventLog().length === 0) {
              <p class="showcase__log__empty">No events yet. Interact with nodes above.</p>
            }
            @for (event of eventLog(); track $index) {
              <div class="showcase__log__item">
                <span class="showcase__log__time">{{ event.time }}</span>
                <span class="showcase__log__message">{{ event.message }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NodeShowcaseComponent {
  appearances: Appearance[] = ['transparent', 'subtle', 'tint', 'outline', 'filled'];
  shapes: Shape[] = ['rounded', 'circular', 'square'];
  sizes: Size[] = ['small', 'medium', 'large'];
  variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

  // Reference to showcase for event logging
  private showcaseRef = viewChild<InteractiveShowcaseComponent>('showcase');

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-node',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'layout', label: 'Layout', icon: 'resize' as any },
      { id: 'behavior', label: 'Behavior', icon: 'toggle_left' as any },
      { id: 'features', label: 'Features', icon: 'settings' as any },
    ],
    controls: [
      {
        key: 'label',
        label: 'Label',
        type: 'text',
        description: 'Node label text',
        defaultValue: 'Documents',
        placeholder: 'Enter node label',
        group: 'content',
      },
      {
        key: 'icon',
        label: 'Icon',
        type: 'dropdown',
        description: 'Node icon',
        options: [
          { value: 'folder', label: 'folder' },
          { value: 'document', label: 'document' },
          { value: 'image', label: 'image' },
          { value: 'settings', label: 'settings' },
          { value: 'home', label: 'home' },
          { value: 'person', label: 'person' },
        ],
        defaultValue: 'folder',
        group: 'content',
      },
      {
        key: 'closable',
        label: 'Closable',
        type: 'switch',
        description: 'Show close button',
        defaultValue: false,
        group: 'content',
      },
      {
        key: 'variant',
        label: 'Variant',
        type: 'dropdown',
        description: 'Color variant',
        options: this.variants.map(v => ({ value: v, label: v })),
        defaultValue: 'primary',
        group: 'appearance',
      },
      {
        key: 'appearance',
        label: 'Appearance',
        type: 'dropdown',
        description: 'Visual style',
        options: this.appearances.map(a => ({ value: a, label: a })),
        defaultValue: 'subtle',
        group: 'appearance',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        description: 'Node size',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'layout',
      },
      {
        key: 'shape',
        label: 'Shape',
        type: 'dropdown',
        description: 'Node shape',
        options: this.shapes.map(s => ({ value: s, label: s })),
        defaultValue: 'rounded',
        group: 'layout',
      },
      {
        key: 'asButton',
        label: 'As Button',
        type: 'switch',
        description: 'Render node as button',
        defaultValue: false,
        group: 'behavior',
      },
      {
        key: 'selectOnClick',
        label: 'Select On Click',
        type: 'switch',
        description: 'Select node on click',
        defaultValue: true,
        group: 'behavior',
      },
      {
        key: 'selected',
        label: 'Selected',
        type: 'switch',
        description: 'Selected state',
        defaultValue: false,
        group: 'behavior',
      },
      {
        key: 'disabled',
        label: 'Disabled',
        type: 'switch',
        description: 'Disabled state',
        defaultValue: false,
        group: 'behavior',
      },
      {
        key: 'showSelectionIndicator',
        label: 'Show Selection Indicator',
        type: 'switch',
        description: 'Show visual selection indicator',
        defaultValue: false,
        group: 'features',
      },
      {
        key: 'indicatorPosition',
        label: 'Indicator Position',
        type: 'dropdown',
        description: 'Position of selection indicator',
        options: [
          { value: 'vertical', label: 'vertical' },
          { value: 'horizontal', label: 'horizontal' },
        ],
        defaultValue: 'vertical',
        group: 'features',
      },
      {
        key: 'draggable',
        label: 'Draggable',
        type: 'switch',
        description: 'Enable drag and drop',
        defaultValue: false,
        group: 'features',
      },
      {
        key: 'dropZone',
        label: 'Drop Zone',
        type: 'switch',
        description: 'Enable drop zones',
        defaultValue: false,
        group: 'features',
      },
    ],
  };

  // Current values from showcase
  private values = signal<Record<string, any>>({
    label: 'Documents',
    icon: 'folder',
    closable: false,
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    asButton: false,
    selectOnClick: true,
    selected: false,
    disabled: false,
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    draggable: false,
    dropZone: false,
  });

  // Computed interactive node
  interactiveNode = computed<Node>(() => {
    const vals = this.values();
    return {
      id: 'interactive',
      label: vals['label'] as string,
      icon: vals['icon'] as IconName,
      closable: vals['closable'] as boolean,
      selected: vals['selected'] as boolean,
      disabled: vals['disabled'] as boolean,
    };
  });

  // Computed values for the node
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentAsButton = computed(() => this.values()['asButton'] as boolean);
  currentSelectOnClick = computed(() => this.values()['selectOnClick'] as boolean);
  currentShowSelectionIndicator = computed(
    () => this.values()['showSelectionIndicator'] as boolean,
  );
  currentIndicatorPosition = computed(() => this.values()['indicatorPosition'] as Orientation);
  currentDraggable = computed(() => this.values()['draggable'] as boolean);
  currentDropZone = computed(() => this.values()['dropZone'] as boolean);

  interactiveNodes = signal<Node[]>([
    { id: 1, label: 'Documents', icon: 'folder', selected: false },
    { id: 2, label: 'Images', icon: 'image', selected: true },
    { id: 3, label: 'Settings', icon: 'settings', selected: false },
    { id: 4, label: 'Profile', icon: 'person', selected: false },
  ]);

  menuNodes = signal<Node[]>([
    { id: 'file-1', label: 'Project.docx', icon: 'document' },
    { id: 'file-2', label: 'Report.xlsx', icon: 'document' },
    { id: 'folder-1', label: 'Assets', icon: 'folder' },
  ]);

  eventLog = signal<Array<{ time: string; message: string }>>([]);

  getNodeMenuItems(node: Node): MenuItem[] {
    return [
      { id: 'open', label: 'Open', icon: 'open', shortcut: 'Enter' },
      { id: 'rename', label: 'Rename', icon: 'rename', shortcut: 'F2' },
      { id: 'copy', label: 'Copy', icon: 'copy', shortcut: 'Ctrl+C' },
      { id: 'cut', label: 'Cut', icon: 'cut', shortcut: 'Ctrl+X' },
      { id: 'delete', label: 'Delete', icon: 'delete', shortcut: 'Del' },
    ];
  }

  onMenuAction(item: MenuItem, node: Node): void {
    this.log(`Menu action "${item.label}" on "${node.label}"`);
  }

  onNodeClick(node: Node): void {
    this.log(`Clicked: ${node.label}`);
  }

  onNodeClose(node: Node): void {
    this.log(`Closed: ${node.label}`);
  }

  toggleSelection(id: string | number): void {
    this.interactiveNodes.update(nodes =>
      nodes.map(n => (n.id === id ? { ...n, selected: !n.selected } : n)),
    );
    const node = this.interactiveNodes().find(n => n.id === id);
    if (node) {
      this.log(`${node.label}: ${node.selected ? 'selected' : 'unselected'}`);
    }
  }

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onResetDemo(): void {
    // Values are reset by the showcase component
  }

  onInteractiveNodeClick(node: Node): void {
    this.showcaseRef()?.logEvent('nodeClick', { label: node.label, id: node.id });
  }

  onInteractiveNodeSelect(node: Node): void {
    this.showcaseRef()?.logEvent('nodeSelect', { label: node.label, id: node.id });
  }

  onInteractiveNodeClose(node: Node): void {
    this.showcaseRef()?.logEvent('nodeClose', { label: node.label, id: node.id });
  }

  private log(message: string): void {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    this.eventLog.update(log => [{ time, message }, ...log.slice(0, 9)]);
  }
}
