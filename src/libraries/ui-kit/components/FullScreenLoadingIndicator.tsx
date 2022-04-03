import React from "react";
import { motion } from "framer-motion";
import styled, { useTheme } from "styled-components";

import MonLogo from "@mon-assets/img/LogoMonIcon";
import { Box, Text } from "@mon-ui-kit/components";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  width: "100vw",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.colorOf.whiteMedium,
  textAlign: "center",
}));

const SpinningContainer = styled(motion.div)`
  display: flex;
`;

const ContentContainer = styled(Box)({
  position: "relative",
  display: "flex",
  width: "25%",
  height: "max-content",
});

const LoadingText = styled(Text)(({ theme }) => ({
  position: "absolute",
  top: "25%",
  left: "30%",
  fontSize: theme.sizeOf.fontMedium,
}));

export const FullScreenLoadingIndicator = () => {
  const theme = useTheme();
  return (
    <Wrapper>
      <ContentContainer>
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
          <MonLogo color={theme.colorOf.black} size="6em" />
        </SpinningContainer>
        <LoadingText>Loading...</LoadingText>
      </ContentContainer>
    </Wrapper>
  );
};
