import Fa from './fa.js';

import OpenSansRegularWoff from './fonts/open-sans-v15-latin-regular.woff';
import OpenSansRegularWoff2 from './fonts/open-sans-v15-latin-regular.woff2';
import OpenSansItalicWoff from './fonts/open-sans-v15-latin-italic.woff';
import OpenSansItalicWoff2 from './fonts/open-sans-v15-latin-italic.woff2';
import OpenSans700Woff from './fonts/open-sans-v15-latin-700.woff';
import OpenSans700Woff2 from './fonts/open-sans-v15-latin-700.woff2';
import OpenSans700ItalicWoff from './fonts/open-sans-v15-latin-700italic.woff';
import OpenSans700ItalicWoff2 from './fonts/open-sans-v15-latin-700italic.woff2';

Fa();

function getFonts(theme) {
  return `
    @font-face {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 400;
      src:
        url('${OpenSansRegularWoff2}') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('${OpenSansRegularWoff}') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }

    @font-face {
      font-family: 'Open Sans';
      font-style: italic;
      font-weight: 400;
      src:
        url('${OpenSansItalicWoff2}') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('${OpenSansItalicWoff}') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }

    @font-face {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 700;
      src:
        url('${OpenSans700Woff2}') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('${OpenSans700Woff}') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }

    @font-face {
      font-family: 'Open Sans';
      font-style: italic;
      font-weight: 700;
      src:
        url('${OpenSans700ItalicWoff2}') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('${OpenSans700ItalicWoff}') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
  `;
}

function getGlobalStyles(theme) {
  if (!theme) {
    console.warn('Theme is undefined in globalStyles');
  }

  const tooltipColorBackground = `${
    theme.palette.tooltipBackground
  } !important`;
  const tooltipColorBorder = `${theme.palette.tooltipBorder} !important`;
  const tooltipColorText = `${theme.palette.tooltipText} !important`;

  return {
    body: {
      color: '#999',
      fontFamily: ['Open Sans', 'Helvetica', 'Arial', 'sans-serif'],
      fontWeight: 300,
      margin: 0,
      padding: 0,
      userSelect: 'none',
    },

    pre: {
      display: 'block',
      margin: 0,
    },

    xmp: {
      display: 'block',
      margin: 0,
    },

    plaintext: {
      display: 'block',
      margin: 0,
    },

    listing: {
      display: 'block',
      margin: 0,
    },

    code: {
      font: 'inherit',
      color: theme.palette.markdownHiliteText,
      backgroundColor: theme.palette.markdownHiliteBackground,
      padding: '1px',
      margin: 0,
    },

    h1: {
      fontSize: theme.shapes.markdownH1FontSize,
      fontWeight: 300,
      margin: '0px',
      marginTop: '8px',
    },

    'h1:firstOfType': {
      marginTop: '0px',
    },

    h2: {
      fontSize: theme.shapes.markdownH2FontSize,
      fontWeight: 300,
      margin: '0px',
      marginTop: '8px',
    },

    'h2:firstOfType': {
      marginTop: 0,
    },

    p: {
      margin: 0,
    },

    ul: {
      fontSize: theme.shapes.markdownListFontSize,
      margin: 0,
      paddingLeft: theme.shapes.markdownListPadding,
      listStyleType: 'disc',
    },

    ol: {
      fontSize: theme.shapes.markdownListFontSize,
      margin: 0,
      paddingLeft: theme.shapes.markdownListPadding,
    },

    '::WebkitScrollbar': {
      width: theme.shapes.scrollerThickness,
      height: theme.shapes.scrollerThickness,
    },

    '::WebkitScrollbarTrack': {},

    '::WebkitScrollbarCorner': {
      backgroundColor: 'transparent',
    },

    '::WebkitScrollbarThumb': {
      boxShadow:
        'inset 0 0 ' +
        theme.shapes.scrollerThickness +
        ' ' +
        theme.shapes.scrollerThickness +
        ' ' +
        theme.palette.scrollerThumbBackground,
      border: 'solid 2px transparent',
      borderRadius: '8px',
    },

    '::WebkitScrollbarThumb:hover': {
      boxShadow:
        'inset 0 0 ' +
        theme.shapes.scrollerThickness +
        ' ' +
        theme.shapes.scrollerThickness +
        ' ' +
        theme.palette.scrollerThumbHoverBackground,
    },

    /* Begin tooltip section (not used anymore) */

    '.tooltip': {
      fontSize: `${theme.shapes.tooltipFontSize} !important`,
      borderColor: tooltipColorBorder,
      borderRadius: `${theme.shapes.tooltipRadius} !important`,
      color: tooltipColorText,
      backgroundColor: tooltipColorBackground,
      boxShadow: `${theme.shapes.tooltipShadow} !important`,
      opacity: '1 !important',
      padding: `${theme.shapes.tooltipPadding} !important`,
    },

    '.place-right::before': {
      borderRight: `8px solid ${tooltipColorBorder}`,
    },

    '.place-left::before': {
      borderLeft: `8px solid ${tooltipColorBorder}`,
    },

    '.place-top::before': {
      borderTop: `8px solid ${tooltipColorBorder}`,
    },

    '.place-bottom::before': {
      borderBottom: `8px solid ${tooltipColorBorder}`,
    },

    '.place-right::after': {
      borderRightColor: `${tooltipColorBackground}`,
    },

    '.place-left::after': {
      borderLeftColor: `${tooltipColorBackground}`,
    },

    '.place-top::after': {
      borderTopColor: `${tooltipColorBackground}`,
    },

    '.place-bottom::after': {
      borderBottomColor: `${tooltipColorBackground}`,
    },

    '.multi-line': {
      textAlign: 'left !important',
    },

    /* End tooltip section */
  };
}

export default {
  theme: 'default',
  getFonts,
  getGlobalStyles,
};
