import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { ORIENTATIONS, SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

const ALIGNMENTS = ['start', 'center', 'end'];

const TEXT_PRESET_OPTIONS = [
  { value: 'OR', label: 'OR' },
  { value: 'Section', label: 'Section' },
  { value: 'Details', label: 'Details' },
];

const DIVIDER_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'orientation',
    label: 'Orientation',
    type: 'dropdown',
    options: toOptions([...ORIENTATIONS]),
    description: 'Divider direction',
    defaultValue: 'horizontal',
    group: 'appearance',
  },
  {
    key: 'alignment',
    label: 'Alignment',
    type: 'dropdown',
    options: toOptions(ALIGNMENTS),
    description: 'Text alignment on divider',
    defaultValue: 'center',
    group: 'appearance',
  },
  {
    key: 'showText',
    label: 'Show Text',
    type: 'switch',
    description: 'Display text inside divider',
    defaultValue: true,
    group: 'content',
    showcase: false,
  },
  {
    key: 'textPreset',
    label: 'Text Preset',
    type: 'dropdown',
    options: TEXT_PRESET_OPTIONS,
    description: 'Preset text used in showcase sections',
    defaultValue: 'OR',
    group: 'content',
    showcase: false,
  },
  {
    key: 'text',
    label: 'Text',
    type: 'text',
    description: 'Divider text',
    defaultValue: 'OR',
    placeholder: 'Enter divider text',
    group: 'content',
    drawer: false,
  },
  {
    key: 'ariaLabel',
    label: 'Aria Label',
    type: 'text',
    description: 'Accessible label for screen readers',
    defaultValue: 'Divider',
    placeholder: 'Enter aria label',
    group: 'content',
    drawer: false,
  },
];

const DIVIDER_FORM_CONTROLS = toDrawerFormControls(DIVIDER_CONTROL_DEFS);

export const DIVIDER_DRAWER_CONFIGS = createDrawerFormConfigs(DIVIDER_FORM_CONTROLS, {
  overview: { excludeKeys: ['orientation', 'alignment'] },
  orientation: { excludeKey: 'orientation' },
  alignment: { excludeKey: 'alignment' },
  content: { excludeKeys: ['showText', 'textPreset'] },
});

export const DIVIDER_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-divider',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
  ],
  controls: toShowcaseControls(DIVIDER_CONTROL_DEFS),
};
