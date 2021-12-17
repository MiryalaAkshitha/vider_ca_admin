import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getCategories } from "api/services/categories";
import Loader from "components/Loader";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import AddCategory from "views/categories/AddCategory";
import CategoryCard from "views/categories/CategoryCard";

function Cateogries() {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading }: ResType = useQuery("categories", getCategories);

  useTitle("Categories");

  if (isLoading) return <Loader />;

  return (
    <>
      <Box textAlign="right" mt={2}>
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          startIcon={<Add />}
          color="secondary"
        >
          Add Category
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ maxWidth: 1000 }}>
        {data?.data?.map((item: any, index: any) => (
          <Grid item xs={6} key={index}>
            <CategoryCard data={item} />
          </Grid>
        ))}
      </Grid>
      <AddCategory open={open} setOpen={setOpen} />
    </>
  );
}

export default Cateogries;
