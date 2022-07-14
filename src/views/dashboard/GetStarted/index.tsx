import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { updateGetStarted } from "api/services/organization";
import { icons } from "assets";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { handleError } from "utils/handleError";
import ImportClients from "views/clients/ImportClients";
import AddMember from "views/settings/manage-users/users/AddMember";
import GetStartedCard from "./GetStartedCard";
import ImportServices from "./ImportServices";

const GetStarted = ({ data }: any) => {
  const queryClient = useQueryClient();
  const [openAddClient, setOpenAddClient] = useState(false);
  const [openAddMember, setOpenAddMember] = useState(false);
  const [openCreateTask, setOpenCreateTask] = useState(false);

  const { mutate } = useMutation(updateGetStarted, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-started");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleClick = () => {
    mutate({
      status: "REJECTED",
    });
  };

  const handleUpdate = (key: string) => {
    mutate({
      [key]: true,
    });
  };

  return (
    <>
      <Box p={3}>
        <Grid container>
          <Grid item xs={6}>
            <Box>
              <Typography variant="subtitle1">
                Get started with Vider practice management platform
              </Typography>
              <Typography mt={1} variant="body1">
                The following are the steps to follow to add new users, clients,
                and services which will help you do the bait functionalities in
                the vider practice management platform
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button onClick={handleClick} variant="contained" color="error">
                Skip these steps
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4}>
          <GetStartedCard
            active={data?.createUser}
            img={icons.socialmedia_PosterImage}
            title="Add a new User"
            desc="Add a user or Team member to work with"
            btnTitle="Add user"
            btnAction={() => setOpenAddMember(true)}
          />
          <GetStartedCard
            active={data?.importClients}
            img={icons.handshake_PosterImage}
            title="Import clients"
            desc="Import clients with their basic details"
            btnTitle="Imports clients"
            btnAction={() => setOpenAddClient(true)}
          />
          <GetStartedCard
            active={data?.selectServices}
            img={icons.checklist_PosterImage}
            title="Add Sevices"
            desc="Select services to be added to the platform"
            btnTitle="Select services"
            btnAction={() => setOpenCreateTask(true)}
          />
        </Box>
      </Box>
      <ImportClients
        successCb={() => handleUpdate("importClients")}
        open={openAddClient}
        setOpen={setOpenAddClient}
      />
      <AddMember
        open={openAddMember}
        setOpen={setOpenAddMember}
        successCb={() => handleUpdate("createUser")}
      />
      <ImportServices
        open={openCreateTask}
        setOpen={setOpenCreateTask}
        successCb={() => handleUpdate("selectServices")}
      />
    </>
  );
};
export default GetStarted;
