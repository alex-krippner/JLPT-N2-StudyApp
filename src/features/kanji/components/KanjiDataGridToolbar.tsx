/* eslint-disable no-console */
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { randomId } from "@mui/x-data-grid-generator";
import Typography from "@mui/material/Typography";
import {
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from "@mui/x-data-grid";

interface KanjiDataGridToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}
export function KanjiDataGridToolbar(props: KanjiDataGridToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const addRow = () => {
    const id = randomId();
    setRows((oldRows) => {
      return [
        ...oldRows,
        {
          id,
          kanji: "",
          kunReading: "",
          onReading: "",
          exampleWords: "",
          exampleSentences: "",
          isNew: true,
        },
      ];
    });
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "kanji" },
    }));
  };
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={addRow}>
        <Typography variant="h5" color="primary.main">
          Add kanji
        </Typography>
      </Button>
    </GridToolbarContainer>
  );
}
