import { useTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import React, { ChangeEvent } from "react";
import MonLogo from "@mon-assets/img/LogoMonIcon";
import { RootState } from "../../../state-management/redux/store";
import createForm, {
  withEmailValidation,
  withUsernameValidation,
} from "../factories/formFactory";
import {
  updateEmail,
  updatePassword,
  SignUpForm,
  updateUsername,
} from "../reducers/signUpFormReducer";
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
  Title,
  SubmitButton,
} from "../components";

const SignUp = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const signUpFormState = useSelector(
    (state: RootState) => state.signUpForm,
  );

  const signUpForm = createForm<SignUpForm>(
    [withEmailValidation, withUsernameValidation],
    signUpFormState,
  );
  signUpForm.checkEmailValidity().checkUsernameValidity();

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateUsername(e.target.value));
  };

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
      <Title>Sign up</Title>
      <FormGroup>
        <Label>
          Username<ObligatorySign>*</ObligatorySign>
        </Label>
        <FormInput
          type="text"
          placeholder="Enter your username"
          value={signUpFormState.username}
          onChange={handleUsername}
          valid={signUpForm.hasValidUsername}
          autoFocus
        />
        <InvalidMessage valid={signUpForm.hasValidUsername}>
          Invalid username
        </InvalidMessage>
      </FormGroup>
      <FormGroup>
        <Label>
          Email<ObligatorySign>*</ObligatorySign>
        </Label>
        <FormInput
          type="email"
          placeholder="Enter your email address"
          value={signUpFormState.email}
          onChange={handleEmailInput}
          valid={signUpForm.hasValidEmail}
          autoFocus
        />
        <InvalidMessage valid={signUpForm.hasValidEmail}>
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
          value={signUpFormState.password}
          valid={!!signUpForm.password}
          onChange={handlePasswordInput}
        />
        {!signUpForm.password && (
          <InvalidMessage>Password required</InvalidMessage>
        )}
      </FormGroup>
      <FormGroup>
        <SubmitButton>Sign up</SubmitButton>
      </FormGroup>
      <AlternateGroup>
        <AlternateText>Already have an account?</AlternateText>
        <AlternateButton>Login</AlternateButton>
      </AlternateGroup>
    </FormWrapper>
  );
};

export default SignUp;
