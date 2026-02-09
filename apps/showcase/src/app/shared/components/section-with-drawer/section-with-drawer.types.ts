export interface SectionDrawerFormControl {
  key: string;
  label: string;
  type: 'dropdown' | 'switch';
  options?: { value: string | number | boolean; label: string }[];
}
