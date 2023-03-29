import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

interface VocabDataGridToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

const DEFAULT_ROW_VALUES = {
  vocab: "",
  kanji: "",
  definitions: "",
  exampleSentences: "",
  partsOfSpeech: "",
  isNew: true,
};

export function VocabDataGridToolbar(props: VocabDataGridToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const addRow = () => {
    const id = randomId();
    setRows((oldRows) => {
      return [
        ...oldRows,
        {
          id,
          ...DEFAULT_ROW_VALUES,
        },
      ];
    });
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "vocab" },
    }));
  };
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={addRow}>
        <Typography variant="h5" color="primary.main">
          Add vocab
        </Typography>
      </Button>
    </GridToolbarContainer>
  );
}
