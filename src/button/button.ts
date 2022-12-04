import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('dx-button')
export class DxButton extends LitElement {
  @property()
  type?: string = 'button';

  static override styles = css`
    :host { display: inline-block; }
  `

  override render() {
    return html`<button><slot></slot></button>`;
  }
}