'use strict';

const goblinName = 'theme-editor';
const Goblin = require('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    return state.set('', {
      id: action.get('id'),
    });
  },
};

Goblin.registerQuest(goblinName, 'create', function (quest, desktopId) {
  quest.do();
  return quest.goblin.id;
});

Goblin.registerQuest(goblinName, 'select', function* (quest, composition) {
  const deskAPI = quest.getAPI(quest.getDesktop());
  yield deskAPI.changeTheme({name: composition});
});

Goblin.registerQuest(goblinName, 'delete', function (quest) {});

// Singleton
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
