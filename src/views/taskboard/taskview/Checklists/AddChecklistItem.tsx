import { Add, Delete } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { addChecklistItems } from "api/services/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, SubmitType } from "types";

interface StateProps {
  checklistItems: Array<{ name: string; description: string }>;
}

interface Props extends DialogProps {
  selectedChecklist: number | null;
}

function AddChecklistItem({ open, setOpen, selectedChecklist }: Props) {
  const initialState = {
    checklistItems: [
      {
        name: "",
        description: "",
      },
    ],
  };

  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<StateProps>(initialState);

  const { mutate, isLoading } = useMutation(addChecklistItems, {
    onSuccess: () => {
      snack.success("Checklist Items Added");
      setState(initialState);
      setOpen(false);
      queryClient.invalidateQueries("checklists");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleItemChange = (e: any, index: number) => {
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
    const newChecklistItems = [...state.checklistItems];
    newChecklistItems.splice(index, 1);
    setState({
      ...state,
      checklistItems: newChecklistItems,
    });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({
      checklistId: selectedChecklist,
      data: state,
    });
  };

  return (
    <DrawerWrapper open={open} title="Add Checklist Items" setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        {state.checklistItems.map((item, index) => (
          <Box display="flex" gap={2} mb={3} key={index}>
            <Box flex={1}>
              <TextField
                variant="outlined"
                sx={{ mb: 2 }}
                fullWidth
                onChange={(e) => handleItemChange(e, index)}
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
                onChange={(e) => handleItemChange(e, index)}
                fullWidth
                size="small"
                value={item.description}
                name="description"
                label="Checklist item description"
                required
              />
            </Box>
            <div>
              <IconButton onClick={() => deleteChecklistItem(index)}>
                <Delete />
              </IconButton>
            </div>
          </Box>
        ))}
        <Box textAlign="right" mt={2} mb={1}>
          <Button
            onClick={addChecklistItem}
            color="secondary"
            startIcon={<Add />}
          >
            Add More
          </Button>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            loadingColor="white"
            title="Add Checklist Item(s)"
            color="secondary"
            type="submit"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddChecklistItem;
