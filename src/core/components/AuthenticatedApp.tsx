import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Home } from "./HomeView";

export const AuthenticatedApp = () => {
  const { isAuthenticated } = useAuth0();

  return <Home />;
};
