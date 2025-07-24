import { Box } from "@mui/material";
import type { FC } from "react";

import { Outlet } from "react-router";

const PatientsView: FC = () => {
  return (
    <Box
      sx={{
        minHeight: `calc(100% - 128px)`,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        padding: 4,
      }}
    >
      <Outlet />
    </Box>
  );
};

export default PatientsView;
