'use strict';

module.exports = {
  iconSize: {type: 'integer', min: 10, max: 100},
  desktopKeylineIncrement: {type: 'integer', min: 10, max: 100},

  lineHeight: {type: 'pixel'},
  containerMargin: {type: 'pixel'},
  lineSpacing: {type: 'pixel'},
  smoothRadius: {type: 'pixel'},

  fontFamily: {type: 'enum', list: ['Lato']},
  fontScale: {type: 'number', min: 0.5, max: 2, step: 0.1},
};
