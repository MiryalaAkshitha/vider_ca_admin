import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getOrganizationLicenses } from "api/services/organization";
import { emptyLicenses } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import AddLicense from "./AddLicense";
import LicenseCard from "./LicenseCard";

function OrganizationLicenses() {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const queryKey = params.billingEntityId
    ? "billing-entity-licenses"
    : "organization-licenses";

  const { data, isLoading }: ResType = useQuery(
    [queryKey, { billingEntityId: params.billingEntityId }],
    getOrganizationLicenses
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2" color="primary">
            Licenses
          </Typography>
          <Button
            color="secondary"
            onClick={() => setOpen(true)}
            startIcon={<Add />}
          >
            Add license
          </Button>
        </Box>
        <Box mt={2}>
          {data?.data?.length > 0 ? (
            <Grid container spacing={2}>
              {data.data.map((license: any, index: number) => (
                <Grid item xs={6} key={index}>
                  <LicenseCard data={license} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <NoItems
              btnAction={() => setOpen(true)}
              btnTitle="Add License"
              img={emptyLicenses}
              title="There are no organization licenses available"
              desc="Click add licens to add the licenses of your organisation"
            />
          )}
        </Box>
      </Box>
      <AddLicense open={open} setOpen={setOpen} />
    </>
  );
}

export default OrganizationLicenses;
