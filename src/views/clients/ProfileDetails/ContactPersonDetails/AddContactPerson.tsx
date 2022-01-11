import { Checkbox, FormControlLabel, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createContactPerson } from "api/services/client";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { DialogProps, InputChangeType } from "types";
import { CONTACT_PERSON_ROLES } from "utils/constants";

interface StateProps {
  name: string;
  role: string;
  customRole: string;
  email: string;
  mobile: string;
  dscAvailable: boolean;
  dscExpiryDate: string | null;
}

const initialState: StateProps = {
  name: "",
  role: "",
  customRole: "",
  email: "",
  mobile: "",
  dscAvailable: false,
  dscExpiryDate: "",
};

function AddContactPerson({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
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

  const handleDscAvailable = (e: any) => {
    setState({
      ...state,
      dscAvailable: e.target.checked,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { customRole, ...apiData } = state;
    apiData.role = state.role === "custom" ? customRole : state.role;
    mutate({ ...apiData, client: params.clientId });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Add Contact Person">
      <form onSubmit={handleSubmit} ref={formRef}>
        <TextField
          variant="outlined"
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
          size="small"
          label="Mobile"
        />
        <FormControlLabel
          sx={{ mt: 2 }}
          control={<Checkbox onChange={handleDscAvailable} />}
          label="DSC Available"
        />
        {state.dscAvailable && (
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            type="date"
            name="dscExpiryDate"
            size="small"
            InputLabelProps={{ shrink: true }}
            label="DSC Expiry Date"
          />
        )}
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Add Contact Person"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddContactPerson;
