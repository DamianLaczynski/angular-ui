import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import {
  VARIANTS,
  APPEARANCES,
  SIZES,
  SHAPES,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const MENU_ICON_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'edit', label: 'edit' },
  { value: 'folder', label: 'folder' },
  { value: 'more_horizontal', label: 'more_horizontal' },
  { value: 'more_vertical', label: 'more_vertical' },
];

const MENU_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'triggerVariant',
    label: 'Trigger variant',
    type: 'dropdown',
    options: [
      { value: 'dropdown', label: 'dropdown (trigger)' },
      { value: 'split', label: 'split (trigger)' },
      { value: 'button', label: 'button (bez chevron)' },
    ],
    defaultValue: 'dropdown',
    group: 'content',
  },
  {
    key: 'text',
    label: 'Text',
    type: 'text',
    description: 'Button label text',
    defaultValue: 'Open Menu',
    placeholder: 'Button text',
    group: 'content',
  },
  {
    key: 'icon',
    label: 'Icon',
    type: 'dropdown',
    options: MENU_ICON_OPTIONS,
    description: 'Icon name',
    defaultValue: '',
    group: 'content',
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions(VARIANTS),
    description: 'Color variant',
    defaultValue: 'primary',
    group: 'appearance',
  },
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    options: toOptions(APPEARANCES),
    description: 'Visual style',
    defaultValue: 'filled',
    group: 'appearance',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    defaultValue: 'medium',
    group: 'layout',
  },
  {
    key: 'shape',
    label: 'Shape',
    type: 'dropdown',
    options: toOptions(SHAPES),
    defaultValue: 'rounded',
    group: 'layout',
  },
  {
    key: 'fullWidth',
    label: 'Full Width',
    type: 'switch',
    description: 'Full width button',
    defaultValue: false,
    group: 'layout',
  },
  {
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    description: 'Disable menu',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'selected',
    label: 'Selected',
    type: 'switch',
    description: 'Selected state',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'ariaLabel',
    label: 'Aria label',
    type: 'text',
    description: 'Accessibility label',
    defaultValue: 'Open menu',
    placeholder: 'Accessibility label',
    group: 'content',
    drawer: false,
  },
  {
    key: 'menuMaxHeight',
    label: 'Menu max height',
    type: 'text',
    description: 'Max height of dropdown panel',
    defaultValue: '300px',
    placeholder: 'e.g. 300px',
    group: 'layout',
    drawer: false,
  },
];

const ALL_CONTROLS = toDrawerFormControls(MENU_CONTROL_DEFS);

export const MENU_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: ['appearance', 'variant', 'triggerVariant'] },
  triggerVariant: { excludeKey: 'triggerVariant' },
  appearanceVariant: { excludeKeys: ['appearance', 'variant'] },
  size: { excludeKey: 'size' },
  states: { excludeKeys: ['disabled', 'selected', 'fullWidth'] },
});

export const MENU_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-menu',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(MENU_CONTROL_DEFS),
};
