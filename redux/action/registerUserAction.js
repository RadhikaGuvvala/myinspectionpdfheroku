import { CHANGE_REGISTER_USER, RESET_REGISTER_USER } from "./actionTypes";

export const changeRegisterUser = (field, value) => ({
  type: CHANGE_REGISTER_USER,
  field: field,
  value: value,
});
export const resetRegisterUser = (field, value) => ({
  type: RESET_REGISTER_USER,
});
