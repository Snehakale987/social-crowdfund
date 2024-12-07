// GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* ...existing styles... */

  /* Responsive Images */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Box-sizing for consistent sizing */
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
