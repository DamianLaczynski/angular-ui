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
  SHAPES,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const AVATAR_ICON_OPTIONS: { value: string; label: string }[] = [
  { value: 'person', label: 'person' },
  { value: 'star', label: 'star' },
  { value: 'settings', label: 'settings' },
  { value: 'home', label: 'home' },
  { value: 'info', label: 'info' },
];

const AVATAR_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'contentType',
    label: 'Content Type',
    type: 'dropdown',
    description: 'Type of content to display',
    options: [
      { value: 'image', label: 'Image' },
      { value: 'initials', label: 'Initials' },
      { value: 'name', label: 'Name (Auto Initials)' },
      { value: 'icon', label: 'Icon' },
    ],
    defaultValue: 'initials',
    group: 'content',
  },
  {
    key: 'image',
    label: 'Image URL',
    type: 'text',
    description: 'Image URL for avatar',
    defaultValue: 'https://i.pravatar.cc/150?img=1',
    placeholder: 'Enter image URL',
    group: 'content',
    drawer: false,
  },
  {
    key: 'initials',
    label: 'Initials',
    type: 'text',
    description: 'Initials to display',
    defaultValue: 'JD',
    placeholder: 'Enter initials',
    group: 'content',
    drawer: false,
  },
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    description: 'Full name (will generate initials)',
    defaultValue: 'John Doe',
    placeholder: 'Enter name',
    group: 'content',
    drawer: false,
  },
  {
    key: 'icon',
    label: 'Icon',
    type: 'dropdown',
    options: AVATAR_ICON_OPTIONS,
    description: 'Icon name',
    defaultValue: '',
    group: 'content',
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions(VARIANTS),
    description: 'Color variant',
    defaultValue: 'secondary',
    group: 'appearance',
  },
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    options: toOptions(APPEARANCES),
    description: 'Visual style',
    defaultValue: 'filled',
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
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    description: 'Disable avatar',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'loading',
    label: 'Loading',
    type: 'switch',
    description: 'Loading state with spinner',
    defaultValue: false,
    group: 'state',
  },
];

const ALL_CONTROLS = toDrawerFormControls(AVATAR_CONTROL_DEFS);

export const AVATAR_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: ['appearance', 'variant', 'size', 'shape'] },
  appearanceVariant: { excludeKeys: ['appearance', 'variant'] },
  size: { excludeKey: 'size' },
  shape: { excludeKey: 'shape' },
  states: { excludeKeys: ['disabled', 'loading'] },
});

export const AVATAR_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-avatar',
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
  ],
  controls: toShowcaseControls(AVATAR_CONTROL_DEFS),
};
