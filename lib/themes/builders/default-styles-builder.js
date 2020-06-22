'use strict';

/******************************************************************************/

const resetMargin = {
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
};

const resetPadding = {
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
};

const resetBorder = {
  borderLeft: 0,
  borderRight: 0,
  borderTop: 0,
  borderBottom: 0,
};

const resetListStyle = {
  listStyle: 'none',
};

const resetAlign = {
  verticalAlign: 'baseline',
};

const resetLayout = Object.assign({}, resetBorder, resetMargin, resetPadding);

const fullSize = {
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

/******************************************************************************/

module.exports = function () {
  return {
    fullSize,
    reset: Object.assign({}, resetAlign, resetLayout, resetListStyle),
    resetAlign,
    resetBorder,
    resetLayout,
    resetMargin,
    resetPadding,
    resetList: Object.assign(
      {},
      resetBorder,
      resetMargin,
      resetPadding,
      resetListStyle
    ),
    resetListStyle,
  };
};

/******************************************************************************/
