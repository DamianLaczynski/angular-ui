import { Component, computed, signal, viewChild } from '@angular/core';
import { Step, StepperComponent, Size } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  type ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { STEPPER_SHOWCASE_CONFIG } from './stepper.showcase.config';

type StepperOrientation = 'horizontal' | 'vertical';

const INTERACTIVE_STEPS: Step[] = [
  { id: 1, label: 'Personal Info', description: 'Enter your personal details', completed: false },
  { id: 2, label: 'Account', description: 'Create credentials', completed: false },
  { id: 3, label: 'Verification', description: 'Confirm contact data', completed: false },
  { id: 4, label: 'Complete', description: 'Finish onboarding', completed: false },
];

@Component({
  selector: 'app-stepper-interactive',
  imports: [StepperComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-stepper
          [steps]="steps"
          [activeStepIndex]="activeStepIndex()"
          [orientation]="currentOrientation()"
          [size]="currentSize()"
          [showLabels]="currentShowLabels()"
          [showDescriptions]="currentShowDescriptions()"
          [linear]="currentLinear()"
          [clickable]="currentClickable()"
          (stepChange)="onStepChange($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class StepperInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  steps = INTERACTIVE_STEPS;
  showcaseConfig: ShowcaseConfig = STEPPER_SHOWCASE_CONFIG;
  activeStepIndex = signal(0);

  private values = signal<Record<string, unknown>>({
    orientation: 'horizontal',
    size: 'medium',
    showLabels: true,
    showDescriptions: false,
    linear: false,
    clickable: true,
  });

  currentOrientation = computed(
    () => (this.values()['orientation'] as StepperOrientation) ?? 'horizontal',
  );
  currentSize = computed(() => (this.values()['size'] as Size) ?? 'medium');
  currentShowLabels = computed(() => !!this.values()['showLabels']);
  currentShowDescriptions = computed(() => !!this.values()['showDescriptions']);
  currentLinear = computed(() => !!this.values()['linear']);
  currentClickable = computed(() => !!this.values()['clickable']);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.activeStepIndex.set(0);
  }

  onStepChange(event: { step: Step; index: number }): void {
    this.activeStepIndex.set(event.index);
    this.showcase()?.logEvent('stepChange', { index: event.index, label: event.step.label });
  }
}
