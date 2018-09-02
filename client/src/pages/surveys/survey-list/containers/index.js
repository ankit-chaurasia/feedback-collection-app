import { connect } from 'react-redux';
import {
  fetchSurveys,
  openDeleteSurveyModal,
  closeDeleteSurveyModal,
  deleteSurvey
} from '../../../../actions/surveyActions';
import SurveyList from '../components';

const mapStateToProps = ({
  surveys: {
    surveyList,
    showSurveyDeleteModal,
    currSurveyId,
    deleteSurveyPending
  }
}) => ({
  surveyList,
  showSurveyDeleteModal,
  currSurveyId,
  deleteSurveyPending
});

const mapDispatchToProps = {
  fetchSurveys,
  openDeleteSurveyModal,
  closeDeleteSurveyModal,
  deleteSurvey
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyList);
