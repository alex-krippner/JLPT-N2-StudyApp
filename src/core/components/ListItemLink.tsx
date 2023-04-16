import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mon/mon-ui-kit";
import { useCustomLink } from "../hooks/useCustomLink";

interface ListItemLinkProps {
  handleListItemClick: (index: number) => void;
  icon: JSX.Element;
  index: number;
  selectedIndex: number;
  text: string;
  to: string;
}

export function ListItemLink(props: ListItemLinkProps) {
  const { handleListItemClick, icon, index, selectedIndex, text, to } = props;

  const CustomLink = useCustomLink(to);

  return (
    <ListItem key={text} disablePadding component={CustomLink}>
      <ListItemButton
        disableRipple
        onClick={() => handleListItemClick(index)}
        sx={{
          alignItems: "center",
          flexDirection: "column",
          p: "8 2",
        }}
      >
        <ListItemIcon
          sx={{
            alignItems: "center",
            borderRadius: 4,
            backgroundColor:
              selectedIndex === index ? "primary.light" : "transparent",
            flexDirection: "column",
            p: 2,
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={<Typography variant="h4">{text}</Typography>} />
      </ListItemButton>
    </ListItem>
  );
}
