'use strict';

module.exports = {
  name: {kind: 'string'},
  accessories: [],
  themeTitle: {kind: 'string'},
  themeSubtitle: {kind: 'string'},
  homeGadget: {kind: 'string'},
  clock: {kind: 'string'},
  clockParams: {
    size: {kind: 'pixel', min: 50, max: 1000, step: 10},
    initialLook: {kind: 'string'},
    looks: {
      kind: 'combo',
      list: [
        'cff',
        'black',
        'classic',
        'simple',
        'discreet',
        'royal',
        'smoothy',
        'transparent',
        'light',
        'ring',
      ],
    },
    initialVisibility: {kind: 'bool'},
  },
};
