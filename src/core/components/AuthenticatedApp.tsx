import React from "react";
import { Background, Box, Button } from "@mon/mon-ui-kit";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";

const Container = styled(Box)(({ theme }) => ({
  height: theme.sizeOf.cardFormWidth,
  width: theme.sizeOf.cardFormWidth,
  border: "solid black 1px",
}));

export const AuthenticatedApp = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <Background>
      <Container>
        {isAuthenticated && (
          <Button onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </Button>
        )}
        <div>Authenticated app</div>
      </Container>
    </Background>
  );
};
