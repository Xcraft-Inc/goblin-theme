'use strict';
const Goblin = require('xcraft-core-goblin');
const goblinName = 'theme-composer';
const themeConfig = require('xcraft-core-etc')().load('goblin-theme');

// Define initial logic values
const logicState = {};

// Define logic handlers according rc.json
const logicHandlers = {
  'create': (state, action) => {
    return state.set('', {
      id: action.get('id'),
      themes: {default: action.get('theme')},
    });
  },
  'change': (state, action) => {
    return state.set(action.get('path'), action.get('newValue'));
  },
  'compose-theme': (state, action) => {
    return state.set(`themes.${action.get('name')}`, action.get('theme'));
  },
};

const composeTheme = (name, {builder, colors, spacing, timing, look}) => {
  const withColors = require(`./themes/colors/${colors}-colors.js`);
  const withSpacing = require(`./themes/spacings/${spacing}-spacing.js`);
  const withTiming = require(`./themes/timings/${timing}-timing.js`);
  const withLook = require(`./themes/looks/${look}-look.js`);

  return {
    name,
    builder,
    spacing: withSpacing,
    colors: withColors,
    timing: withTiming,
    look: withLook,
  };
};

// Register quest's according rc.json
Goblin.registerQuest(goblinName, 'create', function* (
  quest,
  desktopId,
  builder = 'default',
  colors = 'default',
  spacing = 'default',
  timing = 'default',
  look = 'default'
) {
  const themeContext = quest.goblin.id.split('@')[1];
  const theme = composeTheme('default', {
    builder,
    colors,
    spacing,
    timing,
    look,
  });

  quest.do({
    theme,
  });

  if (themeConfig.compositions) {
    for (const [name, compo] of Object.entries(themeConfig.compositions)) {
      if (compo.themeContexts) {
        if (!compo.themeContexts.includes(themeContext)) {
          continue;
        }
      }
      yield quest.me.composeTheme({name, ...compo});
    }
  }

  return quest.goblin.id;
});

Goblin.registerQuest(goblinName, 'change', function (
  quest,
  path,
  newValue,
  clientSessionId
) {
  quest.do();
  quest.evt(`${clientSessionId}.reload-theme.requested`, {
    name: path.split('.')[1],
  });
});

Goblin.registerQuest(goblinName, 'compose-theme', function (
  quest,
  name = 'default',
  builder = 'default',
  colors = 'default',
  spacing = 'default',
  timing = 'default',
  look = 'default'
) {
  if (!name) {
    throw new Error('invalid theme name provided');
  }

  const theme = composeTheme(name, {
    builder,
    colors,
    spacing,
    timing,
    look,
  });

  quest.do({
    name,
    theme,
  });
});

Goblin.registerQuest(goblinName, 'delete', function (quest) {
  console.log('xxx');
});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
