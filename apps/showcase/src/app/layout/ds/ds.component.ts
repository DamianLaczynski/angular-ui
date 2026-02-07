import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DsSidebarComponent } from './components/ds-sidebar/ds-sidebar.component';
import { SplitterPanel } from 'angular-ui';
import { ButtonComponent } from 'angular-ui';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { ThemeMode, ThemeService } from '@shared/theme/theme.service';

const REPO_URL = 'https://github.com/DamianLaczynski/angular-ui';

@Component({
  selector: 'app-ds',
  imports: [RouterOutlet, RouterLink, DsSidebarComponent, ButtonComponent],
  templateUrl: './ds.component.html',
})
export class DsComponent implements OnInit, OnDestroy {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly themeService = inject(ThemeService);

  readonly repoUrl = REPO_URL;
  isDarkMode = computed(() => this.themeService.$themeMode() === ThemeMode.Dark);
  themeLabel = computed(() => (this.isDarkMode() ? 'Light mode' : 'Dark mode'));
  themeIcon = computed(() => (this.isDarkMode() ? 'weather_sunny' : 'weather_moon'));
  private breakpointSubscription?: Subscription;

  panels = signal<SplitterPanel[]>([
    {
      id: 'sidebar',
      size: 15,
    },
    {
      id: 'content',
      size: 85,
    },
  ]);

  isSidebarOpen = signal<boolean>(false);
  isMobile = signal<boolean>(false);

  ngOnInit(): void {
    // Monitor breakpoint changes
    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile.set(result.matches);
        // Close sidebar when switching to mobile
        if (result.matches) {
          this.isSidebarOpen.set(false);
        } else {
          // On desktop, sidebar should always be visible
          this.isSidebarOpen.set(true);
        }
      });
  }

  ngOnDestroy(): void {
    this.breakpointSubscription?.unsubscribe();
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  onThemeToggle(): void {
    this.themeService.toggleTheme();
  }

  onRepoClick(): void {
    window.open(this.repoUrl, '_blank');
  }
}
