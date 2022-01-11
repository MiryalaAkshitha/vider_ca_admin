import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { addClientPassword } from "api/services/client-info";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps, InputChangeType, SubmitType } from "types";

interface StateProps {
  website: string;
  websiteUrl: string;
  loginId: string;
  password: string;
}

function AddPassword({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const params = useParams();
  const [state, setState] = useState<StateProps>({
    website: "",
    websiteUrl: "",
    loginId: "",
    password: "",
  });

  const handleChange = (e: InputChangeType) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation(addClientPassword, {
    onSuccess: () => {
      snack.success("Password Created");
      queryClient.invalidateQueries("client-passwords");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({
      ...state,
      client: params.clientId,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Add Password">
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          onChange={handleChange}
          size="small"
          required
          label="Website Name"
          name="website"
        />
        <TextField
          variant="outlined"
          fullWidth
          onChange={handleChange}
          size="small"
          required
          type="url"
          sx={{ mt: 2 }}
          label="Website Url"
          name="websiteUrl"
        />
        <TextField
          variant="outlined"
          fullWidth
          onChange={handleChange}
          size="small"
          required
          sx={{ mt: 2 }}
          name="loginId"
          label="Login ID"
        />
        <TextField
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          onChange={handleChange}
          size="small"
          required
          name="password"
          label="Password"
        />
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            loadingColor="white"
            title="Create Password"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddPassword;
