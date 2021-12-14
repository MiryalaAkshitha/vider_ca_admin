import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createRole } from "api/services/roles";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

function AddRole({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();

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
    let name = e.target.elements.name.value;
    mutate({
      name,
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
