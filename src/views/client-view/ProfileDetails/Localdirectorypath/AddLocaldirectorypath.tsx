import { Box } from "@mui/system";
import { updateClient } from "api/services/clients/clients";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { DialogProps, InputChangeType } from "types";
import TextFieldWithCopy from "../TextFieldWithCopy";
import { handleError } from "utils/handleError";
import { Grid, TextField } from "@mui/material";

interface AddLocaldirectorypathProps extends DialogProps {
  open: any;
  setOpen: any;
  state: any;
  data: any;
  setState: any;
}

function AddLocaldirectorypath({ open, setOpen, state, data, setState }: AddLocaldirectorypathProps) {
  const queryClient = useQueryClient();
  const params = useParams();
  const [path, setPath] = useState("");
  const [title, setTitle] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: InputChangeType) => {
    setPath(e.target.value);
  };
  const handleChangeTitle = (e: InputChangeType) => {
    setTitle(e.target.value);
  };

  const { mutate, isLoading } = useMutation(updateClient, {
    onSuccess: () => {
      snack.success("Profile Local directory path Added");
      queryClient.invalidateQueries("client");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { ...data } = state;
    if(data.localDirectoryPath == null || data.localDirectoryPath == "") {
      data.localDirectoryPath = [];
    }
    data.localDirectoryPath.push({title:title,path:path});
    mutate({ data, id: params.clientId });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Add Local Directory Path">
      <form onSubmit={handleSubmit} ref={formRef}>
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
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Submit"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddLocaldirectorypath;
