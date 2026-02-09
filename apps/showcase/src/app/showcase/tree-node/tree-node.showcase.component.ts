import { Component, signal, computed, viewChild, TemplateRef } from '@angular/core';
import { TreeNodeComponent, TreeNode } from 'angular-ui';
import { CommonModule } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { Appearance, Shape, Size, Variant, ChevronPosition, Orientation } from 'angular-ui';
import { IconName } from 'angular-ui';
import { IconComponent } from 'angular-ui';
import { BadgeComponent } from 'angular-ui';
import { MenuComponent } from 'angular-ui';
import { MenuItem } from 'angular-ui';

interface FileSystemItem {
  type: 'file' | 'folder';
  size?: number;
  itemCount?: number;
  status?: string;
}

interface CustomTreeNode extends TreeNode<CustomTreeNode> {
  data: FileSystemItem;
}

@Component({
  selector: 'app-tree-node-showcase',
  imports: [
    TreeNodeComponent,
    CommonModule,
    TableOfContentComponent,
    InteractiveShowcaseComponent,
    IconComponent,
    BadgeComponent,
    MenuComponent,
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
        <h1 class="showcase__title">Tree Node Component Showcase</h1>
        <p class="showcase__description">
          Unified TreeNode component with Fluent 2 Design System. Supports appearance, shape, size,
          hierarchical structures, expand/collapse, and selection indicators.
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
              <ui-tree-node
                [node]="interactiveNode()"
                [variant]="currentVariant()"
                [appearance]="currentAppearance()"
                [size]="currentSize()"
                [shape]="currentShape()"
                [showSelectionIndicator]="currentShowSelectionIndicator()"
                [indicatorPosition]="currentIndicatorPosition()"
                [chevronPosition]="currentChevronPosition()"
                [chevronIconCollapsed]="currentChevronIconCollapsed()"
                [chevronIconExpanded]="currentChevronIconExpanded()"
                [asButton]="currentAsButton()"
                [expandOnClick]="currentExpandOnClick()"
                [selectOnClick]="currentSelectOnClick()"
                [draggable]="currentDraggable()"
                [dropZone]="currentDropZone()"
                (nodeClick)="onInteractiveNodeClick($event)"
                (nodeToggle)="onInteractiveNodeToggle($event)"
                (nodeSelect)="onInteractiveNodeSelect($event)"
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
                <ui-tree-node [node]="createNode(a, a + ' appearance')" [appearance]="a" />
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
                <ui-tree-node
                  [node]="createNode(s, s + ' shape', true)"
                  appearance="outline"
                  [shape]="s"
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
                <ui-tree-node [node]="createExpandedNode(sz)" appearance="subtle" [size]="sz" />
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
              <ui-tree-node
                [node]="createNode('h-sel', 'Horizontal', true)"
                appearance="subtle"
                [showSelectionIndicator]="true"
                indicatorPosition="horizontal"
              />
            </div>
            <div class="showcase__item">
              <h3>Vertical (Selected)</h3>
              <ui-tree-node
                [node]="createNode('v-sel', 'Vertical', true)"
                appearance="subtle"
                [showSelectionIndicator]="true"
                indicatorPosition="vertical"
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
              <ui-tree-node
                [node]="createExpandedNode('chev-before')"
                appearance="subtle"
                chevronPosition="before"
              />
            </div>
            <div class="showcase__item">
              <h3>After</h3>
              <ui-tree-node
                [node]="createExpandedNode('chev-after')"
                appearance="subtle"
                chevronPosition="after"
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
              <ui-tree-node [node]="createNode('normal', 'Normal')" appearance="subtle" />
            </div>
            <div class="showcase__item">
              <h3>Selected</h3>
              <ui-tree-node [node]="createNode('selected', 'Selected', true)" appearance="subtle" />
            </div>
            <div class="showcase__item">
              <h3>Disabled</h3>
              <ui-tree-node
                [node]="{ id: 'disabled', label: 'Disabled', icon: 'folder', disabled: true }"
                appearance="subtle"
              />
            </div>
          </div>
        </div>

        <!-- Nested Structure -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Nested Structure</h2>
          <div class="showcase__grid">
            <div class="showcase__item" style="width: 100%;">
              <ui-tree-node
                [node]="nestedTree()"
                appearance="subtle"
                [showSelectionIndicator]="true"
                indicatorPosition="vertical"
                (nodeClick)="onNodeClick($event)"
                (nodeToggle)="onNodeToggle($event)"
              />
            </div>
          </div>
        </div>

        <!-- Custom Type with Template -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Custom Type with Template</h2>
          <p class="showcase__description">
            Example of using a custom TreeNode type with type-safe data and custom template.
          </p>
          <div class="showcase__grid">
            <div class="showcase__item" style="width: 100%;">
              <ui-tree-node
                [node]="customTypeTree()"
                appearance="subtle"
                [showSelectionIndicator]="true"
                [expandOnClick]="true"
                indicatorPosition="vertical"
                [showQuickActions]="true"
                [quickActionsTemplate]="customQuickActionsTemplate() ?? null"
                [contentTemplate]="customContentTemplate() ?? null"
              >
                <ng-template #customContent let-node>
                  <div class="tree-node-custom-content">
                    @if (node.icon) {
                      <ui-icon [icon]="node.icon" [size]="'medium'" />
                    }
                    <div class="tree-node-custom-content__main">
                      <div class="tree-node-custom-content__label">{{ node.label }}</div>
                      @if (node.data) {
                        <div class="tree-node-custom-content__meta">
                          @if (node.data.type === 'file') {
                            <span>{{ node.data.size }} KB</span>
                          } @else {
                            <span>{{ node.data.itemCount }} items</span>
                          }
                        </div>
                      }
                    </div>
                    @if (node.data?.status) {
                      <ui-badge
                        [text]="node.data.status"
                        [size]="'large'"
                        [appearance]="'subtle'"
                        [variant]="'secondary'"
                        [shape]="'rounded'"
                      />
                    }
                  </div>
                </ng-template>
                <ng-template #customQuickActions let-node>
                  <ui-menu
                    triggerVariant="dropdown"
                    [menuItems]="getCustomNodeMenuItems(node)"
                    icon="more_horizontal"
                    size="small"
                    [ariaLabel]="'Menu'"
                    (menuItemClick)="onCustomMenuAction($event, node)"
                  />
                </ng-template>
              </ui-tree-node>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      // @use '../../../scss/utils/variables' as *;

      // .tree-node-custom-content {
      //   display: flex;
      //   align-items: center;
      //   gap: $spacing-2;
      //   width: 100%;

      //   &__main {
      //     flex: 1;
      //     min-width: 0;
      //   }

      //   &__label {
      //     font-weight: 500;
      //     color: var(--color-text-primary);
      //   }

      //   &__meta {
      //     font-size: 0.875rem;
      //     color: var(--color-text-secondary);
      //     margin-top: $spacing-1;
      //   }
      // }
    `,
  ],
})
export class TreeNodeShowcaseComponent {
  appearances: Appearance[] = ['transparent', 'subtle', 'tint', 'outline', 'filled'];
  shapes: Shape[] = ['rounded', 'circular', 'square'];
  sizes: Size[] = ['small', 'medium', 'large'];
  variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

  eventLog = signal<Array<{ time: string; message: string }>>([]);

  nestedTree = signal<TreeNode>(this.createNestedTree());
  interactiveNode = signal<TreeNode>(this.createInteractiveNode());
  customTypeTree = signal<CustomTreeNode>(this.createCustomTypeTree());

  customContentTemplate = viewChild<TemplateRef<any>>('customContent');
  customQuickActionsTemplate = viewChild<TemplateRef<any>>('customQuickActions');

  // Reference to showcase for event logging
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-tree-node',
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
          { value: 'star', label: 'star' },
        ],
        defaultValue: 'folder',
        group: 'content',
      },
      {
        key: 'hasChildren',
        label: 'Has Children',
        type: 'switch',
        description: 'Node has children',
        defaultValue: true,
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
        key: 'chevronIconCollapsed',
        label: 'Chevron Icon (Collapsed)',
        type: 'dropdown',
        description: 'Icon when collapsed',
        options: [
          { value: 'chevron_right', label: 'chevron_right' },
          { value: 'chevron_down', label: 'chevron_down' },
          { value: 'arrow_right', label: 'arrow_right' },
        ],
        defaultValue: 'chevron_right',
        group: 'layout',
      },
      {
        key: 'chevronIconExpanded',
        label: 'Chevron Icon (Expanded)',
        type: 'dropdown',
        description: 'Icon when expanded',
        options: [
          { value: 'chevron_down', label: 'chevron_down' },
          { value: 'chevron_right', label: 'chevron_right' },
          { value: 'arrow_down', label: 'arrow_down' },
        ],
        defaultValue: 'chevron_down',
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
        defaultValue: true,
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
    hasChildren: true,
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    chevronPosition: 'before',
    chevronIconCollapsed: 'chevron_right',
    chevronIconExpanded: 'chevron_down',
    asButton: false,
    expandOnClick: false,
    selectOnClick: true,
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    draggable: false,
    dropZone: false,
  });

  // Computed values for the tree node
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentChevronPosition = computed(() => this.values()['chevronPosition'] as ChevronPosition);
  currentChevronIconCollapsed = computed(() => this.values()['chevronIconCollapsed'] as IconName);
  currentChevronIconExpanded = computed(() => this.values()['chevronIconExpanded'] as IconName);
  currentAsButton = computed(() => this.values()['asButton'] as boolean);
  currentExpandOnClick = computed(() => this.values()['expandOnClick'] as boolean);
  currentSelectOnClick = computed(() => this.values()['selectOnClick'] as boolean);
  currentShowSelectionIndicator = computed(
    () => this.values()['showSelectionIndicator'] as boolean,
  );
  currentIndicatorPosition = computed(() => this.values()['indicatorPosition'] as Orientation);
  currentDraggable = computed(() => this.values()['draggable'] as boolean);
  currentDropZone = computed(() => this.values()['dropZone'] as boolean);

  createNode(id: string, label: string, selected = false): TreeNode {
    return { id, label, icon: 'folder', selected, hasChildren: false };
  }

  createExpandedNode(id: string): TreeNode {
    return {
      id,
      label: 'Parent',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      children: [
        { id: `${id}-1`, label: 'Child 1', icon: 'document', hasChildren: false },
        { id: `${id}-2`, label: 'Child 2', icon: 'document', hasChildren: false },
      ],
    };
  }

  createNestedTree(): TreeNode {
    return {
      id: 'root',
      label: 'Documents',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      children: [
        {
          id: 'projects',
          label: 'Projects',
          icon: 'folder',
          hasChildren: true,
          expanded: true,
          children: [
            { id: 'proj-1', label: 'Project Alpha', icon: 'document', hasChildren: false },
            { id: 'proj-2', label: 'Project Beta', icon: 'document', hasChildren: false },
          ],
        },
        {
          id: 'reports',
          label: 'Reports',
          icon: 'folder',
          hasChildren: true,
          expanded: false,
          children: [
            { id: 'rep-1', label: 'Q1 Report', icon: 'document', hasChildren: false },
            { id: 'rep-2', label: 'Q2 Report', icon: 'document', hasChildren: false },
          ],
        },
        { id: 'readme', label: 'README.md', icon: 'document', hasChildren: false },
      ],
    };
  }

  onNodeClick(node: TreeNode): void {
    this.log(`Clicked: ${node.label}`);
  }

  onNodeToggle(node: TreeNode): void {
    this.log(`Toggled: ${node.label} (${node.expanded ? 'expanded' : 'collapsed'})`);
  }

  createInteractiveNode(): TreeNode {
    return {
      id: 'interactive',
      label: 'Documents',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      children: [
        { id: 'int-1', label: 'File 1.pdf', icon: 'document', hasChildren: false },
        { id: 'int-2', label: 'File 2.docx', icon: 'document', hasChildren: false },
        {
          id: 'int-3',
          label: 'Subfolder',
          icon: 'folder',
          hasChildren: true,
          expanded: false,
          children: [
            { id: 'int-3-1', label: 'Nested File.txt', icon: 'document', hasChildren: false },
          ],
        },
      ],
    };
  }

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);

    // Update interactive node based on values
    this.interactiveNode.update(node => {
      const updatedNode = { ...node };
      updatedNode.label = newValues['label'] as string;
      updatedNode.icon = newValues['icon'] as IconName;
      updatedNode.hasChildren = newValues['hasChildren'] as boolean;

      // If hasChildren is false, remove children
      if (!updatedNode.hasChildren) {
        updatedNode.children = undefined;
        updatedNode.expanded = false;
      } else if (!updatedNode.children) {
        // If hasChildren is true but no children exist, create default children
        updatedNode.children = [
          { id: 'int-1', label: 'File 1.pdf', icon: 'document', hasChildren: false },
          { id: 'int-2', label: 'File 2.docx', icon: 'document', hasChildren: false },
        ];
        updatedNode.expanded = true;
      }

      return updatedNode;
    });
  }

  onReset(): void {
    this.interactiveNode.set(this.createInteractiveNode());
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

  getCustomNodeMenuItems(node: CustomTreeNode): MenuItem[] {
    return [
      {
        id: 'open',
        label: 'Open',
        icon: 'open',
        action: () => this.log(`Opened: ${node.label}`),
      },
      {
        id: 'rename',
        label: 'Rename',
        icon: 'edit',
        action: () => this.log(`Rename: ${node.label}`),
      },
      {
        id: 'delete',
        label: node.data?.type === 'file' ? 'Delete File' : 'Delete Folder',
        icon: 'delete',
        action: () => this.log(`Deleted: ${node.label}`),
      },
      {
        id: 'properties',
        label: 'Properties',
        icon: 'info',
        action: () => {
          const info =
            node.data?.type === 'file'
              ? `Size: ${node.data.size} KB`
              : `Items: ${node.data?.itemCount}`;
          this.log(`Properties: ${node.label} (${info})`);
        },
      },
    ];
  }

  onCustomMenuAction(item: MenuItem, node: CustomTreeNode): void {
    if (item.action) {
      item.action();
    }
  }

  createCustomTypeTree(): CustomTreeNode {
    return {
      id: 'root',
      label: 'My Documents',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      data: {
        type: 'folder',
        itemCount: 3,
        status: 'Active',
      },
      children: [
        {
          id: 'projects',
          label: 'Projects',
          icon: 'folder',
          hasChildren: true,
          expanded: true,
          data: {
            type: 'folder',
            itemCount: 2,
            status: 'Synced',
          },
          children: [
            {
              id: 'project-alpha',
              label: 'Project Alpha',
              icon: 'document',
              hasChildren: false,
              data: {
                type: 'file',
                size: 1024,
                status: 'Modified',
              },
            },
            {
              id: 'project-beta',
              label: 'Project Beta',
              icon: 'document',
              hasChildren: false,
              data: {
                type: 'file',
                size: 2048,
                status: 'Saved',
              },
            },
          ],
        },
        {
          id: 'reports',
          label: 'Annual Report.pdf',
          icon: 'document',
          hasChildren: false,
          data: {
            type: 'file',
            size: 5120,
            status: 'Published',
          },
        },
        {
          id: 'notes',
          label: 'Notes',
          icon: 'folder',
          hasChildren: true,
          expanded: false,
          data: {
            type: 'folder',
            itemCount: 5,
            status: 'Local',
          },
          children: [
            {
              id: 'note-1',
              label: 'Meeting Notes.txt',
              icon: 'document',
              hasChildren: false,
              data: {
                type: 'file',
                size: 256,
                status: 'Draft',
              },
            },
          ],
        },
      ],
    };
  }

  private log(message: string): void {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    this.eventLog.update(log => [{ time, message }, ...log.slice(0, 9)]);
  }
}
