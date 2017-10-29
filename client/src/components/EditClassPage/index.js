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

function EditClassPage(props) {
  const {
    id,
    handleSubmit,
    serverError,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        {id ? (
          <h2>Edit class</h2>
        ) : (
          <PageTitle>Create class</PageTitle>
        )}
        <Field
          name="title"
          component={renderTextField}
          label="Title"
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

EditClassPage.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  serverError: PropTypes.string,
  save: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'classEdit',
})(EditClassPage);