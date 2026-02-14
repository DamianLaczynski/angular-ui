import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SIZES, SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

const CALENDAR_VIEW_OPTIONS = [
  { value: 'days', label: 'days' },
  { value: 'months', label: 'months' },
  { value: 'years', label: 'years' },
];

const CONSTRAINT_OPTIONS = [
  { value: '', label: 'None' },
  { value: '2024-01-01', label: '2024-01-01' },
  { value: '2024-03-01', label: '2024-03-01' },
  { value: '2024-06-01', label: '2024-06-01' },
  { value: '2024-09-30', label: '2024-09-30' },
  { value: '2024-12-31', label: '2024-12-31' },
];

const CALENDAR_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'calendarView',
    label: 'View',
    type: 'dropdown',
    options: CALENDAR_VIEW_OPTIONS,
    description: 'Active calendar view',
    defaultValue: 'days',
    group: 'content',
    drawer: false,
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: SIZES.map(size => ({ value: size, label: size })),
    description: 'Calendar size',
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'showMonthYearPicker',
    label: 'Month/Year Picker',
    type: 'switch',
    description: 'Show month/year picker button in days view',
    defaultValue: true,
    group: 'appearance',
  },
  {
    key: 'min',
    label: 'Min Date',
    type: 'dropdown',
    options: CONSTRAINT_OPTIONS,
    description: 'Minimum selectable date (ISO)',
    defaultValue: '',
    group: 'behavior',
  },
  {
    key: 'max',
    label: 'Max Date',
    type: 'dropdown',
    options: CONSTRAINT_OPTIONS,
    description: 'Maximum selectable date (ISO)',
    defaultValue: '',
    group: 'behavior',
  },
  {
    key: 'rangeSelection',
    label: 'Range Selection',
    type: 'switch',
    description: 'Enable date range selection mode',
    defaultValue: false,
    group: 'behavior',
  },
];

const CALENDAR_FORM_CONTROLS = toDrawerFormControls(CALENDAR_CONTROL_DEFS);

export const CALENDAR_DRAWER_CONFIGS = createDrawerFormConfigs(CALENDAR_FORM_CONTROLS, {
  overview: { excludeKeys: ['min', 'max', 'rangeSelection'] },
  size: { excludeKeys: ['size', 'min', 'max', 'rangeSelection'] },
  constraints: { excludeKeys: ['rangeSelection'] },
  range: { excludeKeys: ['min', 'max', 'rangeSelection'] },
  monthYearPicker: { excludeKeys: ['showMonthYearPicker', 'min', 'max', 'rangeSelection'] },
});

export const CALENDAR_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-calendar',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
  ],
  controls: toShowcaseControls(CALENDAR_CONTROL_DEFS),
};
