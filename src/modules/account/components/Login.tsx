import React, { ChangeEvent } from "react";
import styled, { useTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mon-ui-kit/components/Button";
import Box from "@mon-ui-kit/components/Box";
import MonLogo from "@mon-assets/img/LogoMonIcon";
import Input from "@mon-ui-kit/components/Input";
import Text from "@mon-ui-kit/components/Text";

import { updateEmail, updatePassword } from "../loginFormReducer";
import { RootState } from "../../../state-management/redux/store";
import createForm, { withEmailValidation } from "../loginFormFactory";

interface LoginForm {
  email: string;
  password: string;
  hasValidEmail?: boolean;
  checkEmailValidity: () => LoginForm;
}

interface FormInputProps
  extends React.HTMLAttributes<HTMLInputElement> {
  valid?: boolean;
}

interface InvalidMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  valid?: boolean;
}

const Wrapper = styled(Box)(({ theme }) => ({
  justifyContent: "space-around",
  height: "max-content",
  width: "20%",
  padding: "2em",
  background: theme.colorOf.whiteMedium,
  border: `1px solid ${theme.colorOf.black}`,
  borderRadius: "10px",
  overflow: "auto",
}));

const IconWrapper = styled(Box)({
  flexDirection: "row",
  justifyContent: "end",
});

const Title = styled(Text)(({ theme }) => ({
  color: theme.colorOf.primaryLight,
  fontSize: theme.sizeOf.fontMedium,
  padding: "0 0.5em",
  marginBottom: "2em",
}));

const FormGroup = styled(Box)({
  marginBottom: "3em",
});

const Label = styled(Text)(({ theme }) => ({
  position: "relative",
  width: "100%",
  textAlign: "center",
  color: theme.colorOf.secondaryMedium,
  fontSize: theme.sizeOf.textMedium,
}));

const ObligatorySign = styled.span(({ theme }) => ({
  position: "absolute",
  color: "red",
  fontSize: theme.sizeOf.textSmall,
}));

const FormInput = styled(Input)<FormInputProps>(
  ({ valid, theme }) => ({
    height: "3em",
    borderBottom: `1px solid ${
      valid ? theme.colorOf.black : theme.colorOf.red
    }`,
    background: theme.colorOf.whiteMedium,
    fontSize: "1.25rem",
  }),
);

const LoginButton = styled(Button)(({ theme }) => ({
  alignSelf: "center",
  height: "2.5em",
  width: "60%",
  fontSize: theme.sizeOf.textMedium,
  outline: `1px solid ${theme.colorOf.buttonHover}`,
  borderRadius: "10px",
  color: theme.colorOf.secondaryMedium,
  transition: "background 0.5s ease, outline 0.5s ease",
  "&:hover": {
    outline: "none",
    background: theme.colorOf.buttonHover,
    transition: "background 0.5s ease, outline 0.5s ease",
  },
}));

const AlternateGroup = styled(Box)({
  justifyContent: "space-around",
  alignItems: "center",
});

const AlternateText = styled(Text)(({ theme }) => ({
  marginBottom: "1em",
  fontSize: theme.sizeOf.textSmall,
}));

const AlternateButton = styled(Button)(({ theme }) => ({
  position: "relative",
  width: "max-content",
  fontSize: theme.sizeOf.textMedium,
  padding: "2px",
  color: theme.colorOf.primaryLight,
  transition: "border-color .4s ease",
  borderBottom: `2px solid transparent`,
  "&:hover": {
    transition: "border-color .4s ease",
    borderBottom: `2px solid ${theme.colorOf.primaryLight}`,
  },
}));

const InvalidMessage = styled(Text)<InvalidMessageProps>(
  ({ valid, theme }) => ({
    paddingTop: "5px",
    fontSize: theme.sizeOf.textSmall,
    color: valid ? "transparent" : theme.colorOf.red,
  }),
);

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
    <Wrapper>
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
        <LoginButton>Login</LoginButton>
      </FormGroup>
      <AlternateGroup>
        <AlternateText>or</AlternateText>
        <AlternateButton>Sign up</AlternateButton>
      </AlternateGroup>
    </Wrapper>
  );
};

export default Login;
