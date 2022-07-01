import { Checkbox, FormControlLabel, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createDscRegister } from "api/services/client";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useClientData } from "context/ClientData";
import _ from "lodash";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps, SubmitType } from "types";

interface StateProps {
  client: null;
  holderName: string;
  email: string;
  mobileNumber: string;
  expiryDate: string;
  password: string;
  tokenNumber: string;
  panNumber: string;
  holderDesignation: string;
}

let initialState = {
  client: null,
  holderName: "",
  email: "",
  mobileNumber: "",
  expiryDate: "",
  password: "",
  tokenNumber: "",
  panNumber: "",
  holderDesignation: "",
};

function AddDscRegister({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const params = useParams();
  const [state, setState] = useState<StateProps>(_.cloneDeep(initialState));
  const formRef = useRef<HTMLFormElement>(null);
  const { data } = useClientData();
  const [getDetails, setGetDetails] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleClientUserChange = (e: any) => {
    let clientUser = data?.data?.contactPersons?.find(
      (item: any) => item.id === +e.target.value
    );
    setState({
      ...state,
      holderName: clientUser?.name || "",
      mobileNumber: clientUser?.mobile || "",
      email: clientUser?.email || "",
    });
  };

  const { mutate, isLoading } = useMutation(createDscRegister, {
    onSuccess: (res) => {
      snack.success("Dsc Register Created");
      queryClient.invalidateQueries("dsc-register");
      setOpen(false);
      setState(_.cloneDeep(initialState));
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
    <DrawerWrapper open={open} setOpen={setOpen} title="Add new DSC Register">
      <form onSubmit={handleSubmit} ref={formRef}>
        <FormControlLabel
          control={
            <Checkbox
              checked={getDetails}
              onChange={(e) => {
                setGetDetails(e.target.checked);
                setState({
                  ...state,
                  holderName: "",
                  email: "",
                  mobileNumber: "",
                });
              }}
            />
          }
          label="Get details from client user"
        />
        {getDetails && (
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            select
            onChange={handleClientUserChange}
            variant="outlined"
            label="Client User"
            size="small"
          >
            {data?.data?.contactPersons?.map((item: any, index: number) => (
              <MenuItem key={index} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          name="holderName"
          disabled={getDetails}
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
          disabled={getDetails}
          required
          onChange={handleChange}
          value={state.mobileNumber}
          name="mobileNumber"
          size="small"
          inputProps={{
            pattern: "[0-9]{10}",
            title: "Enter 10 digit mobile number",
          }}
          label="Mobile Number"
        />
        <TextField
          sx={{ mt: 3 }}
          variant="outlined"
          fullWidth
          required
          disabled={getDetails}
          type="email"
          onChange={handleChange}
          value={state.email}
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
          value={state.holderDesignation}
          name="holderDesignation"
          size="small"
          label="DSC Holder Designation"
        />
        <TextField
          sx={{ mt: 3 }}
          variant="outlined"
          fullWidth
          name="expiryDate"
          required
          type="date"
          onChange={handleChange}
          value={state.expiryDate}
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
          value={state.password}
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
          value={state.tokenNumber}
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
          value={state.panNumber}
          size="small"
          label="Pan Number"
          inputProps={{
            pattern: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
            title: "Pan Number is invalid",
          }}
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
    </DrawerWrapper>
  );
}

export default AddDscRegister;