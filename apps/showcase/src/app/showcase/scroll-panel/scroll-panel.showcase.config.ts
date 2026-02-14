import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import {
  SCROLL_PANEL_ORIENTATIONS,
  SCROLL_PANEL_BEHAVIORS,
  SCROLL_PANEL_MAX_HEIGHTS,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const SCROLL_PANEL_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'orientation',
    label: 'Orientation',
    type: 'dropdown',
    options: toOptions([...SCROLL_PANEL_ORIENTATIONS]),
    description: 'Scroll direction',
    defaultValue: 'vertical',
    group: 'layout',
  },
  {
    key: 'scrollbarBehavior',
    label: 'Scrollbar Behavior',
    type: 'dropdown',
    options: toOptions([...SCROLL_PANEL_BEHAVIORS]),
    description: 'When scrollbars are visible',
    defaultValue: 'auto',
    group: 'behavior',
  },
  {
    key: 'maxHeight',
    label: 'Max Height',
    type: 'dropdown',
    options: [...SCROLL_PANEL_MAX_HEIGHTS],
    description: 'Maximum height of the scroll area',
    defaultValue: '400px',
    group: 'layout',
  },
];

const SCROLL_PANEL_FORM_CONTROLS = toDrawerFormControls(SCROLL_PANEL_CONTROL_DEFS);

export const SCROLL_PANEL_DRAWER_CONFIGS = createDrawerFormConfigs(SCROLL_PANEL_FORM_CONTROLS, {
  orientation: { excludeKey: 'orientation' },
  scrollbarBehavior: { excludeKey: 'scrollbarBehavior' },
  dimensions: { excludeKey: 'maxHeight' },
});

export const SCROLL_PANEL_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-scroll-panel',
  controlGroups: [
    {
      id: 'layout',
      label: 'Layout',
      icon: SHOWCASE_GROUP_ICONS['layout'],
      expanded: true,
    },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
  ],
  controls: toShowcaseControls(SCROLL_PANEL_CONTROL_DEFS),
};
