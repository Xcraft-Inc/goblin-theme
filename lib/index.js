'use strict';

//***************************//
//     color-manipulator     //
//***************************//

const {
  fade,
  lighten,
  darken,
  emphasize,
  getContrastRatio,
  getLuminance,
  convertHexToRGB,
  convertHexToRGBObject
} = require('./themes/color-manipulator.js');

const ColorManipulator = {
  fade,
  lighten,
  darken,
  emphasize,
  getContrastRatio,
  getLuminance,
  convertHexToRGB,
  convertHexToRGBObject
};

//***************************//
//       color-helpers       //
//***************************//

// prettier-ignore
const {
  getMarkColor,
} = require('./themes/color-helpers.js');

const ColorHelpers = {
  getMarkColor,
};

//***************************//
//           unit            //
//***************************//

const {
  toValue,
  toInt,
  toPx,
  toPc,
  to,
  parse,
  fix,
  multiply,
  add,
  sub,
} = require('./themes/unit.js');

const Unit = {
  toValue,
  toInt,
  toPx,
  toPc,
  to,
  parse,
  fix,
  multiply,
  add,
  sub,
};

/******************************************************************************/

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

/******************************************************************************/
