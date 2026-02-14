import { Component, computed, signal } from '@angular/core';
import { IconComponent, IconName, Size } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { ICON_SHOWCASE_CONFIG, ICON_VARIANTS } from './icon.showcase.config';

@Component({
  selector: 'app-icon-interactive',
  imports: [IconComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      [config]="showcaseConfig"
      [showEventLog]="false"
      (valuesChange)="onValuesChange($event)"
    >
      <div preview>
        <ui-icon
          [icon]="currentIcon()"
          [size]="currentSize()"
          [variant]="currentVariant()"
          [sizePx]="currentSizePx()"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class IconInteractiveComponent {
  showcaseConfig: ShowcaseConfig = ICON_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    icon: 'home',
    size: 'medium',
    variant: 'regular',
    sizePx: 0,
  });

  currentIcon = computed(() => {
    const icon = (this.values()['icon'] as string)?.trim();
    return (icon || 'home') as IconName;
  });

  currentSize = computed(() => this.values()['size'] as Size);

  currentVariant = computed(() => {
    const value = this.values()['variant'] as string;
    return value === ICON_VARIANTS[1] ? ICON_VARIANTS[1] : ICON_VARIANTS[0];
  });

  currentSizePx = computed(() => {
    const sizePx = Number(this.values()['sizePx']);
    return Number.isFinite(sizePx) && sizePx > 0 ? sizePx : undefined;
  });

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }
}
