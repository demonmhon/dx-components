import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { GlobalStyles } from '../global-styles';

@customElement('dx-toggle')
export class DxToggle extends LitElement {
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
        display: inline-block;
      }

      input {
        position: absolute;
        left: 0;
        z-index: -1;
        opacity: 0;
      }

      .control {
        display: inline-flex;
        position: relative;

        width: var(--dx-toggle-width);
        height: calc(
          var(--dx-toggle-button-size) + calc(var(--dx-toggle-space) * 2)
        );
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
        width: 3px;
        height: calc(var(--dx-toggle-button-size) / 1.5);
        top: 50%;
        left: calc(calc(var(--dx-toggle-button-size) / 2) + var(--dx-toggle-space));
        display: block;
        border-radius: 3px;
        transform: translate(-50%, -50%);

        background-color: var(--dx-toggle-active-bg);
        content: '';
      }

      .control::after {
        position: absolute;
        top: 50%;
        left: var(--dx-toggle-space);

        display: inline-flex;
        position: relative;
        width: var(--dx-toggle-button-size);
        height: var(--dx-toggle-button-size);
        border-radius: var(--dx-toggle-border-radius);

        background-color: var(--dx-toggle-button-bg);
        transform: translate(0, -50%);
        content: '';

        transition-duration: var(--dx-transition-fastest);
        transition-property: left;
      }

      input:checked + .control::after {
        left: calc(
          calc(100% - var(--dx-toggle-button-size)) -
            calc(var(--dx-toggle-space))
        );
      }

      input:focus + .control {
        box-shadow: 0 0 0 2px var(--dx-outline-color);
      }

      input:hover + .control::after,
      input:focus + .control::after {
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
        <input
          type="checkbox"
          @click=${this._onChange}
          ?disabled=${this.disabled}
          ?checked=${this.checked}
        />
        <span class="control"></span>
      </label>
    `;
  }
}
