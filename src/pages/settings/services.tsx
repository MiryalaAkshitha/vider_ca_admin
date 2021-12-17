import { Add } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getCategories } from "api/services/categories";
import BreadCrumbs from "components/BreadCrumbs";
import Loader from "components/Loader";
import useTitle from "hooks/useTitle";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ResType } from "types";
import ServiceCard from "views/services/ServiceCard";

function Services() {
  const { data, isLoading }: ResType = useQuery("categories", getCategories);

  useTitle("Services");

  if (isLoading) return <Loader />;

  return (
    <>
      <BreadCrumbs page="services" />
      <Box textAlign="right" mt={2}>
        <Link to="/services/add" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<Add />} color="secondary">
            Add Service
          </Button>
        </Link>
      </Box>
      <Grid container spacing={2} sx={{ mt: 1, maxWidth: 1200 }}>
        <Grid item xs={4}>
          <TextField fullWidth size="small" select label="Select Category">
            {data?.data.map((option: any, index: any) => (
              <MenuItem key={index} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth size="small" select label="Select Sub Category">
            {data?.data.map((option: any, index: any) => (
              <MenuItem key={index} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid item xs={4}>
          <ServiceCard />
        </Grid>
        <Grid item xs={4}>
          <ServiceCard />
        </Grid>
        <Grid item xs={4}>
          <ServiceCard />
        </Grid>
        <Grid item xs={4}>
          <ServiceCard />
        </Grid>
      </Grid>
    </>
  );
}

export default Services;
