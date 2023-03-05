import * as React from "react";
import { Link, LinkProps } from "react-router-dom";

export function useCustomLink(to: string) {
  return React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<LinkProps, "to">>(
        (linkProps, ref) => {
          return <Link ref={ref} to={to} {...linkProps} />;
        },
      ),
    [to],
  );
}
