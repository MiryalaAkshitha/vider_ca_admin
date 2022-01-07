import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { updateMilestone } from "api/services/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, SubmitType } from "types";
import SelectChecklistItems from "./SelectChecklistItems";

export interface IAddMilestoneState {
  name: string;
  checklistItems: number[];
}

interface Props extends DialogProps {
  data: any;
}

function EditMilestone({ open, setOpen, data }: Props) {
  const initialState = {
    checklistItems: [],
    name: "",
  };
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<IAddMilestoneState>(initialState);

  useEffect(() => {
    setState({
      name: data?.name,
      checklistItems: data?.checklistItems.map((item: any) => item.id),
    });
  }, [data]);

  const { mutate, isLoading } = useMutation(updateMilestone, {
    onSuccess: () => {
      snack.success("Milestone Updated");
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
      id: data?.id,
      data: state,
    });
  };

  return (
    <DrawerWrapper open={open} title="Edit Milestone" setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          onChange={(e) => {
            setState({ ...state, name: e.target.value });
          }}
          size="small"
          value={state?.name}
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
            title="Update Milestone"
            color="secondary"
            type="submit"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default EditMilestone;
