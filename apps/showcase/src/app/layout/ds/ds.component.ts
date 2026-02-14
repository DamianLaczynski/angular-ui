import {
  Component,
  signal,
  inject,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  computed,
} from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';
import { DsSidebarComponent } from './components/ds-sidebar/ds-sidebar.component';
import { SplitterPanel } from 'angular-ui';
import { ButtonComponent } from 'angular-ui';
import { IconComponent } from 'angular-ui';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { ScrollService } from '@shared/scroll/scroll.service';
import { ThemeMode, ThemeService } from '@shared/theme/theme.service';

@Component({
  selector: 'app-ds',
  imports: [RouterOutlet, DsSidebarComponent, ButtonComponent, IconComponent],
  templateUrl: './ds.component.html',
})
export class DsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mainContent') mainContent?: ElementRef<HTMLElement>;
  @ViewChild('headerRef') headerRef?: ElementRef<HTMLElement>;

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly scrollService = inject(ScrollService);
  private readonly themeService = inject(ThemeService);

  readonly version = '1.0.0';
  readonly githubUrl = 'https://github.com/DamianLaczynski/angular-ui';
  readonly npmUrl = 'https://www.npmjs.com/';

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
  private headerResizeObserver?: ResizeObserver;

  isSidebarOpen = signal<boolean>(false);
  isMobile = signal<boolean>(false);

  ngAfterViewInit(): void {
    if (this.mainContent?.nativeElement) {
      this.scrollService.register(this.mainContent.nativeElement);
    }

    this.syncHeaderHeight();

    if (typeof ResizeObserver !== 'undefined' && this.headerRef?.nativeElement) {
      this.headerResizeObserver = new ResizeObserver(() => this.syncHeaderHeight());
      this.headerResizeObserver.observe(this.headerRef.nativeElement);
    }
  }

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

        this.syncHeaderHeight();
      });
  }

  ngOnDestroy(): void {
    this.breakpointSubscription?.unsubscribe();
    this.headerResizeObserver?.disconnect();
    this.scrollService.unregister();
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private syncHeaderHeight(): void {
    const headerEl = this.headerRef?.nativeElement;
    if (!headerEl) return;

    const height = Math.ceil(headerEl.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--ds-header-height', `${height}px`);
  }
}
