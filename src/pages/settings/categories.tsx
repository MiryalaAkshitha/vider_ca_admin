import { Add } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getCategories } from "api/services/categories";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import ValidateAccess from "components/ValidateAccess";
import { Permissions } from "data/permissons";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import AddCategory from "views/settings/categories/AddCategory";
import CategoryCard from "views/settings/categories/CategoryCard";

function Cateogries() {
  useTitle("Categories");
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState("");

  const { data, isLoading }: ResType = useQuery("categories", getCategories);

  const getData = () => {
    let result = [...data?.data];

    if (search) {
      result = result?.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (sortBy === "a_z") {
      result = result?.sort((a: any, b: any) => a.name.localeCompare(b.name));
    }

    if (sortBy === "z_a") {
      result = result?.sort((a: any, b: any) => b.name.localeCompare(a.name));
    }

    return result;
  };

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" gap={2}>
          <SearchContainer
            value={search}
            minWidth="300px"
            onChange={setSearch}
            placeHolder="Search categories"
          />
          <TextField
            sx={{ minWidth: 120 }}
            select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="small"
            variant="outlined"
            label="Sort By"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="a_z">A - Z</MenuItem>
            <MenuItem value="z_a">Z - A</MenuItem>
          </TextField>
        </Box>
        <ValidateAccess name={Permissions.CREATE_CATEGORIES}>
          <Box>
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
      </Box>
      <Grid container spacing={2} mt={1}>
        {getData()?.map((item: any, index: any) => (
          <Grid item xs={4} key={index}>
            <CategoryCard data={item} />
          </Grid>
        ))}
      </Grid>
      <AddCategory open={open} setOpen={setOpen} />
    </Box>
  );
}

export default Cateogries;
