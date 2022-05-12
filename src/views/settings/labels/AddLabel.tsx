import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createLabel } from "api/services/labels";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

function AddLabel({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createLabel, {
    onSuccess: () => {
      snack.success("Label Created");
      setOpen(false);
      queryClient.invalidateQueries("labels");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const color = e.target.elements.color.value;

    mutate({
      name,
      color,
    });
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
        />
        <TextField
          sx={{ mt: 4, minWidth: 100 }}
          InputProps={{ sx: { padding: "0px" } }}
          variant="outlined"
          size="small"
          label="Choose Color"
          name="color"
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
