import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('dx-themes')
export class DxThemes extends LitElement {
  static override styles = css`
    --dx-color-info: #4f83cc;
    --dx-color-warning: #fbc02d;
    --dx-color-error: #e53935;
  ` as CSSResultGroup;

  override render() {
    return html`<div></div>`;
  }
}
