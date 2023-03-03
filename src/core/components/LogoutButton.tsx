import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <Button className="button__login" onClick={handleLogout}>
      <Typography variant="h5">Log out</Typography>
    </Button>
  );
};
