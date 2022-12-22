var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let DxButton = class DxButton extends LitElement {
    constructor() {
        super(...arguments);
        this.type = 'button';
    }
    onClick(e) {
        e.stopPropagation();
    }
    render() {
        return html `<button @click="${this.onClick}"><slot></slot></button>`;
    }
};
DxButton.styles = css `
    :host {
      display: inline-block;
    }
  `;
__decorate([
    property()
], DxButton.prototype, "type", void 0);
DxButton = __decorate([
    customElement('dx-button')
], DxButton);
export { DxButton };
//# sourceMappingURL=button.js.map