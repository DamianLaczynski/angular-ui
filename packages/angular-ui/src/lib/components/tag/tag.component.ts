import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';

import { Variant, Appearance, Shape, Size, ExtendedSize } from '../utils';
import { IconComponent } from '../icon/icon.component';
import { IconName } from '../icon';

@Component({
  selector: 'ui-tag',
  templateUrl: './tag.component.html',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  // Component inputs - Unified Design System
  variant = input<Variant>('secondary');
  appearance = input<Appearance>('filled');
  size = input<ExtendedSize>('medium');
  shape = input<Shape>('rounded');
  text = input.required<string>();
  secondaryText = input<string | undefined>(undefined);
  icon = input<IconName | undefined>(undefined);
  selected = input<boolean>(false);
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  dismissible = input<boolean>(false);
  ariaLabel = input<string>('');
  tabIndex = input<number | null>(null);

  // Component outputs
  dismiss = output<void>();
  tagClick = output<MouseEvent>();
  selectedChange = output<boolean>();

  // Computed properties
  tagClasses = computed(() => {
    const classes = ['tag'];

    classes.push(`tag--${this.variant()}`);
    classes.push(`tag--${this.appearance()}`);
    classes.push(`tag--${this.size()}`);
    classes.push(`tag--${this.shape()}`);

    if (this.selected()) {
      classes.push('tag--selected');
    }

    if (this.disabled()) {
      classes.push('tag--disabled');
    }

    if (this.readonly()) {
      classes.push('tag--readonly');
    }

    return classes.join(' ');
  });

  iconSize = computed<Size>(() => {
    switch (this.size()) {
      case 'extra-small':
      case 'small':
        return 'small';
      case 'medium':
        return 'medium';
      case 'large':
      case 'extra-large':
        return 'large';
      default:
        return 'medium';
    }
  });

  isClickable = computed(() => {
    return !this.disabled() && !this.readonly();
  });

  effectiveAriaLabel = computed(() => {
    return this.ariaLabel() || this.text();
  });

  effectiveTabIndex = computed(() => {
    const externalTabIndex = this.tabIndex();
    if (externalTabIndex !== null) {
      return externalTabIndex;
    }
    return this.disabled() || this.readonly() ? -1 : this.isClickable() ? 0 : -1;
  });

  onTagClick(event: MouseEvent): void {
    if (this.disabled() || this.readonly()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.tagClick.emit(event);
  }

  onTagKeyDown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      this.tagClick.emit(event as any);
    }
  }

  onDismissClick(event: MouseEvent): void {
    if (this.disabled() || this.readonly()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.stopPropagation();
    this.dismiss.emit();
  }

  onDismissKeyDown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      this.dismiss.emit();
    }
  }
}
