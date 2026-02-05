import { Component, input, model, output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode, TreeNodeComponent } from '../tree-node/tree-node.component';
import { NavSectionHeaderComponent } from './nav-section-header.component';
import { DividerComponent } from '../divider';
import { Size, Shape, ChevronPosition, Appearance, Orientation, Variant } from '../utils';
import { IconName } from '../icon';

export interface NavNode<T extends NavNode<T> = NavNode<any>> extends TreeNode<T> {
  isDivider?: boolean;
  isSectionHeader?: boolean;
  size?: Size;
}

@Component({
  selector: 'ui-nav',
  templateUrl: './nav.component.html',
  styles: `
    :host {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
    }
  `,
  imports: [CommonModule, TreeNodeComponent, NavSectionHeaderComponent, DividerComponent],
})
export class NavComponent {
  // Configuration inputs
  collapsedWidth = input<number>(56);

  items = input<NavNode[]>([]);

  // Tree Node Configuration Inputs
  size = input<Size>('medium');
  variant = input<Variant>('primary');
  showSelectionIndicator = input<boolean>(true);
  indicatorPosition = input<Orientation>('vertical');
  appearance = input<Appearance>('subtle');
  shape = input<Shape>('rounded');
  chevronPosition = input<ChevronPosition>('after');
  chevronIconCollapsed = input<IconName>('chevron_down');
  chevronIconExpanded = input<IconName>('chevron_up');
  asButton = input<boolean>(true);
  expandOnClick = input<boolean | undefined>(undefined);
  selectOnClick = input<boolean | undefined>(undefined);
  showQuickActions = input<boolean>(false);
  quickActionsTemplate = input<TemplateRef<any> | null>(null);
  contentTemplate = input<TemplateRef<any> | null>(null);

  nodeClick = output<NavNode>();

  // Handle item click
  onItemClick(item: NavNode): void {
    if (item.onClick) {
      item.onClick();
    }
    this.nodeClick.emit(item);
  }

  // Helper methods to determine behavior
  shouldExpandOnClick(item: NavNode): boolean {
    const expandOnClick = this.expandOnClick();
    if (expandOnClick !== undefined) {
      return expandOnClick;
    }
    // Auto-detect: expand if has children
    return !!(item.children && item.children.length > 0);
  }

  shouldSelectOnClick(item: NavNode): boolean {
    const selectOnClick = this.selectOnClick();
    if (selectOnClick !== undefined) {
      return selectOnClick;
    }
    // Auto-detect: select if no children
    return !(item.children && item.children.length > 0);
  }

  getItemSize(item: NavNode): Size {
    return item.size || this.size();
  }
}
