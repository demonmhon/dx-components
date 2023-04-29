import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { GlobalStyles } from '../global-styles';

@customElement('dx-toggle')
export class DxToggle extends LitElement {
  @property()
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onChange = (_e: Event) => {};

  static override styles = [
    GlobalStyles,
    css`
      label {
        display: inline-flex;
        box-sizing: border-box;
      }

      input {
        position: absolute;
        left: 0;
        z-index: -1;
        opacity: 0;
      }

      .control {
        position: relative;

        width: var(--dx-toggle-width);
        height: var(--dx-toggle-size);
        overflow: hidden;

        vertical-align: middle;
        border: solid 1px var(--dx-border-color);
        border-radius: var(--dx-toggle-border-radius);
        cursor: pointer;

        transition-duration: var(--dx-transition-fastest);
        transition-property: box-shadow;
      }

      .control::before {
        position: absolute;
        top: 50%;
        left: 3px;

        display: block;
        width: var(--dx-checkbox-size);
        height: var(--dx-checkbox-size);
        border-radius: var(--dx-toggle-border-radius);

        background-color: var(--dx-toggle-button-bg);
        transform: translate(0, -50%);
        content: '';

        transition-duration: var(--dx-transition-fastest);
        transition-property: left;
      }

      .label {
        flex: 1;
        padding-left: var(--dx-space-m);
      }

      input:checked + .control::before {
        left: calc(calc(100% - var(--dx-checkbox-size)) - 3px);
      }

      input:focus + .control {
        box-shadow: 0 0 0 2px var(--dx-outline-color);
      }

      input:hover + .control::before,
      input:focus + .control::before {
        background-color: var(--dx-toggle-button-bg-hover);
      }
    `,
  ];

  private _onChange(e: Event) {
    this.onChange(e);
  }

  override render() {
    return html`
      <label>
        <input type="checkbox" @click=${this._onChange} />
        <span class="control"></span>
        <span class="label"><slot></slot></span>
      </label>
    `;
  }
}