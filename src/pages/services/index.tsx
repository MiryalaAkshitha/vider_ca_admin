import { Add } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getCategories } from "api/services/categories";
import { getServices } from "api/services/services";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useFilteredData from "hooks/useFilteredData";
import useTitle from "hooks/useTitle";
import { result } from "lodash";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addServiceState } from "redux/reducers/addServiceSlice";
import { ResType } from "types";
import ServiceCard from "views/services/ServiceCard";

function Services() {
  useTitle("Services");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const { data, isLoading }: ResType = useQuery("services", getServices);
  const { data: categories }: ResType = useQuery("categories", getCategories);

  const subCategories = categories?.data?.find(
    (item: any) => item.id === categoryId
  )?.subCategories;

  const onChange = (e: any) => {
    setCategoryId(e.target.value)
    setSubCategoryId("")
  }

  const onSubChange = (e: any) => {
    setSubCategoryId(e.target.value)
  }

  function getData() {
    let result = [...data?.data]

    if (search) {
      result = result?.filter(item => item.name?.toLowerCase().includes(search.toLowerCase()))
    }

    if (categoryId) {
      result = result?.filter(item => item.categoryId == categoryId)
    }

    if (subCategoryId) {
      result = result?.filter(item => item.subCategoryId == subCategoryId)
    }

    return result
  }

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <Box textAlign="right" mt={2}>
        {data?.data?.length > 0 && (
          <Link to="/services/add" style={{ textDecoration: "none" }}>
            <Button variant="outlined" startIcon={<Add />} color="secondary">
              Add Service
            </Button>
          </Link>
        )}
      </Box>
      <Box mt={2}>
        {data?.data?.length > 0 && (
          <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
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
          btnTitle="Add Service"
          btnAction={() => {
            navigate("/services/add");
          }}
        />
      )}
    </Box>
  );
}

export default Services;
