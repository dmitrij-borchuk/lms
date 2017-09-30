import { getCurrentUser } from './auth';
// import { get as getSettings } from './settings';

export const INITIAL_DATA_FETCHING = 'INITIAL_DATA_FETCHING';
export const INITIAL_DATA_FETCHING_FINISH = 'INITIAL_DATA_FETCHING_FINISH';
export const INITIAL_DATA_FETCHING_ERROR = 'INITIAL_DATA_FETCHING_ERROR';
export function getInitialData() {
  return (dispatch) => {
    dispatch({
      type: INITIAL_DATA_FETCHING,
    });

    return Promise.all([
      dispatch(getCurrentUser()),
      // dispatch(getSettings()),
    ]).then(() => {
      dispatch({
        type: INITIAL_DATA_FETCHING_FINISH,
      });
    }).catch((err) => {
      dispatch({
        type: INITIAL_DATA_FETCHING_ERROR,
      });
      throw err instanceof Error ? err : new Error(err);
    });
  };
}
