import {
  Directive,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  Renderer2,
  input,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[uiRipple]',
  standalone: true,
})
export class RippleDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  enabled = input<boolean>(true);

  private applyHostClip(host: HTMLElement): void {
    const surface =
      host.querySelector('button') ||
      host.querySelector('.node__content') ||
      host.querySelector('.card') ||
      host;
    const style = surface ? getComputedStyle(surface) : null;
    if (style?.borderRadius) {
      this.renderer.setStyle(host, 'borderRadius', style.borderRadius);
    }
  }

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    if (!this.enabled()) return;
    if (!isPlatformBrowser(this.platformId)) return;
    if (document.documentElement.getAttribute('data-design') !== 'material') return;

    const host = this.el.nativeElement;
    const target = event.target as HTMLElement;
    if (target.closest('button')?.disabled || target.getAttribute('aria-disabled') === 'true')
      return;

    this.renderer.addClass(host, 'ui-ripple-host');
    this.renderer.setStyle(host, 'position', 'relative');
    this.renderer.setStyle(host, 'overflow', 'hidden');
    this.applyHostClip(host);

    const rect = host.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const ripple = this.renderer.createElement('span');
    this.renderer.addClass(ripple, 'ui-ripple');
    this.renderer.setStyle(ripple, 'left', `${x}px`);
    this.renderer.setStyle(ripple, 'top', `${y}px`);
    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);
    this.renderer.setStyle(ripple, 'marginLeft', `${-size / 2}px`);
    this.renderer.setStyle(ripple, 'marginTop', `${-size / 2}px`);

    this.renderer.appendChild(host, ripple);

    requestAnimationFrame(() => {
      this.renderer.addClass(ripple, 'ui-ripple--active');
    });

    const onTransitionEnd = (e: TransitionEvent): void => {
      if (e.propertyName === 'opacity') {
        ripple.removeEventListener('transitionend', onTransitionEnd);
        this.renderer.removeChild(host, ripple);
      }
    };

    const onPointerUp = (): void => {
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointercancel', onPointerUp);
      this.renderer.addClass(ripple, 'ui-ripple--fade');
      ripple.addEventListener('transitionend', onTransitionEnd);
    };

    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerUp);
  }
}
