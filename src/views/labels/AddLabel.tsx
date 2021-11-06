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
import { createLabel } from "api/labels";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

function AddLabel({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();

  const { mutate, isLoading } = useMutation(createLabel, {
    onSuccess: () => {
      snack.success("Label Created");
      setOpen(false);
      queryClient.invalidateQueries("labels");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let name = e.target.elements.name.value;
    let color = e.target.elements.color.value;

    mutate({
      name,
      color,
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
          <Typography variant="subtitle1">Add Label</Typography>
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
          <TextField
            sx={{ mt: 4, minWidth: 100 }}
            InputProps={{ sx: { padding: "0px" } }}
            variant="outlined"
            size="small"
            label="Choose Color"
            name="color"
            type="color"
            required
          />
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type="submit"
              loadingColor="white"
              title="Create Label"
              color="secondary"
            />
          </Box>
        </Box>
      </form>
    </Drawer>
  );
}

export default AddLabel;