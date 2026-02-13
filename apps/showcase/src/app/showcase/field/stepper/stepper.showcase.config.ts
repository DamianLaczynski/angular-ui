import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import {
  ORIENTATIONS,
  SHOWCASE_GROUP_ICONS,
  SIZES,
} from '@shared/utils/showcase/component-options.utils';

const STEPPER_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'orientation',
    label: 'Orientation',
    type: 'dropdown',
    options: toOptions([...ORIENTATIONS]),
    defaultValue: 'horizontal',
    group: 'appearance',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions([...SIZES]),
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'showLabels',
    label: 'Show Labels',
    type: 'switch',
    defaultValue: true,
    group: 'content',
  },
  {
    key: 'showDescriptions',
    label: 'Show Descriptions',
    type: 'switch',
    defaultValue: false,
    group: 'content',
  },
  {
    key: 'linear',
    label: 'Linear',
    type: 'switch',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'clickable',
    label: 'Clickable',
    type: 'switch',
    defaultValue: true,
    group: 'behavior',
  },
];

const STEPPER_FORM_CONTROLS = toDrawerFormControls(STEPPER_CONTROL_DEFS);

export const STEPPER_DRAWER_CONFIGS = createDrawerFormConfigs(STEPPER_FORM_CONTROLS, {
  overview: { excludeKeys: ['orientation', 'size'] },
  orientation: { excludeKey: 'orientation' },
  size: { excludeKey: 'size' },
  behavior: { excludeKeys: ['linear', 'clickable'] },
});

export const STEPPER_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-stepper',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
  ],
  controls: toShowcaseControls(STEPPER_CONTROL_DEFS),
};
