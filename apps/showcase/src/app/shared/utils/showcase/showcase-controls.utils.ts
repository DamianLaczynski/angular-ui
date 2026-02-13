import type { ShowcaseControl } from '@shared/components/interactive-showcase';
import type { SectionDrawerFormControl } from '@shared/components/section-with-drawer';

export type ControlOption = { value: string | number | boolean; label: string };

export function toOptions(values: string[]): ControlOption[] {
  return values.map(v => ({ value: v, label: v }));
}

type DrawerShowcaseFlags = { drawer?: boolean; showcase?: boolean };

export type SharedControlDef =
  | ({
      key: string;
      label: string;
      type: 'dropdown';
      options: ControlOption[];
      group?: string;
      defaultValue?: string | number | boolean;
      description?: string;
    } & DrawerShowcaseFlags)
  | ({
      key: string;
      label: string;
      type: 'switch';
      group?: string;
      defaultValue?: boolean;
      description?: string;
    } & DrawerShowcaseFlags)
  | ({
      key: string;
      label: string;
      type: 'text';
      group?: string;
      defaultValue?: string;
      placeholder?: string;
      description?: string;
    } & DrawerShowcaseFlags)
  | ({
      key: string;
      label: string;
      type: 'number';
      group?: string;
      defaultValue?: number;
      description?: string;
      min?: number;
      max?: number;
      step?: number;
    } & DrawerShowcaseFlags)
  | ({
      key: string;
      label: string;
      type: 'textarea';
      group?: string;
      defaultValue?: string;
      placeholder?: string;
      rows?: number;
      description?: string;
    } & DrawerShowcaseFlags);

function isDrawerControl(
  def: SharedControlDef,
): def is Extract<SharedControlDef, { type: 'dropdown' | 'switch' }> {
  return def.type === 'dropdown' || def.type === 'switch';
}

function includeInDrawer(
  def: SharedControlDef,
): def is Extract<SharedControlDef, { type: 'dropdown' | 'switch' }> {
  return isDrawerControl(def) && def.drawer !== false;
}

function includeInShowcase(def: SharedControlDef): boolean {
  return def.showcase !== false;
}

export function toDrawerFormControl(
  def: Extract<SharedControlDef, { type: 'dropdown' | 'switch' }>,
): SectionDrawerFormControl {
  if (def.type === 'dropdown') {
    return { key: def.key, label: def.label, type: 'dropdown', options: def.options };
  }
  return { key: def.key, label: def.label, type: 'switch' };
}

export function toDrawerFormControls(defs: SharedControlDef[]): SectionDrawerFormControl[] {
  return defs.filter(includeInDrawer).map(toDrawerFormControl);
}

export function toShowcaseControl(def: SharedControlDef): ShowcaseControl {
  const base = {
    key: def.key,
    label: def.label,
    type: def.type,
    description: def.description,
    group: def.group,
  };
  if (def.type === 'text') {
    return {
      ...base,
      defaultValue: def.defaultValue ?? '',
      placeholder: def.placeholder,
    };
  }
  if (def.type === 'textarea') {
    return {
      ...base,
      defaultValue: def.defaultValue ?? '',
      placeholder: def.placeholder,
      rows: def.rows,
    };
  }
  if (def.type === 'dropdown') {
    return {
      ...base,
      options: def.options,
      defaultValue: def.defaultValue ?? def.options[0]?.value ?? '',
    };
  }
  if (def.type === 'number') {
    return {
      ...base,
      defaultValue: def.defaultValue ?? 0,
      min: def.min,
      max: def.max,
      step: def.step,
    };
  }
  return {
    ...base,
    defaultValue: def.defaultValue ?? false,
  };
}

export function toShowcaseControls(defs: SharedControlDef[]): ShowcaseControl[] {
  return defs.filter(includeInShowcase).map(toShowcaseControl);
}
