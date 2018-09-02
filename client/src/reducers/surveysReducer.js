import {
  FETCH_SURVEYS,
  FETCH_SURVEY,
  OPEN_DELETE_SURVEY_MODAL,
  CLOSE_DELETE_SURVEY_MODAL,
  DELETE_SURVEY_PENDING,
  DELETE_SURVEY_SUCCESS
} from '../actions/actionTypes';

const surveyDefaultState = {
  surveyList: [],
  showSurveyDeleteModal: false,
  currSurveyId: '',
  deleteSurveyPending: false
};

export default (state = surveyDefaultState, action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return { ...state, surveyList: action.payload };
    case FETCH_SURVEY:
      return { ...state, surveyList: action.payload };
    case OPEN_DELETE_SURVEY_MODAL:
      return {
        ...state,
        showSurveyDeleteModal: true,
        currSurveyId: action.payload
      };
    case CLOSE_DELETE_SURVEY_MODAL:
      return { ...state, showSurveyDeleteModal: false };
    case DELETE_SURVEY_PENDING:
      return { ...state, deleteSurveyPending: true };
    case DELETE_SURVEY_SUCCESS:
      return {
        ...state,
        deleteSurveyPending: false,
        showSurveyDeleteModal: false
      };
    default:
      return state;
  }
};
