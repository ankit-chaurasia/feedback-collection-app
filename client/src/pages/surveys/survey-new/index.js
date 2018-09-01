import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import SurveyForm from './survey-form';
import SurveyFormReview from './SurveyFormReview';
import ResponsiveContainer from '../../../components/responsive-container';
import { fetchSurvey } from '../../../actions/surveyActions';

class SurveyNew extends Component {
  state = {
    showFormReview: false
  };

  componentDidMount() {
    this.props.fetchSurvey(this.props.match.params.surveyId);
  }

  renderContent = () => {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => {
            this.setState(() => ({
              showFormReview: false
            }));
          }}
          mode={this.props.match.params.surveyId ? 'update' : 'create'}
          surveyId={this.props.match.params.surveyId}
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

SurveyNew = reduxForm({
  form: 'surveyForm',
  enableReinitialize: true
})(SurveyNew);

const mapStateToProps = ({ surveys }) => ({
  initialValues: surveys[0]
});

export default connect(
  mapStateToProps,
  { fetchSurvey }
)(SurveyNew);
