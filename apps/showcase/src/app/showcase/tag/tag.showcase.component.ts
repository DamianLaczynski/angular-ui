import { Component, signal, computed, viewChild } from '@angular/core';
import { TagComponent } from 'angular-ui';
import { CommonModule } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { Variant, Appearance, Shape, ExtendedSize } from 'angular-ui';
import { IconName } from 'angular-ui';

@Component({
  selector: 'app-tag-showcase',
  imports: [TagComponent, CommonModule, TableOfContentComponent, InteractiveShowcaseComponent],
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
        <h1 class="showcase__title">Tag Component Showcase</h1>
        <p class="showcase__description">
          Unified Tag component with Fluent 2 Design System. Supports variant (semantic colors),
          appearance (visual style), size, shape, icons, secondary text, and dismiss button.
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
              <ui-tag
                [text]="currentText()"
                [variant]="currentVariant()"
                [appearance]="currentAppearance()"
                [size]="currentSize()"
                [shape]="currentShape()"
                [icon]="currentIcon()"
                [secondaryText]="currentSecondaryText()"
                [dismissible]="currentDismissible()"
                [selected]="currentSelected()"
                [disabled]="currentDisabled()"
                [readonly]="currentReadonly()"
                (tagClick)="onInteractiveTagClick($event)"
                (dismiss)="onInteractiveDismiss()"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Variants with Filled Appearance -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variants (Filled Appearance)</h2>
          <div class="showcase__grid">
            @for (v of variants; track v) {
              <ui-tag
                [variant]="v"
                appearance="filled"
                size="medium"
                [text]="v | titlecase"
                [dismissible]="true"
                (dismiss)="onDismiss($event)"
              />
            }
          </div>
        </div>

        <!-- Variants with Tint Appearance -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variants (Tint Appearance)</h2>
          <div class="showcase__grid">
            @for (v of variants; track v) {
              <ui-tag
                [variant]="v"
                appearance="tint"
                size="medium"
                [text]="v | titlecase"
                [dismissible]="true"
                (dismiss)="onDismiss($event)"
              />
            }
          </div>
        </div>

        <!-- Variants with Outline Appearance -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variants (Outline Appearance)</h2>
          <div class="showcase__grid">
            @for (v of variants; track v) {
              <ui-tag
                [variant]="v"
                appearance="outline"
                size="medium"
                [text]="v | titlecase"
                [dismissible]="true"
                (dismiss)="onDismiss($event)"
              />
            }
          </div>
        </div>

        <!-- Variants with Subtle Appearance -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Variants (Subtle Appearance)</h2>
          <div class="showcase__grid">
            @for (v of variants; track v) {
              <ui-tag
                [variant]="v"
                appearance="subtle"
                size="medium"
                [text]="v | titlecase"
                [dismissible]="true"
                (dismiss)="onDismiss($event)"
              />
            }
          </div>
        </div>

        <!-- Sizes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Sizes</h2>
          <div class="showcase__grid" style="align-items: center;">
            @for (s of sizes; track s) {
              <ui-tag
                variant="primary"
                appearance="tint"
                [size]="s"
                [text]="s"
                [dismissible]="true"
              />
            }
          </div>

          <h3 class="showcase__subsection__title">All Sizes with Icons</h3>
          <div class="showcase__grid" style="align-items: center;">
            @for (s of sizes; track s) {
              <ui-tag
                variant="success"
                appearance="tint"
                [size]="s"
                [text]="s"
                icon="checkmark_circle"
                [dismissible]="true"
              />
            }
          </div>
        </div>

        <!-- Shapes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Shapes</h2>
          <div class="showcase__grid">
            <ui-tag
              variant="primary"
              appearance="tint"
              size="medium"
              shape="rounded"
              text="Rounded"
              [dismissible]="true"
            />
            <ui-tag
              variant="primary"
              appearance="tint"
              size="medium"
              shape="circular"
              text="Circular"
              [dismissible]="true"
            />
          </div>
        </div>

        <!-- States -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">States</h2>

          <h3 class="showcase__subsection__title">Selected State</h3>
          <div class="showcase__grid">
            @for (a of appearances; track a) {
              <ui-tag
                variant="primary"
                [appearance]="a"
                size="medium"
                [text]="a | titlecase"
                [selected]="true"
                [dismissible]="true"
              />
            }
          </div>

          <h3 class="showcase__subsection__title">Disabled State</h3>
          <div class="showcase__grid">
            @for (a of appearances; track a) {
              <ui-tag
                variant="primary"
                [appearance]="a"
                size="medium"
                [text]="a | titlecase"
                [disabled]="true"
                [dismissible]="true"
              />
            }
          </div>

          <h3 class="showcase__subsection__title">Readonly State</h3>
          <div class="showcase__grid">
            @for (a of appearances; track a) {
              <ui-tag
                variant="primary"
                [appearance]="a"
                size="medium"
                [text]="a | titlecase"
                [readonly]="true"
                [dismissible]="true"
              />
            }
          </div>
        </div>

        <!-- Two-Line Layout -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Two-Line Layout (Medium Size Only)</h2>
          <div class="showcase__grid">
            @for (v of variants; track v) {
              <ui-tag
                [variant]="v"
                appearance="tint"
                size="medium"
                [text]="v | titlecase"
                secondaryText="Secondary text"
                [dismissible]="true"
              />
            }
          </div>
        </div>

        <!-- Icons -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">With Icons</h2>
          <div class="showcase__grid">
            <ui-tag
              variant="success"
              appearance="tint"
              size="medium"
              text="Approved"
              icon="checkmark_circle"
              [dismissible]="true"
            />
            <ui-tag
              variant="warning"
              appearance="tint"
              size="medium"
              text="Pending"
              icon="clock"
              [dismissible]="true"
            />
            <ui-tag
              variant="danger"
              appearance="tint"
              size="medium"
              text="Rejected"
              icon="dismiss_circle"
              [dismissible]="true"
            />
            <ui-tag
              variant="info"
              appearance="tint"
              size="medium"
              text="Info"
              icon="info"
              [dismissible]="true"
            />
          </div>
        </div>

        <!-- Interactive Examples -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Interactive Examples</h2>

          <h3 class="showcase__subsection__title">Toggleable Selection</h3>
          <div class="showcase__grid">
            @for (tag of interactiveTags; track tag.id) {
              <ui-tag
                [variant]="tag.variant"
                [appearance]="tag.appearance"
                size="medium"
                [text]="tag.text"
                [selected]="tag.selected"
                [dismissible]="true"
                (tagClick)="toggleTagSelection(tag.id)"
                (dismiss)="removeTag(tag.id)"
              />
            }
          </div>

          <h3 class="showcase__subsection__title">Filter Tags</h3>
          <div class="showcase__grid" style="display: flex; flex-wrap: wrap; gap: 8px;">
            <ui-tag
              variant="primary"
              appearance="tint"
              size="small"
              text="JavaScript"
              [selected]="filterTags.javascript"
              (tagClick)="toggleFilter('javascript')"
            />
            <ui-tag
              variant="primary"
              appearance="tint"
              size="small"
              text="TypeScript"
              [selected]="filterTags.typescript"
              (tagClick)="toggleFilter('typescript')"
            />
            <ui-tag
              variant="primary"
              appearance="tint"
              size="small"
              text="Angular"
              [selected]="filterTags.angular"
              (tagClick)="toggleFilter('angular')"
            />
            <ui-tag
              variant="secondary"
              appearance="outline"
              size="small"
              text="CSS"
              [dismissible]="false"
            />
            <ui-tag
              variant="secondary"
              appearance="outline"
              size="small"
              text="HTML"
              [dismissible]="false"
            />
          </div>
        </div>

        <!-- Action Log -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Action Log</h2>
          <div class="showcase__log">
            @if (actionLog.length === 0) {
              <p class="showcase__log__empty">
                No actions yet. Interact with tags above to see logs.
              </p>
            }
            @for (action of actionLog; track action.id) {
              <div class="showcase__log__item">
                <span class="showcase__log__time">{{ action.time }}</span>
                <span class="showcase__log__message">{{ action.message }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TagShowcaseComponent {
  variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
  appearances: Appearance[] = ['filled', 'tint', 'outline', 'subtle', 'transparent'];
  sizes: ExtendedSize[] = ['extra-small', 'small', 'medium', 'large', 'extra-large'];
  shapes: Shape[] = ['rounded', 'circular', 'square'];

  // Reference to showcase for event logging
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  // Showcase configuration
  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-tag',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'text_font' as any },
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'layout', label: 'Layout', icon: 'resize' as any },
      { id: 'state', label: 'State', icon: 'toggle_left' as any },
    ],
    controls: [
      {
        key: 'text',
        label: 'Text',
        type: 'text',
        description: 'Tag text',
        defaultValue: 'Tag',
        placeholder: 'Enter tag text',
        group: 'content',
      },
      {
        key: 'secondaryText',
        label: 'Secondary Text',
        type: 'text',
        description: 'Secondary text (medium size only)',
        defaultValue: '',
        placeholder: 'Enter secondary text',
        group: 'content',
      },
      {
        key: 'icon',
        label: 'Icon',
        type: 'dropdown',
        description: 'Tag icon',
        options: [
          { value: '', label: 'None' },
          { value: 'checkmark_circle', label: 'checkmark_circle' },
          { value: 'clock', label: 'clock' },
          { value: 'dismiss_circle', label: 'dismiss_circle' },
          { value: 'info', label: 'info' },
          { value: 'star', label: 'star' },
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
        defaultValue: 'primary',
        group: 'appearance',
      },
      {
        key: 'appearance',
        label: 'Appearance',
        type: 'dropdown',
        description: 'Visual style',
        options: this.appearances.map(a => ({ value: a, label: a })),
        defaultValue: 'tint',
        group: 'appearance',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        description: 'Tag size',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'layout',
      },
      {
        key: 'shape',
        label: 'Shape',
        type: 'dropdown',
        description: 'Tag shape',
        options: this.shapes.map(s => ({ value: s, label: s })),
        defaultValue: 'rounded',
        group: 'layout',
      },
      {
        key: 'dismissible',
        label: 'Dismissible',
        type: 'switch',
        description: 'Show dismiss button',
        defaultValue: true,
        group: 'state',
      },
      {
        key: 'selected',
        label: 'Selected',
        type: 'switch',
        description: 'Selected state',
        defaultValue: false,
        group: 'state',
      },
      {
        key: 'disabled',
        label: 'Disabled',
        type: 'switch',
        description: 'Disabled state',
        defaultValue: false,
        group: 'state',
      },
      {
        key: 'readonly',
        label: 'Readonly',
        type: 'switch',
        description: 'Readonly state',
        defaultValue: false,
        group: 'state',
      },
    ],
  };

  // Current values from showcase
  private values = signal<Record<string, any>>({
    text: 'Tag',
    secondaryText: '',
    icon: '',
    variant: 'primary',
    appearance: 'tint',
    size: 'medium',
    shape: 'rounded',
    dismissible: true,
    selected: false,
    disabled: false,
    readonly: false,
  });

  // Computed values for the tag
  currentText = computed(() => this.values()['text'] as string);
  currentSecondaryText = computed(() => {
    const text = this.values()['secondaryText'] as string;
    return text || undefined;
  });
  currentIcon = computed(() => {
    const icon = this.values()['icon'] as string;
    return icon ? (icon as IconName) : undefined;
  });
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as ExtendedSize);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentDismissible = computed(() => this.values()['dismissible'] as boolean);
  currentSelected = computed(() => this.values()['selected'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    // Values are reset by the showcase component
  }

  onInteractiveTagClick(event: MouseEvent): void {
    this.showcase()?.logEvent('tagClick', { text: this.currentText() });
  }

  onInteractiveDismiss(): void {
    this.showcase()?.logEvent('dismiss', { text: this.currentText() });
  }

  interactiveTags: Array<{
    id: number;
    text: string;
    selected: boolean;
    variant: Variant;
    appearance: Appearance;
  }> = [
    { id: 1, text: 'Design', selected: false, variant: 'primary', appearance: 'tint' },
    { id: 2, text: 'Development', selected: true, variant: 'success', appearance: 'tint' },
    { id: 3, text: 'Testing', selected: false, variant: 'warning', appearance: 'outline' },
    { id: 4, text: 'Documentation', selected: false, variant: 'info', appearance: 'tint' },
  ];

  filterTags = {
    javascript: false,
    typescript: true,
    angular: true,
  };

  actionLog: Array<{ id: number; time: string; message: string }> = [];
  private actionIdCounter = 0;

  onDismiss(e: any): void {
    this.logAction('Tag dismissed');
  }

  toggleTagSelection(id: number): void {
    const tag = this.interactiveTags.find(t => t.id === id);
    if (tag) {
      tag.selected = !tag.selected;
      this.logAction(`Tag "${tag.text}" ${tag.selected ? 'selected' : 'unselected'}`);
    }
  }

  removeTag(id: number): void {
    const tagIndex = this.interactiveTags.findIndex(t => t.id === id);
    if (tagIndex !== -1) {
      const tag = this.interactiveTags[tagIndex];
      this.logAction(`Tag "${tag.text}" removed`);
      this.interactiveTags.splice(tagIndex, 1);
    }
  }

  toggleFilter(filter: keyof typeof this.filterTags): void {
    this.filterTags[filter] = !this.filterTags[filter];
    this.logAction(`Filter "${filter}" ${this.filterTags[filter] ? 'enabled' : 'disabled'}`);
  }

  private logAction(message: string): void {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    this.actionLog.unshift({ id: this.actionIdCounter++, time, message });
    if (this.actionLog.length > 10) {
      this.actionLog.pop();
    }
  }
}

