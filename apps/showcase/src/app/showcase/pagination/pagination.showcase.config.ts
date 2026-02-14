import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SHOWCASE_GROUP_ICONS, SIZES } from '@shared/utils/showcase/component-options.utils';

const PAGE_OPTIONS = [5, 10, 20, 50, 100];
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
const TOTAL_ITEMS_OPTIONS = [50, 100, 200, 500, 1000];
const MAX_VISIBLE_OPTIONS = [3, 5, 7, 9, 11];

const asOptions = (values: number[]) => values.map(value => ({ value, label: String(value) }));

const PAGINATION_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: SIZES.map(value => ({ value, label: value })),
    description: 'Pagination size',
    defaultValue: 'medium',
    group: 'layout',
  },
  {
    key: 'totalPages',
    label: 'Total Pages',
    type: 'dropdown',
    options: asOptions(PAGE_OPTIONS),
    description: 'Total number of pages',
    defaultValue: 10,
    group: 'data',
  },
  {
    key: 'totalItems',
    label: 'Total Items',
    type: 'dropdown',
    options: asOptions(TOTAL_ITEMS_OPTIONS),
    description: 'Total number of records',
    defaultValue: 100,
    group: 'data',
  },
  {
    key: 'pageSize',
    label: 'Page Size',
    type: 'dropdown',
    options: asOptions(PAGE_SIZE_OPTIONS),
    description: 'Items per page',
    defaultValue: 10,
    group: 'data',
  },
  {
    key: 'maxVisiblePages',
    label: 'Max Visible Pages',
    type: 'dropdown',
    options: asOptions(MAX_VISIBLE_OPTIONS),
    description: 'How many page buttons are visible',
    defaultValue: 7,
    group: 'layout',
  },
  {
    key: 'showPageNumbers',
    label: 'Show Page Numbers',
    type: 'switch',
    description: 'Display numbered page buttons',
    defaultValue: true,
    group: 'options',
  },
  {
    key: 'showFirstLast',
    label: 'Show First/Last',
    type: 'switch',
    description: 'Display first and last navigation buttons',
    defaultValue: false,
    group: 'options',
  },
  {
    key: 'showInfo',
    label: 'Show Info',
    type: 'switch',
    description: 'Display range and total items text',
    defaultValue: false,
    group: 'options',
  },
  {
    key: 'showPageSizeSelector',
    label: 'Show Page Size Selector',
    type: 'switch',
    description: 'Display page size selector',
    defaultValue: false,
    group: 'options',
  },
];

const ALL_CONTROLS = toDrawerFormControls(PAGINATION_CONTROL_DEFS);

export const PAGINATION_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: [] },
  info: { excludeKey: 'showInfo' },
  firstLast: { excludeKey: 'showFirstLast' },
  pageSizeSelector: { excludeKey: 'showPageSizeSelector' },
  pageNumbers: { excludeKey: 'showPageNumbers' },
  size: { excludeKey: 'size' },
});

export const PAGINATION_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-pagination',
  controlGroups: [
    {
      id: 'layout',
      label: 'Layout',
      icon: SHOWCASE_GROUP_ICONS['layout'],
      expanded: true,
    },
    {
      id: 'data',
      label: 'Data',
      icon: SHOWCASE_GROUP_ICONS['content'],
      expanded: true,
    },
    { id: 'options', label: 'Options', icon: SHOWCASE_GROUP_ICONS['behavior'], expanded: true },
  ],
  controls: toShowcaseControls(PAGINATION_CONTROL_DEFS),
};
