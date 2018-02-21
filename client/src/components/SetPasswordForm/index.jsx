import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from '../Loader';

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

function SetPasswordForm(props) {
  const {
    isFetching,
    onSubmit,
    password,
    passwordChanged,
    error,
  } = props;

  return (
    <Container>
      <Paper zDepth={3} >
        <Paper zDepth={1} >
          <Header>
            Set your password
          </Header>
        </Paper>
        <ContentContainer>
          {isFetching &&
            <Loader />
          }
          <Content>
            <TextField
              type="password"
              floatingLabelText="Password"
              fullWidth
              value={password}
              onChange={passwordChanged}
              errorText={error}
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
  error: PropTypes.string,
  password: PropTypes.string,
  isFetching: PropTypes.bool,
  onSubmit: PropTypes.func,
  passwordChanged: PropTypes.func,
};

SetPasswordForm.defaultProps = {
  isFetching: false,
  error: null,
  password: '',
  onSubmit: () => {},
  passwordChanged: () => {},
};

export default SetPasswordForm;
