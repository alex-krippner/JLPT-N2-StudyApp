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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Component: React.FC<object> = withAuthenticationRequired(component, {
    onRedirecting: redirectComponent,
  });

  return <Component />;
}
