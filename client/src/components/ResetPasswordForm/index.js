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
  text-align: center;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ResetPasswordForm(props) {
  let email = '';

  function emailChanged(e, value) {
    email = value;
  }

  function getErrorText(error) {
    const errorMessages = {
      500: 'messages.serverError.defaultMessage',
      400: 'messages.incorrectCredentials.defaultMessage',
    };

    return error ? errorMessages[error.status] : '';
  }

  return (
    <Container>
      <Paper zDepth={3} >
        <Paper zDepth={1} >
          <Header>
            LMS Reset password
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
              name="email"
              floatingLabelText="Email"
              fullWidth
              onChange={emailChanged}
              errorText={getErrorText(props.error)}
            />
            <RaisedButton
              primary
              label="Submit"
              fullWidth
              onClick={() => { props.onSubmit({ email }); }}
            />
          </Content>
        </ContentContainer>
      </Paper>
    </Container>
  );
}

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  error: PropTypes.object,
};

export default ResetPasswordForm;
