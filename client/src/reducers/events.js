import {
  EVENTS_GET_FETCHING,
  EVENTS_GET_FETCHING_FINISH,
  EVENTS_GET_FETCHING_ERROR,
} from '../actions/events';

const defaultState = {
  items: [],
  isFetching: false,
};

export default function authReducers(state = defaultState, action) {
  switch (action.type) {
    // get
    case EVENTS_GET_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case EVENTS_GET_FETCHING_FINISH:
      return {
        ...state,
        isFetching: false,
        items: action.payload,
        error: null,
      };
    case EVENTS_GET_FETCHING_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
