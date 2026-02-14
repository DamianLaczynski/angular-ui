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

const NAV_CHEVRON_POSITIONS = ['before', 'after'];
const NAV_INDICATOR_POSITIONS = ['horizontal', 'vertical'];

const NAV_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions(VARIANTS),
    defaultValue: 'primary',
    group: 'appearance',
  },
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    options: toOptions(APPEARANCES),
    defaultValue: 'subtle',
    group: 'appearance',
  },
  {
    key: 'shape',
    label: 'Shape',
    type: 'dropdown',
    options: toOptions(SHAPES),
    defaultValue: 'rounded',
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
    key: 'chevronPosition',
    label: 'Chevron Position',
    type: 'dropdown',
    options: toOptions(NAV_CHEVRON_POSITIONS),
    defaultValue: 'after',
    group: 'layout',
  },
  {
    key: 'indicatorPosition',
    label: 'Indicator Position',
    type: 'dropdown',
    options: toOptions(NAV_INDICATOR_POSITIONS),
    defaultValue: 'vertical',
    group: 'layout',
  },
  {
    key: 'showSelectionIndicator',
    label: 'Selection Indicator',
    type: 'switch',
    defaultValue: true,
    group: 'state',
  },
];

const ALL_CONTROLS = toDrawerFormControls(NAV_CONTROL_DEFS);

export const NAV_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: {
    excludeKeys: ['appearance', 'variant', 'size', 'shape'],
  },
  appearanceVariant: { excludeKeys: ['appearance', 'variant'] },
  size: { excludeKey: 'size' },
  shape: { excludeKey: 'shape' },
  chevronPosition: { excludeKey: 'chevronPosition' },
  selectionIndicator: { excludeKeys: [] },
});

export const NAV_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-nav',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(NAV_CONTROL_DEFS),
};
