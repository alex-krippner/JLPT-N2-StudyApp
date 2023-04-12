import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModesModel,
  GridRowModes,
  GridRowId,
  GridRowParams,
  GridPreProcessEditCellProps,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import {
  CancelIcon,
  DeleteIcon,
  EditIcon,
  SaveIcon,
  TableViewIcon,
  ViewModuleIcon,
  Box,
  IconButton,
  Grid,
  Typography,
} from "@mon/mon-ui-kit";
import KanjiCard from "./Card/KanjiCard";
import { KanjiDataGridToolbar } from "./KanjiDataGridToolbar";
import { KanjiEditCell } from "./KanjiEditCell";
import {
  AddKanjiRequest,
  Kanji,
  useAddKanji,
  useAllKanji,
  useDeleteKanji,
  useUpdateKanji,
} from "../hooks";

const MEANINGS_MAX_LENGTH = 55;
const EXAMPLE_WORDS_MAX_LENGTH = 75;
const EXAMPLE_SENTENCES_MAX_LENGTH = 125;
/**
 * A regex to match space and unicode for hiragana, katana, and the "・"
 */
const HKD_REGEX = /^[\u30FB\u3040-\u309F\u30A0-\u30FF\s]+$/;

/**
 * A regex to match space and unicode for kanji, hiragana, katana, and the "・"
 */
const KHKD_REGEX = /^[\u30FB\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\s]+$/;

interface KanjiRowData extends Kanji {
  isNew: boolean;
}

function renderEditKanjiCell(params: GridRenderEditCellParams) {
  return <KanjiEditCell {...params} />;
}

