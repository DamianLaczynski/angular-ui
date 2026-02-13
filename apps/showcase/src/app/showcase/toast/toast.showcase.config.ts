import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import {
  VARIANTS,
  APPEARANCES,
  SIZES,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const TOAST_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'title',
    label: 'Title',
    type: 'text',
    description: 'Toast title',
    defaultValue: 'Toast Title',
    placeholder: 'Enter title',
    group: 'content',
    drawer: false,
  },
  {
    key: 'message',
    label: 'Message',
    type: 'textarea',
    description: 'Toast message',
    defaultValue: 'This is a toast message.',
    placeholder: 'Enter message',
    rows: 2,
    group: 'content',
    drawer: false,
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    description: 'Semantic color',
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
    defaultValue: 'filled',
    group: 'appearance',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    description: 'Toast size',
    options: toOptions(SIZES),
    defaultValue: 'medium',
    group: 'layout',
  },
  {
    key: 'dismissible',
    label: 'Dismissible',
    type: 'switch',
    description: 'Show dismiss button',
    defaultValue: true,
    group: 'options',
  },
  {
    key: 'showIcon',
    label: 'Show Icon',
    type: 'switch',
    description: 'Show variant icon',
    defaultValue: true,
    group: 'options',
  },
  {
    key: 'showProgress',
    label: 'Show Progress',
    type: 'switch',
    description: 'Show progress bar',
    defaultValue: false,
    group: 'options',
  },
];

const ALL_CONTROLS = toDrawerFormControls(TOAST_CONTROL_DEFS);

export const TOAST_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: ['variant', 'appearance'] },
  size: { excludeKey: 'size' },
  options: { excludeKeys: ['dismissible', 'showIcon', 'showProgress'] },
});

export const TOAST_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-toast',
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
  controls: toShowcaseControls(TOAST_CONTROL_DEFS),
};
