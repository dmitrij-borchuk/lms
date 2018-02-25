import {
  COMMON_OPEN_DRAWER,
  COMMON_CLOSE_DRAWER,
} from '../actions/common';

const defaultState = {
  drawer: {
    isOpened: false,
  },
};

export default function reducers(state = defaultState, action) {
  switch (action.type) {
    // Drawer
    case COMMON_OPEN_DRAWER:
      return {
        ...state,
        drawer: {
          ...state.drawer,
          isOpened: true,
        },
      };
    case COMMON_CLOSE_DRAWER:
      return {
        ...state,
        drawer: {
          ...state.drawer,
          isOpened: false,
        },
      };

    default:
      return state;
  }
}
