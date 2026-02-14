import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SIZES, SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

const LOADING_STATE_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'title',
    label: 'Title',
    type: 'text',
    description: 'Loading title',
    defaultValue: 'Loading data...',
    placeholder: 'Enter title',
    group: 'content',
    drawer: false,
  },
  {
    key: 'description',
    label: 'Description',
    type: 'text',
    description: 'Loading description',
    defaultValue: 'Please wait while we fetch the information.',
    placeholder: 'Enter description',
    group: 'content',
    drawer: false,
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'spinnerSize',
    label: 'Spinner Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'overlay',
    label: 'Overlay',
    type: 'switch',
    description: 'Display as overlay on content',
    defaultValue: false,
    group: 'options',
  },
  {
    key: 'blurContent',
    label: 'Blur Content',
    type: 'switch',
    description: 'Blur content behind overlay',
    defaultValue: true,
    group: 'options',
  },
  {
    key: 'fullScreen',
    label: 'Full Screen',
    type: 'switch',
    description: 'Full screen overlay',
    defaultValue: false,
    group: 'options',
  },
];

const LOADING_STATE_FORM_CONTROLS = toDrawerFormControls(LOADING_STATE_CONTROL_DEFS);

export const LOADING_STATE_DRAWER_CONFIGS = createDrawerFormConfigs(LOADING_STATE_FORM_CONTROLS, {
  size: { excludeKey: 'size' },
  spinnerSize: { excludeKey: 'spinnerSize' },
  overlay: { excludeKeys: ['overlay', 'blurContent'] },
});

export const LOADING_STATE_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-loading-state',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'options', label: 'Options', icon: SHOWCASE_GROUP_ICONS['behavior'] },
  ],
  controls: toShowcaseControls(LOADING_STATE_CONTROL_DEFS),
};
