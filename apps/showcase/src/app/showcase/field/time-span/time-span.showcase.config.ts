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
  INPUT_VARIANTS,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const TIMESPAN_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    description: 'Field label',
    defaultValue: 'Duration',
    placeholder: 'Enter label',
    group: 'content',
    drawer: false,
  },
  {
    key: 'helpText',
    label: 'Help Text',
    type: 'text',
    description: 'Helper text',
    defaultValue: '',
    placeholder: 'Enter help text',
    group: 'content',
    drawer: false,
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions([...INPUT_VARIANTS]),
    description: 'Input visual style',
    defaultValue: 'filled',
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
    key: 'showYears',
    label: 'Show Years',
    type: 'switch',
    description: 'Display years unit',
    defaultValue: false,
    group: 'units',
  },
  {
    key: 'showMonths',
    label: 'Show Months',
    type: 'switch',
    description: 'Display months unit',
    defaultValue: false,
    group: 'units',
  },
  {
    key: 'showDays',
    label: 'Show Days',
    type: 'switch',
    description: 'Display days unit',
    defaultValue: true,
    group: 'units',
  },
  {
    key: 'showHours',
    label: 'Show Hours',
    type: 'switch',
    description: 'Display hours unit',
    defaultValue: true,
    group: 'units',
  },
  {
    key: 'showMinutes',
    label: 'Show Minutes',
    type: 'switch',
    description: 'Display minutes unit',
    defaultValue: true,
    group: 'units',
  },
  {
    key: 'showSeconds',
    label: 'Show Seconds',
    type: 'switch',
    description: 'Display seconds unit',
    defaultValue: false,
    group: 'units',
  },
  {
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    description: 'Disable field',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'readonly',
    label: 'Readonly',
    type: 'switch',
    description: 'Read-only state',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'required',
    label: 'Required',
    type: 'switch',
    description: 'Mark as required',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'clearable',
    label: 'Clearable',
    type: 'switch',
    description: 'Allow clearing value',
    defaultValue: false,
    group: 'state',
  },
];

const TIMESPAN_FORM_CONTROLS = toDrawerFormControls(TIMESPAN_CONTROL_DEFS);

export const TIMESPAN_DRAWER_CONFIGS = createDrawerFormConfigs(TIMESPAN_FORM_CONTROLS, {
  units: {
    excludeKeys: ['showYears', 'showMonths', 'showDays', 'showHours', 'showMinutes', 'showSeconds'],
  },
  size: { excludeKey: 'size' },
  variants: { excludeKey: 'variant' },
  states: { excludeKeys: ['disabled', 'readonly', 'required', 'clearable'] },
});

export const TIMESPAN_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-time-span',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'units', label: 'Units', icon: SHOWCASE_GROUP_ICONS['behavior'] },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(TIMESPAN_CONTROL_DEFS),
};
