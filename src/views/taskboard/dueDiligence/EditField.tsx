import { Add, Delete } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { updateDDFormField } from "api/services/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, InputChangeType } from "types";
import { FIELD_TYPES } from "utils/constants";

interface Props extends DialogProps {
  data: any;
}

function EditField({ open, setOpen, data }: Props) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState({
    name: "",
    fieldType: null,
    minLength: null,
    maxLength: null,
    regexPattern: null,
    options: [""],
    required: false,
  });

  useEffect(() => {
    setState(data);
  }, [data]);

  const { mutate, isLoading } = useMutation(updateDDFormField, {
    onSuccess: () => {
      snack.success("Field Updated");
      setOpen(false);
      queryClient.invalidateQueries("dd-forms");
      setState({
        name: "",
        fieldType: null,
        minLength: null,
        maxLength: null,
        regexPattern: null,
        options: [""],
        required: false,
      });
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e: InputChangeType) => {
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

  const handleOptionChange = (e: any, i: number) => {
    const options = [...state.options];
    options[i] = e.target.value;
    setState({
      ...state,
      options,
    });
  };

  const handleOptionDelete = (i: number) => {
    const options = state.options.filter((_, index) => index !== i);
    setState({
      ...state,
      options,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate({ data: { ...state } });
  };

  const showOptions = () => {
    const { fieldType } = state;
    return (
      fieldType === "multiselect" ||
      fieldType === "radio" ||
      fieldType === "dropdown"
    );
  };

  const showMinAndMaxLength = () => {
    const { fieldType } = state;
    return (
      fieldType === "text" ||
      fieldType === "password" ||
      fieldType === "number" ||
      fieldType === "url"
    );
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Edit Field">
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          variant="outlined"
          fullWidth
          size="small"
          required
          name="name"
          label="Name"
          value={state.name}
        />
        <TextField
          sx={{ mt: 3 }}
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
          name="fieldType"
          size="small"
          value={state.fieldType || ""}
          select
          label="Field Type"
        >
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
                <Box display="flex" mt={2} gap={1} alignItems="center">
                  <TextField
                    key={index}
                    variant="outlined"
                    onChange={(e) => handleOptionChange(e, index)}
                    fullWidth
                    value={item}
                    size="small"
                    placeholder={`Option ${index + 1}`}
                    required
                    name="name"
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
                  color="secondary"
                  variant="outlined"
                  size="small"
                  startIcon={<Add />}
                >
                  Add
                </Button>
              </Box>
            </>
          )}
        </Box>
        {showMinAndMaxLength() && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                sx={{ mt: 3 }}
                variant="outlined"
                onChange={handleChange}
                fullWidth
                size="small"
                value={state.maxLength}
                type="number"
                name="maxLength"
                label="Min Length"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ mt: 3 }}
                variant="outlined"
                fullWidth
                size="small"
                value={state.minLength}
                name="minLength"
                type="number"
                onChange={handleChange}
                label="Max Length"
              />
            </Grid>
          </Grid>
        )}
        {showMinAndMaxLength() && (
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleChange}
            value={state.regexPattern}
            name="regexPattern"
            label="Regex Pattern"
          />
        )}
        <FormControlLabel
          sx={{ mt: 2 }}
          control={
            <Checkbox
              checked={state.required}
              onChange={(e) => {
                setState({ ...state, required: e.target.checked });
              }}
            />
          }
          label="Is required"
        />
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Update Field"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default EditField;
