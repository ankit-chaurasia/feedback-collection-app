// SurveyFormReview shows users their inputs for review
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Header, List, Icon } from 'semantic-ui-react';
import formFields from './utils/formFields';
import { createSurvey } from '../../../actions/surveyActions';
import './stylesheets/index.css';

const SurveyFormReview = ({ onCancel, formValues, createSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ label, name }) => {
    return (
      <List.Item key={name} className="listItem">
        <List.Content floated="right">{formValues[name]}</List.Content>
        <List.Content>{label}</List.Content>
      </List.Item>
    );
  });

  return (
    <div>
      <Header as="h3">
        <Icon name="check circle" color="green" />
        <Header.Content>Please confirm your entries</Header.Content>
      </Header>
      <List divided verticalAlign="middle">
        {reviewFields}
      </List>
      <Button
        type="submit"
        floated="left"
        labelPosition="left"
        icon="left chevron"
        content="Back"
        onClick={onCancel}
      />
      <Button
        color="green"
        floated="right"
        labelPosition="right"
        icon="right mail"
        content="Send Survey"
        onClick={() => createSurvey(formValues, history)}
      />
    </div>
  );
};

const mapStateToProps = ({ form }) => ({ formValues: form.surveyForm.values });

export default connect(
  mapStateToProps,
  { createSurvey }
)(withRouter(SurveyFormReview));
