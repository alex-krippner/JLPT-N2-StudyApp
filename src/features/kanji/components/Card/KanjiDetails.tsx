/* eslint-disable import/no-extraneous-dependencies */

// FIXME: Replace mon ui kit with material
import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { bem, Box, Typography } from "@mon/mon-ui-kit";
import { Kanji } from "../../hooks";

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

const KanjiDetail = styled(motion.li)({
  display: "flex",
  flexDirection: "column",
});

const DataText = styled(Typography)({
  margin: "0 5px",
  fontSize: "15px",
});

const Header = styled(Typography)(({ theme }) => ({
  position: "relative",
  display: "flex",
  fontSize: theme.sizeOf.fontSmaller,
  margin: "1em",
  fontWeight: "bolder",
}));

const kanjiDetailsVariant = {
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
const kanjiDetailVariant = {
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

interface KanjiDetailsProps {
  data: Kanji;
}

function KanjiDetails(props: KanjiDetailsProps) {
  const { meanings, kunReading, onReading, exampleWords, exampleSentences } =
    props.data;

  const [, element] = bem("kanji-card");

  return (
    <Container
      initial={false}
      variants={kanjiDetailsVariant}
      className={element("details")}
    >
      {!!meanings && (
        <KanjiDetail variants={kanjiDetailVariant}>
          <Header className={element("header", "meaning")}>Meaning</Header>
          <Box sx={{ flexDirection: "row" }}>
            <DataText className={element(`meaning`)}>{meanings}</DataText>
          </Box>
        </KanjiDetail>
      )}
      <KanjiDetail variants={kanjiDetailVariant}>
        <Header>Kun reading</Header>
        <DataText>{kunReading}</DataText>
      </KanjiDetail>
      <KanjiDetail variants={kanjiDetailVariant}>
        <Header>On reading</Header>
        <DataText>{onReading}</DataText>
      </KanjiDetail>
      <KanjiDetail variants={kanjiDetailVariant}>
        <Header>Example words</Header>
        <DataText className={`ExampleWord_testId_${exampleWords}`}>
          {exampleWords}
        </DataText>
      </KanjiDetail>
      <KanjiDetail variants={kanjiDetailVariant}>
        <Header>Example sentences</Header>
        <DataText>{exampleSentences}</DataText>
      </KanjiDetail>
    </Container>
  );
}

export default KanjiDetails;
