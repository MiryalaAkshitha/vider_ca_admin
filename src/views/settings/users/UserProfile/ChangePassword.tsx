import { Box, Button, TextField } from "@mui/material";
import { changePassword } from "api/services/users";
import DialogWrapper from "components/DialogWrapper";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation } from "react-query";
import { DialogProps, InputChangeType, SubmitType } from "types";

const ChangePassword = ({ open, setOpen }: DialogProps) => {
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const { mutate } = useMutation(changePassword, {
    onSuccess: () => {
      snack.success("Password has been changed");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e: InputChangeType) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate(state);
  };

  return (
    <DialogWrapper title="Change Password" open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="oldPassword"
          value={state.oldPassword}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          size="small"
          required
          placeholder="Old Password"
        />
        <TextField
          name="newPassword"
          value={state.newPassword}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          size="small"
          required
          placeholder="New Password"
          sx={{ mt: 2 }}
        />
        <Box mt={2} display="flex" gap={1} justifyContent="flex-end">
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button variant="outlined" color="secondary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </DialogWrapper>
  );
};

export default ChangePassword;
