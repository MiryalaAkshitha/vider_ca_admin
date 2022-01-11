import { Checkbox, FormControlLabel, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { updateContactPerson } from "api/services/client";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useEffect, useRef, useState } from "react";
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

interface EditContactPersonProps extends DialogProps {
  data: any;
}

function EditContactPerson({ open, setOpen, data }: EditContactPersonProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState(initialState);
  const params = useParams();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let result = data;
    if (!CONTACT_PERSON_ROLES.includes(data.role)) {
      result = {
        ...result,
        role: "custom",
        customRole: result.role,
      };
    }
    setState(result);
  }, [data]);

  const handleChange = (e: InputChangeType) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation(updateContactPerson, {
    onSuccess: () => {
      snack.success("Contact Person Updated");
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
    mutate({
      id: data?.id,
      data: { ...apiData, client: params.clientId },
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Update Contact Person">
      <form onSubmit={handleSubmit} ref={formRef}>
        <TextField
          variant="outlined"
          fullWidth
          name="name"
          required
          value={state.name}
          onChange={handleChange}
          size="small"
          label="Name"
        />
        <TextField
          sx={{ mt: 2 }}
          variant="outlined"
          fullWidth
          value={state.role}
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
            value={state.customRole}
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
          value={state.email}
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
          value={state.mobile}
          required
          onChange={handleChange}
          name="mobile"
          size="small"
          label="Mobile"
        />
        <FormControlLabel
          sx={{ mt: 2 }}
          control={
            <Checkbox
              checked={state.dscAvailable}
              onChange={handleDscAvailable}
            />
          }
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
            value={state.dscExpiryDate}
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
            title="Update Contact Person"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default EditContactPerson;
