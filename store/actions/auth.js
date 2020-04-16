import { AsyncStorage } from "react-native";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const CHECK = "CHECK";
export const AUTHENTICATE = "AUTHENTICATE";
export const SET_AL = "SET_AL";
export const LOGOUT = "LOGOUT";

export const logout = () => {
  logoutHandler();
  return {
    type: LOGOUT,
  };
};

export const setDidtryAl = () => {
  return { type: SET_AL };
};

export const check = () => {
  return async (dispatch, getState) => {
    if (getState().auth.token) {
      dispatch({ type: CHECK, isLoggedIn: true });
      return true;
    }
  };
};

export const authenticate = (userId, token) => {
  return {
    type: AUTHENTICATE,
    userId: userId,
    token: token,
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUz6X8_msL9vXIxKHaILldi0l2fCiUaPE",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      const errorId = errorData.error.message;
      let message = "SOMETHING'S WRONG";
      if (errorId === "EMAIL_EXISTS") {
        message = "THIS EMAIL ALREADY EXITS";
      }
      throw new Error(message);
    }
    const res = await response.json();
    dispatch({ type: SIGNUP, token: res.idToken, userId: res.localId });
    const expiresIn = new Date(
      new Date().getTime() + parseInt(res.expiresIn) * 1000
    );
    saveAutoLogin(res.idToken, res.localId, expiresIn);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUz6X8_msL9vXIxKHaILldi0l2fCiUaPE",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      const errorId = errorData.error.message;
      let message = "SOMETHING'S WRONG";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "THIS EMAIL COULD NOT BE FOUND";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "THIS PASSWORD IS NOT VALID";
      }
      throw new Error(message);
    }
    const res = await response.json();
    dispatch({ type: LOGIN, token: res.idToken, userId: res.localId });
    const expiresIn = new Date(
      new Date().getTime() + parseInt(res.expiresIn) * 1000
    );
    saveAutoLogin(res.idToken, res.localId, expiresIn);
  };
};

const saveAutoLogin = (token, userId, expiresIn) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiresIn: expiresIn.toISOString(),
    })
  );
};

const logoutHandler = () => {
  AsyncStorage.removeItem("userData");
};
