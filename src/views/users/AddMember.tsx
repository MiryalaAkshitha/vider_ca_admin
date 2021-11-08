import { Close } from "@mui/icons-material";
import {
  AppBar,
  Drawer,
  IconButton,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getRoles } from "api/roles";
import { createUser } from "api/users";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { DataResponse, DialogProps } from "types";
import PasswordField from "views/login/PasswordField";

type State = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
};

function AddMember({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const { data, isLoading: dataLoading }: UseQueryResult<DataResponse, Error> =
    useQuery("roles", getRoles, { enabled: open });

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: () => {
      snack.success("User Created");
      setOpen(false);
      queryClient.invalidateQueries("users");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(state);
  };

  return (
    <Drawer
      anchor="right"
      PaperProps={{ sx: { width: 550 } }}
      open={open}
      onClose={setOpen}
    >
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1">Create Role</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      {dataLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <Box p={2}>
            <TextField
              sx={{ mt: 1 }}
              variant="outlined"
              fullWidth
              size="small"
              required
              label="First Name"
              name="firstName"
              onChange={handleChange}
            />
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              fullWidth
              size="small"
              required
              label="Last Name"
              name="lastName"
              onChange={handleChange}
            />
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              fullWidth
              size="small"
              required
              label="Email"
              name="email"
              onChange={handleChange}
            />
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              fullWidth
              size="small"
              required
              label="Mobile"
              name="mobile"
              onChange={handleChange}
            />
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              fullWidth
              size="small"
              required
              label="Role"
              onChange={handleChange}
              name="role"
              select
            >
              {data?.data?.map((item: any) => (
                <MenuItem value={item?.id}>{item?.name}</MenuItem>
              ))}
            </TextField>
            <PasswordField
              sx={{ mt: 3 }}
              label="Password"
              onChange={handleChange}
            />
            <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
              <LoadingButton
                loading={isLoading}
                fullWidth
                type="submit"
                loadingColor="white"
                title="Create Member"
                color="secondary"
              />
            </Box>
          </Box>
        </form>
      )}
    </Drawer>
  );
}

export default AddMember;
