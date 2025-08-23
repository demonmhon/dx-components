import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { GlobalStyles } from '../global-styles';

@customElement('dx-dialog')
export class DxDialog extends LitElement {
  @query('.dialog') private _dialog!: HTMLElement;

  @property({ type: Boolean, reflect: true })
  shown = false;

  @property({ type: Boolean, reflect: true })
  modal = false;

  private _previouslyFocusedElement: HTMLElement | null = null;

  static override styles = [
    GlobalStyles,
    css`
      :host {
        display: none;
      }

      :host([shown]) {
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10000;
      }

      .dialog {
        height: 100%;
        outline: none;
      }

      .overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .content {
        background-color: var(--dx-background-color, white);
        padding: var(--dx-space-xl);
        border-radius: var(--dx-dialog-border-radius, 4px);
        border: solid 1px var(--dx-border-color);
        min-width: 60rem;
        max-width: calc(100vw - calc(var(--dx-space-xl) * 4));
        max-height: 80vh;
        overflow: auto;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
      }

      footer {
        margin-top: var(--dx-space-m);
        padding-top: var(--dx-space-m);
        border-top: solid 1px var(--dx-border-color);
        text-align: right;
      }

      @media (min-width: 768px) {
        max-width: 60vw;
      }
    `,
  ];

  override updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('shown')) {
      if (this.shown) {
        this._previouslyFocusedElement = document.activeElement as HTMLElement;
        // wait for render before focusing
        this.updateComplete.then(() => {
          this._dialog.focus();
        });
      } else if (this._previouslyFocusedElement) {
        this._previouslyFocusedElement.focus();
        this._previouslyFocusedElement = null;
      }
    }
  }

  private _handleOverlayClick(): void {
    if (!this.modal) {
      this.close();
    }
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && !this.modal) {
      this.close();
    }
  }

  /**
   * Closes the dialog.
   */
  public close(): void {
    if (!this.shown) {
      return;
    }
    this.shown = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div
        class="dialog"
        tabindex="-1"
        role="dialog"
        aria-modal="${this.modal}"
        aria-hidden="${!this.shown}"
        @keydown="${this._handleKeyDown}"
      >
        <div class="overlay" @click="${this._handleOverlayClick}">
          <div class="content" @click="${(e: Event) => e.stopPropagation()}" role="document">
            <header>
                <slot name="title"></slot>
            </header>  
            <section>
              <slot></slot>
            </section>
            <footer>
              <slot name="footer"></slot>
            </footer>
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