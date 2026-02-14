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
  SIZES,
  SHAPES,
  SCROLL_PANEL_ORIENTATIONS,
  SCROLL_PANEL_BEHAVIORS,
  SCROLL_PANEL_MAX_HEIGHTS,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const INDICATOR_POSITIONS = ['horizontal', 'vertical'] as const;

const SCROLL_CONTAINER_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'nodeSize',
    label: 'Node Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    description: 'Size of node items',
    defaultValue: 'medium',
    group: 'layout',
  },
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    options: toOptions(APPEARANCES),
    description: 'Visual style of nodes',
    defaultValue: 'subtle',
    group: 'appearance',
  },
  {
    key: 'shape',
    label: 'Shape',
    type: 'dropdown',
    options: toOptions(SHAPES),
    description: 'Border radius of nodes',
    defaultValue: 'rounded',
    group: 'layout',
  },
  {
    key: 'maxHeight',
    label: 'Max Height',
    type: 'dropdown',
    options: SCROLL_PANEL_MAX_HEIGHTS,
    description: 'Maximum height of scroll container',
    defaultValue: '400px',
    group: 'layout',
  },
  {
    key: 'showSelectionIndicator',
    label: 'Show Selection Indicator',
    type: 'switch',
    description: 'Show selection indicator on nodes',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'indicatorPosition',
    label: 'Indicator Position',
    type: 'dropdown',
    options: toOptions([...INDICATOR_POSITIONS]),
    description: 'Position of selection indicator',
    defaultValue: 'horizontal',
    group: 'behavior',
  },
  {
    key: 'asButton',
    label: 'As Button',
    type: 'switch',
    description: 'Render nodes as buttons with click handling',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'selectOnClick',
    label: 'Select On Click',
    type: 'switch',
    description: 'Select item on click when selection indicator is shown',
    defaultValue: true,
    group: 'behavior',
  },
  {
    key: 'orientation',
    label: 'Orientation',
    type: 'dropdown',
    options: toOptions([...SCROLL_PANEL_ORIENTATIONS]),
    description: 'Scroll orientation',
    defaultValue: 'vertical',
    group: 'layout',
  },
  {
    key: 'scrollbarBehavior',
    label: 'Scrollbar Behavior',
    type: 'dropdown',
    options: toOptions([...SCROLL_PANEL_BEHAVIORS]),
    description: 'When to show scrollbar',
    defaultValue: 'auto',
    group: 'layout',
  },
];

const ALL_CONTROLS = toDrawerFormControls(SCROLL_CONTAINER_CONTROL_DEFS);

export const SCROLL_CONTAINER_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: ['nodeSize', 'appearance', 'shape'] },
  nodeSize: { excludeKey: 'nodeSize' },
  appearance: { excludeKey: 'appearance' },
  shape: { excludeKey: 'shape' },
  behavior: {
    excludeKeys: ['showSelectionIndicator', 'indicatorPosition', 'asButton', 'selectOnClick'],
  },
});

export const SCROLL_CONTAINER_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-scroll-container',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
  ],
  controls: toShowcaseControls(SCROLL_CONTAINER_CONTROL_DEFS),
};
