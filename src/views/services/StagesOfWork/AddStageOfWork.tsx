import { Add, Delete } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import DrawerWrapper from "components/DrawerWrapper";
import _ from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStageOfWork } from "redux/reducers/addServiceSlice";
import { DialogProps, InputChangeType, SubmitType } from "types";

let initialState = {
  name: "",
  type: "Stage of work",
  description: "",
  referenceNumber: false,
  extraAttributes: [
    {
      type: "Reference Number",
      title: "Reference Number",
      value: "",
    },
  ],
};

function AddStageOfWork({ open, setOpen }: DialogProps) {
  const dispatch = useDispatch();
  const [state, setState] = useState(_.cloneDeep(initialState));

  const handleChange = (e: InputChangeType) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setState({
      ...state,
      extraAttributes: [
        ...state.extraAttributes,
        {
          type: "Reference Number",
          title: "",
          value: "",
        },
      ],
    });
  };

  const handleRemove = (index: number) => {
    let newExtraAttributes = [...state.extraAttributes];
    newExtraAttributes.splice(index, 1);
    setState({ ...state, extraAttributes: newExtraAttributes });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    dispatch(addStageOfWork(state));
    setState(_.cloneDeep(initialState));
    setOpen(false);
  };

  return (
    <DrawerWrapper open={open} title="Add stage of work" setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
          <RadioGroup
            onChange={(e: InputChangeType) => {
              setState({ ...state, type: e.target.value });
            }}
            row
            name="type"
            value={state.type}
          >
            <FormControlLabel
              value="Stage of work"
              control={<Radio />}
              label="Stage of work"
            />
            <FormControlLabel
              value="Deliverables"
              control={<Radio />}
              label="Deliverables"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          variant="outlined"
          fullWidth
          onChange={handleChange}
          size="small"
          sx={{ mt: 2 }}
          value={state.name}
          name="name"
          label="Name"
          required
        />
        <TextField
          variant="outlined"
          fullWidth
          onChange={handleChange}
          size="small"
          sx={{ mt: 2 }}
          rows={4}
          multiline
          value={state.description}
          name="description"
          label="Description"
          required
        />
        {state.type === "Stage of work" && (
          <FormControlLabel
            sx={{ mt: 1 }}
            label="Does this have a reference number"
            control={
              <Checkbox
                checked={state.referenceNumber}
                onChange={(e) => {
                  setState({ ...state, referenceNumber: e.target.checked });
                }}
                name="referenceNumber"
                color="primary"
              />
            }
          />
        )}
        {state.type === "Deliverables" && (
          <Box mt={2}>
            <Typography variant="body2" gutterBottom>
              Add attachments or reference numbers
            </Typography>
            <Box mt={1}>
              {state.extraAttributes.map((item, index) => (
                <Box display="flex" gap={1} mb={1} key={index}>
                  <TextField
                    sx={{ width: "20%" }}
                    select
                    onChange={(e: InputChangeType) => {
                      const newState = [...state.extraAttributes];
                      newState[index].type = e.target.value;
                      setState({ ...state, extraAttributes: newState });
                    }}
                    variant="outlined"
                    size="small"
                    value={item.type}
                  >
                    <MenuItem value="Reference Number">
                      Reference Number
                    </MenuItem>
                    <MenuItem value="Attachment">Attachment</MenuItem>
                  </TextField>
                  <TextField
                    onChange={(e: InputChangeType) => {
                      const newState = [...state.extraAttributes];
                      newState[index].title = e.target.value;
                      setState({ ...state, extraAttributes: newState });
                    }}
                    sx={{ flex: 1 }}
                    placeholder={
                      item.type === "Reference Number"
                        ? "Title of the reference number"
                        : "Title of the attachment"
                    }
                    variant="outlined"
                    size="small"
                    value={item.title}
                  />
                  <IconButton onClick={() => handleRemove(index)}>
                    <Delete />
                  </IconButton>
                </Box>
              ))}
              <Box mt={1} textAlign="right">
                <Button
                  onClick={handleAdd}
                  startIcon={<Add />}
                  color="secondary"
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        <Box textAlign="right" mt={3}>
          <Button fullWidth variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddStageOfWork;
