import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { GlobalStyles } from '../global-styles';

@customElement('dx-button')
export class DxButton extends LitElement {
  @property()
  type?: string = 'button';

  @property({ attribute: 'outline', reflect: true })
  outline?: boolean | undefined = undefined;

  @property({ type: Boolean, reflect: true })
  disabled?: boolean | undefined = undefined;

  static override styles = [
    GlobalStyles,
    css`
      :host {
        display: inline-block;
      }

      :host([disabled]) {
        opacity: var(--disable-opacity-state);
      }

      button {
        background-color: var(--dx-button-bg);
        border: solid 1px transparent;
        border-radius: var(--dx-button-border-radius);

        color: var(--dx-button-text);
        margin-right: 1px;
        margin-bottom: 1px;
        padding: var(--dx-space-m) var(--dx-space-xl);

        transition-duration: var(--dx-transition-fastest);
        transition-property: background-color box-shadow;
        cursor: pointer;
      }

      button:focus,
      button:hover {
        box-shadow: 0 0 0 2px var(--dx-outline-color);
      }

      button:hover {
        background-color: var(--dx-button-bg-hover);
      }

      :host([outline]) button {
        background-color: var(--dx-button-outline-bg);
        color: var(--dx-font-color);
        border-color: var(--dx-border-color);
      }
    `,
  ];

  private onClick(e: Event): void {
    e.stopPropagation();
  }

  override render() {
    return html`<button @click="${this.onClick}"><slot></slot></button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dx-button': DxButton;
  }
}