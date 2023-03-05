import * as React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

interface AuthenticationGuardProps {
  component: React.ComponentType<object>;
  redirectComponent: () => JSX.Element;
}
// FIXME: Revisit the redirect component
export function AuthenticationGuard({
  component,
  redirectComponent,
}: AuthenticationGuardProps) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: redirectComponent,
  });

  return <Component />;
}
