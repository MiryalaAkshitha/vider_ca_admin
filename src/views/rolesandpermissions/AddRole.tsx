import { Close } from "@mui/icons-material";
import {
  AppBar,
  Drawer,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { createRole } from "api/services/roles";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

function AddRole({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();

  const { mutate, isLoading } = useMutation(createRole, {
    onSuccess: () => {
      snack.success("Role Created");
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
    mutate({
      name,
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
          <Typography variant="subtitle1">Create Role</Typography>
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
            required
            label="Name"
            name="name"
          />
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type="submit"
              loadingColor="white"
              title="Create Role"
              color="secondary"
            />
          </Box>
        </Box>
      </form>
    </Drawer>
  );
}

export default AddRole;
