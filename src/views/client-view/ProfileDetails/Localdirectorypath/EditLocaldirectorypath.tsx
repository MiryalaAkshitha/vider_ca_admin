import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { DialogProps, InputChangeType } from "types";
import TextFieldWithCopy from "../TextFieldWithCopy";
import DrawerWrapper from "components/DrawerWrapper";

interface EditLocaldirectorypathProps extends DialogProps {
  open: any;
  setOpen: any;
  index: any;
  data: any;
  setState: any;
}

function EditLocaldirectorypath({ open, setOpen, index, data, setState }: EditLocaldirectorypathProps) {
  const [path, setPath] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (data?.localDirectoryPath[index]) {
      setPath(data.localDirectoryPath[index].path);
      setTitle(data.localDirectoryPath[index].title);
    }
  }, [data, index]);

  const handleChange = (e: InputChangeType) => {
    setPath(e.target.value);
  };

  const handleChangeTitle = (e: InputChangeType) => {
    setTitle(e.target.value);
  };

  const onSubmit = () => {
    const updatedData = [...data.localDirectoryPath];
    updatedData[index] = { title, path };

    setState({
      ...data,
      localDirectoryPath: updatedData,
    });
    setOpen(false);
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Update Local Directory Path">
      <Grid mt={2}>
        <TextField
          label="Title"
          name="title"
          value={title || ""}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleChangeTitle}
        />
      </Grid>
      <Grid mt={2}>
        <TextFieldWithCopy
          label="Local Directory Path"
          name="localDirectoryPath"
          onChange={handleChange}
          value={path || ""}
        />
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
        <Button onClick={onSubmit} size="large" color="secondary" variant="contained">
          Update Local Directory Path
        </Button>
      </Box>
    </DrawerWrapper>
  );
}

export default EditLocaldirectorypath;
