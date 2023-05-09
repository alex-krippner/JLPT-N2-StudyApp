import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Fade,
  IconButton,
  TableViewIcon,
  Textfield,
  Typography,
  ReadIcon,
} from "@mon/mon-ui-kit";
import { ReadingGrid } from "./ReadingGrid";
import { useAddReading, useAllReading, useUpdateReading } from "../hooks";
import { AddReadingButton } from "./AddReadingButton";

const DEFAULT_JAPANESE = "Enter Japanese here...";
const DEFAULT_TRANSLATION = "Enter translation here...";

export function ReadingView() {
  const { data } = useAllReading();
  const addMutation = useAddReading();
  const updateMutation = useUpdateReading();
  const [readingTranslation, setReadingTranslation] =
    useState(DEFAULT_TRANSLATION);
  const [japaneseReading, setJapanese] = useState(DEFAULT_JAPANESE);
  const [readingTitle, setTitle] = useState("");
  const [selectedReadingId, setSelectedReadingId] = useState("");
  const [isTranslationEditMode, setTranlsationEditMode] = useState(false);
  const [isJapaneseEditMode, setJapaneseEditMode] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isTableView, setTableView] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onCellDoubleClick = (id: string) => {
    setEditMode(true);
    setTableView(false);
    const { translation, japanese, title } = data.find((r) => r.id === id);
    setReadingTranslation(translation);
    setJapanese(japanese);
    setTitle(title);
    setSelectedReadingId(id);
  };
  const onAdd = () => {
    setTitle("");
    setTableView(false);
    setJapanese(DEFAULT_JAPANESE);
    setReadingTranslation(DEFAULT_TRANSLATION);
    setEditMode(true);
    setTranlsationEditMode(true);
    setJapaneseEditMode(true);
    setSelectedReadingId("");
  };

  const onUpdateTitle = (id: string, title: string) => {
    if (id === selectedReadingId && readingTitle !== title) {
      setTitle(title);
    }
  };

  const onDeleteReading = (id: string) => {
    if (selectedReadingId === id) {
      setTitle("");
      setSelectedReadingId("");
      setJapanese(DEFAULT_JAPANESE);
      setReadingTranslation(DEFAULT_TRANSLATION);
      setEditMode(false);
    }
  };

  useEffect(() => {
    const isTranslationMissing =
      !readingTranslation || readingTranslation === DEFAULT_TRANSLATION;
    const isJapaneseMissing =
      !japaneseReading || japaneseReading === DEFAULT_JAPANESE;
    const generateErrorMessage = () => {
      switch (true) {
        case !readingTitle && isTranslationMissing && isJapaneseMissing:
          return "A title, translation, and Japanese text are required";
        case !readingTitle && isTranslationMissing:
          return "A title, and translation are required";
        case !readingTitle && isJapaneseMissing:
          return "A title and a Japanese text are required";
        case isTranslationMissing && isJapaneseMissing:
          return "A translation and a Japanese text are required";
        case !readingTitle:
          return "A title is required";
        case isTranslationMissing:
          return "A translation is required";
        case isJapaneseMissing:
          return "A Japanese text is required";
        default:
          return "";
      }
    };

    if (isTranslationMissing || isJapaneseMissing || !readingTitle) {
      setIsError(true);
      setErrorMessage(generateErrorMessage());
    } else {
      setIsError(false);
    }
  }, [readingTranslation, japaneseReading, readingTitle]);
  const onSave = () => {
    const newReading = {
      japanese: japaneseReading,
      translation: readingTranslation,
      title: readingTitle,
    };
    if (selectedReadingId) {
      updateMutation.mutate({ ...newReading, id: selectedReadingId });
      return;
    }
    addMutation.mutate(newReading);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Box>
        <IconButton
          sx={{ mb: 4 }}
          onClick={() => setTableView(!isTableView)}
          size="large"
        >
          {isTableView ? (
            <ReadIcon color="primary" fontSize="medium" />
          ) : (
            <TableViewIcon color="primary" fontSize="medium" />
          )}
        </IconButton>
        <AddReadingButton onClick={onAdd} />
      </Box>
      {isTableView ? (
        <ReadingGrid
          data={data}
          onCellDoubleClick={onCellDoubleClick}
          onDeleteReading={onDeleteReading}
          onUpdateTitle={onUpdateTitle}
        />
      ) : (
        <>
          <Box sx={{ display: "flex", mb: 2 }}>
            <Textfield
              label={
                <Typography mb={2} fontSize="1em">
                  Title
                </Typography>
              }
              placeholder="Enter a title here..."
              value={readingTitle}
              onChange={(e) => {
                setTitle(e.target.value);
                setEditMode(true);
              }}
              sx={{
                fontSize: "1em",
                flex: 1,
                "& .MuiInputBase-input": {
                  textOverflow: "ellipsis",
                },
              }}
              fullWidth
            />
            <Fade
              in={
                (isEditMode || isJapaneseEditMode || isTranslationEditMode) &&
                isError
              }
            >
              <Alert
                severity="error"
                sx={{ flex: isError ? 2 : 1, ml: 2, alignItems: "center" }}
              >
                {errorMessage}
              </Alert>
            </Fade>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              overflow: "auto",
            }}
          >
            {!isJapaneseEditMode ? (
              <Typography
                sx={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  border: "solid 1px",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  borderRadius: 1,
                  padding: "1em",
                  cursor: "pointer",
                  overflow: "auto",
                  lineHeight: 2,
                }}
                onDoubleClick={() => {
                  setJapaneseEditMode(true);
                }}
              >
                {japaneseReading}
              </Typography>
            ) : (
              <textarea
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  padding: "1em",
                  resize: "none",
                }}
                value={japaneseReading}
                placeholder={DEFAULT_JAPANESE}
                onChange={(v) => {
                  setJapanese(v.target.value);
                }}
                onBlur={() => {
                  setJapaneseEditMode(false);
                }}
              />
            )}
            {!isTranslationEditMode ? (
              <Typography
                sx={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  border: "solid 1px",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  borderRadius: 1,
                  padding: "1em",
                  marginLeft: "1em",
                  cursor: "pointer",
                  overflow: "auto",
                }}
                onDoubleClick={() => {
                  setTranlsationEditMode(true);
                }}
              >
                {readingTranslation}
              </Typography>
            ) : (
              <textarea
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  padding: "1em",
                  marginLeft: "1em",
                  resize: "none",
                }}
                value={readingTranslation}
                placeholder={DEFAULT_TRANSLATION}
                onChange={(v) => {
                  setReadingTranslation(v.target.value);
                }}
                onBlur={() => {
                  setTranlsationEditMode(false);
                }}
              />
            )}
          </Box>
          {(isEditMode || isJapaneseEditMode || isTranslationEditMode) && (
            <ButtonGroup sx={{ justifyContent: "center", marginTop: 2 }}>
              <Button size="small" onClick={onSave} disabled={isError}>
                Save
              </Button>
            </ButtonGroup>
          )}
        </>
      )}
    </Box>
  );
}
