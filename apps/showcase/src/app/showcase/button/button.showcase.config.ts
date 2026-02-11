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
  ICON_OPTIONS,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const BUTTON_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'text',
    label: 'Text',
    type: 'text',
    description: 'Button label text',
    defaultValue: 'Button',
    placeholder: 'Enter button text',
    group: 'content',
  },
  {
    key: 'icon',
    label: 'Icon',
    type: 'dropdown',
    options: ICON_OPTIONS,
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
    description: 'Disable button',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'selectable',
    label: 'Selectable',
    type: 'switch',
    description: 'Click toggles selected state',
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
    key: 'loading',
    label: 'Loading',
    type: 'switch',
    description: 'Loading state with spinner',
    defaultValue: false,
    group: 'state',
  },
];

const ALL_CONTROLS = toDrawerFormControls(BUTTON_CONTROL_DEFS);

export const BUTTON_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: ['appearance', 'variant', 'size', 'shape'] },
  appearanceVariant: { excludeKeys: ['appearance', 'variant'] },
  size: { excludeKey: 'size' },
  shape: { excludeKey: 'shape' },
  icons: { excludeKeys: ['appearance', 'variant', 'icon'] },
  states: { excludeKeys: ['disabled', 'selected', 'loading'] },
});

export const BUTTON_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-button',
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
  controls: toShowcaseControls(BUTTON_CONTROL_DEFS),
};
