import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { GlobalStyles } from '../global-styles';

@customElement('dx-checkbox')
export class DxCheckbox extends LitElement {
  @property()
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onChange = (_e: Event) => {};

  @property({ attribute: 'disabled', type: Boolean })
  disabled = false;

  @property({ attribute: 'checked', type: Boolean })
  checked = false;

  static override styles = [
    GlobalStyles,
    css`
      :host([disabled]) {
        opacity: var(--disable-opacity-state);
      }

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
        margin-top: 2px;

        display: inline-flex;
        flex: 0 0 auto;
        width: var(--dx-checkbox-size);
        height: var(--dx-checkbox-size);

        vertical-align: middle;
        border: solid 1px var(--dx-border-color);
        border-radius: var(--dx-checkbox-border-radius);
        cursor: pointer;

        transition-duration: var(--dx-transition-fastest);
        transition-property: box-shadow;
      }

      .control::before {
        position: absolute;
        top: 50%;
        left: 50%;

        display: none;
        width: var(--dx-checkbox-size);
        height: var(--dx-checkbox-size);

        background-color: currentColor;
        transform: translate(-50%, -50%);
        content: '';

        mask-image: var(--dx-checkbox-img);
        mask-size: var(--dx-checkbox-size);
        mask-repeat: no-repeat;
        mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-image: var(--dx-checkbox-img);
        -webkit-mask-size: var(--dx-checkbox-size);
        -webkit-mask-position: center;
      }

      .label {
        flex: 1;
        padding-left: var(--dx-space-m);
      }

      input:checked + .control::before {
        display: block;
      }

      input:focus + .control {
        box-shadow: 0 0 0 2px var(--dx-outline-color);
      }
    `,
  ];

  private _onChange(e: Event) {
    this.onChange(e);
  }

  override render() {
    return html`
      <label>
        <input
          type="checkbox"
          @click=${this._onChange}
          ?disabled=${this.disabled}
          ?checked=${this.checked}
        />
        <span class="control"></span>
        <span class="label"><slot></slot></span>
      </label>
    `;
  }
}
