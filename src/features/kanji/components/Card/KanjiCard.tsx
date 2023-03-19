import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
// eslint-disable-next-line import/no-extraneous-dependencies
import { bem } from "@mon/mon-ui-kit";
import { KanjiCardData } from "../../hooks";
import KanjiDetails from "./KanjiDetails";

interface KanjiCardProps {
  data: KanjiCardData;
}

interface Props {
  isShown: boolean;
}

const Card = styled(motion.div)<Props>(({ isShown, theme }) => ({
  position: "relative",
  height: "40rem",
  width: "30rem",
  borderRadius: "1rem",
  border: "solid 1px #708090",
  boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  overflow: isShown ? "auto" : "hidden",
  color: theme.colorOf.black,
}));

const Kanji = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  color: theme.colorOf.primaryLight,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: theme.sizeOf.fontLarger,
  height: "100%",
  justifyContent: "center",
  cursor: "pointer",
  width: "100%",
}));

function KanjiCard(props: KanjiCardProps) {
  const { kanji, id } = props.data;

  const kanjiVariant = {
    show: { scale: 0.45, y: "-45%" },
    hide: { scale: 1, y: 0 },
  };

  const [block, element] = bem("kanji-card");

  const [isShown, show] = useState(false);

  if (props.data) {
    return (
      <Card
        animate={isShown ? "show" : "hide"}
        key={`${id}_${kanji}`}
        onClick={() => show((visibility) => !visibility)}
        className={block()}
        isShown={isShown}
      >
        <Kanji
          variants={kanjiVariant}
          transition={{ duration: 0.5 }}
          initial={false}
          className={element("kanji")}
        >
          {kanji}
        </Kanji>
        <KanjiDetails data={props.data} />
      </Card>
    );
  }
}

export default KanjiCard;
