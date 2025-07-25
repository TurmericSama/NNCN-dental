import type { FC } from "react";

import { Box, Button } from "@mui/material";

const ConsentForm: FC<{}> = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <h1>Consent Form</h1>
      <p>Please read and accept the terms to proceed.</p>
      <Button variant="contained" color="primary">
        Accept
      </Button>
    </Box>
  );
};

export default ConsentForm;
