import FormAppbar from "layout/primarylayout/app-bar/FormAppbar";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Typography, Grid, Divider } from "@mui/material";
import availableFields from "../../views/formbuilder/availableFields";
import CreateFormDrawer from "../../views/formbuilder/CreateFormDrawer";

const CreateForm = () => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});

  const handleOpen = (item) => {
    setOpen(true);
    setItem(item);
  };

  return (
    <>
      <FormAppbar />
      <Grid container spacing={2} sx={{ pt: "4.5rem", px: "1rem" }}>
        <Grid item xs={7}>
          Left Form; Will Show Up Soon
        </Grid>
        <Grid item xs={5}>
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
              Praesent sollicitudin felis vel mi facilisis posuere. apien, a
              aliquam turpis a
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
                      py: "5px",
                      px: "3px",
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
        </Grid>
      </Grid>
      <CreateFormDrawer open={open} setOpen={setOpen} item={item} />
    </>
  );
};

export default CreateForm;
