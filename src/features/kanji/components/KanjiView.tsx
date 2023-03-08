import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
function KanjiView() {
  const [options, _] = useState<Options>({ filter: "all" });
  const { data } = useAllKanji(options);
  const [isTableView, setTableView] = useState(false);
  return (
    <Box>
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
        <MonDataGrid />
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
