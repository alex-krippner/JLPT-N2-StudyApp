import { createSlice, Dispatch } from "@reduxjs/toolkit";

export interface LoginFormState {
  email: string;
  password: string;
}

const enum LoginFormKeys {
  EMAIL = "email",
  PASSWORD = "password",
}

const defaultLoginForm: LoginFormState = {
  email: "",
  password: "",
};

const loginFormSlice = createSlice({
  name: "loginForm",
  initialState: defaultLoginForm,
  reducers: {
    updateLoginForm(state, action) {
      return { ...state, [action.payload.key]: action.payload.value };
    },
  },
});

const { updateLoginForm } = loginFormSlice.actions;

export const updateEmail = (email: string) => async (
  dispatch: Dispatch,
) => {
  dispatch(
    updateLoginForm({
      key: LoginFormKeys.EMAIL,
      value: email,
    }),
  );
};

export const updatePassword = (password: string) => async (
  dispatch: Dispatch,
) => {
  dispatch(
    updateLoginForm({ key: LoginFormKeys.PASSWORD, value: password }),
  );
};

export default loginFormSlice.reducer;
