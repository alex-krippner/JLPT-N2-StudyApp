import React, { useState } from "react";
import {
  TableViewIcon,
  ViewModuleIcon,
  Box,
  Card,
  CardDetail,
  IconButton,
  Grid,
  Typography,
} from "@mon/mon-ui-kit";
import { useAllKanji } from "../hooks";
import { KanjiGrid } from "./KanjiGrid";
import { camelCaseToWords } from "../../../utils";

export function KanjiView() {
  const { data } = useAllKanji();
  const [isTableView, setTableView] = useState(false);

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
        <KanjiGrid data={data} />
      ) : (
        <Grid container spacing={5} overflow="auto">
          {data ? (
            data.map((k) => {
              const { meanings, kanji, exampleWords, exampleSentences, id } = k;
              const cardDetails: CardDetail[] = Object.entries({
                meanings,
                kanji,
                exampleWords,
                exampleSentences,
              }).map(([header, dataText]) => ({
                header: camelCaseToWords(header),
                dataText,
              }));

              return (
                <Grid item key={`VocabGridItem_${id}`}>
                  <Card
                    mainContent={kanji}
                    data={cardDetails}
                    id={id}
                    key={id}
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
