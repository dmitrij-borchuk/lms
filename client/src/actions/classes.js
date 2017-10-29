import { classes } from '../api';

export const CLASS_SAVE_FETCHING = 'CLASS_SAVE_FETCHING';
export const CLASS_SAVE_FETCHING_FINISH = 'CLASS_SAVE_FETCHING_FINISH';
export const CLASS_SAVE_FETCHING_ERROR = 'CLASS_SAVE_FETCHING_ERROR';
export function save(data) {
  return (dispatch) => {
    dispatch({
      type: CLASS_SAVE_FETCHING,
    });

    return classes.save(data).then(() => dispatch({
      type: CLASS_SAVE_FETCHING_FINISH,
    })).catch(
      (err) => {
        dispatch({
          type: CLASS_SAVE_FETCHING_ERROR,
          payload: err.response.body.message,
        });
        return Promise.reject();
      }
    );
  };
}

export const CLASS_GET_ALL_FETCHING = 'CLASS_GET_ALL_FETCHING';
export const CLASS_GET_ALL_FETCHING_FINISH = 'CLASS_GET_ALL_FETCHING_FINISH';
export const CLASS_GET_ALL_FETCHING_ERROR = 'CLASS_GET_ALL_FETCHING_ERROR';
export function getAll(data) {
  return (dispatch) => {
    dispatch({
      type: CLASS_GET_ALL_FETCHING,
    });

    return classes.get(data).then((res) => dispatch({
      type: CLASS_GET_ALL_FETCHING_FINISH,
      payload: res.body,
    })).catch(
      (err) => {
        dispatch({
          type: CLASS_GET_ALL_FETCHING_ERROR,
          payload: err.response.body.message,
        });
        return Promise.reject();
      }
    );
  };
}