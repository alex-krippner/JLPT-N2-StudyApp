import React from "react";
import styled, { useTheme } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Box,
  Text,
  Button,
  BackgroundAnimation,
  BackgroundHero,
} from "@mon-ui-kit/components";
import MonLogo from "@mon-assets/img/LogoMonIcon";

const Wrapper = styled(BackgroundHero)({
  justifyContent: "center",
  alignItems: "center",
});

const LoginContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "25%",
  height: "max-content",
  background: theme.colorOf.whiteMedium,
  borderRadius: theme.sizeOf.borderRadiusContainer,
  padding: theme.sizeOf.paddingLarge,
  zIndex: 2,
  overflow: "auto",
}));

const IconWrapper = styled(Box)({
  flexDirection: "row",
  justifyContent: "end",
});

const WelcomeText = styled(Text)(({ theme }) => ({
  fontSize: theme.sizeOf.fontLarge,
  color: theme.colorOf.primaryDark,
}));

const ExplainerContainer = styled(Box)(({ theme }) => ({
  justifyContent: "space-around",
  padding: theme.sizeOf.paddingLarge,
}));

const Auth0Link = styled.a(({ theme }) => ({
  color: theme.colorOf.secondaryMedium,
  textDecoration: "none",

  "&:active": {
    color: theme.colorOf.secondaryMedium,
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.sizeOf.paddingLarge,
}));

const ButtonLink = styled(Button)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "flex-start",
  width: "max-content",
  margin: `${theme.sizeOf.paddingLarge} 0`,
  padding: 5,
  border: "solid 1px transparent",

  "&:hover": {
    border: "dashed 1px black",
  },
}));

export const UnauthenticatedAppView = () => {
  const theme = useTheme();

  const { loginWithRedirect } = useAuth0();
  return (
    <Wrapper>
      <BackgroundAnimation iconSize="5rem" />
      <LoginContainer>
        <IconWrapper>
          <MonLogo color={theme.colorOf.black} size="5em" />
        </IconWrapper>
        <WelcomeText>Welcome</WelcomeText>
        <ButtonContainer>
          <ButtonLink onClick={loginWithRedirect}>
            Please login or sign up --&gt;
          </ButtonLink>
          <Text>By clicking the button above you will be redirected.</Text>
        </ButtonContainer>
        <ExplainerContainer>
          <Text>
            To make life easier and safer authentication is handled by
            <Auth0Link
              href="https://www.auth0.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              auth0
            </Auth0Link>
          </Text>
        </ExplainerContainer>
      </LoginContainer>
    </Wrapper>
  );
};
