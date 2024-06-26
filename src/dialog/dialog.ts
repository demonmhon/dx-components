import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { GlobalStyles } from '../global-styles';

@customElement('dx-dialog')
export class DxDialog extends LitElement {
  private isShown: boolean = false;

  @property({ type: Boolean, reflect: true })
  'shown'?: boolean = false;

  @property({ attribute: 'modal', reflect: true })
  modal?: boolean | undefined = undefined;

  @property()
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onClose = (_e: Event) => { };
  show = () => {
    console.log('Dialog will be shown')
    this.isShown = true;
  }

  // private getBrowserScrollbarSize() {
  //   return window.innerWidth - document.documentElement.clientWidth;
  // };

  private _onClose(_e: Event): void {
    return !this.modal ? this.onClose(_e) : false;
  }

  private _onKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === 27) {
      // 
    }
  }

  static override styles = [
    GlobalStyles,
    css`
      :host .dialog {
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        height: 0;
        overflow: hidden;
        outline: none;
      }

      :host([show="true]) .dialog {
        height: 100%;
      }

      .dialog[data-show="true"] {
        border: solid 50px red;
      }
    `,
  ];

  override render() {
    return html`
      <div
        class="dialog"
        tabIndex="0"
        role="dialog"
        shown="${(this.isShown ? 'true' : 'false')}"
        @keydown="${this._onKeyDown}"
      >
        <div @click="${this._onClose}">
          <div @click="${(e: Event) => e.stopPropagation()}">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dx-dialog': DxDialog;
  }
}