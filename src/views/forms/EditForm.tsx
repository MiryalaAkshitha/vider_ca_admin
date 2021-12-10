import { Close } from "@mui/icons-material";
import {
  AppBar,
  Autocomplete,
  Drawer,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { updateForm } from "api/services/forms";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

interface EditFormProps extends DialogProps {
  data: any;
}

function EditForm({ open, setOpen, data }: EditFormProps) {
  const snack = useSnack();
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    name: "",
    tags: [""],
  });

  useEffect(() => {
    setState(data);
  }, [data]);

  const { mutate, isLoading } = useMutation(updateForm, {
    onSuccess: () => {
      snack.success("Form Updated");
      setOpen(false);
      queryClient.invalidateQueries("forms");
    },
    onError: (err: any) => {
      console.log(err);
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate({ data: state, id: data?.id });
  };

  return (
    <Drawer
      anchor="right"
      PaperProps={{ sx: { width: 450 } }}
      open={open}
      onClose={setOpen}
    >
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1">Edit Form</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit}>
        <Box p={2}>
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            value={state.name}
            fullWidth
            name="name"
            required
            size="small"
            label="Name"
            onChange={(e) => setState({ ...state, name: e.target.value })}
            type="text"
          />
          <Autocomplete
            multiple
            id="tags-standard"
            sx={{ mt: 3 }}
            options={["kyb", "passwords"]}
            value={state.tags}
            onChange={(_, v) => setState({ ...state, tags: v })}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                size="small"
                label="Tags"
              />
            )}
          />
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              type="submit"
              loadingColor="white"
              title="Update Form"
              color="secondary"
            />
          </Box>
        </Box>
      </form>
    </Drawer>
  );
}

export default EditForm;
