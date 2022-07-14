import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { getLabels } from "api/services/labels";
import DialogWrapper from "components/DialogWrapper";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType, SubmitType } from "types";

function AddSpecification({ open, setOpen, onAdd }) {
  const [value, setValue] = useState<string | null>("");

  const { data }: ResType = useQuery("labels", getLabels, { enabled: open });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    onAdd(value);
    setValue(null);
    setOpen(false);
  };

  return (
    <DialogWrapper title="Add Specification" open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          freeSolo
          value={value}
          onChange={(_, v) => {
            setValue(v);
          }}
          options={data?.data?.map((option: any) => option.name) || []}
          renderInput={(params) => (
            <TextField
              onChange={(e) => setValue(e.target.value)}
              {...params}
              size="small"
              fullWidth
              label="Type Specification"
            />
          )}
        />
        <Box mt={2} textAlign="center">
          <Button
            disabled={!value}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Add
          </Button>
        </Box>
      </form>
    </DialogWrapper>
  );
}

export default AddSpecification;
