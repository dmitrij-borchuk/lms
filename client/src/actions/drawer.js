export const DRAWER_OPEN = 'DRAWER_OPEN';
export const DRAWER_CLOSE = 'DRAWER_CLOSE';
export function open() {
  return {
    type: DRAWER_OPEN,
  };
}
export function close() {
  return {
    type: DRAWER_CLOSE,
  };
}
