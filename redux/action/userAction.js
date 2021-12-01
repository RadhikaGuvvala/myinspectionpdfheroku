import { CHANGE_USER, RESET_USER } from './actionTypes';

export const changeUser = (field, value) => ({
  type: CHANGE_USER,
  field: field,
  value: value
});

export const resetUser = () => ({
  type: RESET_USER
});
