'use strict';

/******************************************************************************/

// Return the color to use from a value of a property.
// You can use a direct color '#rrggbb' or the key word 'primary' or 'secondary'.
// In this two cases, the color is defined into theme.palette.mark*.
function getMarkColor(theme, value) {
  if (!theme || !value || value.startsWith('#') || value.startsWith('rgb')) {
    //  Bypass this colors:
    //  #f00
    //  #123456
    //  rgb(100,100,100)
    //  rgba(0,0,0,0.5)
    return value;
  } else {
    const color = {
      'base': theme.palette.markBase,
      'primary': theme.palette.markPrimary,
      'secondary': theme.palette.markSecondary,
      'success': theme.palette.markSuccess,
      'pick': theme.palette.markPick,
      'drop-pick': theme.palette.markDropPick,
      'drop': theme.palette.markDrop,
      'task': theme.palette.markTask,
      'main': theme.palette.chronoEventMainBackground,
      'start': theme.palette.chronoEventStartBackground,
      'middle': theme.palette.chronoEventMiddleBackground,
      'end': theme.palette.chronoEventEndBackground,
      'red': theme.palette.red,
      'green': theme.palette.green,
      'blue': theme.palette.blue,
      'orange': theme.palette.orange,
    }[value];
    return color ? color : value;
  }
}

/******************************************************************************/

module.exports = {
  getMarkColor,
};

/******************************************************************************/
