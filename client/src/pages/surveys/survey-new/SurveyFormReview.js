// SurveyFormReview shows users their inputs for review
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Header, List, Icon } from 'semantic-ui-react';
import surveyFormFields from './utils/surveyFormFields';
import { createSurvey, updateSurvey } from '../../../actions/surveyActions';
import './stylesheets/index.css';

const SurveyFormReview = ({
  onCancel,
  formValues,
  createSurvey,
  updateSurvey,
  history,
  mode,
  surveyId
}) => {
  const reviewFields = _.map(surveyFormFields, ({ label, name }) => {
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
        content={mode === 'create' ? 'Send Survey' : 'Send Updated Survey'}
        onClick={
          mode === 'create'
            ? () => createSurvey(formValues, history)
            : () =>
                updateSurvey(
                  {
                    ...formValues,
                    surveyId
                  },
                  history
                )
        }
      />
    </div>
  );
};

const mapStateToProps = ({ form }) => ({ formValues: form.surveyForm.values });

export default connect(
  mapStateToProps,
  { createSurvey, updateSurvey }
)(withRouter(SurveyFormReview));
