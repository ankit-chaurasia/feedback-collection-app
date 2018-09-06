import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { Button, Header, Divider, Form, Message } from 'semantic-ui-react';
import CustomModal from '../../../custom-modal';
import modalStyles from '../../../custom-modal/styles';
import TextInput from '../../../text-input';
import {
  emailValidator,
  passwordValidator
} from '../../../../utils/validators';
import signUpFormFields from './signUpFormFields';
import { createUser } from '../../../../actions/userActions';

class SignUpModal extends Component {
  state = {
    hasFormError: false,
    formErrorMessage: ''
  };

  signUpFooter = () => {
    return (
      <React.Fragment>
        <Divider fitted />
        <Header>
          <Header.Content>
            Already have an account?{' '}
            <a onClick={this.props.openLoginModal}>Log In</a>
          </Header.Content>
        </Header>
      </React.Fragment>
    );
  };

  renderFields = () =>
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

  onSignUpSubmit = async () => {
    const errorRes = await this.props.createUser(
      this.props.formValues.values,
      this.props.history
    );
    if (errorRes) {
      const {
        data: { error, errorType, message }
      } = errorRes;
      if (error && errorType === 'form') {
        this.setState(() => ({
          hasFormError: true,
          formErrorMessage: message
        }));
      }
      if (error && errorType === 'field') {
        this.setState(() => ({
          hasFormError: true,
          formErrorMessage: message
        }));
      }
    }
  };

  render() {
    return (
      <CustomModal
        title="Sign Up and Start Sending Surveys!"
        showModal={this.props.showSignUpModal}
        onClose={this.props.closeSignUpModal}
        style={modalStyles.positive}
        footer={this.signUpFooter()}
      >
        <Form
          onSubmit={this.props.handleSubmit(this.onSignUpSubmit)}
          error={this.state.hasFormError}
          noValidate
        >
          {this.renderFields()}
          <Button
            type="submit"
            fluid
            size="large"
            color="teal"
            content="Sign Up"
            disabled={
              this.props.invalid || this.props.submitting || this.props.pristine
            }
          />
          <Message error content={this.state.formErrorMessage} />
        </Form>
      </CustomModal>
    );
  }
}

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
