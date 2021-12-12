import {
  SUCCESS_GLOBAL,
  ERROR_GLOBAL,
  CLEAR_NOTIFICATION,
  REMOVE_PRODUCT,
} from "store/types";

export default function notificationReducer(state = {}, action) {
  switch (action.type) {
    case SUCCESS_GLOBAL:
      return { ...state, success: true, msg: action.payload };
    case ERROR_GLOBAL:
      return { ...state, error: true, msg: action.payload };
    case CLEAR_NOTIFICATION:
      return {};
    case REMOVE_PRODUCT:
      return {...state, removeArticle: true,};
    default:
      return state;
  }
}
