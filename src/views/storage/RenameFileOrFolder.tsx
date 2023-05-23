import { Button, Dialog, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { renameFile } from "api/services/storage";
import DrawerWrapper from "components/DrawerWrapper";
import { snack } from "components/toast";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, InputChangeType } from "types";
import LoadingButton from "components/LoadingButton";
import TextFieldWithCopy from "views/client-view/ProfileDetails/TextFieldWithCopy";

interface Props extends DialogProps {
  itemName: string;
  itemFile: string;
  itemId: string;
  setLinks: any
}

const RenameFileOrFolderDialog = (props: Props) => {
  const { open, itemId, itemName, itemFile, setOpen, setLinks } = props;
  const [name, setName] = useState("");
  const [file, setFile] = useState("");

  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setName(itemName);
    setFile(itemFile);
  }, [itemName]);

  const { mutate, isLoading } = useMutation(renameFile, {
    onSuccess: () => {
      snack.success("Item renamed successfully");
      setOpen(false);
      queryClient.invalidateQueries("storage");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e: InputChangeType) => {
    setFile(e.target.value);
  };

  const handleChangeTitle = (e: InputChangeType) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (!name) {
      formRef.current?.focus();
      return;
    }
    setLinks({
      name: name,
      file: file
    });
    mutate({
      name,
      file,
      id: itemId,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Update Local Directory Path">

      {/* <form onSubmit={handleSubmit} ref={formRef}> */}
      <Grid mt={2}>
        <TextField
          label="Title"
          name="title"
          value={name || ""}
          fullWidth
          variant="outlined"
          size="small"
          onChange={handleChangeTitle}
          required
        />
      </Grid>
      <Grid mt={2}>
        <TextFieldWithCopy
          label="Local Directory Path"
          name="localDirectoryPath"
          onChange={handleChange}
          value={file || ""}
          required
        />
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
        <Box mt={4} display="flex" gap={2} justifyContent="flex-end">
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            Submit
          </Button>
        </Box>
      </Box>
      {/* </form> */}




    </DrawerWrapper>
  );
};

export default RenameFileOrFolderDialog;





