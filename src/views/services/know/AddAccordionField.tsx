import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAccordionContent } from "redux/reducers/addServiceSlice";
import { DialogProps } from "types";

interface AddAccordionFieldProps extends DialogProps {
  index: number;
}

function AddAccordionField({ open, setOpen, index }: AddAccordionFieldProps) {
  const dispatch = useDispatch();
  const [nested, setNested] = useState<boolean>(false);
  const [data, setData] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleNested = (e: any) => {
    setNested(e.target.checked);
    if (!e.target.checked) return;
    setData({
      ...data,
      description: "",
    });
  };

  const handleSubmit = () => {
    dispatch(addAccordionContent({ index, data }));
    setOpen(false);
    setData({
      title: "",
      description: "",
    });
  };

  return (
    <Dialog
      maxWidth='sm'
      fullWidth
      PaperProps={{ sx: { px: 2, pt: 3, pb: 1, minHeight: 100 } }}
      open={open}>
      <Typography color='primary' variant='subtitle2' mb={3}>
        Add Accordion Field
      </Typography>
      <TextField
        onChange={handleChange}
        value={data.title}
        fullWidth
        size='small'
        name='title'
        label='Accordion Name'
      />
      <FormControlLabel
        sx={{ mt: 2 }}
        control={<Checkbox onChange={handleNested} />}
        label='Has nested accordions?'
      />
      {!nested && (
        <TextField
          sx={{ mt: 2 }}
          value={data.description}
          onChange={handleChange}
          name='description'
          multiline
          rows={3}
          fullWidth
          size='small'
          label='Accordion Description'
        />
      )}
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

export default AddAccordionField;
