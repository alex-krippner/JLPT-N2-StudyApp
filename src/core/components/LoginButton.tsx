import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from "@mon/mon-ui-kit";

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };
  return (
    <Button
      className="button__login"
      onClick={() => {
        // eslint-disable-next-line no-console
        handleLogin().catch((e) => console.error(e));
      }}
    >
      <Typography variant="h5">Log In</Typography>
    </Button>
  );
}
