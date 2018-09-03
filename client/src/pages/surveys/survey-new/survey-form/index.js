import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../../../components/text-input';
import validateEmails from '../../../../utils/validateEmails';
import formFields from '../utils/formFields';

class SurveyForm extends Component {
  renderFields = () =>
    _.map(formFields, ({ label, name }) => (
      <Field
        key={name}
        component={TextInput}
        type="text"
        label={label}
        name={name}
        placeholder={label}
      />
    ));

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        {this.renderFields()}
        <Form.Group style={{ display: 'inherit' }}>
          <Link to="/surveys">
            <Button floated="left">Cancel</Button>
          </Link>
          <Button
            type="submit"
            primary
            floated="right"
            labelPosition="right"
            icon="right chevron"
            content="Next"
          />
        </Form.Group>
      </Form>
    );
  }
}

const validate = values => {
  const errors = {};
  const recipients =
    values.recipients && values.recipients[0] && values.recipients[0].email
      ? values.recipients[0].email
      : values.recipients;
  errors.recipients = validateEmails(recipients || '');
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });
  return errors;
};

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
