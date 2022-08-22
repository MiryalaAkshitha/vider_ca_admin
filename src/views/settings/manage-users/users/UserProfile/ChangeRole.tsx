import { Box, Button, MenuItem, TextField } from "@mui/material";
import { getRoles } from "api/services/roles";
import { updateProfile } from "api/services/users";
import DialogWrapper from "components/DialogWrapper";
import Loader from "components/Loader";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType, SubmitType } from "types";
import { handleError } from "utils/handleError";

interface Props extends DialogProps {
  role: any;
  userId: any;
}

function ChangeRole({ open, setOpen, role: extRole, userId }: Props) {
  const queryClient = useQueryClient();
  const [role, setRole] = useState("");

  const { data, isLoading }: ResType = useQuery(["roles"], getRoles, { enabled: open });

  useEffect(() => {
    setRole(extRole);
  }, [extRole]);

  const { mutateAsync } = useMutation(updateProfile, {
    onSuccess: () => {
      snack.success("Role updated successfully");
      queryClient.invalidateQueries("user-details");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleSubmit = async (e: SubmitType) => {
    e.preventDefault();
    await mutateAsync({
      id: userId,
      role: role,
      type: "user",
    });
  };

  return (
    <DialogWrapper title="Change Role" open={open} setOpen={setOpen}>
      {isLoading ? (
        <Loader minHeight="50px" />
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setRole(e.target.value)}
            select
            label="Role"
            fullWidth
            variant="outlined"
            size="small"
            value={role}
          >
            {data?.data?.map((role: any) => (
              <MenuItem value={role.id}>{role.name}</MenuItem>
            ))}
          </TextField>
          <Box mt={3} textAlign="center">
            <Button type="submit" variant="contained" color="secondary">
              Submit
            </Button>
          </Box>
        </form>
      )}
    </DialogWrapper>
  );
}

export default ChangeRole;
