import { Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import EditForm from "./EditForm";

function FormInfo({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          border: "1px solid #22222226",
          borderRadius: "10px",
          p: 2,
          mb: 2,
          position: "relative",
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          {data?.name}
        </Typography>
        <Typography color="rgba(0,0,0,0.6)" variant="body2">
          {data?.description}
        </Typography>
        <IconButton
          onClick={() => setOpen(true)}
          size="small"
          sx={{
            position: "absolute",
            right: 5,
            top: 5,
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Box>
      <EditForm data={data} open={open} setOpen={setOpen} />
    </>
  );
}

export default FormInfo;
