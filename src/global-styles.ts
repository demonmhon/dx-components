import { css } from 'lit';
export const GlobalStyles = css`
  :host {
    box-sizing: border-box;
    font-size: var(--dx-font-size);
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;
