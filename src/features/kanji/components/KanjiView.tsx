import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import TableViewIcon from "@mui/icons-material/TableView";
import Typography from "@mui/material/Typography";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { MonDataGrid } from "../../../core/components/MonDataGrid";
import { useAllKanji } from "../hooks";
import KanjiCard from "./Card/KanjiCard";

type Filter = "all" | "rating";
interface Options {
  filter: Filter;
}

const columns: GridColDef[] = [
  { field: "kanji", headerName: "Kanji", editable: true },
  {
    field: "meanings",
    headerName: "Meanings",
    minWidth: 150,
    editable: true,
    flex: 1,
  },
  {
    field: "kunReading",
    headerName: "Kun reading",
    minWidth: 150,
    editable: true,
    flex: 1,
  },
  {
    field: "onReading",
    headerName: "On reading",
    minWidth: 150,
    editable: true,
    flex: 1,
  },
  {
    field: "exampleWords",
    headerName: "Example words",
    minWidth: 250,
    editable: true,
    flex: 1,
  },
  {
    field: "exampleSentences",
    headerName: "Example sentences",
    minWidth: 150,
    editable: true,
    flex: 2,
  },
];

function toString(all: string, current: string) {
  return all.concat(` ${current}`).trimStart();
}

function KanjiView() {
  const [options, _] = useState<Options>({ filter: "all" });
  const { data } = useAllKanji(options);
  const [isTableView, setTableView] = useState(false);
  const tableData = data.map((d) => ({
    ...d,
    meanings: d.meanings.reduce(toString, ""),
    exampleSentences: d.exampleSentences.reduce(toString, ""),
    exampleWords: d.exampleWords.reduce(toString, ""),
  }));

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
        <Box sx={{ flex: 1 }}>
          <MonDataGrid data={tableData} columns={columns} />
        </Box>
      ) : (
        <Grid padding={0}>
          {data ? (
            data.map((d) => <KanjiCard data={d} />)
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

export default KanjiView;
