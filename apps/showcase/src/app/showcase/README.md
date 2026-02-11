# Showcase structure

Target structure for each lib component showcase is **3 files** (or 2 if there is no interactive demo).

## Files

| File | Responsibility |
|------|-----------------|
| `{component}.showcase.config.ts` | All config: drawer form configs (if any), presets, `{COMPONENT}_SHOWCASE_CONFIG` for interactive. Optional constants (e.g. ORIENTATIONS). |
| `{component}.interactive.ts` | Interactive demo component: `ShowcaseConfig` from config, `values` signal, `current*` computeds, `onValuesChange` / `onReset`, template with `app-interactive-showcase` and the lib component. Omit if the component has no interactive demo. |
| `{component}.showcase.ts` | Main view: TOC, header, sections (static and/or `app-section-with-drawer`), final "Interactive Demo" section with `app-{component}-interactive`. Imports from config and interactive. |

## Conventions

- Main component selector: `app-{component}-showcase`. Interactive: `app-{component}-interactive`.
- Routes import from `@showcase/{path}/{component}.showcase`.
- In config: one shared array of drawer controls (if any) and `createDrawerFormConfigs` from shared utils; one `ShowcaseConfig` object for interactive.

## Shared utils

- **drawer-form-config.utils.ts** – `createDrawerFormConfigs(controls, definitions)` builds drawer form configs by excluding keys. Use instead of local `getXSectionFormConfig` / `getXSectionFormConfigExcluding`. Definitions: `{ excludeKey: string }` or `{ excludeKeys: string[] }` per named config.
- **section-form-state.utils.ts** – `createSectionFormState(defaults, mapper)` returns `{ formValues, form }` (signal + computed). Use for section drawer form state to avoid repeating signal + computed per section.
