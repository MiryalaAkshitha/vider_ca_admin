import { Add, Delete } from "@mui/icons-material";
import { Button, Grid, IconButton, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { addFieldToClientInfo } from "api/services/client-info";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps, InputChangeType } from "types";
import { FIELD_TYPES } from "utils/constants";

interface Props extends DialogProps {
  form: string;
}

const initialState = {
  name: "",
  fieldType: null,
  minLength: null,
  maxLength: null,
  regexPattern: null,
  options: [""],
};

function AddCustomField({ open, setOpen, form }: Props) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const params = useParams();
  const [state, setState] = useState({ ...initialState });

  const { mutate, isLoading } = useMutation(addFieldToClientInfo, {
    onSuccess: () => {
      snack.success("Field Created");
      setOpen(false);
      queryClient.invalidateQueries("client-info");
      setState({ ...initialState });
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
    mutate({
      ...state,
      form,
      client: params.clientId,
    });
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
    <DrawerWrapper open={open} setOpen={setOpen} title="Add Custom Field">
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          variant="outlined"
          fullWidth
          size="small"
          required
          name="name"
          label="Name"
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
            name="regexPattern"
            label="Regex Pattern"
          />
        )}
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Create Custom Field"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddCustomField;