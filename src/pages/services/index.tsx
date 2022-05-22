import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getServices } from "api/services/services";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useFilteredData from "hooks/useFilteredData";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { ResType } from "types";
import ServiceCard from "views/services/ServiceCard";

function Services() {
  useTitle("Services");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, isLoading }: ResType = useQuery("services", getServices);
  const filteredData = useFilteredData(data?.data, ["name"], search);

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
          <SearchContainer
            placeHolder="Search for a service"
            onChange={setSearch}
          />
        )}
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filteredData?.map((service: any, index: number) => (
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
