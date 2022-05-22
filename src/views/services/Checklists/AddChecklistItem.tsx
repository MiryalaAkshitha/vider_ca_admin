import { Add, Delete } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addChecklistItem } from "redux/reducers/addServiceSlice";
import { SubmitType } from "types";

type State = Array<{ name: string; description: string }>;

function AddChecklistItem({ open, setOpen, index }: any) {
  const dispatch = useDispatch();

  const [state, setState] = useState<State>([
    {
      name: "",
      description: "",
    },
  ]);

  const handleItemChange = (e: any, index: number) => {
    const newItems: any = [...state];
    newItems[index][e.target.name] = e.target.value;
    setState(newItems);
  };

  const onChecklistItemAdd = () => {
    setState([...state, { name: "", description: "" }]);
  };

  const deleteChecklistItem = (index: number) => {
    const newItems = [...state];
    newItems.splice(index, 1);
    setState(newItems);
  };

  const handleSubmit = (e: SubmitType) => {
    console.log(state);
    e.preventDefault();
    dispatch(
      addChecklistItem({
        index,
        items: state,
      })
    );
    setOpen(false);
  };

  return (
    <DrawerWrapper open={open} title="Add Checklist Items" setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        {state.map((item, index) => (
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
            onClick={onChecklistItemAdd}
            color="secondary"
            startIcon={<Add />}
          >
            Add More
          </Button>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={false}
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
