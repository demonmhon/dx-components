# AGENTS.md

Instructions and guidelines for AI agents working in the `dx-components` repository.

---

## 1. Project Overview

`dx-components` (`@demonmhon/dx-components`) is a lightweight, framework-agnostic Web Component library built with **Lit** (v2) and **TypeScript**.

- **Target Output**: Native ES Modules (`dist/`) bundled via Rollup.
- **Theming**: CSS custom properties (`--dx-*`) supporting dynamic runtime switching via `data-dx-theme` (`light` | `dark`).
- **Testing**: Open Web Components (`@open-wc/testing`) executed by `@web/test-runner` with Playwright (Chromium headless).

### Design Inspiration & Aesthetic
- **Simplicity First**: The goal is to build simple, lightweight, unopinionated web components without unnecessary bulk.
- **Pale & Monochromatic Palette**: Selecting color palettes is notoriously difficult. Because of this, the design deliberately adopts an **almost black-and-white, pale / muted grayscale palette** across both light and dark themes.
- **Consistent Tones**: Even communicative elements like status indicators (`--dx-info-color`, `--dx-warning-color`, `--dx-error-color`) lean into subtle grayscale shades rather than saturated or vibrant colors.
- **Agent Rule**: When styling or creating new components, preserve this muted, pale, almost black-and-white aesthetic. Do not introduce vibrant or saturated colors unless explicitly requested.

---

## 2. Directory Structure

```
dx-components/
├── demo/                       # Interactive showcase page for local development
│   ├── index.html              # Demo HTML illustrating each component's usage
│   └── styles.css              # Demo page layout styles
├── dist/                       # Rollup build output (gitignored)
├── src/                        # Component source code
│   ├── <component-name>/       # Individual component module
│   │   ├── <component-name>.ts # Component implementation (LitElement)
│   │   ├── index.ts            # Module exports
│   │   ├── *.type.ts           # TypeScript type definitions (optional)
│   │   └── *.spec.ts           # Component unit/accessibility tests (optional)
│   ├── themes/
│   │   └── themes.css          # CSS custom property tokens for themes (light/dark)
│   ├── global-styles.ts        # Shared styles applied across all components
│   └── index.ts                # Library entry point exporting all components
├── rollup.config.mjs           # Rollup configuration for building dist/
├── web-dev-server.config.mjs   # Dev server configuration for demo/
├── web-test-runner.config.js   # Test runner configuration
├── tsconfig.json               # TypeScript compiler configuration
└── package.json                # Project dependencies and npm scripts
```

---

## 3. Development Commands

Always use the standard npm scripts defined in `package.json`:

| Command | Description |
| :--- | :--- |
| `npm start` | Runs watch build (`npm run dev`) and dev server (`npm run dev:server`) concurrently. |
| `npm run dev` | Compiles TypeScript and runs Rollup in watch mode. |
| `npm run dev:server` | Serves the demo page at `http://localhost:8000/demo/`. |
| `npm run build` | Cleans `dist/` and runs a full production build via Rollup. |
| `npm run build:tsc` | Runs TypeScript type checking (`tsc`) without emitting code. |
| `npm test` | Runs full build followed by test suite with coverage (`npm run build && npm run test:dev`). |
| `npm run test:dev` | Runs `@web/test-runner` with coverage on existing `dist/**/*.spec.js`. |
| `npm run test:watch` | Runs test runner in watch mode. |
| `npm run lint` | Runs ESLint over TypeScript files in `src/`. |
| `npm run format` | Runs Prettier write over files in `src/`. |

---

## 4. Component Authoring Conventions

When creating or modifying components, follow these conventions:

### Component Structure
Each component resides in `src/<component-name>/`:
- Name custom elements with the `dx-` prefix (e.g., `dx-button`, `dx-dialog`).
- Class name must follow PascalCase prefixed with `Dx` (e.g., `DxButton`, `DxDialog`).
- Always create `src/<component-name>/index.ts` re-exporting the component class.
- Re-export new components from the main entry point: `src/index.ts`.

### LitElement Implementation
- Extend `LitElement` and annotate with `@customElement('dx-<name>')`.
- Inherit shared styles by including `GlobalStyles` in the static `styles` array:
  ```ts
  import { LitElement, css, html } from 'lit';
  import { customElement, property } from 'lit/decorators.js';
  import { GlobalStyles } from '../global-styles';

  @customElement('dx-example')
  export class DxExample extends LitElement {
    static override styles = [
      GlobalStyles,
      css`
        :host {
          display: inline-block;
        }
      `,
    ];

    render() {
      return html`<slot></slot>`;
    }
  }
  ```

### Properties and Attributes
- Use `@property()` for reactive properties.
- Use `{ reflect: true }` when state must reflect as an HTML attribute on the host (e.g., `disabled`, `outline`, `checked`, `shown`, `modal`).
- For boolean attributes, specify `{ type: Boolean, reflect: true }`.
- When supporting disabled states:
  - Add `:host([disabled])` CSS rules utilizing `opacity: var(--disable-opacity-state);`.

### Styling & Design Tokens
- Never hardcode color values or spacing where CSS variables exist.
- Use variables defined in `src/themes/themes.css`:
  - Spacing: `--dx-space-xs`, `--dx-space-s`, `--dx-space-m`, `--dx-space-l`, `--dx-space-xl`
  - Colors: `--dx-font-color`, `--dx-border-color`, `--dx-outline-color`, `--dx-document-background`
  - Status colors: `--dx-info-color`, `--dx-warning-color`, `--dx-error-color`
  - Component-specific: `--dx-button-*`, `--dx-input-*`, `--dx-checkbox-*`, `--dx-message-*`, `--dx-toggle-*`, etc.
- If adding new theme variables, add definitions for both `:root` / `[data-dx-theme='light']` and `[data-dx-theme='dark']` in `src/themes/themes.css`.
- Maintain the pale, near black-and-white color aesthetic: prefer subtle, muted grayscale and low-saturation tones rather than vivid or bright colors.

---

## 5. Testing Guidelines

- Place unit tests alongside the component file as `<component-name>.spec.ts`.
- Note: Test runner looks for compiled specs in `dist/**/*.spec.js`, so you must run `npm run build` or `npm test` before tests execute.
- Use `@open-wc/testing` helpers:
  ```ts
  import { expect, fixture, html } from '@open-wc/testing';
  import { DxExample } from './example';

  describe('DxExample <dx-example>', () => {
    it('is accessible', async () => {
      const el = await fixture<DxExample>(html`<dx-example></dx-example>`);
      await expect(el).shadowDom.to.be.accessible();
    });
  });
  ```

---

## 6. Verification Checklist for Agents

Before completing any task:
1. **Type Check & Build**: Run `npm run build` to confirm TypeScript compiles and Rollup packages cleanly.
2. **Lint**: Run `npm run lint` and ensure no ESLint errors are introduced.
3. **Tests**: Run `npm test` to verify existing and new tests pass.
4. **Demo**: If adding or updating a component or property, update `demo/index.html` to showcase its functionality.
