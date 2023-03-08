import * as React from "react";
import Button from "@mui/material/Button";

import { randomId } from "@mui/x-data-grid-generator";
import {
  DataGrid,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";

const columns = [
  { field: "Kanji" },
  { field: "Meaning", minWidth: 150 },
  { field: "Kun reading", minWidth: 150 },
  { field: "On reading", minWidth: 150 },
  { field: "Example words", width: 150 },
  { field: "Example sentences", width: 150 },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        kanji: "",
        meaning: "",
        kunReading: "",
        onReading: "",
        exampleWords: "",
        exampleSentences: "",
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "kanji" },
    }));
  };
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add kanji
      </Button>
    </GridToolbarContainer>
  );
}

export function MonDataGrid() {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );
  const [rows, setRows] = React.useState([]);
  return (
    <DataGrid
      rowModesModel={rowModesModel}
      rows={rows}
      columns={columns}
      slots={{ toolbar: EditToolbar }}
      slotProps={{
        toolbar: { setRows, setRowModesModel },
      }}
    />
  );
}
