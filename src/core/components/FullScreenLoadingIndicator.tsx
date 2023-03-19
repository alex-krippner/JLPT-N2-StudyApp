import React from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// eslint-disable-next-line import/no-extraneous-dependencies
import { MonLogo } from "@mon/mon-ui-kit";

const SpinningContainer = styled(motion.div)`
  display: flex;
  height: 100px;
  width: 100px;
`;

export function FullScreenLoadingIndicator() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SpinningContainer
        animate={{
          rotate: 360,
        }}
        transition={{
          ease: "linear",
          duration: 5,
          repeat: Infinity,
        }}
      >
        <MonLogo />
      </SpinningContainer>
      <Typography variant="h3" sx={{ display: "flex", mt: 6 }}>
        Loading
        <Typography
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            fontSize: theme.sizeOf.fontSmall,
            "&::after": {
              position: "absolute",
              content: '""',
              top: 0,
              right: 0,
              height: "100%",
              backgroundColor: "white",
              animation: "reveal 2.5s infinite",
            },
            "@keyframes reveal": {
              "0%": {
                width: "100%",
              },
              "25%": {
                width: "100%",
              },
              "50%": {
                width: "100%",
              },
              "75%": {
                width: 0,
              },
            },
          }}
        >
          ...
        </Typography>
      </Typography>
    </Box>
  );
}
