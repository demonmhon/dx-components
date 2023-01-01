import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { GlobalStyles } from '../global-styles';

@customElement('dx-button')
export class DxButton extends LitElement {
  @property()
  type?: string = 'button';

  static override styles = [
    GlobalStyles,
    css`
      :host {
        display: inline-block;
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
