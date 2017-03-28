/**
*
* AuthForm
*
*/

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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

function AuthForm() {
  return (
    <Container>
      <Paper zDepth={3} >
        <Paper zDepth={1} >
          <Header>
            <FormattedMessage {...messages.header} />
          </Header>
        </Paper>
        <Content>
          <TextField
            floatingLabelText="Username"
            fullWidth={true}
          />
          <TextField
            floatingLabelText="Password"
            fullWidth={true}
          />
          <RaisedButton
            primary={true}
            label="Submit"
            fullWidth={true}
          />
        </Content>
      </Paper>
    </Container>
  );
}

AuthForm.propTypes = {

};

export default AuthForm;
