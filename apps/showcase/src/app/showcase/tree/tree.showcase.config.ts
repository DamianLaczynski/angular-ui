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
  SHOWCASE_GROUP_ICONS,
  SIZES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';

const TREE_CONTROL_DEFS: SharedControlDef[] = [
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
    defaultValue: 'subtle',
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
    key: 'chevronPosition',
    label: 'Chevron Position',
    type: 'dropdown',
    options: toOptions(['before', 'after']),
    description: 'Position of expand/collapse chevron',
    defaultValue: 'before',
    group: 'layout',
  },
  {
    key: 'indicatorPosition',
    label: 'Indicator Position',
    type: 'dropdown',
    options: toOptions([...ORIENTATIONS]),
    description: 'Position of selection indicator',
    defaultValue: 'vertical',
    group: 'layout',
  },
  {
    key: 'asButton',
    label: 'As Button',
    type: 'switch',
    description: 'Render nodes as buttons',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'expandOnClick',
    label: 'Expand On Click',
    type: 'switch',
    description: 'Expand/collapse on node click',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'selectOnClick',
    label: 'Select On Click',
    type: 'switch',
    description: 'Select node on click',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'showSelectionIndicator',
    label: 'Show Selection Indicator',
    type: 'switch',
    description: 'Show visual selection indicator',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'draggable',
    label: 'Draggable',
    type: 'switch',
    description: 'Enable drag and drop',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'dropZone',
    label: 'Drop Zone',
    type: 'switch',
    description: 'Enable drop zones',
    defaultValue: false,
    group: 'state',
  },
];

const ALL_CONTROLS = toDrawerFormControls(TREE_CONTROL_DEFS);

export const TREE_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  appearanceVariant: { excludeKeys: ['appearance', 'variant'] },
  size: { excludeKey: 'size' },
  shape: { excludeKey: 'shape' },
  selectionIndicator: { excludeKeys: ['showSelectionIndicator', 'indicatorPosition'] },
  chevronPosition: { excludeKey: 'chevronPosition' },
  dragDrop: { excludeKeys: ['draggable', 'dropZone'] },
});

export const TREE_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-tree',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(TREE_CONTROL_DEFS),
};
