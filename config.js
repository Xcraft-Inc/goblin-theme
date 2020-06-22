'use strict';

/**
 * Retrieve the inquirer definition for xcraft-core-etc
 */
module.exports = [
  {
    type: 'checkbox',
    name: 'compositions',
    message: 'list of available compositions',
    default: [],
  },
  {
    type: 'checkbox',
    name: 'subThemeContext',
    message: 'list of sub theme contexts',
    default: [],
  },
];
