import { CHANGE_LOGIN_USER, RESET_LOGIN_USER } from './actionTypes';

export const changeLoginUser = (field, value) => ({
  type: CHANGE_LOGIN_USER,
  field: field,
  value: value
});

export const resetLoginUser = () => ({
  type: RESET_LOGIN_USER
});
