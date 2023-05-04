import { Button, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { updateContactPerson } from "api/services/clients/clients";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { DialogProps, InputChangeType } from "types";
import TextFieldWithCopy from "../TextFieldWithCopy";

interface EditEditLocaldirectorypathProps extends DialogProps {
  open: any;
  setOpen: any;
  index: any;
  data: any;
  setState: any;
}

function EditLocaldirectorypath({ open, setOpen, index, data, setState }: EditEditLocaldirectorypathProps) {
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(data?.localDirectoryPath[index]);    
  }, [data]);

  const handleChange = (e: InputChangeType) => {
    e.preventDefault();
    setPath(e.target.value);    
  };

  const onSubmit = () => {
    const temp = JSON.parse(JSON.stringify(data));
    temp.localDirectoryPath[index] = path;

    setState({
      ...temp
    });
    setOpen(false);    
  };


  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Update Local Directory Path">

      <TextFieldWithCopy
        label="Local Directory Path"
        name="localDirectoryPath"
        onChange={handleChange}
        value={path || ""}
      />

      <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
        <Button onClick={onSubmit} size="large" color="secondary" variant="contained">
          Update Local Directory Path
        </Button>
      </Box>

    </DrawerWrapper>
  );
}

export default EditLocaldirectorypath;
