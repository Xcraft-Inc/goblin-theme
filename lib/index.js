'use strict';

/******************************************************************************/

const {
  fade,
  lighten,
  darken,
  emphasize,
  getContrastRatio,
  getLuminance,
} = require('./themes/color-manipulator.js');

const {getMarkColor} = require('./themes/color-helpers.js');
const {
  toValue,
  toInt,
  toPx,
  toPc,
  parse,
  fix,
  multiply,
  add,
  sub,
} = require('./themes/unit.js');

const ColorManipulator = {
  fade,
  lighten,
  darken,
  emphasize,
  getContrastRatio,
  getLuminance,
};

const Unit = {toValue, toInt, toPx, toPc, parse, fix, multiply, add, sub};
const ColorHelpers = {getMarkColor};
module.exports = {
  ColorManipulator,
  ColorHelpers,
  Unit,
  defaultBuilders: {
    paletteBuilder: require('./themes/builders/default-palette-builder.js'),
    shapesBuilder: require('./themes/builders/default-shapes-builder.js'),
    stylesBuilder: require('./themes/builders/default-styles-builder.js'),
    transitionsBuilder: require('./themes/builders/default-transitions-builder.js'),
    typoBuilder: require('./themes/builders/default-typo-builder.js'),
  },
};
