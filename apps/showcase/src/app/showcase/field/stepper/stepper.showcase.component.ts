import { Component, signal, computed, viewChild } from '@angular/core';
import { StepperComponent, Step } from 'angular-ui';
import { ButtonComponent } from 'angular-ui';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TableOfContentComponent } from 'angular-ui';
import { InteractiveShowcaseComponent, ShowcaseConfig } from '@shared/components/interactive-showcase';
import { Size } from 'angular-ui';

@Component({
  selector: 'app-stepper-showcase',

  imports: [
    StepperComponent,
    ButtonComponent,
    FormsModule,
    JsonPipe,
    TableOfContentComponent,
    InteractiveShowcaseComponent,
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
        <h1 class="showcase__title">Stepper Component Showcase</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Stepper component built with Fluent 2 Design System. A step
          indicator component for multi-step processes, forms, and workflows.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            [showEventLog]="true"
            (valuesChange)="onValuesChange($event)"
            (reset)="onResetShowcase()"
          >
            <div preview>
              <ui-stepper
                [steps]="basicSteps()"
                [activeStepIndex]="currentActiveStep"
                [orientation]="currentOrientation()"
                [size]="currentSize()"
                [showLabels]="currentShowLabels()"
                [showDescriptions]="currentShowDescriptions()"
                [linear]="currentLinear()"
                [clickable]="currentClickable()"
                (stepChange)="onStepChangeShowcase($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Horizontal Stepper -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Horizontal Stepper</h2>
          <p class="showcase__section__description">
            Simple horizontal stepper with navigation controls.
          </p>
          <div class="showcase__preview">
            <ui-stepper
              [steps]="basicSteps()"
              [activeStepIndex]="activeStep1()"
              (stepChange)="onStepChange($event, 1)"
            />
            <div class="showcase__controls">
              <ui-button
                variant="secondary"
                (click)="previousStep(1)"
                [disabled]="activeStep1() === 0"
              >
                Previous
              </ui-button>
              <ui-button
                variant="primary"
                (click)="nextStep(1)"
                [disabled]="activeStep1() === basicSteps().length - 1"
              >
                Next
              </ui-button>
              <ui-button appearance="outline" (click)="resetStepper(1)">Reset</ui-button>
            </div>
          </div>
        </div>

        <!-- Vertical Stepper -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Vertical Stepper</h2>
          <p class="showcase__section__description">
            Vertical stepper with descriptions for each step.
          </p>
          <div class="showcase__preview">
            <ui-stepper
              [steps]="verticalSteps()"
              [activeStepIndex]="activeStep2()"
              orientation="vertical"
              [showDescriptions]="true"
              (stepChange)="onStepChange($event, 2)"
            />
            <div class="showcase__controls">
              <ui-button
                variant="secondary"
                (click)="previousStep(2)"
                [disabled]="activeStep2() === 0"
              >
                Previous
              </ui-button>
              <ui-button
                variant="primary"
                (click)="nextStep(2)"
                [disabled]="activeStep2() === verticalSteps().length - 1"
              >
                Next
              </ui-button>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Size Variants</h2>
          <p class="showcase__section__description">
            Stepper in different sizes: small, medium, and large.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3 class="showcase__subsection__title">Small</h3>
              <ui-stepper [steps]="sizeSteps()" size="small" />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__subsection__title">Medium (Default)</h3>
              <ui-stepper [steps]="sizeSteps()" size="medium" />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__subsection__title">Large</h3>
              <ui-stepper [steps]="sizeSteps()" size="large" />
            </div>
          </div>
        </div>

        <!-- Linear Mode -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Linear Mode</h2>
          <p class="showcase__section__description">
            Linear mode prevents users from skipping steps. Steps must be completed in order.
          </p>
          <div class="showcase__preview">
            <ui-stepper
              [steps]="linearSteps()"
              [activeStepIndex]="activeStep3()"
              [linear]="true"
              [clickable]="true"
              (stepChange)="onStepChange($event, 3)"
            />
            <div class="showcase__controls">
              <ui-button
                appearance="subtle"
                (click)="previousStep(3)"
                [disabled]="activeStep3() === 0"
              >
                Previous
              </ui-button>
              <ui-button
                variant="primary"
                (click)="completeAndNext(3)"
                [disabled]="activeStep3() === linearSteps().length - 1"
              >
                Complete & Next
              </ui-button>
              <ui-button appearance="outline" (click)="resetLinearStepper()">Reset</ui-button>
            </div>
          </div>
        </div>

        <!-- State Variants -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <p class="showcase__section__description">
            Stepper showing different step states: completed, active, error, warning, and disabled.
          </p>
          <div class="showcase__preview">
            <ui-stepper [steps]="stateSteps()" />
          </div>
        </div>

        <!-- Without Labels -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Without Labels (Compact)</h2>
          <p class="showcase__section__description">
            Compact stepper without labels, showing only step indicators.
          </p>
          <div class="showcase__preview">
            <ui-stepper
              [steps]="basicSteps()"
              [showLabels]="false"
              [activeStepIndex]="activeStep4()"
              (stepChange)="onStepChange($event, 4)"
            />
          </div>
        </div>

        <!-- Non-clickable Stepper -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Non-clickable (Display Only)</h2>
          <p class="showcase__section__description">
            Steps cannot be clicked - useful for progress indication only.
          </p>
          <div class="showcase__preview">
            <ui-stepper [steps]="basicSteps()" [clickable]="false" [activeStepIndex]="2" />
          </div>
        </div>

        <!-- Form Demo -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Form Demo</h2>
          <p class="showcase__section__description">
            Example of stepper used in a multi-step form with progress tracking.
          </p>
          <div class="showcase__preview">
            <form class="showcase__form">
              <ui-stepper
                [steps]="demoSteps()"
                [activeStepIndex]="demoActiveStep()"
                [linear]="true"
                [clickable]="true"
                (stepChange)="onDemoStepChange($event)"
              />
              <div class="showcase__form-output">
                <strong>Demo Progress:</strong>
                <pre>{{ demoData | json }}</pre>
              </div>
              <div class="showcase__controls">
                <ui-button
                  variant="secondary"
                  (click)="demoPreviousStep()"
                  [disabled]="demoActiveStep() === 0"
                >
                  Previous
                </ui-button>
                <ui-button
                  variant="primary"
                  (click)="demoCompleteAndNext()"
                  [disabled]="demoActiveStep() === demoSteps().length - 1"
                >
                  Complete & Next
                </ui-button>
                <ui-button appearance="outline" (click)="demoReset()">Reset Demo</ui-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StepperShowcaseComponent {
  // Active step indices for different examples
  activeStep1 = signal<number>(0);
  activeStep2 = signal<number>(0);
  activeStep3 = signal<number>(0);
  activeStep4 = signal<number>(0);

  // Demo active step
  demoActiveStep = signal<number>(0);

  // Demo progress data
  demoData = {
    currentStep: 0,
    totalSteps: 4,
    completedSteps: [] as number[],
    currentStepName: 'Personal Information',
  };

  // Basic steps
  basicSteps = signal<Step[]>([
    {
      id: 1,
      label: 'Personal Info',
      completed: false,
    },
    {
      id: 2,
      label: 'Account Details',
      completed: false,
    },
    {
      id: 3,
      label: 'Verification',
      completed: false,
    },
    {
      id: 4,
      label: 'Complete',
      completed: false,
    },
  ]);

  // Vertical steps with descriptions
  verticalSteps = signal<Step[]>([
    {
      id: 1,
      label: 'Select Campaign Settings',
      description: 'Choose your campaign type and set your budget',
      completed: true,
    },
    {
      id: 2,
      label: 'Create Ad Group',
      description: 'Define your target audience and keywords',
      completed: false,
    },
    {
      id: 3,
      label: 'Create Ads',
      description: 'Design your ad creative and messaging',
      completed: false,
    },
    {
      id: 4,
      label: 'Review & Launch',
      description: 'Review your campaign and launch it',
      completed: false,
    },
  ]);

  // Size demonstration steps
  sizeSteps = signal<Step[]>([
    {
      id: 1,
      label: 'Step 1',
      completed: true,
    },
    {
      id: 2,
      label: 'Step 2',
      completed: false,
    },
    {
      id: 3,
      label: 'Step 3',
      completed: false,
    },
  ]);

  // Linear mode steps
  linearSteps = signal<Step[]>([
    {
      id: 1,
      label: 'Basic Information',
      completed: false,
    },
    {
      id: 2,
      label: 'Address Details',
      completed: false,
    },
    {
      id: 3,
      label: 'Payment Method',
      completed: false,
    },
    {
      id: 4,
      label: 'Confirmation',
      completed: false,
    },
  ]);

  // State variants
  stateSteps = signal<Step[]>([
    {
      id: 1,
      label: 'Completed',
      completed: true,
    },
    {
      id: 2,
      label: 'Active',
      completed: false,
    },
    {
      id: 3,
      label: 'Error',
      error: true,
      completed: false,
    },
    {
      id: 4,
      label: 'Warning',
      warning: true,
      completed: false,
    },
    {
      id: 5,
      label: 'Disabled',
      disabled: true,
      completed: false,
    },
  ]);

  // Demo steps for interactive form
  demoSteps = signal<Step[]>([
    {
      id: 1,
      label: 'Personal Information',
      description: 'Enter your basic details',
      completed: false,
    },
    {
      id: 2,
      label: 'Address Details',
      description: 'Provide your address information',
      completed: false,
    },
    {
      id: 3,
      label: 'Review & Confirm',
      description: 'Review your information before submission',
      completed: false,
    },
    {
      id: 4,
      label: 'Complete',
      description: 'Your registration is complete',
      completed: false,
    },
  ]);

  onStepChange(event: { step: Step; index: number }, stepperIndex: number): void {
    console.log('Step changed:', event);

    switch (stepperIndex) {
      case 1:
        this.activeStep1.set(event.index);
        break;
      case 2:
        this.activeStep2.set(event.index);
        break;
      case 3:
        this.activeStep3.set(event.index);
        break;
      case 4:
        this.activeStep4.set(event.index);
        break;
    }
  }

  nextStep(stepperIndex: number): void {
    switch (stepperIndex) {
      case 1:
        if (this.activeStep1() < this.basicSteps().length - 1) {
          const newIndex = this.activeStep1() + 1;
          this.activeStep1.set(newIndex);
          // Mark previous step as completed
          const steps = [...this.basicSteps()];
          steps[this.activeStep1() - 1].completed = true;
          this.basicSteps.set(steps);
        }
        break;
      case 2:
        if (this.activeStep2() < this.verticalSteps().length - 1) {
          const newIndex = this.activeStep2() + 1;
          this.activeStep2.set(newIndex);
          // Mark previous step as completed
          const steps = [...this.verticalSteps()];
          steps[this.activeStep2() - 1].completed = true;
          this.verticalSteps.set(steps);
        }
        break;
      case 3:
        if (this.activeStep3() < this.linearSteps().length - 1) {
          this.activeStep3.set(this.activeStep3() + 1);
        }
        break;
    }
  }

  previousStep(stepperIndex: number): void {
    switch (stepperIndex) {
      case 1:
        if (this.activeStep1() > 0) {
          this.activeStep1.set(this.activeStep1() - 1);
        }
        break;
      case 2:
        if (this.activeStep2() > 0) {
          this.activeStep2.set(this.activeStep2() - 1);
        }
        break;
      case 3:
        if (this.activeStep3() > 0) {
          this.activeStep3.set(this.activeStep3() - 1);
        }
        break;
    }
  }

  completeAndNext(stepperIndex: number): void {
    if (stepperIndex === 3) {
      const steps = [...this.linearSteps()];
      const currentIndex = this.activeStep3();

      // Mark current step as completed
      steps[currentIndex].completed = true;
      this.linearSteps.set(steps);

      // Move to next step if not last
      if (currentIndex < steps.length - 1) {
        this.activeStep3.set(currentIndex + 1);
      }
    }
  }

  resetStepper(stepperIndex: number): void {
    switch (stepperIndex) {
      case 1:
        this.activeStep1.set(0);
        const basicSteps = this.basicSteps().map(step => ({ ...step, completed: false }));
        this.basicSteps.set(basicSteps);
        break;
      case 2:
        this.activeStep2.set(0);
        const verticalSteps = this.verticalSteps().map(step => ({ ...step, completed: false }));
        this.verticalSteps.set(verticalSteps);
        break;
    }
  }

  resetLinearStepper(): void {
    this.activeStep3.set(0);
    const linearSteps = this.linearSteps().map(step => ({ ...step, completed: false }));
    this.linearSteps.set(linearSteps);
  }

  onDemoStepChange(event: { step: Step; index: number }): void {
    this.demoActiveStep.set(event.index);
    this.updateDemoData(event.index);
  }

  demoPreviousStep(): void {
    if (this.demoActiveStep() > 0) {
      const newIndex = this.demoActiveStep() - 1;
      this.demoActiveStep.set(newIndex);
      this.updateDemoData(newIndex);
    }
  }

  demoCompleteAndNext(): void {
    const steps = [...this.demoSteps()];
    const currentIndex = this.demoActiveStep();

    // Mark current step as completed
    steps[currentIndex].completed = true;
    this.demoSteps.set(steps);

    // Move to next step if not last
    if (currentIndex < steps.length - 1) {
      const newIndex = currentIndex + 1;
      this.demoActiveStep.set(newIndex);
      this.updateDemoData(newIndex);
    }
  }

  demoReset(): void {
    this.demoActiveStep.set(0);
    const demoSteps = this.demoSteps().map(step => ({ ...step, completed: false }));
    this.demoSteps.set(demoSteps);
    this.updateDemoData(0);
  }

  private updateDemoData(stepIndex: number): void {
    const stepNames = ['Personal Information', 'Address Details', 'Review & Confirm', 'Complete'];
    this.demoData = {
      currentStep: stepIndex,
      totalSteps: 4,
      completedSteps: Array.from({ length: stepIndex }, (_, i) => i),
      currentStepName: stepNames[stepIndex] || 'Unknown',
    };
  }

  // Interactive showcase
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  currentActiveStep = 0;
  sizes: Size[] = ['small', 'medium', 'large'];
  orientations = ['horizontal', 'vertical'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-stepper',
    controlGroups: [
      { id: 'appearance', label: 'Appearance', icon: 'color' as any, expanded: true },
      { id: 'behavior', label: 'Behavior', icon: 'settings' as any },
    ],
    controls: [
      {
        key: 'orientation',
        label: 'Orientation',
        type: 'dropdown',
        options: this.orientations.map(o => ({ value: o, label: o })),
        defaultValue: 'horizontal',
        group: 'appearance',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'appearance',
      },
      {
        key: 'showLabels',
        label: 'Show Labels',
        type: 'switch',
        defaultValue: true,
        group: 'appearance',
      },
      {
        key: 'showDescriptions',
        label: 'Show Descriptions',
        type: 'switch',
        defaultValue: false,
        group: 'appearance',
      },
      { key: 'linear', label: 'Linear', type: 'switch', defaultValue: false, group: 'behavior' },
      {
        key: 'clickable',
        label: 'Clickable',
        type: 'switch',
        defaultValue: true,
        group: 'behavior',
      },
    ],
  };

  private values = signal<Record<string, any>>({
    orientation: 'horizontal',
    size: 'medium',
    showLabels: true,
    showDescriptions: false,
    linear: false,
    clickable: true,
  });
  currentOrientation = computed(() => this.values()['orientation'] as any);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShowLabels = computed(() => this.values()['showLabels'] as boolean);
  currentShowDescriptions = computed(() => this.values()['showDescriptions'] as boolean);
  currentLinear = computed(() => this.values()['linear'] as boolean);
  currentClickable = computed(() => this.values()['clickable'] as boolean);

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }
  onResetShowcase(): void {
    this.currentActiveStep = 0;
  }
  onStepChangeShowcase(event: any): void {
    this.currentActiveStep = event.index;
    this.showcase()?.logEvent('stepChange', { step: event.index });
  }
}

