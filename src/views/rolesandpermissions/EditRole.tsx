import { Close } from "@mui/icons-material";
import {
  AppBar,
  Drawer,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { updateRole } from "api/services/roles";
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
    let name = e.target.elements.name.value;
    let status = e.target.elements.status.value;
    let active = status === "active" ? true : false;
    mutate({
      id: data.id,
      data: { name, active },
    });
  };

  return (
    <Drawer
      anchor="right"
      PaperProps={{ sx: { width: 550 } }}
      open={open}
      onClose={setOpen}
    >
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1">Edit Role</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit}>
        <Box p={2}>
          <TextField
            sx={{ mt: 2 }}
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
        </Box>
      </form>
    </Drawer>
  );
}

export default EditRole;
