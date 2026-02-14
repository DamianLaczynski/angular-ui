import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { toOptions } from '@shared/utils/showcase/showcase-controls.utils';
import { ORIENTATIONS, SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

export const SPLITTER_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-splitter',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
  ],
  controls: [
    {
      key: 'orientation',
      label: 'Orientation',
      type: 'dropdown',
      options: toOptions([...ORIENTATIONS]),
      defaultValue: 'horizontal',
      group: 'appearance',
    },
    {
      key: 'gutterSize',
      label: 'Gutter Size',
      type: 'number',
      defaultValue: 6,
      min: 2,
      max: 20,
      step: 1,
      group: 'appearance',
    },
  ],
};
