export const COMMON_OPEN_DRAWER = 'COMMON_OPEN_DRAWER';
export function openDrawer() {
  return dispatch => dispatch({
    type: COMMON_OPEN_DRAWER,
  });
}
export const COMMON_CLOSE_DRAWER = 'COMMON_CLOSE_DRAWER';
export function closeDrawer() {
  return dispatch => dispatch({
    type: COMMON_CLOSE_DRAWER,
  });
}
