import { Box, Button, TextField } from "@mui/material";
import DialogWrapper from "components/DialogWrapper";
import { useState } from "react";

function AddSpecification({ open, setOpen, onAdd }) {
  const [tagName, setTagName] = useState("");
  return (
    <DialogWrapper title="Add Specification" open={open} setOpen={setOpen}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
          onAdd(tagName);
        }}
      >
        <TextField
          required
          onChange={(e) => setTagName(e.target.value)}
          label="Tag name"
          variant="outlined"
          fullWidth
          size="small"
        />
        <Box mt={2} textAlign="center">
          <Button variant="contained" color="secondary" type="submit">
            Add
          </Button>
        </Box>
      </form>
    </DialogWrapper>
  );
}

export default AddSpecification;
