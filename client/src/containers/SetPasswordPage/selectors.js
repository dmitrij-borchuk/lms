import { createSelector } from 'reselect';

/**
 * Direct selector to the setPasswordPage state domain
 */
const selectSetPasswordPageDomain = () => (state) => state.get('setPasswordPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SetPasswordPage
 */

const makeSelectSetPasswordPage = () => createSelector(
  selectSetPasswordPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectSetPasswordPage;
export {
  selectSetPasswordPageDomain,
};
