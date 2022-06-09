import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { forgotPassword } from "api/services/users";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation } from "react-query";

interface ForgotPasswordProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

function ForgotPassword({ open, setOpen }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");

  const { mutate } = useMutation(forgotPassword, {
    onSuccess: () => {
      snack.success("Password reset link has been sent to your email");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate({
      email,
    });
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="subtitle1">Forgot Password</Typography>
          <Typography variant="body2" color="textSecondary">
            Please enter your Email to reset Password
          </Typography>
          <TextField
            required
            type="email"
            fullWidth
            size="small"
            sx={{ mt: 3 }}
            onChange={handleOnChange}
            label="Email Address"
            name="email"
            value={email}
          />
        </DialogContent>
        <DialogActions sx={{ my: 2 }}>
          <Button
            onClick={handleClose}
            type="button"
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button type="submit" color="secondary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ForgotPassword;
