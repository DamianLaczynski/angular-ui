import { Component, signal, computed, viewChild } from '@angular/core';
import { AvatarComponent } from 'angular-ui';
import { CommonModule } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { Variant, Appearance, Size, Shape } from 'angular-ui';
import { IconName } from 'angular-ui';

@Component({
  selector: 'app-avatar-showcase',
  imports: [AvatarComponent, CommonModule, TableOfContentComponent, InteractiveShowcaseComponent],
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
        <h1 class="showcase__title">Avatar Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Avatar component built with Fluent 2 Design System. Avatars
          display user profile pictures, initials, or icons with support for multiple variants,
          appearances, sizes, and shapes.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            [showEventLog]="true"
            (valuesChange)="onValuesChange($event)"
            (reset)="onReset()"
          >
            <div preview>
              <ui-avatar
                [variant]="currentVariant()"
                [appearance]="currentAppearance()"
                [size]="currentSize()"
                [shape]="currentShape()"
                [image]="currentImage()"
                [initials]="currentInitials()"
                [name]="currentName()"
                [icon]="currentIcon()"
                [disabled]="currentDisabled()"
                [loading]="currentLoading()"
                [ariaLabel]="currentAriaLabel()"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>

          <h3 class="showcase__subsection__title">With Image</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar
                image="https://i.pravatar.cc/150?img=1"
                name="John Doe"
                variant="secondary"
              />
              <ui-avatar
                image="https://i.pravatar.cc/150?img=2"
                name="Jane Smith"
                variant="secondary"
              />
              <ui-avatar
                image="https://i.pravatar.cc/150?img=3"
                name="Bob Johnson"
                variant="secondary"
              />
            </div>
          </div>

          <h3 class="showcase__subsection__title">With Initials</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar initials="JD" name="John Doe" variant="primary" />
              <ui-avatar initials="JS" name="Jane Smith" variant="success" />
              <ui-avatar initials="BJ" name="Bob Johnson" variant="info" />
            </div>
          </div>

          <h3 class="showcase__subsection__title">With Name (Auto Initials)</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar name="John Doe" variant="primary" />
              <ui-avatar name="Jane Smith" variant="success" />
              <ui-avatar name="Bob Johnson" variant="info" />
              <ui-avatar name="Alice" variant="warning" />
            </div>
          </div>

          <h3 class="showcase__subsection__title">With Icon</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar icon="person" variant="secondary" />
              <ui-avatar icon="person_account" variant="primary" />
              <ui-avatar icon="settings" variant="info" />
              <ui-avatar icon="home" variant="success" />
            </div>
          </div>

          <h3 class="showcase__subsection__title">Default (No Content)</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar variant="secondary" />
              <ui-avatar variant="primary" />
              <ui-avatar variant="info" />
            </div>
          </div>
        </div>

        <!-- Sizes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Sizes</h2>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <div class="showcase__item">
                <h3>Small</h3>
                <ui-avatar
                  image="https://i.pravatar.cc/150?img=1"
                  name="John Doe"
                  size="small"
                  variant="secondary"
                />
              </div>
              <div class="showcase__item">
                <h3>Medium</h3>
                <ui-avatar
                  image="https://i.pravatar.cc/150?img=1"
                  name="John Doe"
                  size="medium"
                  variant="secondary"
                />
              </div>
              <div class="showcase__item">
                <h3>Large</h3>
                <ui-avatar
                  image="https://i.pravatar.cc/150?img=1"
                  name="John Doe"
                  size="large"
                  variant="secondary"
                />
              </div>
            </div>
          </div>

          <h3 class="showcase__subsection__title">Sizes with Initials</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar initials="JD" name="John Doe" size="small" variant="primary" />
              <ui-avatar initials="JD" name="John Doe" size="medium" variant="primary" />
              <ui-avatar initials="JD" name="John Doe" size="large" variant="primary" />
            </div>
          </div>

          <h3 class="showcase__subsection__title">Sizes with Icons</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar icon="person" size="small" variant="secondary" />
              <ui-avatar icon="person" size="medium" variant="secondary" />
              <ui-avatar icon="person" size="large" variant="secondary" />
            </div>
          </div>
        </div>

        <!-- Shapes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Shapes</h2>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <div class="showcase__item">
                <h3>Rounded</h3>
                <ui-avatar
                  image="https://i.pravatar.cc/150?img=1"
                  name="John Doe"
                  shape="rounded"
                  variant="secondary"
                />
              </div>
              <div class="showcase__item">
                <h3>Circular</h3>
                <ui-avatar
                  image="https://i.pravatar.cc/150?img=1"
                  name="John Doe"
                  shape="circular"
                  variant="secondary"
                />
              </div>
            </div>
          </div>

          <h3 class="showcase__subsection__title">Shapes with Initials</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar initials="JD" name="John Doe" shape="rounded" variant="primary" />
              <ui-avatar initials="JD" name="John Doe" shape="circular" variant="primary" />
            </div>
          </div>
        </div>

        <!-- Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variants (Semantic Colors)</h2>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar initials="JD" name="John Doe" variant="primary" />
              <ui-avatar initials="JS" name="Jane Smith" variant="secondary" />
              <ui-avatar initials="BJ" name="Bob Johnson" variant="success" />
              <ui-avatar initials="AW" name="Alice Wilson" variant="warning" />
              <ui-avatar initials="CD" name="Chris Davis" variant="danger" />
              <ui-avatar initials="EM" name="Emma Miller" variant="info" />
            </div>
          </div>
        </div>

        <!-- Appearances -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Appearances</h2>

          <h3 class="showcase__subsection__title">Filled</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar initials="JD" name="John Doe" appearance="filled" variant="primary" />
              <ui-avatar initials="JS" name="Jane Smith" appearance="filled" variant="secondary" />
              <ui-avatar initials="BJ" name="Bob Johnson" appearance="filled" variant="success" />
            </div>
          </div>

          <h3 class="showcase__subsection__title">Tint</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar initials="JD" name="John Doe" appearance="tint" variant="primary" />
              <ui-avatar initials="JS" name="Jane Smith" appearance="tint" variant="secondary" />
              <ui-avatar initials="BJ" name="Bob Johnson" appearance="tint" variant="success" />
            </div>
          </div>

          <h3 class="showcase__subsection__title">Outline</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar initials="JD" name="John Doe" appearance="outline" variant="primary" />
              <ui-avatar
                initials="JS"
                name="Jane Smith"
                appearance="outline"
                variant="secondary"
              />
              <ui-avatar initials="BJ" name="Bob Johnson" appearance="outline" variant="success" />
            </div>
          </div>

          <h3 class="showcase__subsection__title">Subtle</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar initials="JD" name="John Doe" appearance="subtle" variant="primary" />
              <ui-avatar initials="JS" name="Jane Smith" appearance="subtle" variant="secondary" />
              <ui-avatar initials="BJ" name="Bob Johnson" appearance="subtle" variant="success" />
            </div>
          </div>

          <h3 class="showcase__subsection__title">Transparent</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar
                initials="JD"
                name="John Doe"
                appearance="transparent"
                variant="primary"
              />
              <ui-avatar
                initials="JS"
                name="Jane Smith"
                appearance="transparent"
                variant="secondary"
              />
              <ui-avatar
                initials="BJ"
                name="Bob Johnson"
                appearance="transparent"
                variant="success"
              />
            </div>
          </div>
        </div>

        <!-- States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">States</h2>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <div class="showcase__item">
                <h3>Normal</h3>
                <ui-avatar
                  image="https://i.pravatar.cc/150?img=1"
                  name="John Doe"
                  variant="secondary"
                />
              </div>
              <div class="showcase__item">
                <h3>Disabled</h3>
                <ui-avatar
                  image="https://i.pravatar.cc/150?img=1"
                  name="John Doe"
                  [disabled]="true"
                  variant="secondary"
                />
              </div>
              <div class="showcase__item">
                <h3>Loading</h3>
                <ui-avatar
                  image="https://i.pravatar.cc/150?img=1"
                  name="John Doe"
                  [loading]="true"
                  variant="secondary"
                />
              </div>
            </div>
          </div>

          <h3 class="showcase__subsection__title">States with Initials</h3>
          <div class="showcase__preview">
            <div class="showcase__grid">
              <ui-avatar initials="JD" name="John Doe" variant="primary" />
              <ui-avatar initials="JD" name="John Doe" [disabled]="true" variant="primary" />
              <ui-avatar initials="JD" name="John Doe" [loading]="true" variant="primary" />
            </div>
          </div>
        </div>

        <!-- Appearance + Variant Combinations -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Appearance + Variant Combinations</h2>

          @for (variant of variants; track variant) {
            <h3 class="showcase__subsection__title">{{ variant | titlecase }}</h3>
            <div class="showcase__preview">
              <div class="showcase__grid">
                <ui-avatar
                  [initials]="getInitials(variant)"
                  [name]="getVariantName(variant)"
                  [variant]="variant"
                  appearance="filled"
                />
                <ui-avatar
                  [initials]="getInitials(variant)"
                  [name]="getVariantName(variant)"
                  [variant]="variant"
                  appearance="tint"
                />
                <ui-avatar
                  [initials]="getInitials(variant)"
                  [name]="getVariantName(variant)"
                  [variant]="variant"
                  appearance="outline"
                />
                <ui-avatar
                  [initials]="getInitials(variant)"
                  [name]="getVariantName(variant)"
                  [variant]="variant"
                  appearance="subtle"
                />
                <ui-avatar
                  [initials]="getInitials(variant)"
                  [name]="getVariantName(variant)"
                  [variant]="variant"
                  appearance="transparent"
                />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class AvatarShowcaseComponent {
  variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
  appearances: Appearance[] = ['filled', 'tint', 'outline', 'subtle', 'transparent'];
  sizes: Size[] = ['small', 'medium', 'large'];
  shapes: Shape[] = ['rounded', 'circular', 'square'];

  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-avatar',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'layout', label: 'Layout', icon: 'resize' as any },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      {
        key: 'contentType',
        label: 'Content Type',
        type: 'dropdown',
        description: 'Type of content to display',
        options: [
          { value: 'image', label: 'Image' },
          { value: 'initials', label: 'Initials' },
          { value: 'name', label: 'Name (Auto Initials)' },
          { value: 'icon', label: 'Icon' },
          { value: 'none', label: 'None (Default)' },
        ],
        defaultValue: 'initials',
        group: 'content',
      },
      {
        key: 'image',
        label: 'Image URL',
        type: 'text',
        description: 'Image URL for avatar',
        defaultValue: 'https://i.pravatar.cc/150?img=1',
        placeholder: 'Enter image URL',
        group: 'content',
      },
      {
        key: 'initials',
        label: 'Initials',
        type: 'text',
        description: 'Initials to display',
        defaultValue: 'JD',
        placeholder: 'Enter initials',
        group: 'content',
      },
      {
        key: 'name',
        label: 'Name',
        type: 'text',
        description: 'Full name (will generate initials)',
        defaultValue: 'John Doe',
        placeholder: 'Enter name',
        group: 'content',
      },
      {
        key: 'icon',
        label: 'Icon',
        type: 'dropdown',
        description: 'Icon name',
        options: [
          { value: '', label: 'None' },
          { value: 'person', label: 'person' },
          { value: 'person_account', label: 'person_account' },
          { value: 'settings', label: 'settings' },
          { value: 'home', label: 'home' },
          { value: 'info', label: 'info' },
        ],
        defaultValue: '',
        group: 'content',
      },
      {
        key: 'variant',
        label: 'Variant',
        type: 'dropdown',
        description: 'Color variant',
        options: this.variants.map(v => ({ value: v, label: v })),
        defaultValue: 'secondary',
        group: 'appearance',
      },
      {
        key: 'appearance',
        label: 'Appearance',
        type: 'dropdown',
        description: 'Visual style',
        options: this.appearances.map(a => ({ value: a, label: a })),
        defaultValue: 'filled',
        group: 'appearance',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'layout',
      },
      {
        key: 'shape',
        label: 'Shape',
        type: 'dropdown',
        options: this.shapes.map(s => ({ value: s, label: s })),
        defaultValue: 'rounded',
        group: 'layout',
      },
      {
        key: 'disabled',
        label: 'Disabled',
        type: 'switch',
        description: 'Disable avatar',
        defaultValue: false,
        group: 'state',
      },
      {
        key: 'loading',
        label: 'Loading',
        type: 'switch',
        description: 'Loading state with spinner',
        defaultValue: false,
        group: 'state',
      },
    ],
  };

  private values = signal<Record<string, any>>({
    contentType: 'initials',
    image: 'https://i.pravatar.cc/150?img=1',
    initials: 'JD',
    name: 'John Doe',
    icon: '',
    variant: 'secondary',
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded',
    disabled: false,
    loading: false,
  });

  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentImage = computed(() => {
    const contentType = this.values()['contentType'];
    return contentType === 'image' ? (this.values()['image'] as string) : undefined;
  });
  currentInitials = computed(() => {
    const contentType = this.values()['contentType'];
    return contentType === 'initials' ? (this.values()['initials'] as string) : undefined;
  });
  currentName = computed(() => {
    const contentType = this.values()['contentType'];
    return contentType === 'name' ? (this.values()['name'] as string) : undefined;
  });
  currentIcon = computed(() => {
    const contentType = this.values()['contentType'];
    const icon = this.values()['icon'];
    return contentType === 'icon' && icon ? (icon as IconName) : undefined;
  });
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentLoading = computed(() => this.values()['loading'] as boolean);
  currentAriaLabel = computed(() => {
    const name = this.currentName();
    const initials = this.currentInitials();
    return name || initials || 'Avatar';
  });

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  getInitials(variant: Variant): string {
    const map: Record<Variant, string> = {
      primary: 'JD',
      secondary: 'JS',
      success: 'BJ',
      warning: 'AW',
      danger: 'CD',
      info: 'EM',
    };
    return map[variant] || 'JD';
  }

  getVariantName(variant: Variant): string {
    const map: Record<Variant, string> = {
      primary: 'John Doe',
      secondary: 'Jane Smith',
      success: 'Bob Johnson',
      warning: 'Alice Wilson',
      danger: 'Chris Davis',
      info: 'Emma Miller',
    };
    return map[variant] || 'John Doe';
  }
}

