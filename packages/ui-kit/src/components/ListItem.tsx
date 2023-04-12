import React from "react";
import MuiListItem, { ListItemProps } from "@mui/material/ListItem";

export function ListItem<C extends React.ElementType>(
  props: ListItemProps<C, { component?: C }>,
) {
  return <MuiListItem {...props} />;
}
