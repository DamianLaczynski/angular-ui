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
  SHOWCASE_GROUP_ICONS,
  SIZES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';

const MESSAGE_BAR_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'title',
    label: 'Title',
    type: 'text',
    description: 'Optional heading',
    defaultValue: 'Heads up',
    placeholder: 'Enter title',
    group: 'content',
    drawer: false,
  },
  {
    key: 'message',
    label: 'Message',
    type: 'textarea',
    description: 'Body content',
    defaultValue: 'This is a message bar with contextual information.',
    placeholder: 'Enter message',
    rows: 2,
    group: 'content',
    drawer: false,
  },
  {
    key: 'actionLabels',
    label: 'Action Labels',
    type: 'textarea',
    description: 'Comma-separated action labels',
    defaultValue: 'Review, Details',
    placeholder: 'Review, Details',
    rows: 2,
    group: 'content',
    drawer: false,
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    description: 'Semantic style',
    options: toOptions(VARIANTS),
    defaultValue: 'info',
    group: 'appearance',
  },
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    description: 'Visual style',
    options: toOptions(APPEARANCES),
    defaultValue: 'tint',
    group: 'appearance',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    description: 'Message bar size',
    options: toOptions(SIZES),
    defaultValue: 'medium',
    group: 'layout',
  },
  {
    key: 'multiline',
    label: 'Multiline',
    type: 'switch',
    description: 'Allow multi-line content',
    defaultValue: true,
    group: 'layout',
  },
  {
    key: 'showIcon',
    label: 'Show Icon',
    type: 'switch',
    description: 'Show status icon',
    defaultValue: true,
    group: 'options',
  },
  {
    key: 'icon',
    label: 'Icon',
    type: 'dropdown',
    description: 'Override status icon',
    options: [
      { value: '', label: 'auto' },
      { value: 'info', label: 'info' },
      { value: 'checkmark_circle', label: 'checkmark_circle' },
      { value: 'warning', label: 'warning' },
      { value: 'error_circle', label: 'error_circle' },
      { value: 'shield_error', label: 'shield_error' },
    ],
    defaultValue: '',
    group: 'options',
  },
  {
    key: 'dismissible',
    label: 'Dismissible',
    type: 'switch',
    description: 'Show dismiss button',
    defaultValue: true,
    group: 'options',
  },
];

const ALL_CONTROLS = toDrawerFormControls(MESSAGE_BAR_CONTROL_DEFS);

export const MESSAGE_BAR_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKey: 'variant' },
  size: { excludeKey: 'size' },
  layout: { excludeKey: 'multiline' },
});

export const MESSAGE_BAR_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-message-bar',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
    { id: 'options', label: 'Options', icon: SHOWCASE_GROUP_ICONS['behavior'] },
  ],
  controls: toShowcaseControls(MESSAGE_BAR_CONTROL_DEFS),
};
