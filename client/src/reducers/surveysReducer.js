import {
  FETCH_SURVEYS,
  FETCH_SURVEY,
  OPEN_DELETE_SURVEY_MODAL,
  CLOSE_DELETE_SURVEY_MODAL
} from '../actions/actionTypes';

const surveyDefaultState = {
  surveyList: [],
  showSurveyDeleteModal: false
};

export default (state = surveyDefaultState, action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return { ...state, surveyList: action.payload };
    case FETCH_SURVEY:
      return { ...state, surveyList: action.payload };
    case OPEN_DELETE_SURVEY_MODAL:
      return { ...state, showSurveyDeleteModal: true };
    case CLOSE_DELETE_SURVEY_MODAL:
      return { ...state, showSurveyDeleteModal: false };
    default:
      return state;
  }
};
