import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteRole, getRoles } from "api/services/roles";
import Table from "components/Table";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import AddRole from "views/settings/manage-users/roles-permissions/AddRole";

function RolesAndPermissions() {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: ResType = useQuery("roles", getRoles);

  const { mutate } = useMutation(deleteRole, {
    onSuccess: () => {
      snack.success("Role Deleted");
      setOpen(false);
      queryClient.invalidateQueries("roles");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleRemove = (id: any) => {
    confirm({
      msg: "Are you sure you want to delete this role.",
      action: () => {
        mutate(id);
      },
    });
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={2}
      >
        <Typography variant="subtitle1" color="primary">
          Roles & Permissions
        </Typography>
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          startIcon={<Add />}
          color="secondary"
        >
          Create Role
        </Button>
      </Box>
      <Box mt={2}>
        <Table
          columns={[
            {
              title: "Role Name",
              key: "name",
              render: (item) => (
                <>
                  <Typography variant="body1" color="primary">
                    {item?.name}
                  </Typography>
                  {item?.description && (
                    <Typography variant="caption">
                      ({item?.description})
                    </Typography>
                  )}
                </>
              ),
            },
            {
              title: "Created On",
              key: "createdAt",
              render: (item) => (
                <Typography variant="body1" color="primary">
                  {moment(item?.createdAt).format("YYYY-MM-DD")}
                </Typography>
              ),
            },
            {
              title: "Status",
              key: "name",
              render: (item) => (
                <Typography variant="body1" color="primary">
                  {item?.active ? "Active" : "Inactive"}
                </Typography>
              ),
            },
            {
              title: "Actions",
              key: "actions",
              render: (item) => {
                return !item?.defaultRole ? (
                  <Box display="flex" gap={1}>
                    <IconButton
                      onClick={() => {
                        navigate(`/settings/roles-permissions/${item?.id}`);
                      }}
                      size="small"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleRemove(item?.id)}
                      size="small"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                ) : null;
              },
            },
          ]}
          loading={isLoading}
          data={data?.data || []}
        />
      </Box>
      <AddRole open={open} setOpen={setOpen} />
    </Box>
  );
}

export default RolesAndPermissions;
