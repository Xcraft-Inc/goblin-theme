'use strict';

module.exports = {
  iconSize: {kind: 'integer', min: 10, max: 100},
  desktopKeylineIncrement: {kind: 'integer', min: 10, max: 100},

  lineHeight: {kind: 'pixel', min: 10, max: 100, step: 1},
  containerMargin: {kind: 'pixel', min: 0, max: 100, step: 1},
  lineSpacing: {kind: 'pixel', min: 0, max: 100, step: 1},
  smoothRadius: {kind: 'pixel', min: 0, max: 100, step: 1},

  fontFamily: {
    kind: 'combo',
    list: ['lato', 'open-sans', 'alatsi', 'anton', 'arvo', 'podkova'],
  },
  fontScale: {kind: 'number', min: 0.5, max: 2, step: 0.1},
};
