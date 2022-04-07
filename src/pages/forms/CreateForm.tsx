import { Divider, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { getForm } from "api/services/forms";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import FormAppbar from "layout/primarylayout/app-bar/FormAppbar";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import AddPage from "views/forms/AddPage";
import availableFields from "../../views/forms/availableFields";
import CreateFormDrawer from "../../views/forms/CreateFormDrawer";
import Pages from "./Pages";

const CreateForm = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const [pageOpen, setPageOpen] = useState(false);

  const { data, isLoading }: ResType = useQuery(
    ["form-details", params.formId],
    getForm
  );

  if (isLoading) return <Loader />;

  const handleOpen = (item: any) => {
    setOpen(true);
    setItem(item);
  };

  return (
    <>
      <FormAppbar />
      {data?.data?.pages?.length > 0 ? (
        <Grid container spacing={2} sx={{ pt: "4.5rem", px: "1rem" }}>
          <Grid item xs={7}>
            <Pages data={data?.data} setPageOpen={setPageOpen} />
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
                Etiam convallis elementum sapien, a aliquam turpis aliquam
                vitae. Praesent sollicitudin felis vel mi facilisis posuere.
                apien, a aliquam turpis a
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
                        py: "10px",
                        px: "5px",
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
      ) : (
        <EmptyPage
          title="There are no pages available"
          btnTitle="+ Add Page"
          btnAction={() => setPageOpen(true)}
          desc="Click on add page to add a new page"
        />
      )}
      <CreateFormDrawer open={open} setOpen={setOpen} item={item} />
      <AddPage open={pageOpen} setOpen={setPageOpen} />
    </>
  );
};

export default CreateForm;
