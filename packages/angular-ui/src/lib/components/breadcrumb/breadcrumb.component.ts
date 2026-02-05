import { Component, input, output, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { Size, Shape, Appearance, Orientation, Variant } from '../utils';
import { NodeComponent } from '../node';
import { IconComponent, IconName } from '../icon';

export interface Breadcrumb<T = any> {
  id: string | number;
  label: string;
  variant?: Variant;
  appearance?: Appearance;
  size?: Size;
  shape?: Shape;
  icon?: IconName;
  disabled?: boolean;
  selected?: boolean;
  data?: T;
}

@Component({
  selector: 'ui-breadcrumb',
  imports: [NodeComponent, IconComponent],
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent<T extends Breadcrumb> {
  items = input.required<T[]>();

  showIcons = input<boolean>(true);
  ariaLabel = input<string>('Breadcrumb');

  // Unified Design System
  size = input<Size>('medium');
  variant = input<Variant>('primary');
  appearance = input<Appearance>('transparent');
  shape = input<Shape>('rounded');

  // Visual Configuration
  showSelectionIndicator = input<boolean>(false);
  indicatorPosition = input<Orientation>('horizontal');

  // Behavior Configuration
  asButton = input<boolean>(true);
  selectOnClick = input<boolean>(false);

  // Quick Actions
  showQuickActions = input<boolean>(false);
  quickActionsTemplate = input<TemplateRef<any> | null>(null);

  itemClick = output<T>();

  breadcrumbClasses(): string {
    const classes = ['breadcrumb'];
    classes.push(`breadcrumb--${this.size()}`);
    return classes.join(' ');
  }

  onItemClick(item: T): void {
    if (item.disabled || item.selected) {
      return;
    }

    this.itemClick.emit(item);
  }

  onNodeClick(item: T): void {
    this.onItemClick(item);
  }
}
