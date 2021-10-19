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
import { FIELD_TYPES } from "utils/constants";

function AddField({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState({});

  const { mutate, isLoading } = useMutation(createClient, {
    onSuccess: () => {
      snack.success("Client Created");
      setOpen(false);
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
          <Typography variant='subtitle1'>Add Field</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit}>
        <Box p={2}>
          <TextField
            sx={{ mt: 2 }}
            variant='outlined'
            fullWidth
            size='small'
            required
            name='name'
            label='Name'
          />
          <TextField
            sx={{ mt: 3 }}
            variant='outlined'
            fullWidth
            required
            name='companyType'
            size='small'
            select
            label='Field Type'>
            {FIELD_TYPES.map((item, index) => (
              <MenuItem value={item.value} key={index}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ mt: 3 }}
            variant='outlined'
            fullWidth
            size='small'
            required
            name='regex'
            label='Regex Pattern'
          />
          <Box display='flex' justifyContent='flex-end' mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type='submit'
              loadingColor='white'
              title='Create Field'
              color='secondary'
            />
          </Box>
        </Box>
      </form>
    </Drawer>
  );
}

export default AddField;
