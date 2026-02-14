import { signal, computed, type Signal, type WritableSignal } from '@angular/core';

export function createSectionFormState<T>(
  defaults: Record<string, unknown>,
  mapper: (v: Record<string, unknown>) => T,
): { formValues: WritableSignal<Record<string, unknown>>; form: Signal<T> } {
  const formValues = signal<Record<string, unknown>>(defaults);
  const form = computed(() => mapper(formValues()));
  return { formValues, form };
}
