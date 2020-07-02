'use strict';

module.exports = {
  iconSize: {type: 'integer', min: 10, max: 100},
  desktopKeylineIncrement: {type: 'integer', min: 10, max: 100},

  lineHeight: {type: 'size'},
  containerMargin: {type: 'size'},
  lineSpacing: {type: 'size'},
  smoothRadius: {type: 'size'},

  fontFamily: {type: 'enum', list: ['Lato']},
  fontScale: {type: 'number', min: 0.5, max: 2, step: 0.1},
};
