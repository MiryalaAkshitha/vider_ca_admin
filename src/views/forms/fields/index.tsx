import { Box, Typography, Divider, Grid } from "@mui/material";
import { useState } from "react";
import availableFields from "../utils/availableFields";
import CreateField from "./CreateField";

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
        <Grid container sx={{ p: 1 }}>
          {availableFields.map((item) => (
            <Grid
              item
              xs={4}
              sx={{
                p: "6px",
              }}
            >
              <Box
                sx={{
                  background: "#FFFFFF 0% 0% no-repeat padding-box",
                  border: "1px solid #22222233",
                  borderRadius: "5px",
                  alignItems: "center",
                  display: "flex",
                  gap: 1,
                  py: "13px",
                  px: "10px",
                  minHeight: "30px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpen(item)}
              >
                <Box>
                  <img
                    src={item.icon}
                    alt={item.title}
                    width={20}
                    height={20}
                  />
                </Box>
                <Typography variant="caption">{item.title}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <CreateField open={open} setOpen={setOpen} item={item} />
    </>
  );
}

export default Fields;
