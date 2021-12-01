import {
  CHANGE_REGISTER_USER,
  GET_INSPECTOR_DETAIL,
  RESET_REGISTER_USER,
} from "../action/actionTypes";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_REGISTER_USER:
      state[action.field] = action.value;
      return { ...state };
    case RESET_REGISTER_USER:
      state = {};
      return state;
    case GET_INSPECTOR_DETAIL:
      state.getInspectorDetails = action.Payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default userReducer;
