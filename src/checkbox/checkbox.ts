import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('dx-checkbox')
export class DxCheckbox extends LitElement {
  @property()
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onChange = (_e: Event) => {};

  static override styles = css`
    :host {
      display: inline-block;
    }

    input {
      position: absolute;
      left: 0;
      z-index: -1;
      opacity: 0;
    }

    .ui {
      position: relative;
      display: inline-block;
      width: var(--dx-checkbox-size);
      height: var(--dx-checkbox-size);
      vertical-align: middle;
      border: solid 1px var(--dx-border-color);
      border-radius: $border-radius;
      cursor: pointer;
    }

    .ui::before {
      position: absolute;
      top: 50%;
      left: 50%;
      display: none;
      width: var(--dx-checkbox-size);
      height: var(--dx-checkbox-size);
      background-color: currentColor;
      transform: translate(-50%, -50%);
      content: '';
      mask-image: var(--dx-checkbox-img);
      mask-size: var(--dx-checkbox-size);
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      mask-position: center;
      -webkit-mask-image: var(--dx-checkbox-img);
      -webkit-mask-size: var(--dx-checkbox-size);
      -webkit-mask-position: center;
    }

    input:checked + .ui::before {
      display: block;
    }
  `;

  private _onChange(e: Event) {
    this.onChange(e);
  }

  override render() {
    return html`
      <span>
        <label>
          <input type="checkbox" @click=${this._onChange} />
          <span class="ui"></span>
          <slot></slot>
        </label>
      </span>
    `;
  }
}
