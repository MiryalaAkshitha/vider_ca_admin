import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { addMilestone } from "api/services/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps, SubmitType } from "types";
import SelectChecklistItems from "./SelectChecklistItems";

export interface IAddMilestoneState {
  name: string;
  checklistItems: number[];
}

function AddMilestone({ open, setOpen }: DialogProps) {
  const initialState = {
    checklistItems: [],
    name: "",
  };
  const params = useParams();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<IAddMilestoneState>(initialState);

  const { mutate, isLoading } = useMutation(addMilestone, {
    onSuccess: () => {
      snack.success("Milestone Added");
      setState(initialState);
      setOpen(false);
      queryClient.invalidateQueries("milestones");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    if (!state.checklistItems.length) {
      snack.error("Please select at least one checklist item");
      return;
    }

    mutate({
      taskId: params.taskId,
      data: state,
    });
  };

  return (
    <DrawerWrapper open={open} title="Add Milestone" setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          onChange={(e) => {
            setState({ ...state, name: e.target.value });
          }}
          size="small"
          value={state.name}
          name="name"
          label="Milestone name"
          required
        />
        <SelectChecklistItems state={state} setState={setState} />
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            loadingColor="white"
            title="Create Milestone"
            color="secondary"
            type="submit"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddMilestone;
