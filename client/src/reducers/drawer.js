import Immutable from 'immutable';

import { drawer } from '../actions';

const defaultState = Immutable.fromJS({
  opened: false,
});

export default function authReducers(state = defaultState, action) {
  switch (action.type) {
    case drawer.DRAWER_OPEN:
      return state.set('opened', true);
      case drawer.DRAWER_CLOSE:
      return state.set('opened', false);

    default:
      return state;
  }
}
