import { TextField } from "@mui/material";
import { updateFormValidation } from "api/services/forms";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, SubmitType } from "types";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

// import FormHelperText from "@mui/material/FormHelperText";

interface Props extends DialogProps {
  data: any;
}

function EditGroup({ open, setOpen, data }: Props) {
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    name: "",
    format: "",
    message: "",
  });

  useEffect(() => {
    setState({
      name: data.name || "",
      format: data.format || "",
      message: data.message || "",
    });
  }, [data]);

  const { mutate } = useMutation(updateFormValidation, {
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries("form-validations");
      snack.success("Form validation updated");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({
      id: data?._id,
      data: state,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Group">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Group name"
          name="name"
          size="small"
          fullWidth
          required
          value={state.name}
          onChange={handleChange}
        />
        <TextField
          label="Group Admin"
          name="format"
          required
          size="small"
          sx={{ mt: 2 }}
          fullWidth
          value={state.format}
          onChange={handleChange}
        />
        <TextField
          label="Group Discription"
          name="message"
          size="small"
          fullWidth
          sx={{ mt: 2 }}
          multiline
          rows={3}
          value={state.message}
          required
          onChange={handleChange}
        />
        <MultipleSelectChip />
        <SelectLabels />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <LoadingButton
            loading={false}
            sx={{ mt: 3 }}
            type="submit"
            loadingColor="white"
            title="Create Group"
            color="secondary"
          />
        </div>
      </form>
    </DrawerWrapper>
  );
}

export default EditGroup;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["vivek", "raj", "vinay", "akshitha", "nikhil", "saiveer"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultipleSelectChip() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ mt: 2, width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">Add Members</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

function SelectLabels() {
  const [name, setName] = React.useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ mt: 1, width: "100%" }}>
        <Select
          value={name}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>vivek</MenuItem>
          <MenuItem value={20}>Raj</MenuItem>
          <MenuItem value={30}>Akshitha</MenuItem>
        </Select>
        {/* <FormHelperText>Without label</FormHelperText> */}
      </FormControl>
    </div>
  );
}
