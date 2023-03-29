import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
// eslint-disable-next-line import/no-extraneous-dependencies
import { bem } from "@mon/mon-ui-kit";
import { CardDetails } from "./CardDetails";

interface CardProps {
  data: CardDetail[];
  id: string;
  mainContent: string;
}
interface CardStyledProps {
  isShown: boolean;
}

const CardStyled = styled(motion.div)<CardStyledProps>(
  ({ isShown, theme }) => ({
    position: "relative",
    height: "40rem",
    width: "30rem",
    borderRadius: "1rem",
    border: "solid 1px #708090",
    boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    overflow: isShown ? "auto" : "hidden",
    color: theme.colorOf.black,
  }),
);

const MainContent = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  fontSize: theme.sizeOf.fontLarger,
  color: theme.colorOf.primaryLight,
  cursor: "pointer",
}));

export function Card(props: CardProps) {
  const { mainContent, id, data } = props;
  const [block, element] = bem("card");
  const [isShown, show] = useState(false);

  const mainContentVariant = {
    show: { scale: 0.45, y: "-45%" },
    hide: { scale: 1, y: 0 },
  };

  if (data) {
    return (
      <CardStyled
        animate={isShown ? "show" : "hide"}
        key={id}
        onClick={() => show((visibility) => !visibility)}
        className={block()}
        isShown={isShown}
      >
        <MainContent
          variants={mainContentVariant}
          transition={{ duration: 0.5 }}
          initial={false}
          className={element(mainContent)}
        >
          {mainContent}
        </MainContent>
        <CardDetails data={data} />
      </CardStyled>
    );
  }
}
