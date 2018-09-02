import { FETCH_USER } from '../actions/actionTypes';

const authDefaultState = {
  credits: 0
};

export default (state = authDefaultState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...action.payload } || false;
    default:
      return state;
  }
};
