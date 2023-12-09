import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { GlobalStyles } from '../global-styles';

@customElement('dx-input')
export class DxInput extends LitElement {
  @property()
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onKeyup = (_e: Event) => {};

  @property()
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onChange = (_e: Event) => {};

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

  private _onKeyup(e: Event): void {
    this.onKeyup(e);
  }

  private _onChange(e: Event): void {
    this.onChange(e);
  }

  override render() {
    return html`
      <input type="text" @keyup="${this._onKeyup}" @change"${this._onChange}" />
    `;
  }
}
