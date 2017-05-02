/*
 * AuthForm Messages
 *
 * This contains all the text for the AuthForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.AuthForm.header',
    defaultMessage: 'LMS Login',
  },
  incorrectCredentials: {
    id: 'app.components.AuthForm.incorrectCredentials',
    defaultMessage: 'The username or password is incorrect',
  },
  serverError: {
    id: 'app.components.AuthForm.serverError',
    defaultMessage: 'Something went wrong',
  },
});
