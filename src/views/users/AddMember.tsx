import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getRoles } from "api/services/roles";
import { createUser } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, InputChangeType, ResType, SubmitType } from "types";
import PasswordField from "views/login/PasswordField";

type State = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  role: number | null;
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
    role: null,
  });

  const { data, isLoading: dataLoading }: ResType = useQuery(
    "roles",
    getRoles,
    { enabled: open }
  );

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

  const handleChange = (e: InputChangeType) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate(state);
  };

  return (
    <DrawerWrapper title="Add Member" open={open} setOpen={setOpen}>
      {dataLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
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
            value={state.role || ""}
            onChange={handleChange}
            name="role"
            select
          >
            {data?.data?.map((item: any) => (
              <MenuItem value={item?.id} key={item?.id}>
                {item?.name}
              </MenuItem>
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
        </form>
      )}
    </DrawerWrapper>
  );
}

export default AddMember;
