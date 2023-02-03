import { css } from 'lit';
export const GlobalStyles = css`
  :host {
    box-sizing: border-box;
    font-size: var(--dx-component-font-size);
    line-height: var(--dx-component-line-height);
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;
