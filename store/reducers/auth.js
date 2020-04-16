import {
  LOGIN,
  SIGNUP,
  CHECK,
  AUTHENTICATE,
  SET_AL,
  LOGOUT,
} from "../actions/auth";

const initailState = {
  token: null,
  userId: null,
  isLoggedIn: null,
  didTryAutoLogin: false,
};
export default (state = initailState, action) => {
  switch (action.type) {
    case CHECK:
      return {
        isLoggedIn: true,
      };
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case SET_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return initailState;
    default:
      return state;
  }
};
