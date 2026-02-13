import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import {
  SIZES,
  SHAPES,
  ORIENTATIONS,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

export const ACCORDION_APPEARANCES = ['transparent', 'subtle', 'filled'] as const;

const ACCORDION_ICON_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'folder', label: 'Folder' },
  { value: 'settings', label: 'Settings' },
  { value: 'info', label: 'Info' },
  { value: 'star', label: 'Star' },
];

const ACCORDION_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    description: 'Accordion header label',
    defaultValue: 'Accordion',
    placeholder: 'Enter label',
    group: 'content',
    drawer: false,
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions([...SIZES]),
    defaultValue: 'medium',
    group: 'layout',
  },
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    options: toOptions([...ACCORDION_APPEARANCES]),
    defaultValue: 'subtle',
    group: 'appearance',
  },
  {
    key: 'shape',
    label: 'Shape',
    type: 'dropdown',
    options: toOptions([...SHAPES]),
    defaultValue: 'rounded',
    group: 'appearance',
  },
  {
    key: 'chevronPosition',
    label: 'Chevron Position',
    type: 'dropdown',
    options: [
      { value: 'before', label: 'Before' },
      { value: 'after', label: 'After' },
    ],
    defaultValue: 'before',
    group: 'layout',
  },
  {
    key: 'icon',
    label: 'Icon',
    type: 'dropdown',
    options: ACCORDION_ICON_OPTIONS,
    defaultValue: '',
    group: 'appearance',
  },
  {
    key: 'showIndicator',
    label: 'Show Indicator',
    type: 'switch',
    description: 'Selection indicator',
    defaultValue: false,
    group: 'appearance',
  },
  {
    key: 'indicatorPosition',
    label: 'Indicator Position',
    type: 'dropdown',
    options: toOptions([...ORIENTATIONS]),
    defaultValue: 'vertical',
    group: 'appearance',
  },
  {
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    description: 'Disable accordion',
    defaultValue: false,
    group: 'state',
  },
];

const ACCORDION_FORM_CONTROLS = toDrawerFormControls(ACCORDION_CONTROL_DEFS);

export const ACCORDION_DRAWER_CONFIGS = createDrawerFormConfigs(ACCORDION_FORM_CONTROLS, {
  overview: { excludeKeys: ['appearance', 'shape', 'size'] },
  appearanceShape: { excludeKeys: ['appearance', 'shape'] },
  size: { excludeKey: 'size' },
  chevronPosition: { excludeKey: 'chevronPosition' },
  icons: { excludeKeys: ['appearance', 'shape', 'icon'] },
  selectionIndicators: { excludeKeys: ['showIndicator', 'indicatorPosition'] },
  states: { excludeKeys: ['disabled'] },
});

export const ACCORDION_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-accordion',
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
  controls: toShowcaseControls(ACCORDION_CONTROL_DEFS),
};
