import * as React from "react";
import { Fade, Tooltip } from "@mui/material";
import { GridEditInputCell, GridRenderEditCellParams } from "@mui/x-data-grid";

export function EditCell(props: GridRenderEditCellParams) {
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