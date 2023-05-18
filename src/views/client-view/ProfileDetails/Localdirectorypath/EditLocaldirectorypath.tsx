import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import LoadingButton from "components/LoadingButton";
import { DialogProps, InputChangeType } from "types";
import TextFieldWithCopy from "../TextFieldWithCopy";
import DrawerWrapper from "components/DrawerWrapper";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { updateClient } from "api/services/clients/clients";
import { snack } from "components/toast";
import { handleError } from "utils/handleError";

interface EditLocaldirectorypathProps extends DialogProps {
  open: any;
  setOpen: any;
  index: any;
  data: any;
  setState: any;
}

function EditLocaldirectorypath({ open, setOpen, index, data, setState }: EditLocaldirectorypathProps) {
  const queryClient = useQueryClient();
  const params = useParams();
  const [path, setPath] = useState("");
  const [title, setTitle] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

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

  const { mutate, isLoading } = useMutation(updateClient, {
    onSuccess: () => {
      snack.success("Local Directory Path Updated");
      queryClient.invalidateQueries("client");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // const updatedData = [...data.localDirectoryPath];
    // updatedData[index] = { title, path };

    // setState({
    //   ...data,
    //   localDirectoryPath: updatedData,
    // });
    if (title !== '' && path !== '') {
      data.localDirectoryPath[index] = { title: title, path: path };

      mutate({ data, id: params.clientId });
      setOpen(false);
    } else {
      return snack.error("Please fill correct title or path");
    }
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Update Local Directory Path">
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
            required
          />
        </Grid>
        <Grid mt={2}>
          <TextFieldWithCopy
            label="Local Directory Path"
            name="localDirectoryPath"
            onChange={handleChange}
            value={path || ""}
            required
          />
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Update Local Directory Path"
            color="secondary"
          />
        </Box>
      </form>

    </DrawerWrapper>
  );
}

export default EditLocaldirectorypath;
