import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Segment } from 'semantic-ui-react';
import SurveyField from './SurveyField';
import validateEmails from '../../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields = () =>
    _.map(formFields, ({ label, name }) => (
      <Field
        key={name}
        component={SurveyField}
        type="text"
        label={label}
        name={name}
      />
    ));

  render() {
    return (
      <Container>
        <Segment style={{ padding: '5em 0em' }} vertical>
          <Form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
            {this.renderFields()}
            <Form.Group style={{ display: 'inherit' }}>
              <Link to="/surveys">
                <Button floated="left">Cancel</Button>
              </Link>
              <Button
                type="submit"
                color="green"
                floated="right"
                labelPosition="right"
                icon="right chevron"
                content="Next"
              />
            </Form.Group>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const validate = values => {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || '');
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
