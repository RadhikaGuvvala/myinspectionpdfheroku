import { SET_ARTICLE } from '../action/actionTypes';

const articleReducer = (state = { }, action) => {
  switch (action.type) {
    case SET_ARTICLE:
      state.article = action.val;
      return { ...state };
    default:
      return { ...state };
  }
};

export default articleReducer;