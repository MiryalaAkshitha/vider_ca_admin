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
import { addStageOfWork } from "api/services/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import { snack } from "components/toast";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps, InputChangeType, SubmitType } from "types";

let initialState = {
  name: "",
  type: "STAGE_OF_WORK",
  description: "",
  referenceNumber: false,
  extraAttributes: [
    {
      type: "REFERENCE_NUMBER",
      title: "Reference Number",
    },
  ],
};

function AddStageOfWork({ open, setOpen }: DialogProps) {
  const params = useParams();
  const queryClient = useQueryClient();
  const [state, setState] = useState(_.cloneDeep(initialState));

  const handleChange = (e: InputChangeType) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { mutate } = useMutation(addStageOfWork, {
    onSuccess: () => {
      snack.success("Stage of work added");
      queryClient.invalidateQueries("stage-of-work");
      setState(_.cloneDeep(initialState));
      setOpen(false);
    },
  });

  const handleAdd = () => {
    setState({
      ...state,
      extraAttributes: [
        ...state.extraAttributes,
        {
          type: "REFERENCE_NUMBER",
          title: "",
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
    setOpen(false);
    mutate({
      taskId: params.taskId,
      data: state,
    });
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
              value="STAGE_OF_WORK"
              control={<Radio />}
              label="Stage of work"
            />
            <FormControlLabel
              value="DELIVERABLES"
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
        />
        {state.type === "STAGE_OF_WORK" && (
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
        {state.type === "DELIVERABLES" && (
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
                    <MenuItem value="REFERENCE_NUMBER">
                      Reference Number
                    </MenuItem>
                    <MenuItem value="ATTACHMENT">Attachment</MenuItem>
                  </TextField>
                  <TextField
                    onChange={(e: InputChangeType) => {
                      const newState = [...state.extraAttributes];
                      newState[index].title = e.target.value;
                      setState({ ...state, extraAttributes: newState });
                    }}
                    sx={{ flex: 1 }}
                    placeholder={
                      item.type === "REFERENCE_NUMBER"
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
