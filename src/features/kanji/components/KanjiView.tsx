import React, { useState } from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModesModel,
  GridRowModes,
  GridRowId,
  GridRowParams,
  GridPreProcessEditCellProps,
  GridEditInputCell,
  GridRenderEditCellParams,
  GridValueSetterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";

import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TableViewIcon from "@mui/icons-material/TableView";
import Typography from "@mui/material/Typography";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@emotion/react";
import {
  AddKanjiRequest,
  ExampleSentence,
  ExampleWord,
  KanjiResponse,
  Meaning,
  useAddKanji,
  useAllKanji,
  useDeleteKanji,
  useUpdateKanji,
} from "../hooks";
import { convertKanjiResponse } from "../utils";
import KanjiCard from "./Card/KanjiCard";
import { KanjiDataGridToolbar } from "./KanjiDataGridToolbar";

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

type Filter = "all" | "rating";
interface Options {
  filter: Filter;
}

interface KanjiRowData extends KanjiResponse {
  isNew: boolean;
}

function KanjiEditCell(props: GridRenderEditCellParams) {
  const { error } = props;

  return (
    <Tooltip
      open={!!error}
      title={error}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "error.main",
            color: "error.contrastText",
            marginTop: "23px !important",
          },
        },
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
    >
      <GridEditInputCell {...props} />
    </Tooltip>
  );
}

function renderEditKanjiCell(params: GridRenderEditCellParams) {
  return <KanjiEditCell {...params} />;
}

function KanjiView() {
  const [options, _] = useState<Options>({ filter: "all" });
  const { data } = useAllKanji(options);
  const addMutation = useAddKanji();
  const deleteMutation = useDeleteKanji();
  const updateMutation = useUpdateKanji();
  const theme = useTheme();
  const [isTableView, setTableView] = useState(false);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );
  const tableData = data.map((d) => ({
    ...d,
    isNew: false,
  }));
  const [rows, setRows] = React.useState(tableData);

  React.useEffect(() => {
    if (!rows.length && !!tableData.length) {
      setRows(tableData);
    }
  }, [tableData, rows]);

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
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
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
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
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
      valueGetter: (params: GridValueGetterParams<KanjiRowData, Meaning[]>) => {
        if (params.value) {
          return params.value.reduce((all, current) => {
            return all.concat(` ${current.meaning}`).trimStart();
          }, " ");
        }

        return "";
      },
      valueSetter: (params: GridValueSetterParams<KanjiRowData, string>) => {
        if (typeof params.value === "string") {
          const meanings = params.value
            .split(" ")
            .map((m) => ({ kanjiId: params.row.id, meaning: m }));

          return { ...params.row, meanings };
        }

        return params.row;
      },
    },
    {
      field: "kunReading",
      headerName: "Kun reading",
      minWidth: 150,
      editable: true,
      flex: 1,
      renderEditCell: renderEditKanjiCell,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
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
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
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
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
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
      valueGetter: (
        params: GridValueGetterParams<KanjiRowData, ExampleWord>,
      ) => {
        if (params.value) {
          return params.value.exampleWord;
        }

        return "";
      },
      valueSetter: (params: GridValueSetterParams<KanjiRowData, string>) => {
        if (typeof params.value === "string") {
          const exampleWords = {
            kanjiId: params.row.exampleWords.id,
            exampleWord: params.value,
          };

          return { ...params.row, exampleWords };
        }

        return params.row;
      },
    },
    {
      field: "exampleSentences",
      headerName: "Example sentences",
      minWidth: 150,
      editable: true,
      flex: 2,

      renderEditCell: renderEditKanjiCell,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
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
      valueGetter: (
        params: GridValueGetterParams<KanjiRowData, ExampleSentence>,
      ) => {
        if (params.value) {
          return params.value.exampleSentence;
        }
        return "";
      },
      valueSetter: (params: GridValueSetterParams<KanjiRowData, string>) => {
        if (typeof params.value === "string") {
          const exampleSentences = {
            kanjiId: params.row.exampleWords.id,
            exampleSentence: params.value,
          };

          return { ...params.row, exampleSentences };
        }

        return params.row;
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
        <Grid padding={0}>
          {data ? (
            convertKanjiResponse(data).map((d) => (
              <KanjiCard data={d} key={`${d.id}_${d.kanji}`} />
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

export default KanjiView;
