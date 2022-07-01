import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getForms } from "api/services/forms";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import ValidateAccess from "components/ValidateAccess";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { Permissions } from "utils/permissons";
import KybFormCard from "views/client-view/KybInfo/KybFormCard";
import SelectFormTemplate from "views/taskview/iPro/SelectFormTemplate";

function KybInfo() {
  const params: any = useParams();
  const [open, setOpen] = useState(false);

  const { data, isLoading }: ResType = useQuery(
    ["client-forms", { type: "KYB", clientId: params.clientId }],
    getForms
  );

  if (isLoading) return <Loader />;

  return (
    <Box px={4} py={2}>
      {data?.data?.length ? (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" color="primary">
            Added forms
          </Typography>
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            startIcon={<Add />}
          >
            Add form
          </Button>
        </Box>
      ) : null}
      <Box mt={1}>
        {data?.data?.length ? (
          <Grid container spacing={2}>
            {data?.data?.map((item: any, index: number) => (
              <Grid item xs={6} key={index}>
                <KybFormCard data={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyPage
            minHeight="70vh"
            title="There is no KYB Info form added"
            desc="Click on Add KYB form to add a new form template"
            btn2Title="Add KYB Form"
            btn2Action={() => setOpen(true)}
          />
        )}
      </Box>
      <ValidateAccess name={Permissions.CREATE_CLIENT_KYB}>
        <SelectFormTemplate
          open={open}
          setOpen={setOpen}
          queryKey="client-forms"
          type="KYB"
          typeId={params.clientId}
        />
      </ValidateAccess>
    </Box>
  );
}

export default KybInfo;
