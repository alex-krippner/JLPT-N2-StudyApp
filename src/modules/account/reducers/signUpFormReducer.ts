import { createSlice, Dispatch } from "@reduxjs/toolkit";

export interface LoginFormState {
  email: string;
  password: string;
  username: string;
}

export interface SignUpForm {
  email: string;
  password: string;
  hasValidEmail?: boolean;
  hasValidUsername: boolean;
  checkEmailValidity: () => SignUpForm;
  checkUsernameValidity: () => SignUpForm;
}

const enum SignUpFormKeys {
  EMAIL = "email",
  PASSWORD = "password",
  USERNAME = "username",
}

const defaultSignUpForm = {
  email: "",
  password: "",
  username: "",
};

const signUpFormSlice = createSlice({
  name: "signUpForm",
  initialState: defaultSignUpForm,
  reducers: {
    updateSignUpForm(state, action) {
      return { ...state, [action.payload.key]: action.payload.value };
    },
  },
});

const { updateSignUpForm } = signUpFormSlice.actions;

export const updateUsername = (username: string) => async (
  dispatch: Dispatch,
) => {
  dispatch(
    updateSignUpForm({
      key: SignUpFormKeys.USERNAME,
      value: username,
    }),
  );
};

export const updateEmail = (email: string) => async (
  dispatch: Dispatch,
) => {
  dispatch(
    updateSignUpForm({
      key: SignUpFormKeys.EMAIL,
      value: email,
    }),
  );
};

export const updatePassword = (password: string) => async (
  dispatch: Dispatch,
) => {
  dispatch(
    updateSignUpForm({
      key: SignUpFormKeys.PASSWORD,
      value: password,
    }),
  );
};

export default signUpFormSlice.reducer;
