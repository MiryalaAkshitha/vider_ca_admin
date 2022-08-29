import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import DrawerWrapper from "components/DrawerWrapper";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSubTask } from "redux/reducers/addServiceSlice";
import { DialogProps, InputChangeType, SubmitType } from "types";

const initialState = { name: "", description: "" };
function AddSubtask({ open, setOpen }: DialogProps) {
  const dispatch = useDispatch();
  const [state, setState] = useState({ ...initialState });

  const handleChange = (e: InputChangeType) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    dispatch(addSubTask(state));
    setState({ ...initialState });
    setOpen(false);
  };

  return (
    <DrawerWrapper
      open={open}
      title="Add Subtask"
      setOpen={() => {
        setState({ ...initialState });
        setOpen(false);
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          onChange={handleChange}
          size="small"
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
        <Box textAlign="right" mt={3}>
          <Button fullWidth variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddSubtask;
