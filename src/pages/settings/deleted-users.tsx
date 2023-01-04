import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getDeletedUsers, restoreUser } from "api/services/users";
import Loader from "components/Loader";
import Table from "components/Table";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { handleError } from "utils/handleError";

function DeletedUsers() {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const { data, isLoading }: ResType = useQuery(["deleted-users"], getDeletedUsers);

  const { mutate } = useMutation(restoreUser, {
    onSuccess: () => {
      snack.success("User restored successfully");
      queryClient.invalidateQueries("deleted-users");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleRestore = (id: number) => {
    confirm({
      msg: "Are you sure you want to restore this user?",
      action: () => mutate(id),
    });
  };

  if (isLoading) return <Loader />;

  return (
    <Box p={2}>
      <Typography variant="subtitle1" mb={2}>
        Deleted Users
      </Typography>
      <Table
        loading={isLoading}
        data={data?.data || []}
        columns={[
          {
            key: "profile.employeeId",
            title: "User Id",
          },
          {
            key: "fullName",
            title: "Fullname",
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
                  Restore
                </Button>
              );
            },
          },
        ]}
      />
    </Box>
  );
}

export default DeletedUsers;
