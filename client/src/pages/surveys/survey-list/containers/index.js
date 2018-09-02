import { connect } from 'react-redux';
import {
  fetchSurveys,
  openDeleteSurveyModal,
  closeDeleteSurveyModal
} from '../../../../actions/surveyActions';
import SurveyList from '../components';

const mapStateToProps = ({
  surveys: { surveyList, showSurveyDeleteModal }
}) => ({
  surveyList,
  showSurveyDeleteModal
});

const mapDispatchToProps = {
  fetchSurveys,
  openDeleteSurveyModal,
  closeDeleteSurveyModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyList);
