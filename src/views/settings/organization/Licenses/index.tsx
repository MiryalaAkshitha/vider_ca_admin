import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getOrganizationLicenses } from "api/services/organization";
import { emptyLicenses } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import AddLicense from "./AddLicense";
import LicenseCard from "./LicenseCard";

function OrganizationLicenses() {
  const [open, setOpen] = useState(false);

  const { data, isLoading }: ResType = useQuery(
    ["organization_licenses"],
    getOrganizationLicenses
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box mb={4} px={3} maxWidth={1400}>
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
