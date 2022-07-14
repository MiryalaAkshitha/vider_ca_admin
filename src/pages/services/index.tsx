import { Add } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getCategories } from "api/services/categories";
import { getServices } from "api/services/services";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { ResType } from "types";
import ImportServices from "views/dashboard/GetStarted/ImportServices";
import ServiceCard from "views/services/ServiceCard";

function Services() {
  useTitle("Services");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [openImport, setOpenImport] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const { data, isLoading }: ResType = useQuery("services", getServices);
  const { data: categories }: ResType = useQuery("categories", getCategories);

  const subCategories = categories?.data?.find(
    (item: any) => item.id === categoryId
  )?.subCategories;

  const onChange = (e: any) => {
    setCategoryId(e.target.value);
    setSubCategoryId("");
  };

  const onSubChange = (e: any) => {
    setSubCategoryId(e.target.value);
  };

  function getData() {
    let result = [...data?.data];

    if (search) {
      result = result?.filter((item) => {
        return item.name?.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (categoryId) {
      result = result?.filter((item) => item.category?.id === +categoryId);
    }

    if (subCategoryId) {
      result = result?.filter(
        (item) => item.subCategory?.id === +subCategoryId
      );
    }

    return result;
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <Box px={3} py={1}>
        <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
          {data?.data?.length > 0 && (
            <>
              <Link to="/services/add" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  color="secondary"
                >
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
            </>
          )}
        </Box>
        <Box mt={4}>
          {data?.data?.length > 0 && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex">
                <Box>
                  <TextField
                    name="categoryId"
                    value={categoryId}
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
                        value={subCategoryId}
                        name="subCategoryId"
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
                  value={search}
                  minWidth="400px"
                  placeHolder="Search for a service"
                  onChange={setSearch}
                />
              </Box>
            </Box>
          )}
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {getData()?.map((service: any, index: number) => (
            <Grid item xs={4}>
              <ServiceCard data={service} key={index} />
            </Grid>
          ))}
        </Grid>
        {data?.data?.length === 0 && (
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
