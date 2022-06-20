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
      <ValidateAccess name={Permissions.CREATE_CATEGORIES}>
        <Box textAlign="right" mt={2} mb={2}>
          <Button
            onClick={() => setOpen(true)}
            variant="outlined"
            startIcon={<Add />}
            color="secondary"
          >
            Add Category
          </Button>
        </Box>
      </ValidateAccess>
      <Grid container spacing={2}>
        {data?.data?.map((item: any, index: any) => (
          <Grid item xs={4} key={index}>
            <CategoryCard data={item} />
          </Grid>
        ))}
      </Grid>
      <AddCategory open={open} setOpen={setOpen} />
    </>
  );
}

export default Cateogries;
