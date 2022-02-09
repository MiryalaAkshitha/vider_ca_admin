import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createDscRegister, getClients } from "api/services/client";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType, SubmitType } from "types";

interface StateProps {
  client: null;
  holderName: string;
  expiryDate: string;
  password: string;
  tokenNumber: string;
  panNumber: string;
  mobileNumber: string;
  holderDesignation: string;
}

function AddDscRegister({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<StateProps>({
    client: null,
    holderName: "",
    expiryDate: "",
    password: "",
    tokenNumber: "",
    panNumber: "",
    mobileNumber: "",
    holderDesignation: "",
  });
  let formRef = useRef<HTMLFormElement>(null);

  const { data: clients, isLoading: clientsLoading }: ResType = useQuery(
    ["clients", {}],
    getClients,
    { enabled: open }
  );

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation(createDscRegister, {
    onSuccess: (res) => {
      snack.success("Dsc Register Created");
      queryClient.invalidateQueries("dsc-register");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate(state);
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Add new DSC Register">
      {clientsLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} ref={formRef}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            select
            value={state.client || ""}
            onChange={handleChange}
            required
            name="client"
            label="Client"
          >
            {clients?.data[0]?.map((item, index) => (
              <MenuItem key={index} value={item?.id}>
                {item.displayName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            name="holderName"
            required
            onChange={handleChange}
            size="small"
            label="DSC Holder Name"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            name="expiryDate"
            required
            type="date"
            onChange={handleChange}
            size="small"
            label="Expiry Date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            name="password"
            required
            onChange={handleChange}
            size="small"
            label="Password"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            name="tokenNumber"
            required
            onChange={handleChange}
            size="small"
            label="Token Number"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            name="panNumber"
            required
            onChange={handleChange}
            size="small"
            label="Pan Number"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            name="mobileNumber"
            size="small"
            label="Mobile Number"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            name="holderDesignation"
            size="small"
            label="DSC Holder Designation"
          />
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type="submit"
              loadingColor="white"
              title="Create Dsc Register"
              color="secondary"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default AddDscRegister;
