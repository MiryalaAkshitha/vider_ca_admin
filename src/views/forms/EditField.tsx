import { Close } from "@mui/icons-material";
import {
  AppBar,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { createClient } from "api/client";
import { createField } from "api/forms";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import { FIELD_TYPES } from "utils/constants";

interface EditFieldProps extends DialogProps {
  data: any;
}

function EditField({ open, setOpen, data }: EditFieldProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState({
    name: "",
    fieldType: null,
    minLength: null,
    maxLength: null,
    regexPattern: null,
    options: [],
  });

  const { mutate, isLoading } = useMutation(createField, {
    onSuccess: () => {
      snack.success("Field Created");
      setOpen(false);
      queryClient.invalidateQueries("fields");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

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
          <Typography variant='subtitle1'>Edit Field</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit}>
        <Box p={2}>
          <TextField
            onChange={handleChange}
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
            onChange={handleChange}
            name='fieldType'
            size='small'
            select
            label='Field Type'>
            {FIELD_TYPES.map((item, index) => (
              <MenuItem value={item.value} key={index}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                sx={{ mt: 3 }}
                variant='outlined'
                onChange={handleChange}
                fullWidth
                size='small'
                name='maxLength'
                label='Min Length'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ mt: 3 }}
                variant='outlined'
                fullWidth
                size='small'
                name='minLength'
                onChange={handleChange}
                label='Max Length'
              />
            </Grid>
          </Grid>
          <TextField
            sx={{ mt: 3 }}
            variant='outlined'
            fullWidth
            size='small'
            onChange={handleChange}
            name='regexPattern'
            label='Regex Pattern'
          />
          <Box display='flex' justifyContent='flex-end' mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type='submit'
              loadingColor='white'
              title='Update Field'
              color='secondary'
            />
          </Box>
        </Box>
      </form>
    </Drawer>
  );
}

export default EditField;
