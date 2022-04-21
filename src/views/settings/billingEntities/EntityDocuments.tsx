import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { getOrganization } from "api/services/organization";
import { emptyLicenses } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { useImmer } from "use-immer";
import AddEntityDocuments from "./AddEntityDocuments";
import LicenseCard from "./LicenseCard";

const EntityDocuments = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useImmer<any>({});

  const { isLoading }: ResType = useQuery(["organization"], getOrganization, {
    onSuccess: (res: any) => {
      setState(res.data);
    },
    cacheTime: 0,
  });

  if (isLoading) return <Loader />;

  return (
    <>
      <Box mb={4} px={3} maxWidth={1400}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2" color="primary">
            Entity Documents
          </Typography>
          <Button
            color="secondary"
            onClick={() => setOpen(true)}
            startIcon={<Add />}
          >
            Add licenses
          </Button>
        </Box>
        <NoItems
          title="There are no Entity Documents available"
          img={emptyLicenses}
          btnTitle="Add entity documents"
          btnAction={() => setOpen(true)}
          desc="Click add entity documents to add the documents of your billing entity"
        />
      </Box>
      <AddEntityDocuments
        open={open}
        setOpen={setOpen}
        state={state}
        setState={setState}
      />

      <LicenseCard />
    </>
  );
};
export default EntityDocuments;
