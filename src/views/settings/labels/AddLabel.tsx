import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createLabel } from "api/services/labels";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

let initialState = {
  name: "",
  color: "",
};

function AddLabel({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const [state, setState] = useState({ ...initialState });

  const { mutate, isLoading } = useMutation(createLabel, {
    onSuccess: () => {
      snack.success("Label Created");
      queryClient.invalidateQueries("labels");
      setState({ ...initialState });
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(state);
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Add Label">
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          required
          label="Name"
          name="name"
          onChange={handleChange}
        />
        <TextField
          sx={{ mt: 4, minWidth: 150 }}
          InputProps={{ sx: { padding: "0px" } }}
          variant="outlined"
          size="small"
          label="Choose Color"
          name="color"
          onChange={handleChange}
          type="color"
          required
        />
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Create Label"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddLabel;
