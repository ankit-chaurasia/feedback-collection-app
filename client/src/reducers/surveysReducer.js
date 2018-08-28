import { FETCH_SURVEYS } from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
};
