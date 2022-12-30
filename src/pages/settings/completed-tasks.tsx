import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getDeletedClients, restoreClient } from "api/services/clients/clients";
import { getDeletedUsers, restoreUser } from "api/services/users";
import Loader from "components/Loader";
import Table from "components/Table";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { handleError } from "utils/handleError";

function CompletedTasks() {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const { data, isLoading }: ResType = useQuery(["completed-tasks"], getDeletedClients);

  const { mutate } = useMutation(restoreClient, {
    onSuccess: () => {
      snack.success("Client restored successfully");
      queryClient.invalidateQueries("deleted-clients");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleRestore = (id: number) => {
    confirm({
      msg: "Are you sure you want to restore this client?",
      action: () => mutate(id),
    });
  };

  if (isLoading) return <Loader />;

  return (
    <Box p={2}>
      <Typography variant="subtitle1" mb={2}>
        Completed Tasks
      </Typography>
      <Table
        loading={isLoading}
        data={data?.data || []}
        columns={[
          {
            key: "clientId",
            title: "Client Id",
          },
          {
            key: "displayName",
            title: "Client Name",
          },
          {
            key: "email",
            title: "Email",
          },
          {
            key: "mobileNumber",
            title: "Mobile Number",
          },
          {
            key: "Action",
            title: "Action",
            render: (item: any) => {
              return (
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRestore(item?.id)}
                >
                  Retrieve
                </Button>
              );
            },
          },
        ]}
      />
    </Box>
  );
}

export default CompletedTasks;
