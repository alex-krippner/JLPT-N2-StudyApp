import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";

export function Home() {
  return (
    <Box>
      <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
        Home
      </Typography>
    </Box>
  );
}
