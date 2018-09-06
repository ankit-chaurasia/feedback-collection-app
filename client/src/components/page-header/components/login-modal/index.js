import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { Button, Header, Divider, Form, Message } from 'semantic-ui-react';
import CustomModal from '../../../custom-modal';
import modalStyles from '../../../custom-modal/styles';
import TextInput from '../../../text-input';
import '../../../../stylesheets/index.css';
import { logInUser } from '../../../../actions/userActions';
import {
  emailValidator,
  passwordValidator
} from '../../../../utils/validators';
import loginFormFields from './loginFormFields';

class LoginModal extends Component {
  state = {
    hasFormError: false,
    formErrorMessage: ''
  };

  loginFooter = () => {
    return (
      <React.Fragment>
        <Divider fitted />
        <Header>
          <Header.Content>
            Don't have an account?{' '}
            <a onClick={this.props.openSignUpModal}>Sign Up</a>
          </Header.Content>
        </Header>
      </React.Fragment>
    );
  };

  renderFields = () =>
    _.map(loginFormFields, ({ label, name, placeholder, type, required }) => (
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

  onLoginSubmit = async () => {
    const errorRes = await this.props.logInUser(
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
        title="Log In to Your Emaily Account!"
        showModal={this.props.showLoginModal}
        onClose={this.props.closeLoginModal}
        style={modalStyles.positive}
        footer={this.loginFooter()}
      >
        <Button
          color="facebook"
          fluid
          size="large"
          as="a"
          href="/auth/facebook"
          className="margin-bottom"
          icon="facebook"
          content="Facebook"
        />
        <Button
          color="google plus"
          fluid
          size="large"
          as="a"
          href="/auth/google"
          className="margin-bottom"
          icon="google plus"
          content="Google Plus"
        />
        <Form
          onSubmit={this.props.handleSubmit(this.onLoginSubmit)}
          error={this.state.hasFormError}
          noValidate
        >
          {this.renderFields()}
          <Button
            type="submit"
            fluid
            size="large"
            color="teal"
            content="Log In"
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
  _.each(loginFormFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });
  return errors;
};

const LoginModalForm = reduxForm({
  validate,
  form: 'loginForm'
})(LoginModal);

const mapStateToProps = ({ form }) => {
  return { formValues: form.loginForm };
};

export default connect(
  mapStateToProps,
  { logInUser }
)(withRouter(LoginModalForm));
