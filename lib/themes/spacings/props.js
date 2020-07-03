'use strict';

module.exports = {
  iconSize: {kind: 'integer', min: 10, max: 100},
  desktopKeylineIncrement: {kind: 'integer', min: 10, max: 100},

  lineHeight: {kind: 'pixel'},
  containerMargin: {kind: 'pixel'},
  lineSpacing: {kind: 'pixel'},
  smoothRadius: {kind: 'pixel'},

  fontFamily: {
    kind: 'combo',
    list: ['lato', 'open-sans', 'alatsi', 'anton', 'arvo', 'podkova'],
  },
  fontScale: {kind: 'number', min: 0.5, max: 2, step: 0.1},
};
