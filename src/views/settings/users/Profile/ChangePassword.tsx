import { Box, Button, TextField, Typography } from "@mui/material";
import { changePassword } from "api/services/users";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { InputChangeType, SubmitType } from "types";

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
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
    <Box
      mb={3}
      sx={{
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        mb={1}
        justifyContent="space-between"
        sx={{
          background: "rgb(24, 47, 83, 0.05)",
          px: 2,
          py: 1,
        }}
      >
        <Typography variant="subtitle2" color="primary">
          Change Password
        </Typography>
      </Box>
      <Box p={2}>
        {!open ? (
          <Button
            onClick={() => setOpen(true)}
            variant="outlined"
            color="secondary"
          >
            Change Password
          </Button>
        ) : (
          <form onSubmit={handleSubmit}>
            <Box maxWidth={400}>
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
            </Box>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default ChangePassword;
