import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './survey-form';
import SurveyFormReview from './SurveyFormReview';
import ResponsiveContainer from '../../../components/responsive-container';

class SurveyNew extends Component {
  state = {
    showFormReview: false
  };

  renderContent = () => {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => {
            this.setState(() => ({
              showFormReview: false
            }));
          }}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => {
          this.setState(() => ({
            showFormReview: true
          }));
        }}
      />
    );
  };

  render() {
    return <ResponsiveContainer>{this.renderContent()}</ResponsiveContainer>;
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
