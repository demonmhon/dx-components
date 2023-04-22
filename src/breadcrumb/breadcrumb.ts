import { LitElement, TemplateResult, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { GlobalStyles } from '../global-styles';
import { DxBreadcrumbItem } from './breadcrumb.type';

@customElement('dx-breadcrumb')
export class DxBreadcrumb extends LitElement {
  static override styles = [
    GlobalStyles,
    css`
      :host {
        display: block;
      }

      ul,
      li {
        margin: 0;
        padding: 0;
      }

      ul {
        display: block;
      }

      li {
        display: inline-block;
      }

      li:not(:first-child)::before {
        display: inline-block;
        margin: 0 var(--dx-space-s);

        content: var(--dx-breadcrumb-separator);
      }

      a {
        color: var(--dx-link-color);
        text-decoration: none;
      }
    `,
  ];

  @property()
  data: DxBreadcrumbItem[] = [];

  private renderList(data: DxBreadcrumbItem[]): TemplateResult {
    const items = data.map((item: DxBreadcrumbItem, i: number) => {
      const isLast = i === data.length - 1;
      const label =
        !isLast && item.link
          ? html`<a href="${item.link}">${item.title}</a>`
          : item.title;

      return html`<li><span>${label}</span></li>`;
    });

    return html`<ul>
      ${items}
    </ul>`;
  }

  override render() {
    return html` <div>${this.renderList(this.data)}</div> `;
  }
}
