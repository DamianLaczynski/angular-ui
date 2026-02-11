import type { Appearance, IconName, Shape, Size, Variant } from 'angular-ui';

export const VARIANTS: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

export const APPEARANCES: Appearance[] = ['filled', 'tint', 'outline', 'subtle', 'transparent'];

export const SIZES: Size[] = ['small', 'medium', 'large'];

export const SHAPES: Shape[] = ['rounded', 'circular', 'square'];

export const INPUT_VARIANTS = ['filled', 'filled-gray', 'filled-lighter', 'underlined'] as const;

export const DROPDOWN_MODES = ['single', 'multi'] as const;

export const TABS_ORIENTATIONS = ['horizontal', 'vertical'] as const;

export const ICON_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'None' },
  { value: 'star', label: 'star' },
  { value: 'checkmark', label: 'checkmark' },
  { value: 'delete', label: 'delete' },
  { value: 'info', label: 'info' },
  { value: 'settings', label: 'settings' },
  { value: 'home', label: 'home' },
];

export const SHOWCASE_GROUP_ICONS: Record<string, IconName> = {
  content: 'text_font',
  appearance: 'color',
  layout: 'resize',
  state: 'toggle_left',
  behavior: 'settings',
};
