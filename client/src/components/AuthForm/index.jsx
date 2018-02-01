import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Loader from '../Loader';


// import messages from './messages';

const Container = styled.div`
  margin: auto;
  padding: 50px 0;
  width: 300px;
`;

const Header = styled.div`
  padding: 20px;
  background-color: #19aa8d;
  color: #fff;
`;

const Content = styled.div`
  padding: 20px;
`;

const ContentContainer = styled.div`
  position: relative;
`;


function AuthForm(props) {
  const {
    isFetching,
    onSubmit,
  } = props;
  let username = props.username || '';
  let password = props.password || '';

  function usernameChanged(e, value) {
    username = value;
  }

  function passwordChanged(e, value) {
    password = value;
  }

  function getErrorText(error) {
    const errorMessages = {
      500: 'messages.serverError.defaultMessage',
      400: 'messages.incorrectCredentials.defaultMessage',
    };

    return error ? errorMessages[error.statusCode] : '';
  }

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
              errorText={getErrorText(props.error)}
            />
            <TextField
              type="password"
              floatingLabelText="Password"
              fullWidth
              onChange={passwordChanged}
            />
            <RaisedButton
              primary
              label="Submit"
              fullWidth
              onClick={() => { onSubmit({ username, password }); }}
            />
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
  error: PropTypes.shape({
    statusCode: PropTypes.number,
  }),
  username: PropTypes.string,
  password: PropTypes.string,
};

AuthForm.defaultProps = {
  isFetching: false,
  error: null,
  username: '',
  password: '',
};

export default AuthForm;
