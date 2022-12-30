import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { BlockType } from './message-block.type';

@customElement('dx-message-block')
export class DxMessageBlock extends LitElement {
  @property()
  type?: BlockType;

  static override styles = css`
    :host {
      display: block;
    }
    [data-type] {
      position: relative;
      padding: 4px 4px 4px 8px;
      margin-bottom: 1px;
      font-size: 0.75rem;
    }
    [data-type]::before {
      position: absolute;
      background-color: currentColor;
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
      content: '';
    }
    [data-type='info'] {
      color: var(--dx-color-info);
    }
    [data-type='warning'] {
    }
    [data-type='error'] {
    }
  `;

  private getType(): string {
    return this.type ? this.type : BlockType.Info;
  }

  override render() {
    return html` <div data-type="${this.getType()}"><slot></slot></div> `;
  }
}
