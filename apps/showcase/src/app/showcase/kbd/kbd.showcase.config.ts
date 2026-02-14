import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SIZES, SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

const KBD_APPEARANCES = ['default', 'filled'] as const;

const KBD_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'text',
    label: 'Text',
    type: 'text',
    description: 'Key label',
    defaultValue: 'Enter',
    placeholder: 'Enter key text',
    group: 'content',
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
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    options: toOptions([...KBD_APPEARANCES]),
    description: 'Visual style',
    defaultValue: 'default',
    group: 'appearance',
  },
];

const KBD_FORM_CONTROLS = toDrawerFormControls(KBD_CONTROL_DEFS);

export const KBD_DRAWER_CONFIGS = createDrawerFormConfigs(KBD_FORM_CONTROLS, {
  size: { excludeKey: 'size' },
  appearance: { excludeKey: 'appearance' },
  shortcuts: { excludeKeys: [] },
  navigation: { excludeKeys: [] },
});

export const KBD_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-kbd',
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
  controls: toShowcaseControls(KBD_CONTROL_DEFS),
};
