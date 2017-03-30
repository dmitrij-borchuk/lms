/**
*
* AuthForm
*
*/

import React, { PropTypes } from 'react'
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
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

function AuthForm(props) {
  let username = '';
  let password = '';

  function usernameChanged(e, value) {
    username = value;
  }

  function passwordChanged(e, value) {
    password = value;
  }

  return (
    <Container>
      <Paper zDepth={3} >
        <Paper zDepth={1} >
          <Header>
            <FormattedMessage {...messages.header} />
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
              floatingLabelText="Username"
              fullWidth={true}
              onChange={usernameChanged}
              errorText={props.isError ? messages.error.defaultMessage : ''}
            />
            <TextField
              floatingLabelText="Password"
              fullWidth={true}
              onChange={passwordChanged}
            />
            <RaisedButton
              primary={true}
              label="Submit"
              fullWidth={true}
              onClick={ () => {props.onSubmit({username, password})} }
            />
          </Content>
        </ContentContainer>
      </Paper>
    </Container>
  );
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool,
  isError: React.PropTypes.bool,
};

export default AuthForm;
