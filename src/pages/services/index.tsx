import { Add, Update } from "@mui/icons-material";
import { Button, Grid, MenuItem, Pagination, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getCategories } from "api/services/categories";
import { getServices, updateAdminServices } from "api/services/services";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import useQueryParams from "hooks/useQueryParams";
import useTitle from "hooks/useTitle";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetFilters } from "redux/reducers/taskboardSlice";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import ImportServices from "views/dashboard/GetStarted/ImportServices";
import ServiceCard from "views/services/ServiceCard";

function Services() {
  useTitle("Services");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { queryParams, setQueryParams } = useQueryParams();
  const [search, setSearch] = useState("");
  const [openImport, setOpenImport] = useState(false);
  const [category, setCategory] = useState<any>(null);
  const [subCategory, setSubCategory] = useState<any>(null);
  const page = +queryParams.page || 1;
  const limit = 9;
  const offset = (page - 1) * limit;

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, []);

  const { data: categories }: ResType = useQuery("categories", getCategories);

  const { data, isLoading }: ResType = useQuery(
    ["services", { search, category, subCategory, limit, offset }],
    getServices
  );

  const { mutate } = useMutation(updateAdminServices, {
    onSuccess: () => {
      snack.success("Vider services updated successfully");
      queryClient.invalidateQueries("services");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleUpdate = () => {
    confirm({
      msg: "Are you sure you want to update the services?",
      action: () => mutate(),
    });
  };

  const onChange = (e: any) => {
    setCategory(e.target.value);
    setSubCategory(null);
    setQueryParams({ page: "1" });
  };

  const onSubChange = (e: any) => {
    setSubCategory(e.target.value);
    setQueryParams({ page: "1" });
  };

  const subCategories = categories?.data?.find((item: any) => item.id === category)?.subCategories;
  const noInitialData = data?.data?.totalCount === 0 && !search && !category && !subCategory;

  if (isLoading) return <Loader />;

  return (
    <>
      <Box px={3} py={1}>
        <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
          {!noInitialData && (
            <>
              <Link to="/services/add" style={{ textDecoration: "none" }}>
                <Button variant="outlined" startIcon={<Add />} color="secondary">
                  Add Service
                </Button>
              </Link>
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
                Update Vider Services
              </Button>
            </>
          )}
        </Box>
        <Box mt={4}>
          {!noInitialData && (
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex">
                <Box>
                  <TextField
                    name="category"
                    value={category}
                    onChange={onChange}
                    size="small"
                    label="Category"
                    select
                    sx={{ width: "250px" }}
                  >
                    {categories?.data.map((option: any, index: any) => (
                      <MenuItem key={index} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box>
                  {subCategories?.length > 0 && (
                    <Box ml={2}>
                      <TextField
                        value={subCategory}
                        name="subCategory"
                        onChange={onSubChange}
                        sx={{ width: "250px" }}
                        size="small"
                        label="Sub Category"
                        select
                      >
                        {subCategories?.map((option: any, index: any) => (
                          <MenuItem key={index} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box>
                <SearchContainer
                  debounced
                  value={search}
                  placeHolder="Search for a service"
                  onChange={(v: string) => {
                    setSearch(v);
                    setQueryParams({ page: "1" });
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {data?.data?.result?.map((service: any, index: number) => (
            <Grid item xs={4}>
              <ServiceCard data={service} key={index} />
            </Grid>
          ))}
        </Grid>
        {data?.data?.totalCount > 0 && (
          <Pagination
            sx={{
              mt: 3,
              "& .MuiPagination-ul": { justifyContent: "flex-end" },
            }}
            page={page}
            onChange={(e, value) => setQueryParams({ page: value.toString() })}
            color="secondary"
            count={Math.ceil(data?.data?.totalCount / 9)}
            variant="outlined"
            shape="rounded"
          />
        )}
        {noInitialData && (
          <EmptyPage
            title="No services found"
            desc="You can add a service by clicking the button above."
            btnTitle="Import from Vider"
            btnAction={() => setOpenImport(true)}
            btn2Title="Add Service"
            btn2Action={() => navigate("/services/add")}
          />
        )}
      </Box>
      <ImportServices open={openImport} setOpen={setOpenImport} />
    </>
  );
}

export default Services;
