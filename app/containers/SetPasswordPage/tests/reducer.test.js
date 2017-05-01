
import { fromJS } from 'immutable';
import setPasswordPageReducer from '../reducer';

describe('setPasswordPageReducer', () => {
  it('returns the initial state', () => {
    expect(setPasswordPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
