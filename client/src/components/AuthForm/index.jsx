import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Loader from '../Loader';
import { LinkBtn } from '../../commonStyles';
import {
  Container,
  Header,
  Content,
  ContentContainer,
  BottomLink,
} from './styles';

// import messages from './messages';

function AuthForm(props) {
  const {
    isFetching,
    onSubmit,
    username,
    password,
    usernameChanged,
    passwordChanged,
    error,
  } = props;

  return (
    <Container>
      <Paper zDepth={3} >
        <Paper zDepth={1} >
          <Header>
            LMS Login
          </Header>
        </Paper>
        <ContentContainer>
          <Content>
            <TextField
              floatingLabelText="Email"
              fullWidth
              onChange={usernameChanged}
              errorText={error}
              value={username}
              disabled={isFetching}
            />
            <TextField
              type="password"
              floatingLabelText="Password"
              fullWidth
              onChange={passwordChanged}
              value={password}
              disabled={isFetching}
            />
            <RaisedButton
              primary
              label="Submit"
              fullWidth
              onClick={() => { onSubmit({ username, password }); }}
              disabled={isFetching}
            />
            <BottomLink>
              <LinkBtn href="/resetPassword">
                Forgot password
              </LinkBtn>
            </BottomLink>
          </Content>

          {isFetching &&
            <Loader />
          }
        </ContentContainer>
      </Paper>
    </Container>
  );
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  usernameChanged: PropTypes.func,
  passwordChanged: PropTypes.func,
};

AuthForm.defaultProps = {
  isFetching: false,
  error: null,
  username: '',
  password: '',
  usernameChanged: () => {},
  passwordChanged: () => {},
};

export default AuthForm;
