import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { GlobalStyles } from '../global-styles';

@customElement('dx-input')
export class DxInput extends LitElement {
  static override styles = [
    GlobalStyles,
    css`
      :host {
        display: inline-block;
        min-width: 60px;
      }

      input {
        padding: var(--dx-space-m);
        border-radius: var(--dx-input-border-radius);
        border: solid 1px var(--dx-border-color);
        background-color: var(--dx-input-bg);
        color: var(--dx-font-color);
        outline: none;
      }

      input:focus,
      inputactive {
        box-shadow: 0 0 0 2px var(--dx-outline-color);
      }
    `,
  ];

  override render() {
    return html`
      <input type="text" />
    `;
  }
}