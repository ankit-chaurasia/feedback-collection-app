import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Header, Divider, Form } from 'semantic-ui-react';
import CustomModal from '../../../custom-modal';
import modalStyles from '../../../custom-modal/styles';
import TextInput from '../../../text-input';

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

  return (
    <CustomModal
      title="Sign Up and Start Sending Surveys!"
      showModal={props.showSignUpModal}
      onClose={props.closeSignUpModal}
      style={modalStyles.positive}
      footer={signUpFooter()}
    >
      <Form onSubmit={props.handleSubmit(props.onSignUpSubmit)}>
        <Field
          component={TextInput}
          placeholder="Full Name"
          name="fullName"
          required={true}
          icon="user"
        />
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
          content="Sign Up"
          disabled
        />
      </Form>
    </CustomModal>
  );
};

const validate = values => {
  const errors = {};
  return errors;
};

export default reduxForm({
  validate,
  form: 'signUpForm'
})(SignUpModal);
