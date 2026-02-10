import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appearance, ButtonComponent, TableOfContentComponent, Variant } from 'angular-ui';
import {
  APPEARANCES,
  SHAPES,
  SIZES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import {
  OVERVIEW_DRAWER_FORM_CONFIG,
  APPEARANCE_VARIANT_DRAWER_FORM_CONFIG,
  SIZE_DRAWER_FORM_CONFIG,
  SHAPE_DRAWER_FORM_CONFIG,
  ICONS_DRAWER_FORM_CONFIG,
  STATES_DRAWER_FORM_CONFIG,
} from './button-drawer-form.config';
import { ButtonInteractiveComponent } from './button.interactive.component';

@Component({
  selector: 'app-button-showcase',
  imports: [
    ButtonComponent,
    CommonModule,
    FormsModule,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    ButtonInteractiveComponent,
  ],
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
        <app-showcase-header title="Button" />

        <app-section-with-drawer
          sectionTitle="Overview"
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (col of overviewColumns; track col.variant + col.size + col.shape) {
                <div
                  class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header showcase__icons-matrix__cell--header-multi"
                >
                  <span>{{ col.variant | titlecase }}</span>
                  <span>{{ col.size | titlecase }}</span>
                  <span>{{ col.shape | titlecase }}</span>
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (col of overviewColumns; track col.variant + col.size + col.shape) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-button
                      [variant]="col.variant"
                      [appearance]="appearance"
                      [size]="col.size"
                      [shape]="col.shape"
                      [icon]="overviewForm().icon"
                      [disabled]="overviewForm().disabled"
                      [loading]="overviewForm().loading"
                      [selected]="overviewForm().selected"
                      [selectable]="overviewForm().selectable"
                      [fullWidth]="overviewForm().fullWidth"
                    >
                      {{ appearance | titlecase }} {{ col.variant | titlecase }}
                    </ui-button>
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearance & Variant"
          [formConfig]="appearanceVariantDrawerFormConfig"
          [formValues]="appearanceVariantFormValues()"
          (formValuesChange)="appearanceVariantFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (variant of variants; track variant) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ variant | titlecase }}
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (variant of variants; track variant) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-button
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="appearanceVariantForm().size"
                      [shape]="appearanceVariantForm().shape"
                      [icon]="appearanceVariantForm().icon"
                      [disabled]="appearanceVariantForm().disabled"
                      [loading]="appearanceVariantForm().loading"
                      [selected]="appearanceVariantForm().selected"
                      [selectable]="appearanceVariantForm().selectable"
                      [fullWidth]="appearanceVariantForm().fullWidth"
                    >
                      {{ appearance | titlecase }} {{ variant | titlecase }}
                    </ui-button>
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Icons"
          [formConfig]="iconsDrawerFormConfig"
          [formValues]="iconFormValues()"
          (formValuesChange)="iconFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (variant of variants; track variant) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ variant | titlecase }}
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (variant of variants; track variant; let colIndex = $index) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-button
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="iconForm().size"
                      [shape]="iconForm().shape"
                      [icon]="iconsPerVariant[colIndex]"
                      [disabled]="iconForm().disabled"
                      [loading]="iconForm().loading"
                      [selected]="iconForm().selected"
                      [selectable]="iconForm().selectable"
                      [fullWidth]="iconForm().fullWidth"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <ui-button
                [variant]="sizeForm().variant"
                [appearance]="sizeForm().appearance"
                [size]="size"
                [shape]="sizeForm().shape"
                [icon]="sizeForm().icon"
                [disabled]="sizeForm().disabled"
                [loading]="sizeForm().loading"
                [selected]="sizeForm().selected"
                [selectable]="sizeForm().selectable"
                [fullWidth]="sizeForm().fullWidth"
              >
                {{ size | titlecase }}
              </ui-button>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shapes"
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <ui-button
                [variant]="shapeForm().variant"
                [appearance]="shapeForm().appearance"
                [size]="shapeForm().size"
                [shape]="shape"
                [icon]="shapeForm().icon"
                [disabled]="shapeForm().disabled"
                [loading]="shapeForm().loading"
                [selected]="shapeForm().selected"
                [selectable]="shapeForm().selectable"
                [fullWidth]="shapeForm().fullWidth"
              >
                {{ shape | titlecase }}
              </ui-button>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <ui-button
                [variant]="statesForm().variant"
                [appearance]="statesForm().appearance"
                [size]="statesForm().size"
                [shape]="statesForm().shape"
                [icon]="statesForm().icon"
                [disabled]="state.disabled"
                [loading]="state.loading"
                [selected]="state.selected"
                [selectable]="statesForm().selectable"
                [fullWidth]="statesForm().fullWidth"
              >
                {{ state.label }}
              </ui-button>
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-button-interactive />
        </section>
      </div>
    </div>
  `,
})
export class ButtonShowcaseComponent {
  variants = VARIANTS;
  appearances = APPEARANCES;
  sizes = SIZES;
  shapes = SHAPES;

  overviewDrawerFormConfig = OVERVIEW_DRAWER_FORM_CONFIG;
  appearanceVariantDrawerFormConfig = APPEARANCE_VARIANT_DRAWER_FORM_CONFIG;
  overviewColumns = VARIANTS.map((variant, i) => ({
    variant,
    size: SIZES[i % SIZES.length],
    shape: SHAPES.reverse()[i % SHAPES.length],
  }));
  iconsDrawerFormConfig = ICONS_DRAWER_FORM_CONFIG;
  iconsPerVariant: import('angular-ui').IconName[] = [
    'star',
    'checkmark',
    'delete',
    'info',
    'settings',
    'home',
  ];
  sizeDrawerFormConfig = SIZE_DRAWER_FORM_CONFIG;
  shapeDrawerFormConfig = SHAPE_DRAWER_FORM_CONFIG;
  statesDrawerFormConfig = STATES_DRAWER_FORM_CONFIG;

  statePresets = [
    { id: 'normal', label: 'Normal', disabled: false, selected: false, loading: false },
    { id: 'selected', label: 'Selected', disabled: false, selected: true, loading: false },
    { id: 'disabled', label: 'Disabled', disabled: true, selected: false, loading: false },
    { id: 'loading', label: 'Loading', disabled: false, selected: false, loading: true },
  ];

  overviewFormValues = signal<Record<string, unknown>>({
    icon: '',
    disabled: false,
    selectable: false,
    selected: false,
    loading: false,
    fullWidth: false,
  });

  overviewForm = computed(() => {
    const v = this.overviewFormValues();
    return {
      icon: (v['icon'] as import('angular-ui').IconName) || undefined,
      disabled: !!v['disabled'],
      loading: !!v['loading'],
      selected: !!v['selected'],
      selectable: !!v['selectable'],
      fullWidth: !!v['fullWidth'],
    };
  });

  appearanceVariantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    icon: '',
    disabled: false,
    selectable: false,
    selected: false,
    loading: false,
    fullWidth: false,
  });

  appearanceVariantForm = computed(() => {
    const v = this.appearanceVariantFormValues();
    return {
      size: v['size'] as import('angular-ui').Size,
      shape: v['shape'] as import('angular-ui').Shape,
      icon: (v['icon'] as import('angular-ui').IconName) || undefined,
      disabled: !!v['disabled'],
      loading: !!v['loading'],
      selected: !!v['selected'],
      selectable: !!v['selectable'],
      fullWidth: !!v['fullWidth'],
    };
  });

  iconFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    disabled: false,
    selectable: false,
    selected: false,
    loading: false,
    fullWidth: false,
  });

  iconForm = computed(() => {
    const v = this.iconFormValues();
    return {
      size: v['size'] as import('angular-ui').Size,
      shape: v['shape'] as import('angular-ui').Shape,
      disabled: !!v['disabled'],
      loading: !!v['loading'],
      selected: !!v['selected'],
      selectable: !!v['selectable'],
      fullWidth: !!v['fullWidth'],
    };
  });

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'filled',
    shape: 'rounded',
    icon: '',
    disabled: false,
    selectable: false,
    selected: false,
    loading: false,
    fullWidth: false,
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      size: v['size'] as import('angular-ui').Size,
      shape: v['shape'] as import('angular-ui').Shape,
      icon: (v['icon'] as import('angular-ui').IconName) || undefined,
      disabled: !!v['disabled'],
      loading: !!v['loading'],
      selected: !!v['selected'],
      selectable: !!v['selectable'],
      fullWidth: !!v['fullWidth'],
    };
  });

  shapeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'filled',
    size: 'medium',
    icon: '',
    disabled: false,
    selectable: false,
    selected: false,
    loading: false,
    fullWidth: false,
  });

  shapeForm = computed(() => {
    const v = this.shapeFormValues();
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      size: v['size'] as import('angular-ui').Size,
      shape: v['shape'] as import('angular-ui').Shape,
      icon: (v['icon'] as import('angular-ui').IconName) || undefined,
      disabled: !!v['disabled'],
      loading: !!v['loading'],
      selected: !!v['selected'],
      selectable: !!v['selectable'],
      fullWidth: !!v['fullWidth'],
    };
  });

  statesFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded',
    icon: '',
    selectable: false,
    fullWidth: false,
  });

  statesForm = computed(() => {
    const v = this.statesFormValues();
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      size: v['size'] as import('angular-ui').Size,
      shape: v['shape'] as import('angular-ui').Shape,
      icon: (v['icon'] as import('angular-ui').IconName) || undefined,
      selectable: !!v['selectable'],
      fullWidth: !!v['fullWidth'],
    };
  });
}
