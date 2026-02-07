import { Component, signal, computed, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TreeComponent,
  TreeNode,
  ButtonComponent,
  TableOfContentComponent,
  Appearance,
  Shape,
  Size,
  Variant,
  ChevronPosition,
  Orientation,
} from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';

@Component({
  selector: 'app-tree-showcase',
  imports: [
    TreeComponent,
    CommonModule,
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
        <h1 class="showcase__title">Tree Component Showcase</h1>
        <p class="showcase__description">
          Unified Tree component with Fluent 2 Design System. Supports appearance, shape, size,
          hierarchical structures, drag & drop, and selection indicators.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            (valuesChange)="onValuesChange($event)"
            (reset)="onReset()"
          >
            <!-- Preview -->
            <div preview>
              <ui-tree
                [nodes]="interactiveTree()"
                [variant]="currentVariant()"
                [appearance]="currentAppearance()"
                [size]="currentSize()"
                [shape]="currentShape()"
                [showSelectionIndicator]="currentShowSelectionIndicator()"
                [indicatorPosition]="currentIndicatorPosition()"
                [chevronPosition]="currentChevronPosition()"
                [asButton]="currentAsButton()"
                [expandOnClick]="currentExpandOnClick()"
                [selectOnClick]="currentSelectOnClick()"
                [draggable]="currentDraggable()"
                [dropZone]="currentDropZone()"
                (nodeClick)="onInteractiveNodeClick($event)"
                (nodeToggle)="onInteractiveNodeToggle($event)"
                (nodeSelect)="onInteractiveNodeSelect($event)"
                (nodeMoved)="onInteractiveNodeMoved($event)"
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
                <ui-tree [nodes]="createBasicTree(a)" [appearance]="a" />
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
                <ui-tree [nodes]="createBasicTree(s)" appearance="outline" [shape]="s" />
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
                <ui-tree [nodes]="createBasicTree(sz)" appearance="subtle" [size]="sz" />
              </div>
            }
          </div>
        </div>

        <!-- Selection Indicators -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Selection Indicators</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Horizontal</h3>
              <ui-tree
                [nodes]="selectionTree()"
                appearance="subtle"
                [showSelectionIndicator]="true"
                indicatorPosition="horizontal"
                (nodeSelect)="onNodeSelect($event)"
              />
            </div>
            <div class="showcase__item">
              <h3>Vertical</h3>
              <ui-tree
                [nodes]="selectionTree()"
                appearance="subtle"
                [showSelectionIndicator]="true"
                indicatorPosition="vertical"
                (nodeSelect)="onNodeSelect($event)"
              />
            </div>
          </div>
        </div>

        <!-- Chevron Positions -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Chevron Positions</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Before (Default)</h3>
              <ui-tree [nodes]="createBasicTree('before')" chevronPosition="before" />
            </div>
            <div class="showcase__item">
              <h3>After</h3>
              <ui-tree [nodes]="createBasicTree('after')" chevronPosition="after" />
            </div>
          </div>
        </div>

        <!-- Drag and Drop -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Drag and Drop</h2>
          <div class="showcase__grid">
            <div class="showcase__item" style="width: 100%;">
              <ui-tree
                [nodes]="draggableTree()"
                appearance="subtle"
                [draggable]="true"
                [dropZone]="true"
                [showSelectionIndicator]="true"
                indicatorPosition="vertical"
                (nodeMoved)="onNodeMoved($event)"
              />
              <div style="margin-top: 12px;">
                <ui-button
                  variant="secondary"
                  appearance="outline"
                  size="small"
                  (click)="resetDraggableTree()"
                >
                  Reset Tree
                </ui-button>
              </div>
            </div>
          </div>
        </div>

        <!-- Event Log -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Event Log</h2>
          <div class="showcase__log">
            @if (eventLog().length === 0) {
              <p class="showcase__log__empty">No events yet. Interact with trees above.</p>
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
export class TreeShowcaseComponent {
  appearances: Appearance[] = ['transparent', 'subtle', 'tint', 'outline', 'filled'];
  shapes: Shape[] = ['rounded', 'circular', 'square'];
  sizes: Size[] = ['small', 'medium', 'large'];
  variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

  eventLog = signal<Array<{ time: string; message: string }>>([]);

  selectionTree = signal<TreeNode[]>(this.createSelectionTree());
  draggableTree = signal<TreeNode[]>(this.createDraggableTree());
  interactiveTree = signal<TreeNode[]>(this.createInteractiveTree());

  // Reference to showcase for event logging
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-tree',
    controlGroups: [
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'layout', label: 'Layout', icon: 'resize' as any },
      { id: 'behavior', label: 'Behavior', icon: 'toggle_left' as any },
      { id: 'features', label: 'Features', icon: 'settings' as any },
    ],
    controls: [
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
        description: 'Tree node size',
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
        key: 'chevronPosition',
        label: 'Chevron Position',
        type: 'dropdown',
        description: 'Position of expand/collapse chevron',
        options: [
          { value: 'before', label: 'before' },
          { value: 'after', label: 'after' },
        ],
        defaultValue: 'before',
        group: 'layout',
      },
      {
        key: 'asButton',
        label: 'As Button',
        type: 'switch',
        description: 'Render nodes as buttons',
        defaultValue: false,
        group: 'behavior',
      },
      {
        key: 'expandOnClick',
        label: 'Expand On Click',
        type: 'switch',
        description: 'Expand/collapse on node click',
        defaultValue: false,
        group: 'behavior',
      },
      {
        key: 'selectOnClick',
        label: 'Select On Click',
        type: 'switch',
        description: 'Select node on click',
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
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    chevronPosition: 'before',
    asButton: false,
    expandOnClick: false,
    selectOnClick: false,
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    draggable: false,
    dropZone: false,
  });

  // Computed values for the tree
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentChevronPosition = computed(() => this.values()['chevronPosition'] as ChevronPosition);
  currentAsButton = computed(() => this.values()['asButton'] as boolean);
  currentExpandOnClick = computed(() => this.values()['expandOnClick'] as boolean);
  currentSelectOnClick = computed(() => this.values()['selectOnClick'] as boolean);
  currentShowSelectionIndicator = computed(
    () => this.values()['showSelectionIndicator'] as boolean,
  );
  currentIndicatorPosition = computed(() => this.values()['indicatorPosition'] as Orientation);
  currentDraggable = computed(() => this.values()['draggable'] as boolean);
  currentDropZone = computed(() => this.values()['dropZone'] as boolean);

  createBasicTree(id: string): TreeNode[] {
    return [
      {
        id: `${id}-1`,
        label: 'Documents',
        icon: 'folder',
        hasChildren: true,
        expanded: true,
        children: [
          { id: `${id}-1-1`, label: 'File 1.pdf', icon: 'document', hasChildren: false },
          { id: `${id}-1-2`, label: 'File 2.docx', icon: 'document', hasChildren: false },
        ],
      },
      { id: `${id}-2`, label: 'Settings', icon: 'settings', hasChildren: false },
    ];
  }

  createSelectionTree(): TreeNode[] {
    return [
      {
        id: 'sel-1',
        label: 'Projects',
        icon: 'folder',
        hasChildren: true,
        expanded: true,
        children: [
          { id: 'sel-1-1', label: 'Project Alpha', icon: 'document', hasChildren: false },
          {
            id: 'sel-1-2',
            label: 'Project Beta',
            icon: 'document',
            hasChildren: false,
            selected: true,
          },
        ],
      },
      { id: 'sel-2', label: 'Archive', icon: 'folder', hasChildren: false },
    ];
  }

  createDraggableTree(): TreeNode[] {
    return [
      {
        id: 'drag-1',
        label: 'Documents',
        icon: 'folder',
        hasChildren: true,
        expanded: true,
        children: [
          { id: 'drag-1-1', label: 'Report.pdf', icon: 'document', hasChildren: false },
          { id: 'drag-1-2', label: 'Notes.txt', icon: 'document', hasChildren: false },
        ],
      },
      {
        id: 'drag-2',
        label: 'Images',
        icon: 'image',
        hasChildren: true,
        expanded: true,
        children: [{ id: 'drag-2-1', label: 'Photo.jpg', icon: 'image', hasChildren: false }],
      },
      { id: 'drag-3', label: 'Videos', icon: 'video', hasChildren: false },
    ];
  }

  onNodeSelect(node: TreeNode): void {
    this.log(`Selected: ${node.label}`);
  }

  onNodeMoved(event: { node: TreeNode; target: TreeNode; position: string }): void {
    this.log(`Moved "${event.node.label}" ${event.position} "${event.target.label}"`);
  }

  resetDraggableTree(): void {
    this.draggableTree.set(this.createDraggableTree());
    this.log('Tree reset');
  }

  createInteractiveTree(): TreeNode[] {
    return [
      {
        id: 'int-1',
        label: 'Documents',
        icon: 'folder',
        hasChildren: true,
        expanded: true,
        children: [
          { id: 'int-1-1', label: 'Report.pdf', icon: 'document', hasChildren: false },
          { id: 'int-1-2', label: 'Notes.txt', icon: 'document', hasChildren: false },
          {
            id: 'int-1-3',
            label: 'Projects',
            icon: 'folder',
            hasChildren: true,
            expanded: false,
            children: [
              { id: 'int-1-3-1', label: 'Project A', icon: 'document', hasChildren: false },
              { id: 'int-1-3-2', label: 'Project B', icon: 'document', hasChildren: false },
            ],
          },
        ],
      },
      {
        id: 'int-2',
        label: 'Images',
        icon: 'image',
        hasChildren: true,
        expanded: false,
        children: [
          { id: 'int-2-1', label: 'Photo1.jpg', icon: 'image', hasChildren: false },
          { id: 'int-2-2', label: 'Photo2.jpg', icon: 'image', hasChildren: false },
        ],
      },
      { id: 'int-3', label: 'Settings', icon: 'settings', hasChildren: false },
    ];
  }

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.interactiveTree.set(this.createInteractiveTree());
  }

  onInteractiveNodeClick(node: TreeNode): void {
    this.showcase()?.logEvent('nodeClick', { label: node.label, id: node.id });
  }

  onInteractiveNodeToggle(node: TreeNode): void {
    this.showcase()?.logEvent('nodeToggle', { label: node.label, expanded: node.expanded });
  }

  onInteractiveNodeSelect(node: TreeNode): void {
    this.showcase()?.logEvent('nodeSelect', { label: node.label, id: node.id });
  }

  onInteractiveNodeMoved(event: { node: TreeNode; target: TreeNode; position: string }): void {
    this.showcase()?.logEvent('nodeMoved', {
      node: event.node.label,
      target: event.target.label,
      position: event.position,
    });
  }

  private log(message: string): void {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    this.eventLog.update(log => [{ time, message }, ...log.slice(0, 9)]);
  }
}
