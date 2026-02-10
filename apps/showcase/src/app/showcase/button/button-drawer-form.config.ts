import type { SectionDrawerFormControl } from '@shared/components/section-with-drawer';
import {
  VARIANTS,
  APPEARANCES,
  SIZES,
  SHAPES,
} from '@shared/utils/showcase/component-options.utils';

const ICON_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'star', label: 'star' },
  { value: 'checkmark', label: 'checkmark' },
  { value: 'delete', label: 'delete' },
  { value: 'info', label: 'info' },
  { value: 'settings', label: 'settings' },
  { value: 'home', label: 'home' },
];

const ALL_CONTROLS: SectionDrawerFormControl[] = [
  { key: 'icon', label: 'Icon', type: 'dropdown', options: ICON_OPTIONS },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: VARIANTS.map(v => ({ value: v, label: v })),
  },
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    options: APPEARANCES.map(a => ({ value: a, label: a })),
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: SIZES.map(s => ({ value: s, label: s })),
  },
  {
    key: 'shape',
    label: 'Shape',
    type: 'dropdown',
    options: SHAPES.map(s => ({ value: s, label: s })),
  },
  { key: 'fullWidth', label: 'Full width', type: 'switch' },
  { key: 'disabled', label: 'Disabled', type: 'switch' },
  { key: 'selectable', label: 'Selectable', type: 'switch' },
  { key: 'selected', label: 'Selected', type: 'switch' },
  { key: 'loading', label: 'Loading', type: 'switch' },
];

export function getButtonSectionFormConfig(excludeKey: string): SectionDrawerFormControl[] {
  return ALL_CONTROLS.filter(c => c.key !== excludeKey);
}

export function getButtonSectionFormConfigExcluding(
  excludeKeys: string[],
): SectionDrawerFormControl[] {
  return ALL_CONTROLS.filter(c => !excludeKeys.includes(c.key));
}

export const OVERVIEW_DRAWER_FORM_CONFIG = getButtonSectionFormConfigExcluding([
  'appearance',
  'variant',
  'size',
  'shape',
]);
export const APPEARANCE_VARIANT_DRAWER_FORM_CONFIG = getButtonSectionFormConfigExcluding([
  'appearance',
  'variant',
]);
export const SIZE_DRAWER_FORM_CONFIG = getButtonSectionFormConfig('size');
export const SHAPE_DRAWER_FORM_CONFIG = getButtonSectionFormConfig('shape');
export const ICONS_DRAWER_FORM_CONFIG = getButtonSectionFormConfigExcluding([
  'appearance',
  'variant',
  'icon',
]);
export const STATES_DRAWER_FORM_CONFIG = getButtonSectionFormConfigExcluding([
  'disabled',
  'selected',
  'loading',
]);
