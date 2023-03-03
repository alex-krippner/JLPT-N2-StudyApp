import * as React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

interface AuthenticationGuardProps {
  component: React.ComponentType<object>;
}

export const AuthenticationGuard = ({
  component,
}: AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Loading...</div>,
  });

  return <Component />;
};
