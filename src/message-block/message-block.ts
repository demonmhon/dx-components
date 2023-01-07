import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { GlobalStyles } from '../global-styles';
import { BlockType } from './message-block.type';

@customElement('dx-message-block')
export class DxMessageBlock extends LitElement {
  @property()
  type?: BlockType;

  static override styles = [
    GlobalStyles,
    css`
      :host {
        display: block;
      }
      [data-type] {
        display: flex;
        position: relative;
        padding: 4px 4px 4px 8px;
        margin-bottom: 1px;
        font-size: 0.75rem;
        border: solid 1px currentColor;
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
        color: var(--dx-info-color);
      }
      [data-type='warning'] {
        color: var(--dx-warning-color);
      }
      [data-type='error'] {
        color: var(--dx-error-color);
      }
      .icon {
        position: relative;
        
        display: inline-block;
        width: var(--dx-message-icon-size);
        height: var(--dx-message-icon-size);
        margin-right: var(--dx-space-m);
      }
      .message {
        flex: 1;
        padding-top: calc((var(--dx-message-icon-size) - var(--dx-font-size)) / 2);
      }
      .icon::before {
        display: block;
        width: var(--dx-message-icon-size);
        height: var(--dx-message-icon-size);

        background-color: currentColor;

        content: '';

        mask-image: var(--dx-message-info-icon);
        mask-size: var(--dx-message-icon-size);
        mask-repeat: no-repeat;
        mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-image: var(--dx-message-info-icon);
        -webkit-mask-size: var(--dx-message-icon-size);
        -webkit-mask-position: center;
      }
      [data-type='warning'] .icon::before {
        mask-image: var(--dx-message-warn-icon);
        -webkit-mask-image: var(--dx-message-warn-icon);
      }
      [data-type='error'] .icon::before {
        mask-image: var(--dx-message-error-icon);
        -webkit-mask-image: var(--dx-message-error-icon);
      }
    `,
  ];

  private getType(): string {
    return this.type ? this.type : BlockType.Info;
  }

  override render() {
    return html`
      <div data-type="${this.getType()}">
        <div class="icon"></div>
        <div class="message"><slot></slot></div>
      </div>
    `;
  }
}
