import { Component, computed, input, ChangeDetectionStrategy } from '@angular/core';
import { Size } from '../utils';
import { IconName } from './icon-name.type';

@Component({
  selector: 'ui-icon',
  template: `
    <svg [attr.width]="displaySize() + 'px'" [attr.height]="displaySize() + 'px'" alt="Icon">
      <use
        [attr.href]="iconSrc()"
        [attr.fill]="'currentColor'"
        [attr.viewBox]="viewBox"
        [attr.width]="displaySize() + 'px'"
        [attr.height]="displaySize() + 'px'"
      ></use>
    </svg>
  `,
  styles: [
    `
      :host {
        width: min-content;
        height: min-content;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  icon = input<IconName, IconName | undefined>('' as IconName, {
    transform: (value: IconName | undefined) => value ?? ('' as IconName),
  });
  size = input<Size, Size | undefined>('medium', {
    transform: (value: Size | undefined) => value ?? 'medium',
  });
  sizePx = input<number | undefined>(undefined);
  variant = input<'regular' | 'filled'>('regular');

  displaySize = computed(() => this.sizePx() ?? this.getNumberSize());

  iconSrc = computed(() => {
    return `assets/icons/${this.icon()}_${this.getNumberSize()}_${this.variant()}.svg`;
  });

  get viewBox(): string {
    return `0 0 ${this.getNumberSize()} ${this.getNumberSize()}`;
  }

  getNumberSize(): number {
    switch (this.size()) {
      case 'small':
        return 16;
      case 'medium':
        return 20;
      case 'large':
        return 24;
      default:
        return 20; // Default to medium size
    }
  }
}
