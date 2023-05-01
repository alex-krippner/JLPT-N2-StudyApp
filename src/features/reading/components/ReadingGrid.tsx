import React, { useEffect, useState } from "react";
import {
  Box,
  CancelIcon,
  DataGrid,
  DeleteIcon,
  EditCell,
  EditIcon,
  GridActionsCellItem,
  GridColDef,
  GridRenderEditCellParams,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  SaveIcon,
} from "@mon/mon-ui-kit";
import { useTheme } from "@emotion/react";
import { Reading, useUpdateReading } from "../hooks";

function renderReadingEditCell(params: GridRenderEditCellParams) {
  return <EditCell {...params} />;
}

interface ReadingRowData extends Reading {
  isNew: boolean;
}

interface ReadingGridProps {
  data: Reading[];
  onCellDoubleClick: (id: string) => void;
}

export function ReadingGrid({ data, onCellDoubleClick }: ReadingGridProps) {
  const theme = useTheme();
  const updateMutation = useUpdateReading();
  const [rows, setRows] = useState<ReadingRowData[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const processRowUpdate = (reading: ReadingRowData) => {
    const updatedRow = { ...reading, isNew: false };
    const updateReadingRequest: Reading = {
      ...reading,
      title: reading.title,
    };

    if (!reading.isNew) {
      updateMutation.mutate(updateReadingRequest);
    }

    return updatedRow;
  };

  useEffect(() => {
    const tableData = data.map((d) => ({
      ...d,
      isNew: false,
    }));
    setRows(tableData);
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 150,
      editable: true,
      flex: 1,
      renderEditCell: renderReadingEditCell,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params: GridRowParams<ReadingRowData>) => {
        const { id } = params;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ flex: 1 }}>
      <DataGrid
        editMode="row"
        rowModesModel={rowModesModel}
        rows={rows}
        columns={columns}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        sx={{
          "& .MuiInputBase-root": {
            fontSize: theme.sizeOf.fontSmaller,
          },
        }}
        processRowUpdate={processRowUpdate}
        onCellDoubleClick={({ id }) => {
          onCellDoubleClick(`${id}`);
        }}
      />
    </Box>
  );
}
