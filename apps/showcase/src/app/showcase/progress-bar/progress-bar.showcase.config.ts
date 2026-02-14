import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import {
  SHOWCASE_GROUP_ICONS,
  SIZES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';

const PROGRESS_BAR_TYPE_OPTIONS = [
  { value: 'determinate', label: 'determinate' },
  { value: 'indeterminate', label: 'indeterminate' },
];

const PROGRESS_PRESET_OPTIONS = [
  { value: '25', label: '25%' },
  { value: '50', label: '50%' },
  { value: '75', label: '75%' },
  { value: '100', label: '100%' },
];

const PROGRESS_BAR_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions(VARIANTS),
    description: 'Semantic color variant',
    defaultValue: 'primary',
    group: 'appearance',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    description: 'Progress bar height',
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'type',
    label: 'Type',
    type: 'dropdown',
    options: PROGRESS_BAR_TYPE_OPTIONS,
    description: 'Determinate or indeterminate',
    defaultValue: 'determinate',
    group: 'behavior',
  },
  {
    key: 'valuePreset',
    label: 'Value',
    type: 'dropdown',
    options: PROGRESS_PRESET_OPTIONS,
    description: 'Preset progress value',
    defaultValue: '75',
    group: 'behavior',
  },
];

const DRAWER_CONTROLS = toDrawerFormControls(PROGRESS_BAR_CONTROL_DEFS);

export const PROGRESS_BAR_DRAWER_CONFIGS = createDrawerFormConfigs(DRAWER_CONTROLS, {
  overview: { excludeKeys: [] },
  variant: { excludeKey: 'variant' },
  size: { excludeKey: 'size' },
  type: { excludeKey: 'type' },
  usage: { excludeKey: 'type' },
});

export const PROGRESS_BAR_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-progress-bar',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
  ],
  controls: [
    {
      key: 'variant',
      label: 'Variant',
      type: 'dropdown',
      options: toOptions(VARIANTS),
      description: 'Semantic color variant',
      defaultValue: 'primary',
      group: 'appearance',
    },
    {
      key: 'size',
      label: 'Size',
      type: 'dropdown',
      options: toOptions(SIZES),
      description: 'Progress bar height',
      defaultValue: 'medium',
      group: 'appearance',
    },
    {
      key: 'type',
      label: 'Type',
      type: 'dropdown',
      options: PROGRESS_BAR_TYPE_OPTIONS,
      description: 'Determinate or indeterminate',
      defaultValue: 'determinate',
      group: 'behavior',
    },
    {
      key: 'value',
      label: 'Value',
      type: 'number',
      description: 'Determinate value in percent',
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 1,
      group: 'behavior',
    },
  ],
};
