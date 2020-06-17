module.exports = {
  defaultBuilders: {
    paletteBuilder: require('./themes/builders/default-palette-builder.js'),
    shapesBuilder: require('./themes/builders/default-shapes-builder.js'),
    stylesBuilder: require('./themes/builders/default-styles-builder.js'),
    transitionsBuilder: require('./themes/builders/default-transitions-builder.js'),
    typoBuilder: require('./themes/builders/default-typo-builder.js'),
  },
};
