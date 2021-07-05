import { types } from "../types/types";

const initialState = {
  token: window.localStorage.getItem("token"),
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.login:
      return { ...state, ...payload };
    case types.logout:
      return { ...state, ...payload };
    default:
      return state;
  }
};
