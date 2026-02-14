import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SHOWCASE_GROUP_ICONS, SIZES } from '@shared/utils/showcase/component-options.utils';

export const DATA_GRID_SELECTION_OPTIONS = ['none', 'single', 'multi'] as const;
export const DATA_GRID_PAGE_SIZE_OPTIONS = ['5', '10', '20'] as const;

const DATA_GRID_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'selection',
    label: 'Selection',
    type: 'dropdown',
    options: toOptions([...DATA_GRID_SELECTION_OPTIONS]),
    description: 'Row selection mode',
    defaultValue: 'none',
    group: 'behavior',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    description: 'Density of table rows',
    defaultValue: 'medium',
    group: 'layout',
  },
  {
    key: 'pageSize',
    label: 'Page size',
    type: 'dropdown',
    options: toOptions([...DATA_GRID_PAGE_SIZE_OPTIONS]),
    description: 'Rows per page when pagination is enabled',
    defaultValue: '10',
    group: 'layout',
  },
  {
    key: 'striped',
    label: 'Striped rows',
    type: 'switch',
    description: 'Alternating row backgrounds',
    defaultValue: false,
    group: 'appearance',
  },
  {
    key: 'bordered',
    label: 'Bordered',
    type: 'switch',
    description: 'Render cell borders',
    defaultValue: false,
    group: 'appearance',
  },
  {
    key: 'hoverable',
    label: 'Hoverable',
    type: 'switch',
    description: 'Highlight rows on hover',
    defaultValue: true,
    group: 'appearance',
  },
  {
    key: 'stickyHeaders',
    label: 'Sticky headers',
    type: 'switch',
    description: 'Keep header visible while scrolling',
    defaultValue: false,
    group: 'layout',
  },
  {
    key: 'pagination',
    label: 'Pagination',
    type: 'switch',
    description: 'Enable pagination',
    defaultValue: true,
    group: 'behavior',
  },
  {
    key: 'sorting',
    label: 'Sorting',
    type: 'switch',
    description: 'Enable sorting interactions',
    defaultValue: true,
    group: 'behavior',
  },
  {
    key: 'filtering',
    label: 'Filtering',
    type: 'switch',
    description: 'Enable column filters',
    defaultValue: true,
    group: 'behavior',
  },
  {
    key: 'expandable',
    label: 'Expandable rows',
    type: 'switch',
    description: 'Enable master-details rows',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'virtualization',
    label: 'Virtualization',
    type: 'switch',
    description: 'Render only visible rows',
    defaultValue: false,
    group: 'performance',
  },
  {
    key: 'virtualizationItemHeight',
    label: 'Row height',
    type: 'number',
    defaultValue: 48,
    min: 32,
    max: 80,
    step: 4,
    group: 'performance',
    drawer: false,
  },
  {
    key: 'virtualizationBufferSize',
    label: 'Buffer size',
    type: 'number',
    defaultValue: 3,
    min: 1,
    max: 10,
    step: 1,
    group: 'performance',
    drawer: false,
  },
];

const ALL_CONTROLS = toDrawerFormControls(DATA_GRID_CONTROL_DEFS);

export const DATA_GRID_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  basic: {
    excludeKeys: [
      'selection',
      'pagination',
      'sorting',
      'filtering',
      'expandable',
      'virtualization',
      'stickyHeaders',
    ],
  },
  columnFactory: {
    excludeKeys: [
      'selection',
      'pagination',
      'sorting',
      'filtering',
      'expandable',
      'virtualization',
      'stickyHeaders',
    ],
  },
  selectable: { excludeKey: 'selection' },
  serverSide: { excludeKeys: ['selection', 'expandable', 'virtualization'] },
  virtualized: {
    excludeKeys: [
      'selection',
      'pagination',
      'sorting',
      'filtering',
      'expandable',
      'virtualization',
    ],
  },
  filtering: {
    excludeKeys: [
      'selection',
      'pagination',
      'sorting',
      'expandable',
      'virtualization',
      'filtering',
    ],
  },
  expandable: {
    excludeKeys: [
      'selection',
      'pagination',
      'sorting',
      'filtering',
      'virtualization',
      'expandable',
    ],
  },
  fullFeatured: { excludeKey: 'virtualization' },
  advanced: { excludeKeys: ['virtualization', 'expandable'] },
});

export const DATA_GRID_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-data-grid',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
    { id: 'performance', label: 'Performance', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(DATA_GRID_CONTROL_DEFS),
};
