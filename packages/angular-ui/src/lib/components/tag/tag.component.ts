import { Component, input, output, computed, ChangeDetectionStrategy, model } from '@angular/core';

import { Variant, Appearance, Shape, Size } from '../utils';
import { IconComponent } from '../icon/icon.component';
import { IconName } from '../icon';

@Component({
  selector: 'ui-tag',
  templateUrl: './tag.component.html',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  variant = input<Variant>('secondary');
  appearance = input<Appearance>('filled');
  size = input<Size>('medium');
  shape = input<Shape>('rounded');

  text = input.required<string>();
  secondaryText = input<string | undefined>(undefined);
  icon = input<IconName | undefined>(undefined);

  selectable = input<boolean>(false);
  dismissible = input<boolean>(false);

  selected = model<boolean>(false);
  disabled = model<boolean>(false);


  ariaLabel = input<string>('');

  dismiss = output<void>();
  tagClick = output<MouseEvent>();
  selectedChange = output<boolean>();

  private baseButtonClasses = computed(() => {
    const c = [
      'button',
      `button--${this.variant()}`,
      `button--${this.appearance()}`,
      `button--${this.size()}`,
      `button--${this.shape()}`,
    ];
    if (this.disabled()) c.push('button--disabled');
    if (this.selected()) c.push('button--selected');
    return c;
  });

  tagClasses = computed(() => {
    const c = ['tag', ...this.baseButtonClasses()];
    if (this.selectable() || this.dismissible() && !this.disabled()) c.push('tag--interactive');
    return c.join(' ');
  });

  isClickable = computed(() => {
    return !this.disabled() && this.selectable();
  });

  effectiveAriaLabel = computed(() => {
    return this.ariaLabel() || this.text();
  });

  tabIndex = computed(() => {
    if (!this.selectable() && !this.dismissible()) {
      return null;
    }
    return this.disabled() ? -1 : 0;
  });

  onTagClick(event: MouseEvent): void {
    if (!this.isClickable()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.tagClick.emit(event);
  }

  onTagKeyDown(event: KeyboardEvent): void {
    if (!this.isClickable()) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      this.tagClick.emit(event as any);
    }
  }

  onDismissClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.stopPropagation();
    this.dismiss.emit();
  }

  onDismissKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      this.dismiss.emit();
    }
  }
}
