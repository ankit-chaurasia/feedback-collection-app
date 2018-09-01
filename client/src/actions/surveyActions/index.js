import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, FETCH_SURVEY } from '../actionTypes';

export const createSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateSurvey = values => async dispatch => {
  const res = await axios.put('/api/survey/edit', values);
  // dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchSurvey = surveyId => async dispatch => {
  const res = await axios.get('/api/survey', { params: { surveyId } });
  dispatch({ type: FETCH_SURVEY, payload: res.data });
};
