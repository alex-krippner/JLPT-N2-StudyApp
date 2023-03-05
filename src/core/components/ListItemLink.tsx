import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
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
