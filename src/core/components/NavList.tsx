import * as React from "react";
import MuiList from "@mui/material/List";
import { ListItemLink } from "./ListItemLink";

export interface NavListItemData {
  text: string;
  icon: JSX.Element;
  to: string;
}

interface NavListProps {
  listItems: NavListItemData[];
}

export const NavList = ({ listItems }: NavListProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <>
      <MuiList>
        {listItems.map(({ text, icon, to }, index) => (
          <ListItemLink
            key={text}
            text={text}
            icon={icon}
            to={to}
            index={index}
            handleListItemClick={handleListItemClick}
            selectedIndex={selectedIndex}
          />
        ))}
      </MuiList>
    </>
  );
};
