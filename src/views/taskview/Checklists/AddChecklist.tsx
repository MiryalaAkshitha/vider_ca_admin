import { Add, Delete } from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { addChecklist } from "api/services/tasks/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps, InputChangeType, SubmitType } from "types";

type CheckListItem = {
  name: string;
  description: string;
};

interface StateProps {
  name: string;
  checklistItems: Array<CheckListItem>;
}

function AddChecklist({ open, setOpen }: DialogProps) {
  const params = useParams();
  const queryClient = useQueryClient();

  const [state, setState] = useState<StateProps>({
    checklistItems: [],
    name: "",
  });

  const { mutate, isLoading } = useMutation(addChecklist, {
    onSuccess: () => {
      snack.success("Checklist Added");
      setOpen(false);
      queryClient.invalidateQueries("checklists");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleItemChange = (e: InputChangeType, index: number) => {
    const newItems: any = [...state.checklistItems];
    newItems[index][e.target.name] = e.target.value;
    setState({ ...state, checklistItems: newItems });
  };

  const addChecklistItem = () => {
    setState({
      ...state,
      checklistItems: [...state.checklistItems, { name: "", description: "" }],
    });
  };

  const deleteChecklistItem = (index: number) => {
    let newChecklistItems = [...state.checklistItems];
    newChecklistItems.splice(index, 1);
    setState({
      ...state,
      checklistItems: newChecklistItems,
    });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({
      taskId: params.taskId,
      data: state,
    });
  };

  return (
    <DrawerWrapper open={open} title="Add Checklist" setOpen={setOpen}>
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
          label="Checklist name"
          required
        />
        <Box textAlign="right" mt={2} mb={1}>
          <Button
            onClick={addChecklistItem}
            color="secondary"
            startIcon={<Add />}
          >
            Add checklist item
          </Button>
        </Box>
        {state.checklistItems.map((item, index) => (
          <Box display="flex" gap={2} mb={3}>
            <div>
              <Typography variant="subtitle2">{index + 1}.</Typography>
            </div>
            <Box flex={1}>
              <TextField
                variant="outlined"
                key={index}
                sx={{ mb: 2 }}
                fullWidth
                onChange={(e: InputChangeType) => handleItemChange(e, index)}
                size="small"
                name="name"
                value={item.name}
                label="Checklist item name"
                required
              />
              <TextField
                variant="outlined"
                multiline
                rows={3}
                key={index}
                onChange={(e: InputChangeType) => handleItemChange(e, index)}
                fullWidth
                size="small"
                value={item.description}
                name="description"
                label="Checklist item description"
              />
            </Box>
            <div>
              <IconButton onClick={() => deleteChecklistItem(index)}>
                <Delete />
              </IconButton>
            </div>
          </Box>
        ))}
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            loadingColor="white"
            title="Add Checklist"
            color="secondary"
            type="submit"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddChecklist;
