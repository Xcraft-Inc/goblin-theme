'use strict';

/******************************************************************************/

const units = ['px', 'rem', 'em', '%', 'vmax', 'vmin', 'vh', 'vw'];

/******************************************************************************/

// Convert string '123.4px' to '123.4'.
function toValue(value) {
  if (typeof value === 'string') {
    return parseFloat(value.replace(/px/g, ''));
  } else {
    return value;
  }
}

/******************************************************************************/

// Convert string '123.4px' to int 123.
function toInt(value) {
  if (typeof value === 'string') {
    return parseInt(value.replace(/px/g, ''));
  } else {
    return value;
  }
}

/******************************************************************************/

// Convert number 123 to string "123px".
function toPx(value) {
  return value + 'px';
}

/******************************************************************************/

// Convert number 50 to string "50%".
function toPc(n) {
  return n + '%';
}

/******************************************************************************/

// Convert number 50 to string "50{unit}".
function to(n, cssUnit) {
  /* HACK: we must remove 'px' from goblin-theme shapes and specify the default
   * unit by an other way.
   */
  const p = parse(n);
  if (p.unit !== 'px') {
    return n;
  }
  return typeof cssUnit === 'object'
    ? `${p.value * cssUnit.ratio}${cssUnit.unit}`
    : `${p.value}${cssUnit}`;
}

/******************************************************************************/

function fix(value, decimals) {
  if (typeof decimals !== 'string') {
    if (typeof decimals === 'number') {
      if (decimals >= 0 && decimals <= 20) {
        return value.toFixed(decimals); // return a string
      }
    } else {
      return value; // return the initial value
    }
  }
  throw new Error(`Invalid number of decimals '${decimals}'`);
}

/******************************************************************************/

function parse(value) {
  if (typeof value === 'number') {
    return {value, unit: 'px'};
  }
  for (let unit of units) {
    if (value.endsWith(unit)) {
      value = value.substring(0, value.length - unit.length);
      if (value.includes('.')) {
        value = parseFloat(value);
      } else {
        value = parseInt(value);
      }
      return {value, unit};
    }
  }
  throw new Error(`Value '${value}' has an unexpected format`);
}

/******************************************************************************/

function multiply(value, factor, rounded) {
  if (typeof value === 'number') {
    return value * factor;
  }
  const num = parse(value);

  switch (rounded) {
    case 'round':
      return Math.round(num.value * factor) + num.unit;
    case 'floor':
      return Math.floor(num.value * factor) + num.unit;
    case 'ceil':
      return Math.ceil(num.value * factor) + num.unit;
    default:
      return num.value * factor + num.unit;
  }
}

/******************************************************************************/

function add(a, b, decimals = null) {
  if ((typeof a === 'number') === (typeof b === 'number')) {
    if (typeof a === 'number' && typeof b === 'number') {
      return a + b;
    }
    const numA = parse(a);
    const numB = parse(b);
    if (numA.unit === numB.unit) {
      return fix(numA.value + numB.value, decimals) + numA.unit;
    }
  }
  throw new Error(`Values '${a}' and '${b}' have incompatible format`);
}

/******************************************************************************/

function sub(a, b, decimals = null) {
  if ((typeof a === 'number') === (typeof b === 'number')) {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    const numA = parse(a);
    const numB = parse(b);
    if (numA.unit === numB.unit) {
      return fix(numA.value - numB.value, decimals) + numA.unit;
    }
  }
  throw new Error(`Values '${a}' and '${b}' have incompatible format`);
}

/******************************************************************************/

module.exports = {
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
