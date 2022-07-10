import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ReactQueryDevtools } from "react-query/devtools";

import GlobalStyle from "@mon-theme/globalStyle";
import { FullScreenLoadingIndicator } from "@mon-ui-kit/components";

import { AuthenticatedAppView } from "./views/AuthenticatedAppView";
import { UnauthenticatedAppView } from "./views/UnauthenticatedAppView";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const render = () => {
    if (isLoading) return <FullScreenLoadingIndicator />;
    if (isAuthenticated) return <AuthenticatedAppView />;
    if (!isAuthenticated) return <UnauthenticatedAppView />;
  };

  return (
    <>
      <GlobalStyle />
      {render()}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
