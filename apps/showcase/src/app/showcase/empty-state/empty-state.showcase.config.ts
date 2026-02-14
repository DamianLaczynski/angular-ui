import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SIZES, SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

const EMPTY_STATE_ICON_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'document', label: 'document' },
  { value: 'search', label: 'search' },
  { value: 'add', label: 'add' },
  { value: 'database', label: 'database' },
  { value: 'shield', label: 'shield' },
  { value: 'list', label: 'list' },
];

const EMPTY_STATE_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'title',
    label: 'Title',
    type: 'text',
    description: 'Empty state title',
    defaultValue: 'No items found',
    placeholder: 'Enter title',
    group: 'content',
    drawer: false,
  },
  {
    key: 'description',
    label: 'Description',
    type: 'text',
    description: 'Empty state description',
    defaultValue: 'There are no items to display at this time.',
    placeholder: 'Enter description',
    group: 'content',
    drawer: false,
  },
  {
    key: 'icon',
    label: 'Icon',
    type: 'dropdown',
    options: EMPTY_STATE_ICON_OPTIONS,
    defaultValue: 'document',
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

const EMPTY_STATE_FORM_CONTROLS = toDrawerFormControls(EMPTY_STATE_CONTROL_DEFS);

export const EMPTY_STATE_DRAWER_CONFIGS = createDrawerFormConfigs(EMPTY_STATE_FORM_CONTROLS, {
  size: { excludeKey: 'size' },
  actions: { excludeKeys: ['showPrimary', 'showSecondary'] },
});

export const EMPTY_STATE_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-empty-state',
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
  controls: toShowcaseControls(EMPTY_STATE_CONTROL_DEFS),
};
