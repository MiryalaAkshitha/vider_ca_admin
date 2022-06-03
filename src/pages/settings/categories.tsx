import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getCategories } from "api/services/categories";
import Loader from "components/Loader";
import ValidateAccess from "components/ValidateAccess";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { Permissions } from "utils/permissons";
import AddCategory from "views/settings/categories/AddCategory";
import CategoryCard from "views/settings/categories/CategoryCard";

function Cateogries() {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading }: ResType = useQuery("categories", getCategories);

  useTitle("Categories");

  if (isLoading) return <Loader />;

  return (
    <>
      <Box textAlign="right" mt={2}>
        <ValidateAccess name={Permissions.CREATE_CATEGORIES}>
          <Button
            onClick={() => setOpen(true)}
            variant="outlined"
            startIcon={<Add />}
            color="secondary"
          >
            Add Category
          </Button>
        </ValidateAccess>
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
