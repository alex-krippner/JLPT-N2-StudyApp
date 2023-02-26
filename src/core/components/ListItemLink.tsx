import * as React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

interface ListItemLinkProps {
  icon: JSX.Element;
  text: string;
  to: string;
  handleListItemClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => void;
  index: number;
  selectedIndex: number;
}

export function ListItemLink(props: ListItemLinkProps) {
  const { icon, text, to, handleListItemClick, index, selectedIndex } = props;
  const CustomLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<LinkProps, "to">>(
        (linkProps, ref) => {
          return <Link ref={ref} to={to} {...linkProps} />;
        },
      ),
    [to],
  );

  return (
    <ListItem key={text} disablePadding component={CustomLink}>
      <ListItemButton
        sx={{
          flexDirection: "column",
          alignItems: "center",
          p: "8 2",
        }}
        onClick={(event) => handleListItemClick(event, index)}
        disableRipple
      >
        <ListItemIcon
          sx={{
            p: 2,
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 4,
            backgroundColor:
              selectedIndex === index ? "primary.light" : "transparent",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
