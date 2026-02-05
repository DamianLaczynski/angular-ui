import {
  Component,
  input,
  output,
  model,
  contentChild,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button';
import { Appearance, Size, Orientation, QuickAction, Variant } from '../utils';
import { IconComponent, IconName } from '../icon';

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  imports: [CommonModule, ButtonComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  // Unified Design System
  variant = input<Variant>('secondary');
  appearance = input<Appearance>('filled');
  size = input<Size>('medium');

  // Inputs
  title = input<string>('');
  subtitle = input<string>('');
  bodyText = input<string>('');
  disabled = model<boolean>(false);
  clickable = input<boolean>(false);
  orientation = input<Orientation>('vertical');

  // Header
  showHeader = input<boolean>(true);
  headerIcon = input<IconName | undefined>(undefined);
  showQuickAction = input<boolean>(false);

  // Footer
  showFooter = input<boolean>(true);
  primaryAction = input<QuickAction | null>(null);
  secondaryAction = input<QuickAction | null>(null);

  // Content projection
  customHeader = contentChild<TemplateRef<any>>('customHeader');
  customBody = contentChild<TemplateRef<any>>('customBody');
  customFooter = contentChild<TemplateRef<any>>('customFooter');
  quickActions = contentChild<TemplateRef<any>>('quickActions');

  // Outputs
  cardClick = output<MouseEvent>();
  quickActionClick = output<MouseEvent>();

  // Methods
  cardClasses(): string {
    const classes = ['card'];

    classes.push(`card--${this.variant()}`);
    classes.push(`card--${this.appearance()}`);
    classes.push(`card--${this.size()}`);
    classes.push(`card--${this.orientation()}`);

    if (this.disabled()) {
      classes.push('card--disabled');
    }

    if (this.clickable()) {
      classes.push('card--clickable');
    }

    return classes.join(' ');
  }

  onCardClick(event: MouseEvent): void {
    if (this.disabled() || !this.clickable()) {
      return;
    }

    this.cardClick.emit(event);
  }

  onQuickActionClick(event: MouseEvent): void {
    event.stopPropagation();

    if (this.disabled()) {
      return;
    }

    this.quickActionClick.emit(event);
  }

  onPrimaryAction(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    const action = this.primaryAction();
    if (action && !action.disabled && !this.disabled()) {
      action.action();
    }
  }

  onSecondaryAction(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    const action = this.secondaryAction();
    if (action && !action.disabled && !this.disabled()) {
      action.action();
    }
  }

  hasCustomContent(): boolean {
    return !!(this.customHeader() || this.customBody() || this.customFooter());
  }
}
