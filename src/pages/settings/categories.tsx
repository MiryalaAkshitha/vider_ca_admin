import { Add, Update } from "@mui/icons-material";
import { Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getCategories, updateAdminCategories } from "api/services/categories";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { snack } from "components/toast";
import ValidateAccess from "components/ValidateAccess";
import { useConfirm } from "context/ConfirmDialog";
import { Permissions } from "data/permissons";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import AddCategory from "views/settings/categories/AddCategory";
import CategoryCard from "views/settings/categories/CategoryCard";
import ImportCategories from "views/settings/categories/ImportCategories";

function Cateogries() {
  useTitle("Categories");
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState("");
  const [openImport, setOpenImport] = useState<boolean>(false);

  const { data, isLoading }: ResType = useQuery("categories", getCategories);

  const { mutate } = useMutation(updateAdminCategories, {
    onSuccess: () => {
      snack.success("Vider services updated successfully");
      queryClient.invalidateQueries("categories");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleUpdate = () => {
    confirm({
      msg: "Are you sure you want to update the categories?",
      action: () => mutate(),
    });
  };

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
        <Box display="flex" gap={2} flex={1}>
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
        <Box display="flex" gap={1}>
          <Button
            onClick={() => setOpenImport(true)}
            variant="outlined"
            startIcon={<Add />}
            color="secondary"
          >
            Import from Vider
          </Button>
          <Button
            onClick={handleUpdate}
            variant="outlined"
            startIcon={<Update />}
            color="secondary"
          >
            Update Vider Categories
          </Button>
        </Box>
      </Box>
      <Paper
        sx={{
          border: "1px solid #BDBDBD",
          height: "480px",
          overflowY: "scroll",
          p: 1,
          backgroundColor: "inherit",
        }}
      >
        <Grid container spacing={2} mt={1}>
          {getData()?.map((item: any, index: any) => (
            <Grid item xs={4} key={index}>
              <CategoryCard data={item} />
            </Grid>
          ))}
        </Grid>
      </Paper>
      <AddCategory open={open} setOpen={setOpen} />
      <ValidateAccess name={Permissions.CREATE_CATEGORIES}>
        <Box>
          <FloatingButton
            onClick={() => {
              setOpen(true);
            }}
          />
        </Box>
      </ValidateAccess>
      <ImportCategories open={openImport} setOpen={setOpenImport} />
    </Box>
  );
}

export default Cateogries;
