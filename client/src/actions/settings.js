// import { settings } from '../api';

// export const SETTINGS_FETCHING = 'SETTINGS_FETCHING';
// export const SETTINGS_FETCHING_FINISH = 'SETTINGS_FETCHING_FINISH';
// export const SETTINGS_FETCHING_ERROR = 'SETTINGS_FETCHING_ERROR';
// export function get() {
//   return (dispatch) => {
//     dispatch({
//       type: SETTINGS_FETCHING,
//     });

//     return settings.get()
//     .then(res => dispatch({
//       type: SETTINGS_FETCHING_FINISH,
//       payload: res.body,
//     }))
//     .catch((err) => {
//       if (err instanceof Error) {
//         throw err;
//       } else {
//         dispatch({
//           type: SETTINGS_FETCHING_ERROR,
//           payload: err.response.body.message,
//         });
//         return Promise.reject();
//       }
//     });
//   };
// }
