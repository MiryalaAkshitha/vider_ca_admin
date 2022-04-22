import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { updateRole } from "api/services/roles";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

interface EditRoleProps extends DialogProps {
  data: {
    name: string;
    active: boolean;
    id: number;
  };
}

function EditRole({ open, setOpen, data }: EditRoleProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();

  const { mutate, isLoading } = useMutation(updateRole, {
    onSuccess: () => {
      snack.success("Role Updated");
      setOpen(false);
      queryClient.invalidateQueries("roles");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const status = e.target.elements.status.value;
    const active = status === "active" ? true : false;
    mutate({
      id: data.id,
      data: { name, active },
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Edit Role">
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          defaultValue={data?.name}
          required
          label="Name"
          name="name"
        />
        <TextField
          sx={{ mt: 2 }}
          variant="outlined"
          fullWidth
          size="small"
          defaultValue={data?.active ? "active" : "inactive"}
          required
          label="status"
          name="status"
          select
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Update Role"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default EditRole;
