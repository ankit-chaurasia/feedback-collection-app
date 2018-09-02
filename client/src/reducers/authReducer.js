import { FETCH_USER } from '../actions/actionTypes';

const authDefaultState = {
  credits: 0,
  _id: null
};

export default (state = authDefaultState, action) => {
  switch (action.type) {
    case FETCH_USER:
      if (action.payload) {
        return { ...state, ...action.payload };
      } else {
        return { ...state, _id: undefined };
      }
    default:
      return state;
  }
};
