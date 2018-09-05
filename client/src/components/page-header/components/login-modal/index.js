import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { Button, Header, Divider, Form } from 'semantic-ui-react';
import CustomModal from '../../../custom-modal';
import modalStyles from '../../../custom-modal/styles';
import TextInput from '../../../text-input';
import '../../../../stylesheets/index.css';
import { logInUser } from '../../../../actions/userActions';

const LoginModal = props => {
  const loginFooter = () => {
    return (
      <React.Fragment>
        <Divider fitted />
        <Header>
          <Header.Content>
            Don't have an account?{' '}
            <a onClick={props.openSignUpModal}>Sign Up</a>
          </Header.Content>
        </Header>
      </React.Fragment>
    );
  };

  return (
    <CustomModal
      title="Log In to Your Emaily Account!"
      showModal={props.showLoginModal}
      onClose={props.closeLoginModal}
      style={modalStyles.positive}
      footer={loginFooter()}
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
      <Form onSubmit={props.handleSubmit(props.onLoginSubmit)}>
        <Field
          component={TextInput}
          placeholder="Email"
          name="email"
          required={true}
          icon="mail"
        />
        <Field
          component={TextInput}
          placeholder="Password"
          name="password"
          required={true}
          icon="lock"
          type="password"
        />
        <Button
          fluid
          size="large"
          as="a"
          color="teal"
          content="Log In"
          onClick={() =>
            props.logInUser(props.formValues.values, props.history)
          }
        />
      </Form>
    </CustomModal>
  );
};

const validate = values => {
  const errors = {};
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
