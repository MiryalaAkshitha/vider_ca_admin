import { Add, Close, Delete } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { updateField } from "api/forms";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useEffect, useState } from "react";
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
    options: [""],
  });

  useEffect(() => {
    setState(data);
  }, [data]);

  const { mutate, isLoading } = useMutation(updateField, {
    onSuccess: () => {
      snack.success("Field Updated");
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

  const handleAddOption = () => {
    setState({
      ...state,
      options: [...state.options, ""],
    });
  };

  const handleOptionChange = (e, i) => {
    let options = [...state.options];
    options[i] = e.target.value;
    setState({
      ...state,
      options,
    });
  };

  const handleOptionDelete = (i) => {
    let options = state.options.filter((_, index) => index !== i);
    setState({
      ...state,
      options,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate({ id: data.id, data: state });
  };

  const showOptions = () => {
    let { fieldType } = state;
    return (
      fieldType === "multiselect" ||
      fieldType === "radio" ||
      fieldType === "dropdown"
    );
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
            value={state.name}
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
            value={state.fieldType}
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
          <Box>
            {showOptions() && (
              <>
                {state.options.map((item, index) => (
                  <Box display='flex' mt={2} gap={1} alignItems='center'>
                    <TextField
                      key={index}
                      variant='outlined'
                      onChange={(e) => handleOptionChange(e, index)}
                      fullWidth
                      value={item}
                      size='small'
                      placeholder={`Option ${index + 1}`}
                      required
                      name='name'
                    />
                    <div>
                      <IconButton onClick={() => handleOptionDelete(index)}>
                        <Delete />
                      </IconButton>
                    </div>
                  </Box>
                ))}
                <Box mt={1}>
                  <Button
                    onClick={handleAddOption}
                    sx={{ minWidth: 50 }}
                    color='secondary'
                    variant='outlined'
                    size='small'
                    startIcon={<Add />}>
                    Add
                  </Button>
                </Box>
              </>
            )}
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                sx={{ mt: 3 }}
                value={state.maxLength}
                variant='outlined'
                type='number'
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
                value={state.minLength}
                type='number'
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
            value={state.regexPattern}
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
