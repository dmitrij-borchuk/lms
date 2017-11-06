import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';

import { Container, PageTitle, FormToolbar } from '../common';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
      fullWidth
    />
  );
}

function EditGroupPage(props) {
  const {
    id,
    handleSubmit,
    serverError,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        {id ? (
          <h2>Edit group</h2>
        ) : (
          <PageTitle>Create group</PageTitle>
        )}
        <Field
          name="name"
          component={renderTextField}
          label="Name"
          errorText={serverError}
        />
        <FormToolbar>
          <RaisedButton
            label="Save"
            type="submit"
            primary={true}
          />
        </FormToolbar>
      </Container>
    </form>
  );
}

EditGroupPage.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  serverError: PropTypes.string,
  save: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'groupEdit',
})(EditGroupPage);