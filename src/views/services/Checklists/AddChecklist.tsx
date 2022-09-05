import { Add, Delete } from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addChecklist } from "redux/reducers/addServiceSlice";
import { DialogProps, InputChangeType, SubmitType } from "types";

interface StateProps {
  name: string;
  checklistItems: Array<{ name: string; description: string }>;
}

function AddChecklist({ open, setOpen }: DialogProps) {
  const dispatch = useDispatch();

  const [state, setState] = useState<StateProps>({
    name: "",
    checklistItems: [],
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
    dispatch(addChecklist(state));
    setOpen(false);
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
          <Button onClick={addChecklistItem} color="secondary" startIcon={<Add />}>
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
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={false}
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
