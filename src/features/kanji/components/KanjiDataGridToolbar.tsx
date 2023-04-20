import React from "react";
import {
  Button,
  Typography,
  AddIcon,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from "@mon/mon-ui-kit";

interface KanjiDataGridToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}
export function KanjiDataGridToolbar(props: KanjiDataGridToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const addRow = () => {
    const id = window.crypto.randomUUID();
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
