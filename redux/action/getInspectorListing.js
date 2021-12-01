import { GET_INSPECTOR_DETAIL } from "./actionTypes";

export function getInspectorListing(data) {
  return {
    type: GET_INSPECTOR_DETAIL,
    Payload: data,
  };
}
