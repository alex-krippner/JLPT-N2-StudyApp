import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  MenuIcon,
  Toolbar,
  MonLogo,
  KanjiIcon,
  VocabIcon,
  ReadingIcon,
} from "@mon/mon-ui-kit";
import { NavList, NavListItemData } from "./NavList";

export function Layout() {
  const APP_BAR_HEIGHT = 50;
  const DRAWER_WIDTH = 125;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const listItems: NavListItemData[] = [
    { text: "Home", icon: <MonLogo />, to: "/" },
    { text: "Kanji", icon: <KanjiIcon />, to: "/kanji" },
    { text: "Vocab", icon: <VocabIcon />, to: "/vocab" },
    { text: "Reading", icon: <ReadingIcon />, to: "/reading" },
  ];
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
            backgroundColor: "surface.main",
          }}
        >
          <NavList listItems={listItems} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {
              xs: "none",
              sm: "flex",
              alignItems: "center",
            },
            "& .MuiDrawer-paper": {
              backgroundColor: "surface.main",
              border: "none",
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          <NavList listItems={listItems} />
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
}
