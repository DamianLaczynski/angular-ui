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

const TAG_ICON_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'checkmark_circle', label: 'checkmark_circle' },
  { value: 'clock', label: 'clock' },
  { value: 'dismiss_circle', label: 'dismiss_circle' },
  { value: 'info', label: 'info' },
  { value: 'star', label: 'star' },
];

const TAG_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'text',
    label: 'Text',
    type: 'text',
    description: 'Tag text',
    defaultValue: 'Tag',
    placeholder: 'Enter tag text',
    group: 'content',
    drawer: false,
  },
  {
    key: 'secondaryText',
    label: 'Secondary Text',
    type: 'text',
    description: 'Secondary text (medium size only)',
    defaultValue: '',
    placeholder: 'Enter secondary text',
    group: 'content',
    drawer: false,
  },
  {
    key: 'icon',
    label: 'Icon',
    type: 'dropdown',
    options: TAG_ICON_OPTIONS,
    description: 'Tag icon',
    defaultValue: '',
    group: 'content',
  },
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
    defaultValue: 'tint',
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
    key: 'dismissible',
    label: 'Dismissible',
    type: 'switch',
    description: 'Show dismiss button',
    defaultValue: true,
    group: 'state',
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
    key: 'selectable',
    label: 'Selectable',
    type: 'switch',
    description: 'Tag is clickable when selectable',
    defaultValue: false,
    group: 'state',
  },
];

const TAG_FORM_CONTROLS = toDrawerFormControls(TAG_CONTROL_DEFS);

export const TAG_DRAWER_CONFIGS = createDrawerFormConfigs(TAG_FORM_CONTROLS, {
  overview: { excludeKeys: ['variant', 'appearance', 'size', 'shape'] },
  appearanceVariant: { excludeKeys: ['variant', 'appearance'] },
  size: { excludeKey: 'size' },
  shape: { excludeKey: 'shape' },
  icons: { excludeKeys: ['variant', 'appearance', 'icon'] },
  states: { excludeKeys: ['disabled', 'selected'] },
});

export const TAG_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-tag',
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
  controls: toShowcaseControls(TAG_CONTROL_DEFS),
};
