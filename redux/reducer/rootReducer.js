import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import userReducer from "./changeRegisterUserReducer";
import getInspectorReducer from "./getInspectorReducer";

const rootReducer = combineReducers({
  articleReducer: articleReducer,
  userReducer: userReducer,
  getInspectorReducer: getInspectorReducer,
});

export default rootReducer;
