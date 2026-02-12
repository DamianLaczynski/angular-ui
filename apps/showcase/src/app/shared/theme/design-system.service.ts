import { Injectable, signal } from '@angular/core';

export enum DesignSystem {
  Fluent = 'fluent',
  Material = 'material',
  Bootstrap = 'bootstrap',
}

const DESIGN_SYSTEM_KEY = 'design-system';

@Injectable({
  providedIn: 'root',
})
export class DesignSystemService {
  private _designSystem = signal<DesignSystem>(this.getInitialDesignSystem());

  $designSystem = this._designSystem.asReadonly();

  constructor() {
    this.applyDesignSystem(this._designSystem());
  }

  setDesignSystem(value: DesignSystem): void {
    this._designSystem.set(value);
    this.savePreference(value);
    this.applyDesignSystem(value);
  }

  private getInitialDesignSystem(): DesignSystem {
    const saved = localStorage.getItem(DESIGN_SYSTEM_KEY) as DesignSystem | null;
    if (
      saved === DesignSystem.Fluent ||
      saved === DesignSystem.Material ||
      saved === DesignSystem.Bootstrap
    ) {
      return saved;
    }
    return DesignSystem.Fluent;
  }

  private savePreference(value: DesignSystem): void {
    localStorage.setItem(DESIGN_SYSTEM_KEY, value);
  }

  private applyDesignSystem(value: DesignSystem): void {
    document.documentElement.setAttribute('data-design', value);
  }
}
