import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  readonly scrollY = signal(0);

  private container: Element | null = null;
  private listener = (): void => this.updateScrollY();

  constructor() {
    window.addEventListener('scroll', this.listener, { passive: true });
    this.updateScrollY();
  }

  register(container: Element): void {
    this.unregister();
    this.container = container;
    window.removeEventListener('scroll', this.listener);
    this.updateScrollY();
    container.addEventListener('scroll', this.listener, { passive: true });
  }

  unregister(): void {
    if (this.container) {
      this.container.removeEventListener('scroll', this.listener);
      this.container = null;
      window.addEventListener('scroll', this.listener, { passive: true });
    }
    this.updateScrollY();
  }

  scrollToTop(): void {
    if (this.container) {
      this.container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private updateScrollY(): void {
    const y = this.container ? this.container.scrollTop : window.scrollY;
    this.scrollY.set(y);
  }
}
