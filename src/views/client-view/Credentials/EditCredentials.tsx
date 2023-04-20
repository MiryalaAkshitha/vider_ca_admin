import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { updateClientPassword } from "api/services/clients/client-info";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, InputChangeType, SubmitType } from "types";

interface StateProps {
  website: string;
  websiteUrl: string;
  loginId: string;
  password: string;
}

interface Props extends DialogProps {
  data: any;
}

function EditPassword({ open, setOpen, data }: Props) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<StateProps>({
    website: "",
    websiteUrl: "",
    loginId: "",
    password: "",
  });

  useEffect(() => {
    setState(data);
  }, [data]);

  const handleChange = (e: InputChangeType) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation(updateClientPassword, {
    onSuccess: () => {
      snack.success("Credentials have been Updated");
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
      data: {
        ...state,
      },
      id: data?.id,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Edit Credentials">
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          onChange={handleChange}
          size="small"
          required
          label="Website Name"
          value={state?.website}
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
          value={state?.websiteUrl}
          name="websiteUrl"
        />
        <TextField
          variant="outlined"
          fullWidth
          onChange={handleChange}
          size="small"
          value={state?.loginId}
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
          value={state?.password}
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
            title="Update"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default EditPassword;
