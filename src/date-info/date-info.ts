import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { GlobalStyles } from '../global-styles';

@customElement('dx-date-info')
export class DxDateInfo extends LitElement {
  @property()
  value?: string = new Date().toISOString();

  static override styles = [GlobalStyles, css``];

  private parseValue(): string {
    return this.value ? this.value?.toString() : '';
  }

  override render() {
    return html`<span>${this.parseValue()}</span>`;
  }
}