export function KanjiView() {
  const { data } = useAllKanji();
  const addMutation = useAddKanji();
  const deleteMutation = useDeleteKanji();
  const updateMutation = useUpdateKanji();
  const theme = useTheme();
  const [isTableView, setTableView] = useState(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [rows, setRows] = useState<KanjiRowData[]>([]);

  useEffect(() => {
    const tableData = data.map((d) => ({
      ...d,
      isNew: false,
    }));
    setRows(tableData);
  }, [data]);

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
    const kanjiId = typeof id === "number" ? id.toString() : id;
    deleteMutation.mutate(kanjiId);
    setRows(rows.filter((row) => row.id !== id));
  };
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const processRowUpdate = (newKanji: KanjiRowData) => {
    const updatedRow = { ...newKanji, isNew: false, username: "" };
    const kanjiPostRequest: AddKanjiRequest = {
      exampleSentences: newKanji.exampleSentences,
      exampleWords: newKanji.exampleWords,
      kanji: newKanji.kanji,
      kanjiRating: newKanji.kanjiRating || 0,
      kunReading: newKanji.kunReading,
      meanings: newKanji.meanings,
      onReading: newKanji.onReading,
      username: "",
    };

    if (newKanji.isNew) {
      addMutation.mutate(kanjiPostRequest);
    }

    if (!newKanji.isNew) {
      updateMutation.mutate({ ...kanjiPostRequest, id: newKanji.id });
    }

    return updatedRow;
  };

  const columns: GridColDef[] = [
    {
      sortable: false,
      field: "kanji",
      headerName: "Kanji",
      editable: true,
      renderEditCell: renderEditKanjiCell,
      preProcessEditCellProps: (
        params: GridPreProcessEditCellProps<string>,
      ) => {
        const kanjiRegex = /^[\u4E00-\u9FFF]+$/u;
        const { value } = params.props;
        let error: string | null = null;

        if (typeof value !== "string") {
          return {
            ...params.props,
            error: "Input required",
          };
        }
        if (value.length < 1) {
          error = "No kanji, no life";
        }
        if (value.length > 1) {
          error = "Woah! That's too much kanji";
        }
        if (value && !kanjiRegex.test(value)) {
          error = "Give me a kanji!";
        }
        return {
          ...params.props,
          error,
        };
      },
    },
    {
      field: "meanings",
      headerName: "Meanings",
      minWidth: 150,
      editable: true,
      flex: 1,
      renderEditCell: renderEditKanjiCell,
      preProcessEditCellProps: (
        params: GridPreProcessEditCellProps<string>,
      ) => {
        const alphaSpaceRegex = /^[a-zA-Z\s]+$/;
        const { value } = params.props;
        let error: string | null = null;

        if (typeof value !== "string") {
          return {
            ...params.props,
            error: "Input required",
          };
        }
        if (value.length > MEANINGS_MAX_LENGTH) {
          error = `A bit too much meaning there. Max characters: ${MEANINGS_MAX_LENGTH}`;
        }
        if (value && !alphaSpaceRegex.test(value)) {
          error = "Only alphabetic and spaces can be used";
        }
        return {
          ...params.props,
          error,
        };
      },
    },
    {
      field: "kunReading",
      headerName: "Kun reading",
      minWidth: 150,
      editable: true,
      flex: 1,
      renderEditCell: renderEditKanjiCell,
      preProcessEditCellProps: (
        params: GridPreProcessEditCellProps<string>,
      ) => {
        const { value } = params.props;
        let error: string | null = null;

        if (typeof value !== "string") {
          return {
            ...params.props,
            error: "Input required",
          };
        }
        if (value.length > MEANINGS_MAX_LENGTH) {
          error = `Max characters: ${MEANINGS_MAX_LENGTH}`;
        }
        if (value && !HKD_REGEX.test(value)) {
          error = `Only hiragana, katakana, spaces, or "${"\u30FB"}"`;
        }
        return {
          ...params.props,
          error,
        };
      },
    },
    {
      field: "onReading",
      headerName: "On reading",
      minWidth: 150,
      editable: true,
      flex: 1,
      renderEditCell: renderEditKanjiCell,
      preProcessEditCellProps: (
        params: GridPreProcessEditCellProps<string>,
      ) => {
        const { value } = params.props;
        let error: string | null = null;

        if (typeof value !== "string") {
          return {
            ...params.props,
            error: "Input required",
          };
        }
        if (value.length > MEANINGS_MAX_LENGTH) {
          error = `Max characters: ${MEANINGS_MAX_LENGTH}`;
        }
        if (value && !HKD_REGEX.test(value)) {
          error = `Only hiragana, katakana, spaces, or "${"\u30FB"}"`;
        }
        return {
          ...params.props,
          error,
        };
      },
    },
    {
      field: "exampleWords",
      headerName: "Example words",
      minWidth: 250,
      editable: true,
      flex: 1,
      renderEditCell: renderEditKanjiCell,
      preProcessEditCellProps: (
        params: GridPreProcessEditCellProps<string>,
      ) => {
        const { value } = params.props;
        let error: string | null = null;

        if (typeof value !== "string") {
          return {
            ...params.props,
            error: "Input required",
          };
        }
        if (value.length > EXAMPLE_WORDS_MAX_LENGTH) {
          error = `Max characters: ${EXAMPLE_WORDS_MAX_LENGTH}`;
        }
        if (value && !KHKD_REGEX.test(value)) {
          error = "Only kanji, hiragana, and katakana can be used";
        }
        return {
          ...params.props,
          error,
        };
      },
    },
    {
      field: "exampleSentences",
      headerName: "Example sentences",
      minWidth: 150,
      editable: true,
      flex: 2,

      renderEditCell: renderEditKanjiCell,
      preProcessEditCellProps: (
        params: GridPreProcessEditCellProps<string>,
      ) => {
        const { value } = params.props;
        let error: string | null = null;

        if (typeof value !== "string") {
          return {
            ...params.props,
            error: "Input required",
          };
        }
        if (value.length > EXAMPLE_SENTENCES_MAX_LENGTH) {
          error = `Max characters: ${EXAMPLE_SENTENCES_MAX_LENGTH}`;
        }
        if (value && !KHKD_REGEX.test(value)) {
          error = "Only kanji, hiragana, and katakana can be used";
        }
        return {
          ...params.props,
          error,
        };
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params: GridRowParams<KanjiRowData>) => {
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
          <DataGrid
            editMode="row"
            rowModesModel={rowModesModel}
            rows={rows}
            columns={columns}
            slots={{ toolbar: KanjiDataGridToolbar }}
            processRowUpdate={processRowUpdate}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            sx={{
              "& .MuiInputBase-root": {
                fontSize: theme.sizeOf.fontSmaller,
              },
            }}
          />
        </Box>
      ) : (
        <Grid container spacing={5} overflow="auto">
          {data ? (
            data.map((d) => (
              <Grid item key={`KanjiGridItem_${d.id}`}>
                <KanjiCard data={d} key={`${d.id}_${d.kanji}`} />
              </Grid>
            ))
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
