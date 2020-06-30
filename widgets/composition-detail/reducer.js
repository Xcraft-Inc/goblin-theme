import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  currentComposition: null,
});

export default (state = initialState, action = {}) => {
  if (action.type === 'SELECT') {
    return state.set('currentComposition', action.composition);
  }
  return state;
};
