import type { SectionDrawerFormControl } from '@shared/components/section-with-drawer';

export type SectionDrawerConfigDef = { excludeKey: string } | { excludeKeys: string[] };

export function createDrawerFormConfigs<K extends string>(
  controls: SectionDrawerFormControl[],
  definitions: Record<K, SectionDrawerConfigDef>,
): Record<K, SectionDrawerFormControl[]> {
  const result = {} as Record<K, SectionDrawerFormControl[]>;
  for (const name of Object.keys(definitions) as K[]) {
    const def = definitions[name];
    if ('excludeKey' in def) {
      result[name] = controls.filter(c => c.key !== def.excludeKey);
    } else {
      result[name] = controls.filter(c => !def.excludeKeys.includes(c.key));
    }
  }
  return result;
}
