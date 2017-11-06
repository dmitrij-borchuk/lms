import { groups } from '../api';

export const GROUPS_SAVE_FETCHING = 'GROUPS_SAVE_FETCHING';
export const GROUPS_SAVE_FETCHING_FINISH = 'GROUPS_SAVE_FETCHING_FINISH';
export const GROUPS_SAVE_FETCHING_ERROR = 'GROUPS_SAVE_FETCHING_ERROR';
export function save(data) {
  return (dispatch) => {
    dispatch({
      type: GROUPS_SAVE_FETCHING,
    });

    return groups.save(data).then(() => dispatch({
      type: GROUPS_SAVE_FETCHING_FINISH,
    })).catch(
      (err) => {
        dispatch({
          type: GROUPS_SAVE_FETCHING_ERROR,
          payload: err.response.body.message,
        });
        return Promise.reject();
      }
    );
  };
}

export const GROUPS_GET_ALL_FETCHING = 'GROUPS_GET_ALL_FETCHING';
export const GROUPS_GET_ALL_FETCHING_FINISH = 'GROUPS_GET_ALL_FETCHING_FINISH';
export const GROUPS_GET_ALL_FETCHING_ERROR = 'GROUPS_GET_ALL_FETCHING_ERROR';
export function getAll(data) {
  return (dispatch) => {
    dispatch({
      type: GROUPS_GET_ALL_FETCHING,
    });

    return groups.get(data).then((res) => dispatch({
      type: GROUPS_GET_ALL_FETCHING_FINISH,
      payload: res.body,
    })).catch(
      (err) => {
        dispatch({
          type: GROUPS_GET_ALL_FETCHING_ERROR,
          payload: err.response.body.message,
        });
        return Promise.reject();
      }
    );
  };
}