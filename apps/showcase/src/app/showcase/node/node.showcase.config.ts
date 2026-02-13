import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toOptions,
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

const NODE_ICON_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'folder', label: 'folder' },
  { value: 'document', label: 'document' },
  { value: 'image', label: 'image' },
  { value: 'settings', label: 'settings' },
  { value: 'home', label: 'home' },
  { value: 'person', label: 'person' },
];

const NODE_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    description: 'Node label text',
    defaultValue: 'Documents',
    placeholder: 'Enter node label',
    group: 'content',
  },
  {
    key: 'icon',
    label: 'Icon',
    type: 'dropdown',
    description: 'Node icon',
    options: NODE_ICON_OPTIONS,
    defaultValue: 'folder',
    group: 'content',
  },
  {
    key: 'closable',
    label: 'Closable',
    type: 'switch',
    description: 'Show close button',
    defaultValue: false,
    group: 'content',
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    description: 'Color variant',
    options: toOptions(VARIANTS),
    defaultValue: 'primary',
    group: 'appearance',
  },
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    description: 'Visual style',
    options: toOptions(APPEARANCES),
    defaultValue: 'subtle',
    group: 'appearance',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    description: 'Node size',
    options: toOptions(SIZES),
    defaultValue: 'medium',
    group: 'layout',
  },
  {
    key: 'shape',
    label: 'Shape',
    type: 'dropdown',
    description: 'Node shape',
    options: toOptions(SHAPES),
    defaultValue: 'rounded',
    group: 'layout',
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
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    description: 'Disabled state',
    defaultValue: false,
    group: 'state',
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
    key: 'indicatorPosition',
    label: 'Indicator Position',
    type: 'dropdown',
    description: 'Position of selection indicator',
    options: toOptions([...ORIENTATIONS]),
    defaultValue: 'vertical',
    group: 'state',
  },
  {
    key: 'asButton',
    label: 'As Button',
    type: 'switch',
    description: 'Render node as button',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'selectOnClick',
    label: 'Select On Click',
    type: 'switch',
    description: 'Select node on click',
    defaultValue: true,
    group: 'behavior',
  },
  {
    key: 'draggable',
    label: 'Draggable',
    type: 'switch',
    description: 'Enable drag and drop',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'dropZone',
    label: 'Drop Zone',
    type: 'switch',
    description: 'Enable drop zones',
    defaultValue: false,
    group: 'behavior',
  },
];

const ALL_CONTROLS = toDrawerFormControls(NODE_CONTROL_DEFS);

export const NODE_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: ['appearance', 'variant', 'size', 'shape'] },
  appearanceVariant: { excludeKeys: ['appearance', 'variant'] },
  size: { excludeKey: 'size' },
  shape: { excludeKey: 'shape' },
  selectionIndicator: { excludeKeys: ['selected', 'showSelectionIndicator', 'indicatorPosition'] },
  states: { excludeKeys: ['selected', 'disabled', 'closable'] },
  quickActions: { excludeKeys: ['closable', 'asButton', 'selectOnClick', 'draggable', 'dropZone'] },
});

export const NODE_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-node',
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
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
  ],
  controls: toShowcaseControls(NODE_CONTROL_DEFS),
};
