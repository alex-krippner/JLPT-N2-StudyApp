import React from "react";
import { Fade } from "./Fade";
import { Tooltip } from "./Tooltip";
import { GridEditInputCell, GridRenderEditCellParams } from "./DataGrid";

export function EditCell(props: GridRenderEditCellParams) {
  const { error } = props;

  return (
    <Tooltip
      open={!!error}
      title={error as string}
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
