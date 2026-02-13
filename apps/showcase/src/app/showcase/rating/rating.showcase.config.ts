import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SIZES, SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

const MAX_OPTIONS = [
  { value: 5, label: '5' },
  { value: 7, label: '7' },
  { value: 10, label: '10' },
];

const RATING_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'value',
    label: 'Value',
    type: 'number',
    description: 'Current rating value',
    defaultValue: 3,
    group: 'content',
    drawer: false,
    showcase: false,
  },
  {
    key: 'max',
    label: 'Max',
    type: 'dropdown',
    options: MAX_OPTIONS.map(o => ({ value: String(o.value), label: o.label })),
    description: 'Maximum rating',
    defaultValue: '5',
    group: 'content',
  },
  {
    key: 'showValue',
    label: 'Show Value',
    type: 'switch',
    description: 'Display value next to stars',
    defaultValue: false,
    group: 'content',
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
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    description: 'Disable rating',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'readOnly',
    label: 'Read Only',
    type: 'switch',
    description: 'Make read-only',
    defaultValue: false,
    group: 'state',
  },
];

const RATING_FORM_CONTROLS = toDrawerFormControls(RATING_CONTROL_DEFS);

export const RATING_DRAWER_CONFIGS = createDrawerFormConfigs(RATING_FORM_CONTROLS, {
  overview: { excludeKeys: ['value'] },
  size: { excludeKey: 'size' },
  max: { excludeKey: 'max' },
  states: { excludeKeys: ['disabled', 'readOnly'] },
});

export const RATING_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-rating',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(RATING_CONTROL_DEFS),
};
