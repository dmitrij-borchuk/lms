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
  const {
    isFetching,
    onSubmit,
    email,
    emailChanged,
    error,
  } = props;

  return (
    <Container>
      <Paper zDepth={3} >
        <Paper zDepth={1} >
          <Header>
            LMS Reset password
          </Header>
        </Paper>
        <ContentContainer>
          {isFetching &&
            <ProgressContainer>
              <CircularProgress />
            </ProgressContainer>
          }
          <Content>
            <TextField
              name="email"
              floatingLabelText="Email"
              value={email}
              fullWidth
              onChange={emailChanged}
              errorText={error}
            />
            <RaisedButton
              primary
              label="Submit"
              fullWidth
              onClick={() => { onSubmit({ email }); }}
            />
          </Content>
        </ContentContainer>
      </Paper>
    </Container>
  );
}

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  email: PropTypes.string,
  emailChanged: PropTypes.func,
};

ResetPasswordForm.defaultProps = {
  isFetching: false,
  error: null,
  email: '',
  emailChanged: () => {},
  onSubmit: () => {},
};

export default ResetPasswordForm;
