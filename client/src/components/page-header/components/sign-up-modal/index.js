import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { Button, Header, Divider, Form } from 'semantic-ui-react';
import CustomModal from '../../../custom-modal';
import modalStyles from '../../../custom-modal/styles';
import TextInput from '../../../text-input';
import {
  emailValidator,
  passwordValidator
} from '../../../../utils/validators';
import signUpFormFields from './signUpFormFields';
import { createUser } from '../../../../actions/userActions';

const SignUpModal = props => {
  const signUpFooter = () => {
    return (
      <React.Fragment>
        <Divider fitted />
        <Header>
          <Header.Content>
            Already have an account?{' '}
            <a onClick={props.openLoginModal}>Log In</a>
          </Header.Content>
        </Header>
      </React.Fragment>
    );
  };

  const renderFields = () =>
    _.map(signUpFormFields, ({ label, name, placeholder, type, required }) => (
      <Field
        key={name}
        component={TextInput}
        type={type}
        label={label}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    ));

  return (
    <CustomModal
      title="Sign Up and Start Sending Surveys!"
      showModal={props.showSignUpModal}
      onClose={props.closeSignUpModal}
      style={modalStyles.positive}
      footer={signUpFooter()}
    >
      <Form onSubmit={props.handleSubmit(() => {})} noValidate>
        {renderFields()}
        <Button
          type="submit"
          fluid
          size="large"
          color="teal"
          content="Sign Up"
          onClick={() =>
            props.createUser(props.formValues.values, props.history)
          }
        />
      </Form>
    </CustomModal>
  );
};

const validate = values => {
  const errors = {};
  errors.email = emailValidator(values.email || '');
  errors.password = passwordValidator(values.password || '');
  _.each(signUpFormFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });
  return errors;
};

const SignUpModalForm = reduxForm({
  validate,
  form: 'signUpForm'
})(SignUpModal);

const mapStateToProps = ({ form }) => {
  return { formValues: form.signUpForm };
};

export default connect(
  mapStateToProps,
  { createUser }
)(withRouter(SignUpModalForm));
