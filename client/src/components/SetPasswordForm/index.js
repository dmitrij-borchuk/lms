/**
*
* SetPasswordForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

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

const ProgressContainer = styled.div`
  background-color: rgba(0,0,0,0.1);
  position: absolute;
  height: 100%;
  padding-top: 75px;
  text-align: center;
  z-index: 2;
  width: 100%;
`;


function getErrorText(error) {
  const errorMessages = {
    500: 'messages.serverError.defaultMessage',
    400: 'messages.incorrectCredentials.defaultMessage',
  };

  return error ? errorMessages[error.status] : '';
}

function SetPasswordForm(props) {
  const {
    error,
    onSubmit,
  } = props;
  let password = props.password || '';

  function passwordChanged(e, value) {
    password = value;
  }

  return (
    <Container>
      <Paper zDepth={3} >
        <Paper zDepth={1} >
          <Header>
            Set your password
          </Header>
        </Paper>
        <ContentContainer>
          {props.isFetching &&
            <ProgressContainer>
              <CircularProgress />
            </ProgressContainer>
          }
          <Content>
            <TextField
              type="password"
              floatingLabelText="Password"
              fullWidth
              onChange={passwordChanged}
              errorText={getErrorText(error)}
            />
            <RaisedButton
              primary
              label="Submit"
              fullWidth
              onClick={() => { onSubmit(password); }}
            />
          </Content>
        </ContentContainer>
      </Paper>
    </Container>
  );
}

SetPasswordForm.propTypes = {
  password: PropTypes.string,
  isFetching: PropTypes.bool,
  isError: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export default SetPasswordForm;
