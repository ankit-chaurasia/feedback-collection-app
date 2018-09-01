import axios from 'axios';
import { FETCH_USER } from '../actionTypes';

export const handleStripeToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
