// SurveyFormReview shows users their inputs for review
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import formFields from './formFields';
import { submitSurvey } from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
  const reviewFields = _.map(formFields, ({ label, name }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={() => submitSurvey(formValues)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = ({ form }) => ({ formValues: form.surveyForm.values });

export default connect(
  mapStateToProps,
  { submitSurvey }
)(SurveyFormReview);
