import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { List } from "@mon/mon-ui-kit";
import { ListItemLink } from "./ListItemLink";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";

export interface NavListItemData {
  text: string;
  icon: JSX.Element;
  to: string;
}

interface NavListProps {
  listItems: NavListItemData[];
}

export function NavList({ listItems }: NavListProps) {
  const { isAuthenticated } = useAuth0();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <List sx={{ display: "flex", flexDirection: "column" }}>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
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
    </List>
  );
}
