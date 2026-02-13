import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

export const TOOLTIP_POSITIONS = ['top', 'bottom', 'left', 'right'] as const;
export const TOOLTIP_SIZES = ['small', 'medium', 'large'] as const;

const TOOLTIP_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'text',
    label: 'Text',
    type: 'text',
    description: 'Tooltip text content',
    defaultValue: 'This is a helpful tooltip',
    placeholder: 'Enter tooltip text',
    group: 'content',
    drawer: false,
  },
  {
    key: 'position',
    label: 'Position',
    type: 'dropdown',
    description: 'Tooltip position relative to trigger',
    options: toOptions([...TOOLTIP_POSITIONS]),
    defaultValue: 'top',
    group: 'appearance',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    description: 'Tooltip size',
    options: toOptions([...TOOLTIP_SIZES]),
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    description: 'Disable tooltip',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'delay',
    label: 'Delay (ms)',
    type: 'number',
    description: 'Delay before showing tooltip',
    defaultValue: 300,
    group: 'behavior',
    drawer: false,
  },
];

const ALL_CONTROLS = toDrawerFormControls(TOOLTIP_CONTROL_DEFS);

export const TOOLTIP_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: ['position', 'size'] },
  position: { excludeKey: 'position' },
  size: { excludeKey: 'size' },
  states: { excludeKey: 'disabled' },
  delay: { excludeKeys: [] },
});

export const TOOLTIP_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-tooltip',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'], expanded: true },
    { id: 'appearance', label: 'Appearance', icon: SHOWCASE_GROUP_ICONS['appearance'] },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
  ],
  controls: toShowcaseControls(TOOLTIP_CONTROL_DEFS),
};
