import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { Button, Icon, Header, Divider, Form } from 'semantic-ui-react';
import CustomModal from '../../../custom-modal';
import modalStyles from '../../../custom-modal/styles';
import TextInput from '../../../text-input';
import '../../stylesheets/loginModal.css';

const LoginModal = props => {
  const loginFooter = () => {
    return (
      <React.Fragment>
        <Divider fitted />
        <Header>
          <Header.Content>
            Don't have an account? <Link to="">Sign up</Link>
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
        disabled
        fluid
        size="large"
        className="margin-bottom"
      >
        <Icon name="facebook" /> Facebook
      </Button>
      <Button
        color="google plus"
        fluid
        size="large"
        as="a"
        href="/auth/google"
        className="margin-bottom"
      >
        <Icon name="google plus" /> Google Plus
      </Button>
      <Form onSubmit={props.handleSubmit(props.onLoginSubmit)}>
        <Field
          component={TextInput}
          type="text"
          placeholder="Email"
          name="Email"
          required={true}
          icon="mail"
        />
        <Field
          component={TextInput}
          type="text"
          placeholder="Password"
          name="Password"
          required={true}
          icon="lock"
        />
        <Form.Group style={{ display: 'inherit' }}>
          <Button
            fluid
            size="large"
            as={Link}
            to="/surveys"
            color="teal"
            content="Log In"
          />
        </Form.Group>
      </Form>
    </CustomModal>
  );
};

const validate = values => {
  const errors = {};
  //   const recipients =
  //     values.recipients && values.recipients[0] && values.recipients[0].email
  //       ? values.recipients[0].email
  //       : values.recipients;
  //   errors.recipients = validateEmails(recipients || '');
  //   _.each(formFields, ({ name }) => {
  //     if (!values[name]) {
  //       errors[name] = 'You must provide a value';
  //     }
  //   });
  return errors;
};

export default reduxForm({
  validate,
  form: 'loginForm'
})(LoginModal);
