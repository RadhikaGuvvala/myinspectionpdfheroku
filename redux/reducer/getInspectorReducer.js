import { GET_INSPECTOR } from "../action/actionTypes";

const getInspectorReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INSPECTOR:
      state.getInspector = action.Payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default getInspectorReducer;
