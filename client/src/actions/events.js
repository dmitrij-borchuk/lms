import { events } from '../api';

export const EVENTS_GET_FETCHING = 'EVENTS_GET_FETCHING';
export const EVENTS_GET_FETCHING_FINISH = 'EVENTS_GET_FETCHING_FINISH';
export const EVENTS_GET_FETCHING_ERROR = 'EVENTS_GET_FETCHING_ERROR';
export function get() {
  return (dispatch) => {
    dispatch({
      type: EVENTS_GET_FETCHING,
    });

    return events.get().then(
      res => dispatch({
        type: EVENTS_GET_FETCHING_FINISH,
        payload: res.body,
      }),
    ).catch(
      (err) => {
        dispatch({
          type: EVENTS_GET_FETCHING_ERROR,
          payload: err.response.body,
        });
        return Promise.reject();
      },
    );
  };
}
