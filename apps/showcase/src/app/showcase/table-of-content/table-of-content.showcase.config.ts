import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import {
  APPEARANCES,
  ORIENTATIONS,
  SHAPES,
  SIZES,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const LEVEL_OPTIONS = [1, 2, 3, 4, 5, 6].map(level => ({
  value: level,
  label: `H${level}`,
}));

const OFFSET_TOP_OPTIONS = [0, 20, 40, 80].map(value => ({
  value,
  label: `${value}px`,
}));

const TABLE_OF_CONTENT_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    defaultValue: 'medium',
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
    key: 'showSelectionIndicator',
    label: 'Show Selection Indicator',
    type: 'switch',
    defaultValue: true,
    group: 'indicator',
  },
  {
    key: 'indicatorPosition',
    label: 'Indicator Position',
    type: 'dropdown',
    options: toOptions([...ORIENTATIONS]),
    defaultValue: 'vertical',
    group: 'indicator',
  },
  {
    key: 'sticky',
    label: 'Sticky',
    type: 'switch',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'offsetTop',
    label: 'Offset Top',
    type: 'dropdown',
    options: OFFSET_TOP_OPTIONS,
    defaultValue: 0,
    group: 'behavior',
  },
  {
    key: 'minLevel',
    label: 'Min Level',
    type: 'dropdown',
    options: LEVEL_OPTIONS,
    defaultValue: 1,
    group: 'structure',
  },
  {
    key: 'maxLevel',
    label: 'Max Level',
    type: 'dropdown',
    options: LEVEL_OPTIONS,
    defaultValue: 4,
    group: 'structure',
  },
];

const ALL_DRAWER_CONTROLS = toDrawerFormControls(TABLE_OF_CONTENT_CONTROL_DEFS);

export const TABLE_OF_CONTENT_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_DRAWER_CONTROLS, {
  size: { excludeKey: 'size' },
  appearanceShape: { excludeKeys: ['appearance', 'shape'] },
  selectionIndicator: { excludeKeys: ['showSelectionIndicator', 'indicatorPosition'] },
  stickyOffset: { excludeKeys: ['sticky', 'offsetTop'] },
  headingLevels: { excludeKeys: ['minLevel', 'maxLevel'] },
});

export const TABLE_OF_CONTENT_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-table-of-content',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'indicator', label: 'Indicator', icon: SHOWCASE_GROUP_ICONS['state'] },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
    { id: 'structure', label: 'Structure', icon: SHOWCASE_GROUP_ICONS['layout'] },
  ],
  controls: toShowcaseControls(TABLE_OF_CONTENT_CONTROL_DEFS),
};
