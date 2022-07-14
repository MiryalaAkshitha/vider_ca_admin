import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getClients, updateDscRegister } from "api/services/clients/clients";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useEffect, useRef, useState } from "react";
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

interface Props extends DialogProps {
  data: any;
}

function EditDscRegister({ open, setOpen, data }: Props) {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
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

  const { data: clients, isLoading: clientsLoading }: ResType = useQuery(
    ["clients", {}],
    getClients,
    { enabled: open }
  );

  useEffect(() => {
    if (open) {
      setState({
        ...data,
        client: data?.client?.id,
      });
    }
  }, [data, open]);

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation(updateDscRegister, {
    onSuccess: (res) => {
      snack.success("Dsc Register Updated");
      queryClient.invalidateQueries("dsc-register");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({
      id: data?.id,
      data: state,
    });
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
            disabled
            label="Client"
          >
            {clients?.data?.result?.map((item, index) => (
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
            value={state.holderName}
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
            value={state.expiryDate}
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
            value={state.password}
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
            value={state.tokenNumber}
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
            value={state.panNumber}
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
            value={state.mobileNumber}
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
            value={state.holderDesignation}
          />
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type="submit"
              loadingColor="white"
              title="Update Dsc Register"
              color="secondary"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default EditDscRegister;
