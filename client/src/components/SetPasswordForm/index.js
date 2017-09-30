/**
*
* SetPasswordForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import messages from './messages';

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

function SetPasswordForm(props) {
  let password = props.password || '';

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
              type="password"
              floatingLabelText="Password"
              fullWidth
              onChange={passwordChanged}
              errorText={props.isError ? messages.error.defaultMessage : ''}
            />
            <RaisedButton
              primary
              label="Submit"
              fullWidth
              onClick={() => { props.onSubmit(password, props.token); }}
            />
          </Content>
        </ContentContainer>
      </Paper>
    </Container>
  );
}

SetPasswordForm.propTypes = {
  password: PropTypes.string,
  token: PropTypes.string,
  isFetching: PropTypes.bool,
  isError: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export default SetPasswordForm;
