import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  currentCompositor: null,
});

export default (state = initialState, action = {}) => {
  if (action.type === 'SELECT') {
    return state.set('currentCompositor', action.compositor);
  }

  return state;
};
