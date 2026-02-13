import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toOptions,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import {
  CONTENT_POSITIONS,
  SHOWCASE_GROUP_ICONS,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';

export const SPINNER_SIZES = ['extra-small', 'small', 'medium', 'large', 'extra-large'] as const;

export const SPINNER_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    description: 'Spinner label text',
    defaultValue: 'Loading...',
    placeholder: 'Enter label',
    group: 'content',
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions(VARIANTS),
    description: 'Semantic color variant',
    defaultValue: 'primary',
    group: 'appearance',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions([...SPINNER_SIZES]),
    description: 'Spinner size',
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'labelPosition',
    label: 'Label Position',
    type: 'dropdown',
    options: toOptions([...CONTENT_POSITIONS]),
    description: 'Position of the label relative to spinner',
    defaultValue: 'below',
    group: 'layout',
  },
];

const DRAWER_CONTROLS = toDrawerFormControls(SPINNER_CONTROL_DEFS);

export const SPINNER_DRAWER_CONFIGS = createDrawerFormConfigs(DRAWER_CONTROLS, {
  overview: { excludeKeys: [] },
  variant: { excludeKey: 'variant' },
  size: { excludeKey: 'size' },
  labelPosition: { excludeKey: 'labelPosition' },
  usage: { excludeKeys: ['variant', 'labelPosition'] },
});

export const SPINNER_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-spinner',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
  ],
  controls: toShowcaseControls(SPINNER_CONTROL_DEFS),
};
