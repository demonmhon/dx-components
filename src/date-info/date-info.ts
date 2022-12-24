import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('dx-date-info')
export class DxDateInfo extends LitElement {
  @property()
  value?: string = new Date().toISOString();

  static override styles = css``;

  private parseValue(): string {
    console.log(this.value);
    return this.value ? this.value?.toString() : '';
  }

  override render() {
    return html`<span>${this.parseValue()}</span>`;
  }
}
