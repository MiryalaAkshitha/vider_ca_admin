import { Box, Typography, Divider, Grid } from "@mui/material";
import { useState } from "react";
import availableFields from "../utils/availableFields";
import CreateField from "./CreateField";
import Field from "./Field";

function Fields() {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});

  const handleOpen = (item: any) => {
    setOpen(true);
    setItem(item);
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid #22222226",
          borderRadius: "10px",
          p: "12px",
        }}
      >
        <Typography variant="subtitle2">Form Name 1</Typography>
        <Typography variant="body2">
          Etiam convallis elementum sapien, a aliquam turpis aliquam vitae.
          Praesent sollicitudin felis vel mi facilisis posuere. apien, a aliquam
          turpis a
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid #22222226",
          borderRadius: "10px",
          mt: "12px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography sx={{ margin: "12px" }} variant="body2">
            Available Fields
          </Typography>
        </Box>
        <Box>
          <Divider />
        </Box>
        <Grid container sx={{ p: 2 }} spacing={2}>
          {availableFields.map((item) => (
            <Grid item xs={4}>
              <Field item={item} handleOpen={handleOpen} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <CreateField open={open} setOpen={setOpen} item={item} />
    </>
  );
}

export default Fields;
