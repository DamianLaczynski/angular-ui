import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SIZES, SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

const STATE_OPTIONS = [
  { value: 'initial', label: 'Initial' },
  { value: 'loading', label: 'Loading' },
  { value: 'empty', label: 'Empty' },
  { value: 'loaded', label: 'Loaded' },
  { value: 'error', label: 'Error' },
];

const STATE_CONTAINER_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'state',
    label: 'State',
    type: 'dropdown',
    options: STATE_OPTIONS,
    defaultValue: 'loaded',
    group: 'data',
  },
  {
    key: 'showEmptyOnInitial',
    label: 'Show Empty on Initial',
    type: 'switch',
    description: 'Show empty state when in initial state',
    defaultValue: true,
    group: 'behavior',
  },
];

const STATE_CONTAINER_FORM_CONTROLS = toDrawerFormControls(STATE_CONTAINER_CONTROL_DEFS);

export const STATE_CONTAINER_DRAWER_CONFIGS = createDrawerFormConfigs(
  STATE_CONTAINER_FORM_CONTROLS,
  {
    states: { excludeKey: 'state' },
  },
);

export const STATE_CONTAINER_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-state-container',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    {
      id: 'data',
      label: 'Data State',
      icon: SHOWCASE_GROUP_ICONS['state'],
      expanded: true,
    },
    {
      id: 'behavior',
      label: 'Behavior',
      icon: SHOWCASE_GROUP_ICONS['behavior'],
    },
  ],
  controls: toShowcaseControls(STATE_CONTAINER_CONTROL_DEFS),
};
