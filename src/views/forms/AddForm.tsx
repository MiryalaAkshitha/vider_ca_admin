import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createForm } from "api/services/forms";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

function CreateForm({ open, setOpen }: DialogProps) {
  const snack = useSnack();
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    name: "",
    tags: [""],
  });

  const { mutate, isLoading } = useMutation(createForm, {
    onSuccess: () => {
      snack.success("Form Created");
      setOpen(false);
      queryClient.invalidateQueries("forms");
    },
    onError: (err: any) => {
      console.log(err);
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(state);
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Create Form">
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          name="name"
          required
          size="small"
          label="Name"
          onChange={(e) => setState({ ...state, name: e.target.value })}
          type="text"
        />
        <Autocomplete
          multiple
          id="tags-standard"
          sx={{ mt: 3 }}
          options={["kyb", "passwords", "ddforms"]}
          onChange={(_, v) => setState({ ...state, tags: v })}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              size="small"
              label="Tags"
            />
          )}
        />
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            type="submit"
            loadingColor="white"
            title="Create Form"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default CreateForm;
