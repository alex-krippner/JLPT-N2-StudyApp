import React from "react";
import {
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
  Typography,
  Button,
  AddIcon,
} from "@mon/mon-ui-kit";
import { randomUUID } from "crypto";

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
    const id = randomUUID();
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
