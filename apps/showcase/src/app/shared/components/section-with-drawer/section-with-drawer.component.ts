import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, DrawerComponent, DropdownComponent, SwitchComponent } from 'angular-ui';
import type { SectionDrawerFormControl } from './section-with-drawer.types';

@Component({
  selector: 'app-section-with-drawer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    DrawerComponent,
    DropdownComponent,
    SwitchComponent,
  ],
  template: `
    <div class="showcase__section">
      <div class="showcase__section__header-row">
        <h2 class="showcase__section__title">{{ sectionTitle() }}</h2>
        <ui-button
          variant="secondary"
          appearance="outline"
          icon="settings"
          (click)="drawerVisible.set(true)"
          ariaLabel="Open props"
        >
          Customize
        </ui-button>
      </div>
      <div class="showcase__option-section__box">
        <ng-content />
      </div>
      <div class="showcase__drawer-wrapper--transparent-backdrop">
        <ui-drawer
          [title]="drawerTitle() || sectionTitle()"
          bodyText=""
          position="right"
          backdrop="dynamic"
          size="medium"
          [(visible)]="drawerVisible"
        >
          <form class="showcase__form">
            @for (control of formConfig(); track control.key) {
              @if (control.type === 'dropdown' && control.options) {
                <div class="showcase__form-field">
                  <label class="showcase__form-label" [for]="fieldId(control.key)">{{
                    control.label
                  }}</label>
                  <ui-dropdown
                    [id]="fieldId(control.key)"
                    [name]="control.key"
                    [items]="$any(control.options)"
                    [ngModel]="formValues()[control.key]"
                    (selectionChange)="onControlChange(control.key, $event)"
                    size="small"
                  />
                </div>
              }
              @if (control.type === 'switch') {
                <div class="showcase__form-field showcase__form-field--row">
                  <ui-switch
                    [id]="fieldId(control.key)"
                    [name]="control.key"
                    [ngModel]="formValues()[control.key]"
                    (ngModelChange)="onControlChange(control.key, $event)"
                    size="small"
                  />
                  <label class="showcase__form-label" [for]="fieldId(control.key)">{{
                    control.label
                  }}</label>
                </div>
              }
            }
          </form>
        </ui-drawer>
      </div>
    </div>
  `,
})
export class SectionWithDrawerComponent {
  sectionTitle = input.required<string>();
  drawerTitle = input<string>('');
  formConfig = input.required<SectionDrawerFormControl[]>();
  formValues = input.required<Record<string, unknown>>();

  formValuesChange = output<Record<string, unknown>>();

  drawerVisible = model(false);

  fieldId(key: string): string {
    const slug = this.sectionTitle().toLowerCase().replace(/\s+/g, '-');
    return `${slug}-form-${key}`;
  }

  onControlChange(key: string, value: unknown): void {
    const v = Array.isArray(value) ? value[0] : value;
    this.formValuesChange.emit({ ...this.formValues(), [key]: v });
  }
}
