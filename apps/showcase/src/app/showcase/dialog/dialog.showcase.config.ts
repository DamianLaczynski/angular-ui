import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import {
  toOptions,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

const DIALOG_BACKDROPS = ['dynamic', 'static'] as const;

const DIALOG_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'title',
    label: 'Title',
    type: 'text',
    description: 'Dialog title',
    defaultValue: 'Dialog Title',
    placeholder: 'Enter title',
    group: 'content',
  },
  {
    key: 'bodyText',
    label: 'Body Text',
    type: 'textarea',
    description: 'Dialog body text',
    defaultValue: 'This is the dialog body text. You can customize it using the controls.',
    placeholder: 'Enter body text',
    rows: 3,
    group: 'content',
  },
  {
    key: 'width',
    label: 'Width',
    type: 'dropdown',
    options: [
      { value: '320px', label: '320px (Small)' },
      { value: '600px', label: '600px (Medium)' },
      { value: '800px', label: '800px (Large)' },
    ],
    defaultValue: '600px',
    group: 'appearance',
  },
  {
    key: 'fullscreen',
    label: 'Fullscreen',
    type: 'switch',
    description: 'Fullscreen dialog',
    defaultValue: false,
    group: 'appearance',
  },
  {
    key: 'closable',
    label: 'Closable',
    type: 'switch',
    description: 'Allow closing via X, ESC, or backdrop',
    defaultValue: true,
    group: 'behavior',
  },
  {
    key: 'backdrop',
    label: 'Backdrop',
    type: 'dropdown',
    options: toOptions([...DIALOG_BACKDROPS]),
    defaultValue: 'dynamic',
    group: 'behavior',
  },
];

export const DIALOG_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-dialog',
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
  controls: toShowcaseControls(DIALOG_CONTROL_DEFS),
};
