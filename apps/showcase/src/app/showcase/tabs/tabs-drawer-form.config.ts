import type { SectionDrawerFormControl } from '@shared/components/section-with-drawer';
import {
  VARIANTS,
  APPEARANCES,
  SIZES,
  SHAPES,
} from '@shared/utils/showcase/component-options.utils';

const ORIENTATIONS = [
  { value: 'horizontal', label: 'horizontal' },
  { value: 'vertical', label: 'vertical' },
];

const TABS_FORM_CONTROLS: SectionDrawerFormControl[] = [
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
  {
    key: 'orientation',
    label: 'Orientation',
    type: 'dropdown',
    options: ORIENTATIONS,
  },
  { key: 'showSelectionIndicator', label: 'Show selection indicator', type: 'switch' },
  { key: 'fullWidth', label: 'Full width', type: 'switch' },
];

function getTabsSectionFormConfig(excludeKey: string): SectionDrawerFormControl[] {
  return TABS_FORM_CONTROLS.filter(c => c.key !== excludeKey);
}

export const TABS_APPEARANCE_DRAWER_FORM_CONFIG = getTabsSectionFormConfig('appearance');
export const TABS_VARIANT_DRAWER_FORM_CONFIG = getTabsSectionFormConfig('variant');
export const TABS_SIZE_DRAWER_FORM_CONFIG = getTabsSectionFormConfig('size');
export const TABS_SHAPE_DRAWER_FORM_CONFIG = getTabsSectionFormConfig('shape');
export const TABS_ORIENTATION_DRAWER_FORM_CONFIG = getTabsSectionFormConfig('orientation');

export const TABS_ORIENTATIONS = ['horizontal', 'vertical'] as const;
