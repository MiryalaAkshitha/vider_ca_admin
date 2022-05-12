import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createRole } from "api/services/roles";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

function AddRole({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createRole, {
    onSuccess: () => {
      snack.success("Role Created");
      setOpen(false);
      queryClient.invalidateQueries("roles");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const description = e.target.elements.description.value;
    mutate({
      name,
      description,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Create Role">
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
          variant="outlined"
          fullWidth
          size="small"
          multiline
          sx={{ mt: 2 }}
          rows={3}
          required
          label="Description"
          name="description"
        />
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Create Role"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddRole;
