import type { Tab } from 'angular-ui';

export const DEFAULT_TABS: Tab[] = [
  { id: 't1', label: 'Overview', icon: 'book' },
  { id: 't2', label: 'Details', icon: 'document' },
  { id: 't3', label: 'Settings', icon: 'settings' },
];

export const EXTENDED_TABS: Tab[] = [
  { id: 'e1', label: 'Home', icon: 'home' },
  { id: 'e2', label: 'Disabled', icon: 'lock_closed', disabled: true },
  { id: 'e3', label: 'Closable', icon: 'dismiss', closable: true },
];

export const LABELS_ONLY_TABS: Tab[] = [
  { id: 'l1', label: 'Profile' },
  { id: 'l2', label: 'Notifications' },
  { id: 'l3', label: 'Security' },
];
