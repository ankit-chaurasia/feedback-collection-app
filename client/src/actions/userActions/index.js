import axios from 'axios';
import { FETCH_USER } from '../actionTypes';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const createUser = (values, history) => async dispatch => {
  const res = await axios.post('/api/signup', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};
