import { Close } from "@mui/icons-material";
import {
  AppBar,
  Drawer,
  IconButton,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { createClient } from "api/client";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

interface StateProps {
  clientType: string;
  companyType: string | null;
  displayName: string;
  clientManager: string;
  mobileNumber: string;
  email: string;
}

function AddClient({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<StateProps>({
    clientType: "",
    companyType: null,
    displayName: "",
    clientManager: "",
    mobileNumber: "",
    email: "",
  });
  let formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation(createClient, {
    onSuccess: () => {
      snack.success("Client Created");
      setOpen(false);
      formRef.current?.reset();
      queryClient.invalidateQueries("clients");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(state);
  };

  return (
    <Drawer
      anchor='right'
      PaperProps={{ sx: { width: 550 } }}
      open={open}
      onClose={setOpen}>
      <AppBar position='static'>
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant='subtitle1'>Add Client</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Box p={2}>
          <TextField
            sx={{ mt: 2 }}
            variant='outlined'
            fullWidth
            onChange={handleChange}
            size='small'
            select
            required
            name='clientType'
            label='Client Type'>
            <MenuItem value='company'>Company</MenuItem>
            <MenuItem value='individual'>Individual</MenuItem>
          </TextField>
          {state.clientType === "company" && (
            <TextField
              sx={{ mt: 3 }}
              variant='outlined'
              fullWidth
              required
              name='companyType'
              onChange={handleChange}
              size='small'
              select
              label='Company Type'>
              <MenuItem value='Private Limited Company'>
                Private Limited Company
              </MenuItem>
              <MenuItem value='Public Limited Company'>
                Public Limited Company
              </MenuItem>
            </TextField>
          )}
          <TextField
            sx={{ mt: 3 }}
            variant='outlined'
            fullWidth
            name='displayName'
            required
            onChange={handleChange}
            size='small'
            label='Display Name'
          />
          <TextField
            sx={{ mt: 3 }}
            variant='outlined'
            fullWidth
            required
            onChange={handleChange}
            name='clientManager'
            size='small'
            label='Client Manager'
          />
          <TextField
            sx={{ mt: 3 }}
            variant='outlined'
            fullWidth
            required
            onChange={handleChange}
            name='mobileNumber'
            size='small'
            label='Mobile Number'
          />
          <TextField
            sx={{ mt: 3 }}
            variant='outlined'
            fullWidth
            name='email'
            required
            type='email'
            onChange={handleChange}
            size='small'
            label='Email ID'
          />
          <Box display='flex' justifyContent='flex-end' mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type='submit'
              loadingColor='white'
              title='Create Client'
              color='secondary'
            />
          </Box>
        </Box>
      </form>
    </Drawer>
  );
}

export default AddClient;
