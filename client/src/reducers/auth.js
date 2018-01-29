import { auth } from '../actions';

const defaultState = {
  loginIfFetching: false,
  currentUserInfoFatching: true,
  currentUser: null,
  error: null,
};

export default function authReducers(state = defaultState, action) {
  switch (action.type) {
    // Login
    case auth.AUTH_LOGIN_FETCHING:
      return {
        ...state,
        loginIfFetching: true,
      };
    case auth.AUTH_LOGIN_FETCHING_FINISH:
      return {
        ...state,
        loginIfFetching: false,
        token: action.payload,
        error: null,
      };
    case auth.AUTH_LOGIN_FETCHING_ERROR:
      return {
        ...state,
        loginIfFetching: false,
        token: null,
        error: action.payload,
      };

    // Current user
    case auth.AUTH_CURRENT_USER_FETCHING:
      return {
        ...state,
        currentUserInfoFatching: true,
      };
    case auth.AUTH_CURRENT_USER_FETCHING_FINISH:
      return {
        ...state,
        currentUserInfoFatching: false,
        currentUser: action.payload,
      };
    case auth.AUTH_CURRENT_USER_FETCHING_ERROR:
      return {
        ...state,
        currentUserInfoFatching: false,
        currentUser: null,
      };

    default:
      return state;
  }
}
