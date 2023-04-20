import React, { useState } from "react";
import {
  Box,
  Card,
  CardDetail,
  Grid,
  IconButton,
  Typography,
  ViewModuleIcon,
  TableViewIcon,
} from "@mon/mon-ui-kit";
import { camelCaseToWords } from "../../../utils";
import { useAllVocab } from "../hooks";
import { VocabGrid } from "./VocabGrid";

export function VocabView() {
  const [isTableView, setTableView] = useState(false);

  const { data } = useAllVocab();

  return (
    <Box sx={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <Box>
        <IconButton
          sx={{ mb: 4 }}
          onClick={() => setTableView(!isTableView)}
          size="large"
        >
          {isTableView ? (
            <ViewModuleIcon color="primary" fontSize="medium" />
          ) : (
            <TableViewIcon color="primary" fontSize="medium" />
          )}
        </IconButton>
      </Box>
      {isTableView ? (
        <VocabGrid data={data} />
      ) : (
        <Grid container spacing={5} overflow="auto">
          {data ? (
            data.map((vocab) => {
              const { definitions, kanji, partsOfSpeech, exampleSentences } =
                vocab;
              const cardDetails: CardDetail[] = Object.entries({
                definitions,
                kanji,
                partsOfSpeech,
                exampleSentences,
              }).map(([header, dataText]) => ({
                header: camelCaseToWords(header),
                dataText,
              }));

              return (
                <Grid item key={`VocabGridItem_${vocab.id}`}>
                  <Card
                    mainContent={vocab.vocab}
                    data={cardDetails}
                    id={vocab.id}
                    key={vocab.id}
                  />
                </Grid>
              );
            })
          ) : (
            <Typography variant="h5">
              Looks like there is no data {"\uD83D\uDE22"}
            </Typography>
          )}
        </Grid>
      )}
    </Box>
  );
}
