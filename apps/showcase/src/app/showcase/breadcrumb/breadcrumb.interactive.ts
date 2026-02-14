import { Component, signal, computed, viewChild } from '@angular/core';
import {
  Appearance,
  BreadcrumbComponent,
  Breadcrumb,
  Orientation,
  Shape,
  Size,
  Variant,
} from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { BREADCRUMB_SHOWCASE_CONFIG } from './breadcrumb.showcase.config';

const FULL_PATH: Breadcrumb[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'documents', label: 'Documents', icon: 'folder' },
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'webapp', label: 'WebApp', icon: 'folder' },
  { id: 'src', label: 'src', icon: 'folder' },
];

@Component({
  selector: 'app-breadcrumb-interactive',
  imports: [BreadcrumbComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-breadcrumb
          [items]="interactivePath()"
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [shape]="currentShape()"
          [size]="currentSize()"
          [showIcons]="currentShowIcons()"
          [showSelectionIndicator]="currentShowIndicator()"
          [indicatorPosition]="currentIndicatorPosition()"
          (itemClick)="onNavigate($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class BreadcrumbInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = BREADCRUMB_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    shape: 'rounded',
    size: 'medium',
    showIcons: true,
    showIndicator: false,
    indicatorPosition: 'horizontal',
  });

  interactivePath = signal<Breadcrumb[]>([...FULL_PATH]);

  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShowIcons = computed(() => this.values()['showIcons'] as boolean);
  currentShowIndicator = computed(() => this.values()['showIndicator'] as boolean);
  currentIndicatorPosition = computed(() => this.values()['indicatorPosition'] as Orientation);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.interactivePath.set([...FULL_PATH]);
  }

  onNavigate(item: Breadcrumb): void {
    this.showcase()?.logEvent('itemClick', { id: item.id, label: item.label });
    const currentPath = this.interactivePath();
    const index = currentPath.findIndex(p => p.id === item.id);
    if (index !== -1) {
      this.interactivePath.set(currentPath.slice(0, index + 1));
    }
  }
}
