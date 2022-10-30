import React from "react";
import { AuthenticatedApp } from "./core/components/AuthenticatedApp";
import { useAuth0 } from "@auth0/auth0-react";
import { UnauthenticatedApp } from "./core/components/UnauthenticatedApp";
import { ReactQueryDevtools } from "react-query/devtools";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const render = () => {
    // if (isLoading) return <FullScreenLoadingIndicator />;
    if (isAuthenticated) return <AuthenticatedApp />;

    if (!isAuthenticated) return <UnauthenticatedApp />;
  };
  return (
    <>
      {render()} <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
