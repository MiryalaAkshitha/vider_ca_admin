import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createContactPerson } from "api/services/clients/clients";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { DialogProps, InputChangeType } from "types";
import { CONTACT_PERSON_ROLES } from "data/constants";
import ProfileImage from "../ProfileImage";

interface StateProps {
  image: string;
  name: string;
  role: string;
  customRole: string;
  email: string;
  mobile: string;
}

const initialState: StateProps = {
  image: "",
  name: "",
  role: "",
  customRole: "",
  email: "",
  mobile: "",
};

function AddContactPerson({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const params = useParams();
  const [state, setState] = useState(initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: InputChangeType) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation(createContactPerson, {
    onSuccess: () => {
      snack.success("Contact Person Created");
      setOpen(false);
      formRef.current?.reset();
      setState(initialState);
      queryClient.invalidateQueries("client");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { customRole, ...apiData } = state;
    apiData.role = state.role === "custom" ? customRole : state.role;
    mutate({ ...apiData, client: params.clientId });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Add Client User">
      <form onSubmit={handleSubmit} ref={formRef}>
        <ProfileImage
          src={null}
          onChange={(v: string) => setState({ ...state, image: v })}
        />
        <TextField
          variant="outlined"
          sx={{ mt: 2 }}
          fullWidth
          name="name"
          required
          onChange={handleChange}
          size="small"
          label="Name"
        />
        <TextField
          sx={{ mt: 2 }}
          variant="outlined"
          fullWidth
          onChange={handleChange}
          size="small"
          select
          required
          name="role"
          label="Role"
        >
          {CONTACT_PERSON_ROLES.map((role, index: number) => (
            <MenuItem value={role} key={index}>
              {role}
            </MenuItem>
          ))}
          <MenuItem value="custom">Custom</MenuItem>
        </TextField>
        {state.role === "custom" && (
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            name="customRole"
            size="small"
            label="Role Name"
          />
        )}
        <TextField
          sx={{ mt: 3 }}
          variant="outlined"
          fullWidth
          required
          type="email"
          onChange={handleChange}
          name="email"
          size="small"
          label="Email"
        />
        <TextField
          sx={{ mt: 3 }}
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
          name="mobile"
          inputProps={{
            pattern: "[1-9]{1}[0-9]{9}",
            title: "Mobile number must be 10 digits",
          }}
          size="small"
          label="Mobile"
        />
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Submit"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddContactPerson;
