import React, { useState } from "react";

import { BackgroundAnimation, BackgroundHero } from "@mon-ui-kit/components";
import Main from "../layouts/main.component";

import Hamburger from "../components/atoms/Hamburger";
import HamburgerNav from "../components/molecules/HamburgerNav";

export const AuthenticatedAppView = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <BackgroundHero>
      <BackgroundAnimation iconSize="5rem" />
      <Hamburger handleOpen={handleOpen} />
      <HamburgerNav open={open} handleOpen={handleOpen} />
      <Main />
    </BackgroundHero>
  );
};
