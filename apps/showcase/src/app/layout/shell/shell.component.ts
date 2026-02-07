import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeMode, ThemeService } from '@shared/theme/theme.service';
import { ButtonComponent } from 'angular-ui';
import libPackage from 'angular-ui-package';
import rootPackage from 'monorepo-package';

const REPO_URL = 'https://github.com/DamianLaczynski/angular-ui';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, ButtonComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  private readonly themeService = inject(ThemeService);

  readonly repoUrl = REPO_URL;
  readonly libVersion = `v${rootPackage.version}`;
  readonly libName = libPackage.name;
  isDarkMode = computed(() => this.themeService.$themeMode() === ThemeMode.Dark);
  themeLabel = computed(() => (this.isDarkMode() ? 'Light mode' : 'Dark mode'));
  themeIcon = computed(() => (this.isDarkMode() ? 'weather_sunny' : 'weather_moon'));

  navLinks = [
    { path: '/components', label: 'Components' },
  ];

  onThemeToggle(): void {
    this.themeService.toggleTheme();
  }

  onRepoClick(): void {
    window.open(this.repoUrl, '_blank');
  }
}
