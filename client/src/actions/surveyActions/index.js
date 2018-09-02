import axios from 'axios';
import * as Actions from '../actionTypes';

export const createSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: Actions.FETCH_USER, payload: res.data });
};

export const updateSurvey = (values, history) => async dispatch => {
  const res = await axios.put('/api/survey/edit', values);
  history.push('/surveys');
  dispatch({ type: Actions.FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: Actions.FETCH_SURVEYS, payload: res.data });
};

export const fetchSurvey = surveyId => async dispatch => {
  const res = await axios.get('/api/survey', { params: { surveyId } });
  dispatch({ type: Actions.FETCH_SURVEY, payload: res.data });
};

export const openDeleteSurveyModal = () => dispatch => {
  dispatch({ type: Actions.OPEN_DELETE_SURVEY_MODAL });
};

export const closeDeleteSurveyModal = () => dispatch => {
  dispatch({ type: Actions.CLOSE_DELETE_SURVEY_MODAL });
};
