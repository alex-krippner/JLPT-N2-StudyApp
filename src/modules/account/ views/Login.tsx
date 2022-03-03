import React, { ChangeEvent } from "react";
import { useTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import MonLogo from "@mon-assets/img/LogoMonIcon";

import {
  updateEmail,
  updatePassword,
} from "../reducers/loginFormReducer";
import { RootState } from "../../../state-management/redux/store";
import createForm, {
  withEmailValidation,
} from "../factories/formFactory";
import {
  AlternateButton,
  AlternateGroup,
  AlternateText,
  FormGroup,
  FormInput,
  FormWrapper,
  IconWrapper,
  InvalidMessage,
  Label,
  ObligatorySign,
  SubmitButton,
  Title,
} from "../components";

interface LoginForm {
  email: string;
  password: string;
  hasValidEmail?: boolean;
  checkEmailValidity: () => LoginForm;
}

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const loginFormState = useSelector(
    (state: RootState) => state.loginForm,
  );

  const loginForm = createForm<LoginForm>(
    [withEmailValidation],
    loginFormState,
  );

  loginForm.checkEmailValidity();

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateEmail(e.target.value));
  };

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updatePassword(e.target.value));
  };
  return (
    <FormWrapper>
      <IconWrapper>
        <MonLogo color={theme.colorOf.black} size="5em" />
      </IconWrapper>
      <Title>Login</Title>
      <FormGroup>
        <Label>
          Email<ObligatorySign>*</ObligatorySign>
        </Label>
        <FormInput
          type="email"
          placeholder="Enter your email address"
          onChange={handleEmailInput}
          valid={loginForm.hasValidEmail}
          autoFocus
        />
        <InvalidMessage valid={loginForm.hasValidEmail}>
          Invalid email address
        </InvalidMessage>
      </FormGroup>
      <FormGroup>
        <Label>
          Password<ObligatorySign>*</ObligatorySign>
        </Label>
        <FormInput
          type="password"
          placeholder="Enter your password"
          valid={!!loginForm.password}
          onChange={handlePasswordInput}
        />
        {!loginForm.password && (
          <InvalidMessage>Password required</InvalidMessage>
        )}
      </FormGroup>
      <FormGroup>
        <SubmitButton>Login</SubmitButton>
      </FormGroup>
      <AlternateGroup>
        <AlternateText>or</AlternateText>
        <AlternateButton>Sign up</AlternateButton>
      </AlternateGroup>
    </FormWrapper>
  );
};

export default Login;
