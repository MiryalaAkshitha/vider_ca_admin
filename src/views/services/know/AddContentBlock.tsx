import { Button, Dialog, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContentBlock } from "redux/reducers/addServiceSlice";
import { DialogProps } from "types";

function AddContentFieldModal({ open, setOpen }: DialogProps) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");

  const handleSubmit = () => {
    dispatch(addContentBlock(title));
    setOpen(false);
  };

  return (
    <Dialog
      maxWidth='sm'
      fullWidth
      PaperProps={{ sx: { px: 2, pt: 3, pb: 1, minHeight: 100 } }}
      open={open}>
      <Typography color='primary' variant='subtitle2' mb={3}>
        Add Content Block
      </Typography>
      <TextField
        onChange={(e) => setTitle(e.target.value)}
        name='title'
        fullWidth
        size='small'
        label='Title'
      />
      <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
        <Button
          onClick={() => setOpen(false)}
          variant='outlined'
          color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color='secondary' variant='contained'>
          Submit
        </Button>
      </Box>
    </Dialog>
  );
}

export default AddContentFieldModal;
