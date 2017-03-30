
import {
  submitLoginForm,
} from '../actions';
import {
  SUBMIT_LOGIN_FORM,
} from '../constants';

describe('LoginPage actions', () => {
  describe('Default Action', () => {
    it('has a type of SUBMIT_LOGIN_FORM', () => {
      const expected = {
        type: SUBMIT_LOGIN_FORM,
      };
      expect(submitLoginForm()).toEqual(expected);
    });
  });
});
