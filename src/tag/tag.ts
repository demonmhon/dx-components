import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('dx-tag')
export class DxTag extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      margin-right: 1px;
      margin-bottom: 1px;
      padding: var(--dx-space-xs) var(--dx-space-l);

      color: var(--dx-tag-text);
      font-size: 0.75rem;

      background-color: var(--dx-tag-bg);
      border: solid 1px transparent;
      border-radius: 2rem;
    }
  `;

  override render() {
    return html` <span><slot></slot></span> `;
  }
}
