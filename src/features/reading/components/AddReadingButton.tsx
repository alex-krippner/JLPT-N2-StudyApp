import React from "react";
import { AddIcon, IconButton } from "@mon/mon-ui-kit";

interface AddReadingButtonProps {
  onClick: () => void;
}

export function AddReadingButton({ onClick }: AddReadingButtonProps) {
  return (
    <IconButton color="primary" sx={{ mb: 4 }} onClick={onClick} size="large">
      <AddIcon />
    </IconButton>
  );
}
