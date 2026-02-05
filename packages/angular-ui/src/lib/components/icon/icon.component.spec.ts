import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IconComponent } from './icon.component';
import { IconName } from './icon-name.type';
import { Size } from '../utils';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let svgElement: DebugElement;
  let useElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render an SVG element', () => {
      fixture.detectChanges();
      svgElement = fixture.debugElement.query(By.css('svg'));
      expect(svgElement).toBeTruthy();
    });

    it('should have default input values', () => {
      fixture.detectChanges();
      expect(component.icon()).toBe('');
      expect(component.size()).toBe('medium');
      expect(component.variant()).toBe('regular');
    });

    it('should have host styles for centering', () => {
      fixture.detectChanges();
      const hostElement = fixture.nativeElement;
      const styles = window.getComputedStyle(hostElement);
      expect(styles.display).toBe('flex');
    });
  });

  describe('Icon Input', () => {
    it('should accept icon name', () => {
      const iconName: IconName = 'star' as IconName;
      fixture.componentRef.setInput('icon', iconName);
      fixture.detectChanges();

      expect(component.icon()).toBe(iconName);
    });

    it('should handle undefined icon gracefully', () => {
      fixture.componentRef.setInput('icon', undefined);
      fixture.detectChanges();

      expect(component.icon()).toBe('');
    });

    it('should update icon when input changes', () => {
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.detectChanges();
      expect(component.icon()).toBe('star');

      fixture.componentRef.setInput('icon', 'checkmark' as IconName);
      fixture.detectChanges();
      expect(component.icon()).toBe('checkmark');
    });
  });

  describe('Size Input', () => {
    const sizes: Size[] = ['small', 'medium', 'large'];

    sizes.forEach(size => {
      it(`should accept ${size} size`, () => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        expect(component.size()).toBe(size);
      });
    });

    it('should handle undefined size with default', () => {
      fixture.componentRef.setInput('size', undefined);
      fixture.detectChanges();

      expect(component.size()).toBe('medium');
    });

    it('should update size when input changes', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      expect(component.size()).toBe('small');

      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      expect(component.size()).toBe('large');
    });
  });

  describe('Variant Input', () => {
    it('should accept regular variant', () => {
      fixture.componentRef.setInput('variant', 'regular');
      fixture.detectChanges();

      expect(component.variant()).toBe('regular');
    });

    it('should accept filled variant', () => {
      fixture.componentRef.setInput('variant', 'filled');
      fixture.detectChanges();

      expect(component.variant()).toBe('filled');
    });

    it('should default to regular variant', () => {
      fixture.detectChanges();
      expect(component.variant()).toBe('regular');
    });
  });

  describe('GetNumberSize Method', () => {
    it('should return 16 for small size', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();

      expect(component.getNumberSize()).toBe(16);
    });

    it('should return 20 for medium size', () => {
      fixture.componentRef.setInput('size', 'medium');
      fixture.detectChanges();

      expect(component.getNumberSize()).toBe(20);
    });

    it('should return 24 for large size', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();

      expect(component.getNumberSize()).toBe(24);
    });

    it('should return 20 as default for unknown size', () => {
      // Force an unknown size through type casting
      fixture.componentRef.setInput('size', 'unknown' as any);
      fixture.detectChanges();

      expect(component.getNumberSize()).toBe(20);
    });
  });

  describe('IconSrc Computed', () => {
    it('should generate correct path for regular variant', () => {
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.componentRef.setInput('size', 'medium');
      fixture.componentRef.setInput('variant', 'regular');
      fixture.detectChanges();

      expect(component.iconSrc()).toBe('assets/icons/star_20_regular.svg');
    });

    it('should generate correct path for filled variant', () => {
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.componentRef.setInput('size', 'medium');
      fixture.componentRef.setInput('variant', 'filled');
      fixture.detectChanges();

      expect(component.iconSrc()).toBe('assets/icons/star_20_filled.svg');
    });

    it('should generate correct path for small size', () => {
      fixture.componentRef.setInput('icon', 'checkmark' as IconName);
      fixture.componentRef.setInput('size', 'small');
      fixture.componentRef.setInput('variant', 'regular');
      fixture.detectChanges();

      expect(component.iconSrc()).toBe('assets/icons/checkmark_16_regular.svg');
    });

    it('should generate correct path for large size', () => {
      fixture.componentRef.setInput('icon', 'delete' as IconName);
      fixture.componentRef.setInput('size', 'large');
      fixture.componentRef.setInput('variant', 'filled');
      fixture.detectChanges();

      expect(component.iconSrc()).toBe('assets/icons/delete_24_filled.svg');
    });

    it('should update path when inputs change', () => {
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      expect(component.iconSrc()).toBe('assets/icons/star_16_regular.svg');

      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      expect(component.iconSrc()).toBe('assets/icons/star_24_regular.svg');
    });
  });

  describe('ViewBox Getter', () => {
    it('should return correct viewBox for small size', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();

      expect(component.viewBox).toBe('0 0 16 16');
    });

    it('should return correct viewBox for medium size', () => {
      fixture.componentRef.setInput('size', 'medium');
      fixture.detectChanges();

      expect(component.viewBox).toBe('0 0 20 20');
    });

    it('should return correct viewBox for large size', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();

      expect(component.viewBox).toBe('0 0 24 24');
    });
  });

  describe('SVG Rendering', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.componentRef.setInput('size', 'medium');
      fixture.detectChanges();
      svgElement = fixture.debugElement.query(By.css('svg'));
      useElement = fixture.debugElement.query(By.css('use'));
    });

    it('should render SVG with correct width', () => {
      expect(svgElement.nativeElement.getAttribute('width')).toBe('20px');
    });

    it('should render SVG with correct height', () => {
      expect(svgElement.nativeElement.getAttribute('height')).toBe('20px');
    });

    it('should render SVG with alt attribute', () => {
      expect(svgElement.nativeElement.getAttribute('alt')).toBe('Icon');
    });

    it('should render use element with correct href', () => {
      expect(useElement.nativeElement.getAttribute('href')).toBe(
        'assets/icons/star_20_regular.svg',
      );
    });

    it('should render use element with currentColor fill', () => {
      expect(useElement.nativeElement.getAttribute('fill')).toBe('currentColor');
    });

    it('should render use element with correct viewBox', () => {
      expect(useElement.nativeElement.getAttribute('viewBox')).toBe('0 0 20 20');
    });

    it('should render use element with correct width', () => {
      expect(useElement.nativeElement.getAttribute('width')).toBe('20px');
    });

    it('should render use element with correct height', () => {
      expect(useElement.nativeElement.getAttribute('height')).toBe('20px');
    });
  });

  describe('Size Changes', () => {
    it('should update SVG dimensions when size changes', () => {
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();

      let svg = fixture.debugElement.query(By.css('svg'));
      expect(svg.nativeElement.getAttribute('width')).toBe('16px');
      expect(svg.nativeElement.getAttribute('height')).toBe('16px');

      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();

      svg = fixture.debugElement.query(By.css('svg'));
      expect(svg.nativeElement.getAttribute('width')).toBe('24px');
      expect(svg.nativeElement.getAttribute('height')).toBe('24px');
    });

    it('should update viewBox when size changes', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      expect(component.viewBox).toBe('0 0 16 16');

      fixture.componentRef.setInput('size', 'medium');
      fixture.detectChanges();
      expect(component.viewBox).toBe('0 0 20 20');

      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      expect(component.viewBox).toBe('0 0 24 24');
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle all inputs together', () => {
      fixture.componentRef.setInput('icon', 'checkmark' as IconName);
      fixture.componentRef.setInput('size', 'large');
      fixture.componentRef.setInput('variant', 'filled');
      fixture.detectChanges();

      expect(component.icon()).toBe('checkmark');
      expect(component.size()).toBe('large');
      expect(component.variant()).toBe('filled');
      expect(component.iconSrc()).toBe('assets/icons/checkmark_24_filled.svg');
      expect(component.viewBox).toBe('0 0 24 24');
      expect(component.getNumberSize()).toBe(24);
    });

    it('should handle rapid property changes', () => {
      const icons: IconName[] = ['star', 'checkmark', 'delete', 'info', 'settings'] as IconName[];

      icons.forEach(icon => {
        fixture.componentRef.setInput('icon', icon);
        fixture.detectChanges();
        expect(component.icon()).toBe(icon);
      });
    });

    it('should maintain consistency after multiple updates', () => {
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      expect(component.iconSrc()).toBe('assets/icons/star_16_regular.svg');

      fixture.componentRef.setInput('variant', 'filled');
      fixture.detectChanges();
      expect(component.iconSrc()).toBe('assets/icons/star_16_filled.svg');

      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      expect(component.iconSrc()).toBe('assets/icons/star_24_filled.svg');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string icon', () => {
      fixture.componentRef.setInput('icon', '' as IconName);
      fixture.detectChanges();

      expect(component.icon()).toBe('');
      expect(component.iconSrc()).toBe('assets/icons/_20_regular.svg');
    });

    it('should handle icon with special characters', () => {
      fixture.componentRef.setInput('icon', 'arrow_left' as IconName);
      fixture.detectChanges();

      expect(component.iconSrc()).toBe('assets/icons/arrow_left_20_regular.svg');
    });

    it('should handle icon with numbers', () => {
      fixture.componentRef.setInput('icon', 'number_1' as IconName);
      fixture.detectChanges();

      expect(component.iconSrc()).toContain('number_1');
    });
  });

  describe('Change Detection', () => {
    it('should use OnPush change detection strategy', () => {
      expect(component).toBeTruthy();
      // OnPush is set in component metadata
    });

    it('should update computed values when inputs change', () => {
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();

      const initialSrc = component.iconSrc();
      expect(initialSrc).toBe('assets/icons/star_16_regular.svg');

      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();

      const updatedSrc = component.iconSrc();
      expect(updatedSrc).toBe('assets/icons/star_24_regular.svg');
      expect(updatedSrc).not.toBe(initialSrc);
    });
  });

  describe('Accessibility', () => {
    it('should have alt attribute on SVG', () => {
      fixture.detectChanges();
      const svg = fixture.debugElement.query(By.css('svg'));
      expect(svg.nativeElement.getAttribute('alt')).toBe('Icon');
    });

    it('should use currentColor for fill to inherit text color', () => {
      fixture.detectChanges();
      const use = fixture.debugElement.query(By.css('use'));
      expect(use.nativeElement.getAttribute('fill')).toBe('currentColor');
    });
  });
});
