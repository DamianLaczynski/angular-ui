import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toOptions,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import {
  ORIENTATIONS,
  SHOWCASE_GROUP_ICONS,
  SIZES,
} from '@shared/utils/showcase/component-options.utils';

const TOOLBAR_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    defaultValue: 'medium',
    group: 'layout',
  },
  {
    key: 'orientation',
    label: 'Orientation',
    type: 'dropdown',
    options: toOptions([...ORIENTATIONS]),
    defaultValue: 'horizontal',
    group: 'layout',
  },
  {
    key: 'useGroups',
    label: 'Use Groups',
    type: 'switch',
    description: 'Render grouped toolbar data',
    defaultValue: false,
    group: 'layout',
  },
  {
    key: 'withLabels',
    label: 'Show Labels',
    type: 'switch',
    description: 'Display text labels next to icons',
    defaultValue: false,
    group: 'content',
  },
  {
    key: 'disabled',
    label: 'Disabled Items',
    type: 'switch',
    description: 'Disable a subset of toolbar items',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'selected',
    label: 'Selected State',
    type: 'switch',
    description: 'Mark toggle-capable items as selected',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'overflow',
    label: 'Overflow',
    type: 'switch',
    description: 'Enable overflow styling mode',
    defaultValue: false,
    group: 'behavior',
  },
];

const ALL_CONTROLS = toDrawerFormControls(TOOLBAR_CONTROL_DEFS);

export const TOOLBAR_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: [] },
  labels: { excludeKeys: ['useGroups'] },
  grouped: { excludeKeys: ['useGroups'] },
  states: { excludeKeys: ['useGroups', 'withLabels', 'overflow'] },
  composition: { excludeKeys: ['useGroups', 'selected'] },
  itemTypes: { excludeKeys: ['useGroups', 'withLabels', 'selected'] },
});

export const TOOLBAR_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-toolbar',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'layout',
      label: 'Layout',
      icon: SHOWCASE_GROUP_ICONS['layout'],
      expanded: true,
    },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
  ],
  controls: toShowcaseControls(TOOLBAR_CONTROL_DEFS),
};
