/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { bem } from "@mon/mon-ui-kit";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const Container = styled(motion.ul)({
  alignItems: "center",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  paddingBottom: "2em",
  justifyContent: "flex-start",
  listStyleType: "none",
  position: "absolute",
  textAlign: "center",
  width: "100%",
});

const CardDetailStyled = styled(motion.li)({
  display: "flex",
  flexDirection: "column",
});

const cardDetailsVariant = {
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
    y: "15%",
  },
  hide: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    y: "40%",
  },
};

const cardDetailVariant = {
  show: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  hide: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export function CardDetails(props: CardDetailsProps) {
  const theme = useTheme();
  const { data } = props;

  const [, element] = bem("card-details");

  return (
    <Container
      initial={false}
      variants={cardDetailsVariant}
      className={element("details")}
    >
      {data.map(({ header, dataText }) => {
        return (
          <CardDetailStyled variants={cardDetailVariant} key={header}>
            <Typography
              className={element("header", `${header}`)}
              variant="h5"
              fontSize={theme.sizeOf.fontSmall}
              fontWeight="bolder"
              margin={4}
            >
              {header}
            </Typography>
            <Typography
              className={element(`${header}`)}
              fontSize={theme.sizeOf.fontSmaller}
            >
              {dataText}
            </Typography>
          </CardDetailStyled>
        );
      })}
    </Container>
  );
}
