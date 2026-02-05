import { Injectable, signal } from '@angular/core';

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

const THEME_KEY = 'theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /**
   * Signal that tracks the current theme mode
   * @private
   */
  private _themeMode = signal<ThemeMode>(this.getInitialThemeMode());

  /**
   * Signal accessor for the current theme
   */
  $themeMode = this._themeMode.asReadonly();

  /**
   * Initializes the layout service and applies the initial theme
   */
  constructor() {
    this.applyTheme(this._themeMode());
  }

  /**
   * Toggles between light and dark theme
   */
  toggleTheme(): void {
    const newTheme = this._themeMode() === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
    this._themeMode.set(newTheme);
    this.saveThemePreference(newTheme);
    this.applyTheme(newTheme);
  }

  /**
   * Determines the initial theme mode based on saved preference or system preference
   * @returns The initial theme mode to use
   * @private
   */
  private getInitialThemeMode(): ThemeMode {
    const savedTheme = localStorage.getItem(THEME_KEY) as ThemeMode;
    if (savedTheme) {
      return savedTheme;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return ThemeMode.Dark;
    }

    return ThemeMode.Light;
  }

  /**
   * Saves the theme preference to localStorage
   * @param mode The theme mode to save
   * @private
   */
  private saveThemePreference(mode: ThemeMode): void {
    localStorage.setItem(THEME_KEY, mode);
  }

  /**
   * Applies the theme to the document by setting CSS classes and attributes
   * @param mode The theme mode to apply
   * @private
   */
  private applyTheme(mode: ThemeMode): void {
    document.documentElement.setAttribute('data-theme', mode);

    if (mode === ThemeMode.Dark) {
      document.documentElement.classList.add(ThemeMode.Dark);
    } else {
      document.documentElement.classList.remove(ThemeMode.Dark);
    }
  }
}
