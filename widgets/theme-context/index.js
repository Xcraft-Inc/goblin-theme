let proAvailable = true;
try {
  require('@fortawesome/fontawesome-pro');
} catch (ex) {
  if (ex.code === 'MODULE_NOT_FOUND') {
    proAvailable = false;
  } else {
    throw ex;
  }
}

let Fa;
if (proAvailable) {
  Fa = require('./fa-free.js').default;
} else {
  Fa = require('./fa-free.js').default;
}

import LatoRegularWoff from './fonts/lato-v14-latin-regular.woff';
import LatoRegularWoff2 from './fonts/lato-v14-latin-regular.woff2';

Fa();

function getFonts(theme) {
  return `
    @font-face {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      src:
        url('${LatoRegularWoff2}') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('${LatoRegularWoff}') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
  `;
}

function getGlobalStyles(theme) {
  if (!theme) {
    console.warn('Theme is undefined in globalStyles');
  }

  return {
    '.root': {
      color: 'red', // The color needs to be redefined in specific app.
      fontFamily: theme.typo.font,
      margin: 0,
      padding: 0,
      userSelect: 'none',
    },

    'input': {
      fontFamily: theme.typo.font,
    },
  };
}

export default {
  getFonts,
  getGlobalStyles,
  builders: {
    default: require('../../lib/index.js').defaultBuilders,
  },
};
