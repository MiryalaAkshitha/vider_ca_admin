import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import DrawerWrapper from "components/DrawerWrapper";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSubTask } from "redux/reducers/addServiceSlice";
import { DialogProps, InputChangeType, SubmitType } from "types";

interface Props extends DialogProps {
  data: any;
  index: number;
}

function EditSubtask({ open, setOpen, data, index }: Props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    setState(data);
  }, [data]);

  const handleChange = (e: InputChangeType) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    dispatch(
      updateSubTask({
        index,
        data: state,
      })
    );
    setOpen(false);
  };

  return (
    <DrawerWrapper open={open} title="Edit Subtask" setOpen={setOpen}>
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

export default EditSubtask;
