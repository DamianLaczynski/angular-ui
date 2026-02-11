# Showcase guide: how a component showcase should look

A single pattern for every component showcase from the library: file structure, section order, elements used, and utils.

**Table of contents:** [1. One place](#1-one-place) · [2. Showcase purpose and audience](#2-showcase-purpose-and-audience) · [3. Functional content](#3-functional-content) · [4. Component categories](#4-component-categories) · [5. File structure](#5-file-structure) · [6. Page layout](#6-page-layout) · [7. Presentation sections](#7-presentation-sections) · [8. Interactive Demo](#8-interactive-demo) · [9. Config and utils](#9-config-and-utils) · [10. showcase.ts file content](#10-showcasets-file-content) · [11. What to avoid](#11-what-to-avoid) · [12. Checklist](#12-checklist)

---

## 1. One place

- **3 files:** `{component}.showcase.config.ts`, `{component}.interactive.ts` (optional), `{component}.showcase.ts`
- **Page order:** wrapper with TOC → header → sections (with drawer or static) → **at the very end** the "Interactive Demo" section
- **Drawer:** one config (object from config); in sections use assignments like `xxxDrawerFormConfig = XXX_DRAWER_CONFIGS.xxx`; in the drawer use **radio-button-group** and **switch** for controls
- **Constants:** from `component-options.utils`; control definitions via `SharedControlDef` + `toDrawerFormControls` / `toShowcaseControls` in config
- **Route:** import from `@showcase/{path}/{component}.showcase`

---

## 2. Showcase purpose and audience

The showcase is a single, clear place to browse components – both for integration (developers) and for behavior and scenarios (analysts, QA).

**Developers** need: full set of props and variants (Overview), states (disabled, loading, error), Interactive Demo to try parameters, consistent naming; optionally code examples.

**Analysts and business analysis** need: when to use the component, typical scenarios, states and behavior (e.g. validation, errors), and optionally a short "Use cases" section.

You can label content in headings or descriptions (e.g. "For developers: all variants" / "Scenario: form with error") or use separate subsections so each group quickly finds what they need.

---

## 3. Functional content

**Required (where the component supports it):**

- **Overview** – one section with a **matrix** (2 dimensions, e.g. variant × appearance) or **grid** (1 dimension, e.g. size) showing the main visual and config variants. Drawer with controls is optional. Goal: full set of options visible on one screen.
- **States** – section with **presets** (e.g. `disabled`, `loading`, `selected`, `error`, `required`) – each state as a separate instance or set. Goal: show behavior and look in every state.
- **Interactive Demo** – **always at the end** of the page (details in §8).

**Recommended:**

- **Short description** of the component and **when to use it** (1–2 sentences in the header or at the top) – for both audiences.
- **Use cases / scenarios** – optional section (e.g. "In a form", "In a table") with concrete examples – especially useful for analysts.

**Optional:** edge cases (e.g. very long text), accessibility (shortcuts, roles).

Patterns: matrix → `showcase__icons-matrix`; grid → `showcase__grid`; states → array of presets in a loop (like button "States").

---

## 4. Component categories

Each category has a content checklist; Overview and States sections are required where the component has the relevant properties.

**Action** (Button, Menu, Command palette)

- Required: Overview (variant × appearance), Size/Shape, Icons, States (disabled, loading, selected), Interactive Demo.
- Additionally (for analysts): typical scenarios – primary action, secondary, cancel; when loading/disabled.

**Form field** (Text, Dropdown, Checkbox, Date, Number, Search, …)

- Required: Overview (variant, size), States (disabled, required, error/validation), behavior (searchable, clearable, single/multi mode) – when applicable, Interactive Demo.
- Additionally: scenarios – filling, validation, error, placeholder/help text.

**Layout** (Card, Divider, Splitter, Scroll panel)

- Required: visual variants / orientation, sample content; States if the component has them (e.g. collapsed).
- Additionally: when to use – grouping, separation, layout.

**Feedback** (Toast, Dialog, Empty state, Error state, Loading, Skeleton)

- Required: types/roles (success, error, info), States (e.g. with action / without), primary/secondary actions.
- Additionally: when to use which type, user flow after action.

**Data / lists** (Data grid, Tree, Pagination)

- Required: display mode, options (sorting, selection), States: empty list, loading.
- Additionally: use cases – list, tree, pagination.

**Navigation** (Tabs, Breadcrumb, Nav)

- Required: orientation, variants, States (active, disabled).
- Additionally: hierarchy, typical flow.

**Labels / utility** (Badge, Tag, Avatar, Icon, Tooltip, Kbd, Time)

- Required: Overview (variant, size), States if present (disabled etc.).
- Additionally: short usage context (e.g. "next to notifications", "keyboard shortcut").

---

## 5. File structure

| File | Responsibility |
|------|----------------|
| **`{component}.showcase.config.ts`** | All config: `SharedControlDef[]`, `toDrawerFormControls` → `createDrawerFormConfigs` → one object (e.g. `BUTTON_DRAWER_CONFIGS`), `{COMPONENT}_SHOWCASE_CONFIG` for interactive, optional presets/constants. Global constants from `component-options.utils`, not duplicated. |
| **`{component}.interactive.ts`** | Interactive demo: `ShowcaseConfig` from config, signal `values`, computed `current*`, `onValuesChange` / `onReset`, template with `app-interactive-showcase` and one lib component. **Optional** – only when the showcase has interactive. |
| **`{component}.showcase.ts`** | Main view: wrapper, TOC, header, sections, Interactive Demo at the end. Imports from config and interactive; in class: drawer config assignments, form state (signals + computeds), lists from utils, presets/layout specific to the presentation. |

**Naming conventions:**

- Main selector: `app-{component}-showcase`
- Interactive selector: `app-{component}-interactive`
- Route: `@showcase/{path}/{component}.showcase`

**Routing registration:** in `ds.routes.ts` (or the relevant routing file) add entry with `path: 'component-name'` and `component: XxxShowcaseComponent`; import: `import { XxxShowcaseComponent } from '@showcase/.../component.showcase';`

---

## 6. Page layout (element order)

1. **Wrapper** – `showcase showcase--responsive showcase__with-toc`
2. **TOC** – `ui-table-of-content` (e.g. `[sticky]="true"`, `[offsetTop]="20"`, `containerSelector=".showcase-content"`, `[minLevel]="1"`, `[maxLevel]="2"`)
3. **Content container** – `showcase-content` (header + sections + Interactive Demo)
4. **Header** – `app-showcase-header` with `title="Component name"`
5. **Presentation sections** – any number and order (with drawer or static)
6. **Interactive Demo section** – **always last**: `<section id="interactive-demo" class="showcase__section">`, `<h2 class="showcase__section__title">Interactive Demo</h2>`, `<app-{component}-interactive />`

**Skeleton template:**

```html
<div class="showcase showcase--responsive showcase__with-toc">
  <ui-table-of-content [sticky]="true" [offsetTop]="20" containerSelector=".showcase-content" [minLevel]="1" [maxLevel]="2" />
  <div class="showcase-content">
    <app-showcase-header title="Name" />

    <app-section-with-drawer sectionTitle="..." [formConfig]="..." [formValues]="..." (formValuesChange)="...">
      <!-- content: grid or matrix -->
    </app-section-with-drawer>

    <section id="interactive-demo" class="showcase__section">
      <h2 class="showcase__section__title">Interactive Demo</h2>
      <app-{component}-interactive />
    </section>
  </div>
</div>
```

---

## 7. Presentation sections

**Overview** and **States** sections are required where the component has the relevant properties – see §3 Functional content.

**Section types**

- **With drawer** – `app-section-with-drawer`: "Customize" button opens a drawer with controls (radio-button-group for list options, switch for boolean). Section content (preview) in ng-content.
- **Static** – `<section id="..." class="showcase__section">` with `<h2 class="showcase__section__title">` and content (e.g. `showcase__grid`).

**`app-section-with-drawer` inputs:** `sectionTitle`, `formConfig` (from config), `formValues` (signal/object), `formValuesChange` (event).

**Content patterns inside sections**

- **Matrix** – variants in two dimensions (e.g. appearance × variant):
  - `showcase__icons-matrix` → `showcase__icons-matrix__row` (header: `--header`), `showcase__icons-matrix__cell` (header: `--header`, row label: `--label`, corner: `--corner`, multi-column header: `--header-multi`).
- **Grid** – list in one dimension (e.g. Size, Shapes, States):
  - `showcase__grid` → `showcase__item` (one component instance inside).
- **"States" section** – array of **presets** with `id`, `label` and values (e.g. `disabled`, `loading`, `selected`); in a loop pass form data + preset to the component.

**Form state per section:** for each section with drawer: **signal** with raw values + **computed** mapping to a typed object (used in template). Optionally: `createSectionFormState(defaults, mapper)` from `section-form-state.utils`.

---

## 8. Interactive Demo

- **Position:** always the last section on the page.
- **Markup:** `<section id="interactive-demo" class="showcase__section">`, title "Interactive Demo", `<app-{component}-interactive />`.
- **Interactive component:** inside `app-interactive-showcase` with `[config]` from config file and one lib component in the `preview` slot. State: signal `values`, computed `current*`, `onValuesChange` / `onReset`.
- **Config:** `{COMPONENT}_SHOWCASE_CONFIG` in config, with `controlGroups` and `controls` (preferably `toShowcaseControls(SharedControlDef[])`). Group icons: `SHOWCASE_GROUP_ICONS` from utils.

---

## 9. Config and utils

**component-options.utils** – `VARIANTS`, `APPEARANCES`, `SIZES`, `SHAPES`, `INPUT_VARIANTS`, `TABS_ORIENTATIONS`, `ICON_OPTIONS`, `SHOWCASE_GROUP_ICONS`. Import instead of duplicating.

**showcase-controls.utils** – `toOptions`, `SharedControlDef`, `toDrawerFormControls`, `toShowcaseControls`. In defs optionally `drawer: false` / `showcase: false` for controls only in drawer or only in interactive.

**drawer-form-config.utils** – `createDrawerFormConfigs(controls, definitions)`. Definitions: `{ excludeKey: string }` or `{ excludeKeys: string[] }` per key. Result: one object (e.g. `BUTTON_DRAWER_CONFIGS`); in showcase assign by key.

**section-form-state.utils** – optionally `createSectionFormState(defaults, mapper)` → `{ formValues, form }` to reduce signal + computed duplication per section.

---

## 10. showcase.ts file content

In the main component class:

- **Drawer configs** – assignments from the single config object, e.g. `overviewDrawerFormConfig = BUTTON_DRAWER_CONFIGS.overview`.
- **Lists from utils** – e.g. `variants = VARIANTS`, `appearances = APPEARANCES` (from `component-options.utils`).
- **Form state** – for each section with drawer: `xxxFormValues = signal({...})`, `xxxForm = computed(() => mapper(this.xxxFormValues()))`.
- **Presets / layout** – e.g. `statePresets`, `overviewColumns`, `iconsPerVariant` – can stay in showcase; that’s presentation logic.
- **Imports** – lib component, CommonModule, FormsModule, SectionWithDrawerComponent, ShowcaseHeaderComponent, TableOfContentComponent, interactive component, data from config and utils.

---

## 11. What to avoid

- Duplicating constants (VARIANTS, SIZES, group icons, icon options) – use `component-options.utils`.
- Separate exports for each drawer config (e.g. `OVERVIEW_DRAWER_FORM_CONFIG`, `SIZE_DRAWER_FORM_CONFIG`) – one object from config and key references in showcase is enough.
- Defining controls twice (drawer vs interactive) – one `SharedControlDef` list, `toDrawerFormControls` and `toShowcaseControls`.
- Dropdown/select in the drawer – in `app-section-with-drawer` use **radio-button-group** and **switch**.
- Interactive Demo section in the middle of the page – **always at the end**.

---

## 12. Checklist

- [ ] 3 files (config, interactive if present, showcase); naming and route conventions.
- [ ] Layout: wrapper → TOC → `showcase-content` → header → sections → **Interactive Demo at the end**.
- [ ] Interactive Demo section: `id="interactive-demo"`, title "Interactive Demo", `<app-{component}-interactive />`.
- [ ] Content: Overview (matrix/grid of variants) and States (presets) – when the component supports them.
- [ ] Component description and "when to use" (brief).
- [ ] Match component category (Action / Form field / Layout / Feedback / Data / Navigation / Labels) – that category’s content checklist satisfied.
- [ ] Drawers: one config object (e.g. `XXX_DRAWER_CONFIGS`), assignments in showcase; in drawer use radio-button-group + switch.
- [ ] Constants from `component-options.utils`; control definitions via `SharedControlDef` + `toDrawerFormControls` / `toShowcaseControls`.
- [ ] In showcase.ts: drawer configs, form state (signal + computed or `createSectionFormState`), lists from utils, presets as needed.
- [ ] Registered in routing with import `@showcase/.../component.showcase`.

**Examples:** button, tabs, dropdown (in `showcase/button`, `showcase/tabs`, `showcase/field/dropdown`).
