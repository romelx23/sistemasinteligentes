import { types } from "../types/types";

export const logout = () => {
  window.localStorage.removeItem("token");
  return {
    type: types.logout,
    payload: {
      token: null,
    },
  };
};

export const login = (key) => {
  window.localStorage.setItem("token", JSON.stringify(key));
  return {
    type: types.login,
    payload: {
      token: key.token,
    },
  };
};
