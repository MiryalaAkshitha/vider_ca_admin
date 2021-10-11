import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { DialogProps } from "types";

function AddContentFieldModal({ open, setOpen }: DialogProps) {
  const [type, setType] = useState("");

  return (
    <Dialog
      maxWidth='sm'
      fullWidth
      PaperProps={{ sx: { px: 2, pt: 3, pb: 1, minHeight: 100 } }}
      open={open}>
      <Typography color='primary' variant='subtitle2' mb={3}>
        Add Content Block
      </Typography>
      <TextField fullWidth size='small' label='Title' />
      <TextField
        fullWidth
        size='small'
        sx={{ mt: 3 }}
        onChange={(e) => setType(e.target.value)}
        label='Content Type'
        select>
        {["Text", "Accordion"].map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
      {type == "Accordion" && <AccordionFields />}
      <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
        <Button
          onClick={() => setOpen(false)}
          variant='outlined'
          color='secondary'>
          Cancel
        </Button>
        <Button color='secondary' variant='contained'>
          Submit
        </Button>
      </Box>
    </Dialog>
  );
}

const AccordionFields = () => {
  return (
    <>
      <TextField sx={{ mt: 3 }} fullWidth size='small' label='Accordion Name' />
      <FormControlLabel
        sx={{ mt: 2 }}
        control={<Checkbox defaultChecked />}
        label='Has nested accordions?'
      />
      <TextField
        sx={{ mt: 2 }}
        multiline
        rows={3}
        fullWidth
        size='small'
        label='Accordion Description'
      />
    </>
  );
};

export default AddContentFieldModal;
