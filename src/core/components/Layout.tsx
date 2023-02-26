import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { Container, Drawer, List } from "@mui/material";
import { ListItemLink } from "./ListItemLink";
import { MonLogo, KanjiIcon } from "@mon/mon-ui-kit";

export const Layout = React.forwardRef(() => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  const listItems = [
    { text: "Home", icon: <MonLogo />, to: "/" },
    { text: "Kanji", icon: <KanjiIcon />, to: "/kanji" },
  ];

  const drawer = (
    <>
      <List>
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
    </>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Container sx={{ padding: 0 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          display: { sm: `none` },
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { flexShrink: { sm: 0 } } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>{" "}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>{" "}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Outlet />{" "}
      </Box>
    </Container>
  );
});
Layout.displayName = "Layout";
