import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SIZES, SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

const ERROR_STATE_ICON_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'error_circle', label: 'error_circle' },
  { value: 'wifi_off', label: 'wifi_off' },
  { value: 'shield', label: 'shield' },
  { value: 'document_dismiss', label: 'document_dismiss' },
];

const ERROR_STATE_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'title',
    label: 'Title',
    type: 'text',
    description: 'Error title',
    defaultValue: 'Something went wrong',
    placeholder: 'Enter title',
    group: 'content',
    drawer: false,
  },
  {
    key: 'description',
    label: 'Description',
    type: 'text',
    description: 'Error description',
    defaultValue: 'An unexpected error occurred. Please try again later.',
    placeholder: 'Enter description',
    group: 'content',
    drawer: false,
  },
  {
    key: 'icon',
    label: 'Icon',
    type: 'dropdown',
    options: ERROR_STATE_ICON_OPTIONS,
    defaultValue: 'error_circle',
    group: 'appearance',
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
    key: 'showPrimary',
    label: 'Show Primary Action',
    type: 'switch',
    description: 'Show primary action button',
    defaultValue: false,
    group: 'actions',
  },
  {
    key: 'showSecondary',
    label: 'Show Secondary Action',
    type: 'switch',
    description: 'Show secondary action button',
    defaultValue: false,
    group: 'actions',
  },
];

const ERROR_STATE_FORM_CONTROLS = toDrawerFormControls(ERROR_STATE_CONTROL_DEFS);

export const ERROR_STATE_DRAWER_CONFIGS = createDrawerFormConfigs(ERROR_STATE_FORM_CONTROLS, {
  size: { excludeKey: 'size' },
  actions: { excludeKeys: ['showPrimary', 'showSecondary'] },
});

export const ERROR_STATE_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-error-state',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'actions', label: 'Actions', icon: SHOWCASE_GROUP_ICONS['behavior'] },
  ],
  controls: toShowcaseControls(ERROR_STATE_CONTROL_DEFS),
};
