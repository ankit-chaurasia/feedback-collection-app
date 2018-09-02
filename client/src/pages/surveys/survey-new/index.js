import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import SurveyForm from './survey-form';
import SurveyFormReview from './SurveyFormReview';
import ResponsiveContainer from '../../../components/responsive-container';
import { fetchSurvey } from '../../../actions/surveyActions';
import CustomModal from '../../../components/custom-modal';
import modalStyles from '../../../components/custom-modal/styles';
import colorsEnum from '../../../helpers/colorsEnums';
import Payments from '../../../components/payments';

class SurveyNew extends Component {
  state = {
    showFormReview: false,
    showNoCreditModal: true
  };

  componentDidMount() {
    this.props.fetchSurvey(this.props.match.params.surveyId);
  }

  closeNoCreditModal = () => {
    this.setState(() => ({
      showNoCreditModal: false
    }));
    this.props.history.push('/');
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
          mode={this.props.match.params.surveyId ? 'update' : 'create'}
          surveyId={this.props.match.params.surveyId}
        />
      );
    } else if (this.props.credits) {
      return (
        <SurveyForm
          onSurveySubmit={() => {
            this.setState(() => ({
              showFormReview: true
            }));
          }}
        />
      );
    } else {
      return (
        <CustomModal
          showModal={this.state.showNoCreditModal}
          closeIcon={false}
          title="Oops!! No credits"
          headerIcon="warning sign"
          confirmButtonText={<Payments />}
          headerIconColor={colorsEnum.yellow}
          onCancel={this.closeNoCreditModal}
          onConfirm={() => {}}
          style={modalStyles.negative}
          confirmButtonIcon="payment"
        >
          You don't have enough credits to create a survey
        </CustomModal>
      );
    }
  };

  render() {
    return <ResponsiveContainer>{this.renderContent()}</ResponsiveContainer>;
  }
}

SurveyNew = reduxForm({
  form: 'surveyForm',
  enableReinitialize: true
})(SurveyNew);

const mapStateToProps = ({
  surveys: { surveyFormData },
  auth: { credits }
}) => {
  let recipients = [];
  if (surveyFormData[0] && surveyFormData[0].recipients) {
    _.each(surveyFormData[0].recipients, ({ email }) => {
      recipients.push(email);
    });
  }
  return {
    initialValues: {
      ...surveyFormData[0],
      recipients: recipients.join(', ')
    },
    credits
  };
};

export default connect(
  mapStateToProps,
  { fetchSurvey }
)(SurveyNew);
