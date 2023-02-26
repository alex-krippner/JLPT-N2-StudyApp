import * as React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, List, useTheme } from "@mui/material";
import { MonLogo, KanjiIcon } from "@mon/mon-ui-kit";
import { ListItemLink } from "./ListItemLink";

export const Layout = React.forwardRef(() => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const theme = useTheme();
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

  //FIXME: Should these be themed?
  const DRAWER_WIDTH = 125;
  const APP_BAR_HEIGHT = 50;

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
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <AppBar
        position="fixed"
        sx={{
          display: { sm: `none` },
          height: APP_BAR_HEIGHT,
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
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH, flexShrink: { sm: 0 } } }}
      >
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
              width: DRAWER_WIDTH,
            },
            backgroundColor: theme.palette.surface.main,
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              backgroundColor: "surface.main",
              border: "none",
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
          mt: { xs: `${APP_BAR_HEIGHT}px`, sm: 0 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
});
Layout.displayName = "Layout";
