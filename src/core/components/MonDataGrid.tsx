import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { randomId } from "@mui/x-data-grid-generator";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  GridColDef,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from "@mui/x-data-grid";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
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
        <Typography variant="h5" color="primary.main">
          Add kanji
        </Typography>
      </Button>
    </GridToolbarContainer>
  );
}
interface MonDataGridProps<D> {
  data: GridRowsProp<D>;
  columns: GridColDef[];
}
export function MonDataGrid<D>({ data, columns }: MonDataGridProps<D>) {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );
  const [rows, setRows] = React.useState(data);
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
