import { loader } from '../actions';

const defaultState = {
  isFetching: true,
};

export default function authReducers(state = defaultState, action) {
  switch (action.type) {
    case loader.INITIAL_DATA_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case loader.INITIAL_DATA_FETCHING_FINISH:
      return {
        ...state,
        isFetching: false,
      };
    case loader.INITIAL_DATA_FETCHING_ERROR:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
}
