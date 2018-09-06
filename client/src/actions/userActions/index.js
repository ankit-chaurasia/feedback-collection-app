import axios from 'axios';
import _ from 'lodash';
import { FETCH_USER } from '../actionTypes';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const createUser = (values, history) => async dispatch => {
  values.email = _.trim(values.email.toLocaleLowerCase());
  try {
    const res = await axios.post('/api/signup', values);
    dispatch({ type: FETCH_USER, payload: res.data });
    history.push('/surveys');
  } catch ({ response }) {
    return response;
  }
};

export const logInUser = (values, history) => async dispatch => {
  values.email = _.trim(values.email.toLocaleLowerCase());
  try {
    const res = await axios.post('/auth/login', values);
    dispatch({ type: FETCH_USER, payload: res.data });
    history.push('/surveys');
  } catch ({ response }) {
    return response;
  }
};
