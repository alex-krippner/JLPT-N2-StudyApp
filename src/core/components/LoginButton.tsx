import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      redirectUri: "http://localhost:8081/callback",
    });
  };
  return (
    <Button className="button__login" onClick={handleLogin}>
      <Typography variant="h5">Log In</Typography>
    </Button>
  );
};
