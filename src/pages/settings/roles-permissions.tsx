import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteRole, getRoles } from "api/roles";
import { useConfirm } from "components/ConfirmDialogProvider";
import Loader from "components/Loader";
import Table from "components/Table";
import useSnack from "hooks/useSnack";
import moment from "moment";
import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { useHistory, useRouteMatch } from "react-router";
import { DataResponse } from "types";
import AddRole from "views/rolesandpermissions/AddRole";
import EditRole from "views/rolesandpermissions/EditRole";

function RolesAndPermissions() {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const router = useHistory();
  const { url }: any = useRouteMatch();

  const snack = useSnack();
  const { data, isLoading }: UseQueryResult<DataResponse, Error> = useQuery(
    "roles",
    getRoles
  );
  const [selectedData, setSelectedData] = useState<any>({});

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

  if (isLoading) return <Loader />;

  return (
    <>
      <Box textAlign="right" mt={2}>
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          startIcon={<Add />}
          color="secondary"
        >
          Create Role
        </Button>
      </Box>
      <Box maxWidth={800}>
        <Table
          columns={[
            {
              title: "Role Name",
              key: "name",
              render: (item) => (
                <Typography variant="body1" color="primary">
                  {item?.name}
                </Typography>
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
                return item?.name !== "Admin" ? (
                  <Box display="flex" gap={1}>
                    <IconButton
                      onClick={() => router.push(`${url}/${item?.name}`)}
                      size="small"
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedData(item);
                        setEditOpen(true);
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
      <EditRole open={editOpen} setOpen={setEditOpen} data={selectedData} />
    </>
  );
}

export default RolesAndPermissions;
