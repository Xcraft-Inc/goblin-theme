'use strict';

module.exports = {
  name: {type: 'string'},
  accessories: [],
  themeTitle: {type: 'string'},
  themeSubtitle: {type: 'string'},
  homeGadget: {type: 'string'},
  clock: {type: 'string'},
  clockParams: {
    size: {type: 'size'},
    initialLook: {type: 'string'},
    looks: {
      type: 'enum',
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
    initialVisibility: {type: 'bool'},
  },
};
