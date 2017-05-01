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
  error: {
    id: 'app.components.AuthForm.error',
    defaultMessage: 'The username or password is incorrect',
  },
});
