import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import DrawerWrapper from "components/DrawerWrapper";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMilestone } from "redux/reducers/addServiceSlice";
import { DialogProps, InputChangeType, SubmitType } from "types";

interface StateProps {
  name: string;
  description: string;
  referenceNumber: boolean;
}

function AddMilestone({ open, setOpen }: DialogProps) {
  const dispatch = useDispatch();

  const [state, setState] = useState<StateProps>({
    name: "",
    description: "",
    referenceNumber: false,
  });

  const handleChange = (e: InputChangeType) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    dispatch(addMilestone(state));
    setOpen(false);
  };

  return (
    <DrawerWrapper open={open} title="Add Milestone" setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          onChange={handleChange}
          size="small"
          value={state.name}
          name="name"
          label="Milestone name"
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
        <Box textAlign="right" mt={3}>
          <Button fullWidth variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddMilestone;
