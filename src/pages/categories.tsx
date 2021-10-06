import { Add } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import AddCategory from "views/categories/AddCategory";
import { useQuery, UseQueryResult } from "react-query";
import { getCategories } from "api/categories";
import Loader from "components/Loader";

interface Category {
  name: string;
  image: string;
  subCategories: [];
}

interface CategoryResponse {
  data: Category[];
}

function Cateogries() {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, error }: UseQueryResult<CategoryResponse, Error> =
    useQuery("categories", getCategories);

  if (isLoading) return <Loader />;

  return (
    <>
      <Box textAlign='right' mt={2}>
        <Button
          onClick={() => setOpen(true)}
          variant='outlined'
          startIcon={<Add />}
          color='secondary'>
          Add Category
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {data?.data?.map((item: any, index: any) => (
          <Grid item xs={6}>
            <Box
              key={index}
              sx={{
                boxShadow: "0px 3px 12px #0000001A",
                borderRadius: 2,
                p: 4,
              }}>
              <Box>
                <Typography variant='subtitle2' color='primary'>
                  {item?.name}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <AddCategory open={open} setOpen={setOpen} />
    </>
  );
}

export default Cateogries;
