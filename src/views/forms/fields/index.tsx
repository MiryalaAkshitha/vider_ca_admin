import { Box, Divider, Grid, Typography } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import availableFields from "../utils/availableFields";
import Field from "./Field";

function Fields() {
  return (
    <Box sx={{ position: "sticky", top: 80 }}>
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
        <Droppable
          droppableId="formbuilder-available-fields"
          isDropDisabled={true}
        >
          {(provided: any) => (
            <div ref={provided.innerRef}>
              <Grid container sx={{ p: 2 }} spacing={2}>
                {availableFields.map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <Field item={item} index={index} />
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </Droppable>
      </Box>
    </Box>
  );
}

export default Fields;
