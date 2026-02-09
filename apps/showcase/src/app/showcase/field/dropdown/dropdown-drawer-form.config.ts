import type { SectionDrawerFormControl } from '@shared/components/section-with-drawer';
import { SIZES } from '@shared/utils/showcase/component-options.utils';

const INPUT_VARIANTS = [
  { value: 'filled', label: 'filled' },
  { value: 'filled-gray', label: 'filled-gray' },
  { value: 'filled-lighter', label: 'filled-lighter' },
  { value: 'underlined', label: 'underlined' },
];

const MODES = [
  { value: 'single', label: 'single' },
  { value: 'multi', label: 'multi' },
];

const DROPDOWN_FORM_CONTROLS: SectionDrawerFormControl[] = [
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: INPUT_VARIANTS,
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: SIZES.map(s => ({ value: s, label: s })),
  },
  {
    key: 'mode',
    label: 'Mode',
    type: 'dropdown',
    options: MODES,
  },
  { key: 'searchable', label: 'Searchable', type: 'switch' },
  { key: 'clearable', label: 'Clearable', type: 'switch' },
  { key: 'disabled', label: 'Disabled', type: 'switch' },
  { key: 'required', label: 'Required', type: 'switch' },
];

function getDropdownSectionFormConfig(excludeKey: string): SectionDrawerFormControl[] {
  return DROPDOWN_FORM_CONTROLS.filter(c => c.key !== excludeKey);
}

function getDropdownSectionFormConfigExcluding(excludeKeys: string[]): SectionDrawerFormControl[] {
  return DROPDOWN_FORM_CONTROLS.filter(c => !excludeKeys.includes(c.key));
}

export const DROPDOWN_VARIANT_DRAWER_FORM_CONFIG = getDropdownSectionFormConfig('variant');
export const DROPDOWN_SIZE_DRAWER_FORM_CONFIG = getDropdownSectionFormConfig('size');
export const DROPDOWN_MODE_DRAWER_FORM_CONFIG = getDropdownSectionFormConfig('mode');
export const DROPDOWN_STATES_DRAWER_FORM_CONFIG = getDropdownSectionFormConfigExcluding([
  'disabled',
  'required',
]);

export const DROPDOWN_INPUT_VARIANTS = [
  'filled',
  'filled-gray',
  'filled-lighter',
  'underlined',
] as const;
export const DROPDOWN_MODES = ['single', 'multi'] as const;
