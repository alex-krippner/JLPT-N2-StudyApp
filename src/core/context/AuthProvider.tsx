import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppState, Auth0Provider } from "@auth0/auth0-react";

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const domain = "dev-o4abqsf2.eu.auth0.com";
  const clientId = "CnE3o6QEErrkwiCh1nuV6QcFPQonlTsX";
  const redirectUri = "http://localhost:8081/callback";

  const onRedirectCallback = (appState: AppState) => {
    navigate(appState.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
}
