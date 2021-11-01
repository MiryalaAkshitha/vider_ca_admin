import { Close } from "@mui/icons-material";
import {
  AppBar,
  Checkbox,
  Drawer,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { updateContactPerson } from "api/client";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRouteMatch } from "react-router";
import { DialogProps } from "types";

interface StateProps {
  name: string;
  role: string;
  email: string;
  mobile: string;
  dscAvailable: boolean;
  dscExpiryDate: string | null;
}

const initialState: StateProps = {
  name: "",
  role: "",
  email: "",
  mobile: "",
  dscAvailable: false,
  dscExpiryDate: "",
};

interface EditContactPersonProps extends DialogProps {
  data: any;
}

function EditContactPerson({ open, setOpen, data }: EditContactPersonProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState(initialState);
  const match: any = useRouteMatch();
  let formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setState(data);
  }, [data]);

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation(updateContactPerson, {
    onSuccess: () => {
      snack.success("Contact Person Updated");
      setOpen(false);
      formRef.current?.reset();
      setState(initialState);
      queryClient.invalidateQueries("client");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDscAvailable = (e: any) => {
    setState({
      ...state,
      dscAvailable: e.target.checked,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate({
      id: data?.id,
      data: { ...state, clientId: match.params.clientId },
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
          <Typography variant="subtitle1">Update Contact Person</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Box p={2}>
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            name="name"
            required
            value={state.name}
            onChange={handleChange}
            size="small"
            label="Name"
          />
          <TextField
            sx={{ mt: 2 }}
            variant="outlined"
            fullWidth
            value={state.role}
            onChange={handleChange}
            size="small"
            select
            required
            name="role"
            label="Role"
          >
            <MenuItem value="accountant">Accountant</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </TextField>
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            required
            value={state.email}
            type="email"
            onChange={handleChange}
            name="email"
            size="small"
            label="Email"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            value={state.mobile}
            required
            onChange={handleChange}
            name="mobile"
            size="small"
            label="Mobile"
          />
          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Checkbox
                checked={state.dscAvailable}
                onChange={handleDscAvailable}
              />
            }
            label="DSC Available"
          />
          {state.dscAvailable && (
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
              type="date"
              value={state.dscExpiryDate}
              name="dscExpiryDate"
              size="small"
              InputLabelProps={{ shrink: true }}
              label="DSC Expiry Date"
            />
          )}
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type="submit"
              loadingColor="white"
              title="Update Contact Person"
              color="secondary"
            />
          </Box>
        </Box>
      </form>
    </Drawer>
  );
}

export default EditContactPerson;
