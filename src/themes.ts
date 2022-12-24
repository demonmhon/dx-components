import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('dx-themes')
export class DxThemes extends LitElement {
  static override styles = css`
    --color-bg-info: #4f83cc;
    --color-bg-warning: #fbc02d;
    --color-bg-error: #e53935;
  ` as CSSResultGroup;

  override render() {
    return html`<div></div>`;
  }
}
