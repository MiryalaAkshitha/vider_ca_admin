import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { updateMilestone } from "api/services/tasks/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, InputChangeType, SubmitType } from "types";

interface StateProps {
  name: string;
  description: string;
  referenceNumber: boolean;
}

interface Props extends DialogProps {
  data: any;
}

function EditMilestone({ open, setOpen, data }: Props) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<StateProps>({
    name: "",
    description: "",
    referenceNumber: false,
  });

  useEffect(() => {
    setState({
      name: data.name,
      description: data.description,
      referenceNumber: data.referenceNumber,
    });
  }, [data]);

  const handleChange = (e: InputChangeType) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { mutate } = useMutation(updateMilestone, {
    onSuccess: () => {
      snack.success("Milestone updated");
      queryClient.invalidateQueries("milestones");
      setOpen(false);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({
      id: data.id,
      data: state,
    });
  };

  return (
    <DrawerWrapper open={open} title="Edit Milestone" setOpen={setOpen}>
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

export default EditMilestone;
