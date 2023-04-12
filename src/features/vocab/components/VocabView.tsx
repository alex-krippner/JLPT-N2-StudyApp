import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridRowModesModel,
  GridColDef,
  GridRenderEditCellParams,
  GridPreProcessEditCellProps,
  GridRowParams,
  GridActionsCellItem,
  GridRowModes,
  GridRowId,
} from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  CardDetail,
  Grid,
  IconButton,
  CancelIcon,
  DeleteIcon,
  EditIcon,
  SaveIcon,
  Typography,
  ViewModuleIcon,
  TableViewIcon,
} from "@mon/mon-ui-kit";
import { camelCaseToWords } from "../../../utils";
import {
  AddVocabRequest,
  useAddVocab,
  useAllVocab,
  useDeleteVocab,
  useUpdateVocab,
  Vocab,
} from "../hooks";
import { VocabDataGridToolbar } from "./VocabDataGridToolbar";
import { EditCell } from "../../shared/EditCell";

const DEFINITIONS_MAX_LENGTH = 85;
const EXAMPLE_SENTENCES_MAX_LENGTH = 125;
const PARTS_OF_SPEECH_MAX_LENGTH = 25;
const VOCAB_MAX_LENGTH = 50;

/**
 * A regex to match space and unicode for kanji, hiragana, katana, and the "・"
 */
const KHKD_REGEX = /^[\u30FB\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\s]+$/;

interface VocabRowData extends Vocab {
  isNew: boolean;
}

function renderVocabEditCell(params: GridRenderEditCellParams) {
  return <EditCell {...params} />;
}

export function VocabView() {
  const [isTableView, setTableView] = useState(false);

  const theme = useTheme();
  const addMutation = useAddVocab();
  const deleteMutation = useDeleteVocab();
  const updateMutation = useUpdateVocab();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { data } = useAllVocab();
  const [rows, setRows] = useState<VocabRowData[]>([]);

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
    const vocabId = typeof id === "number" ? id.toString() : id;
    deleteMutation.mutate(vocabId);
    setRows(rows.filter((row) => row.id !== id));
  };
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const processRowUpdate = (newVocab: VocabRowData) => {
    const updatedRow = { ...newVocab, isNew: false, username: "" };
    const { id, isNew, ...addVocabRequest } = newVocab;
    const vocabPostRequest: AddVocabRequest = {
      ...addVocabRequest,
      username: "",
    };

    if (isNew) {
      addMutation.mutate(vocabPostRequest);
    }

    if (!isNew) {
      updateMutation.mutate({ ...vocabPostRequest, id });
    }

    return updatedRow;
  };

  const columns: GridColDef[] = [
    {
      sortable: false,
      field: "vocab",
      headerName: "Vocab",
      minWidth: 150,
      editable: true,
      flex: 1,
      renderEditCell: renderVocabEditCell,
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
        if (value.length < 1) {
          error = "Input required";
        }
        if (value.length > VOCAB_MAX_LENGTH) {
          error = `Max characters: ${VOCAB_MAX_LENGTH}`;
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
      field: "definitions",
      headerName: "Definitions",
      minWidth: 150,
      editable: true,
      flex: 1,
      renderEditCell: renderVocabEditCell,
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
        if (value.length > DEFINITIONS_MAX_LENGTH) {
          error = `Max characters: ${DEFINITIONS_MAX_LENGTH}`;
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
      field: "kanji",
      headerName: "Kanji",
      minWidth: 50,
      editable: true,
      flex: 1,
      renderEditCell: renderVocabEditCell,
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
      field: "partsOfSpeech",
      headerName: "Parts of speech",
      minWidth: 50,
      editable: true,
      flex: 2,
      renderEditCell: renderVocabEditCell,
      preProcessEditCellProps: (
        params: GridPreProcessEditCellProps<string>,
      ) => {
        const alphaSpaceDashRegex = /^[a-zA-Z\s-]+$/;
        const { value } = params.props;
        let error: string | null = null;

        if (typeof value !== "string") {
          return {
            ...params.props,
            error: "Input required",
          };
        }
        if (value.length > PARTS_OF_SPEECH_MAX_LENGTH) {
          error = `Max characters: ${PARTS_OF_SPEECH_MAX_LENGTH}`;
        }
        if (value && !alphaSpaceDashRegex.test(value)) {
          error = `Only alphabetic, space, and dash allowed "${"\u30FB"}"`;
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

      renderEditCell: renderVocabEditCell,
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
      getActions: (params: GridRowParams<VocabRowData>) => {
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
            slots={{ toolbar: VocabDataGridToolbar }}
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
            data.map((vocab) => {
              const { definitions, kanji, partsOfSpeech, exampleSentences } =
                vocab;
              const cardDetails: CardDetail[] = Object.entries({
                definitions,
                kanji,
                partsOfSpeech,
                exampleSentences,
              }).map(([header, dataText]) => ({
                header: camelCaseToWords(header),
                dataText,
              }));

              return (
                <Grid item key={`VocabGridItem_${vocab.id}`}>
                  <Card
                    mainContent={vocab.vocab}
                    data={cardDetails}
                    id={vocab.id}
                    key={vocab.id}
                  />
                </Grid>
              );
            })
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
