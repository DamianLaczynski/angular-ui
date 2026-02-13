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
  SHAPES,
  SHOWCASE_GROUP_ICONS,
  SIZES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';

export const TREE_NODE_ICON_OPTIONS = [
  { value: 'folder', label: 'folder' },
  { value: 'document', label: 'document' },
  { value: 'image', label: 'image' },
  { value: 'settings', label: 'settings' },
  { value: 'home', label: 'home' },
  { value: 'star', label: 'star' },
];

const CHEVRON_POSITION_OPTIONS = [
  { value: 'before', label: 'before' },
  { value: 'after', label: 'after' },
];

const ORIENTATION_OPTIONS = [
  { value: 'vertical', label: 'vertical' },
  { value: 'horizontal', label: 'horizontal' },
];

const CHEVRON_COLLAPSED_ICON_OPTIONS = [
  { value: 'chevron_right', label: 'chevron_right' },
  { value: 'arrow_right', label: 'arrow_right' },
  { value: 'chevron_down', label: 'chevron_down' },
];

const CHEVRON_EXPANDED_ICON_OPTIONS = [
  { value: 'chevron_down', label: 'chevron_down' },
  { value: 'arrow_down', label: 'arrow_down' },
  { value: 'chevron_right', label: 'chevron_right' },
];

const TREE_NODE_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    description: 'Node label text',
    defaultValue: 'Documents',
    placeholder: 'Enter node label',
    group: 'content',
    drawer: false,
  },
  {
    key: 'icon',
    label: 'Icon',
    type: 'dropdown',
    options: TREE_NODE_ICON_OPTIONS,
    description: 'Node icon',
    defaultValue: 'folder',
    group: 'content',
  },
  {
    key: 'hasChildren',
    label: 'Has Children',
    type: 'switch',
    description: 'Render as expandable node',
    defaultValue: true,
    group: 'content',
  },
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
    options: CHEVRON_POSITION_OPTIONS,
    defaultValue: 'before',
    group: 'layout',
  },
  {
    key: 'chevronIconCollapsed',
    label: 'Chevron Icon (Collapsed)',
    type: 'dropdown',
    options: CHEVRON_COLLAPSED_ICON_OPTIONS,
    defaultValue: 'chevron_right',
    group: 'layout',
  },
  {
    key: 'chevronIconExpanded',
    label: 'Chevron Icon (Expanded)',
    type: 'dropdown',
    options: CHEVRON_EXPANDED_ICON_OPTIONS,
    defaultValue: 'chevron_down',
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
    description: 'Display selection indicator',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'indicatorPosition',
    label: 'Indicator Position',
    type: 'dropdown',
    options: ORIENTATION_OPTIONS,
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
    key: 'expandOnClick',
    label: 'Expand On Click',
    type: 'switch',
    description: 'Expand/collapse on click',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'selectOnClick',
    label: 'Select On Click',
    type: 'switch',
    description: 'Toggle selection on click',
    defaultValue: true,
    group: 'behavior',
  },
  {
    key: 'draggable',
    label: 'Draggable',
    type: 'switch',
    description: 'Enable drag',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'dropZone',
    label: 'Drop Zone',
    type: 'switch',
    description: 'Enable drop target',
    defaultValue: false,
    group: 'behavior',
  },
];

const DRAWER_CONTROLS = toDrawerFormControls(TREE_NODE_CONTROL_DEFS);

export const TREE_NODE_DRAWER_CONFIGS = createDrawerFormConfigs(DRAWER_CONTROLS, {
  overview: { excludeKeys: [] },
  appearance: { excludeKey: 'appearance' },
  shape: { excludeKey: 'shape' },
  size: { excludeKey: 'size' },
  chevron: { excludeKey: 'chevronPosition' },
  indicator: { excludeKey: 'indicatorPosition' },
  states: { excludeKeys: ['selected', 'disabled'] },
});

export const TREE_NODE_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-tree-node',
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
  controls: toShowcaseControls(TREE_NODE_CONTROL_DEFS),
};
