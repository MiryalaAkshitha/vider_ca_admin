import { DesktopDatePicker } from "@mui/lab";
import { Autocomplete, Checkbox, FormControlLabel, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createDscRegister, getClients } from "api/services/clients/dsc-register";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import _ from "lodash";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps, ResType, SubmitType } from "types";

interface StateProps {
  client: any;
  contactPerson: any;
  holderName: string;
  email: string;
  mobileNumber: string;
  expiryDate: string | null;
  password: string;
  tokenNumber: string;
  panNumber: string;
  holderDesignation: string;
}

let initialState = {
  client: null,
  contactPerson: null,
  holderName: "",
  email: "",
  mobileNumber: "",
  expiryDate: null,
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
  const [getDetails, setGetDetails] = useState<boolean>(false);

  const { data, isLoading }: ResType = useQuery(["dsc-register-clients"], getClients, {
    enabled: open,
  });

  const handleChange = (e: any) => {
    let { name, value } = e.target;

    if (name === "panNumber") {
      value = value.toUpperCase();
    }

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleClientUserChange = (e: any) => {
    let clientUser = state?.client?.contactPersons?.find(
      (item: any) => item.id === +e.target.value
    );
    setState({
      ...state,
      contactPerson: clientUser?.id,
      holderName: clientUser?.name || "",
      mobileNumber: clientUser?.mobile || "",
      email: clientUser?.email || "",
    });
  };

  const { mutate, isLoading: createLoading } = useMutation(createDscRegister, {
    onSuccess: () => {
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
      client: state.client?.id,
    });
  };

  return (
    <DrawerWrapper
      open={open}
      setOpen={() => {
        setOpen(false);
        setState(_.cloneDeep(initialState));
      }}
      title="Add DSC Record"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          <form onSubmit={handleSubmit} ref={formRef}>
            <Autocomplete
              size="small"
              onChange={(_, value) => {
                setState({
                  ...state,
                  holderName: "",
                  email: "",
                  mobileNumber: "",
                  contactPerson: null,
                  client: value,
                });
              }}
              value={state.client}
              options={data?.data || []}
              getOptionLabel={(option: any) => option.displayName}
              fullWidth
              renderInput={(params) => <TextField {...params} size="small" label="Client" />}
            />
            {state.client && (
              <FormControlLabel
                sx={{ mt: 1 }}
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
                label="Get Details from Client User"
              />
            )}
            {getDetails && state.client && (
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                select
                value={state.contactPerson || ""}
                onChange={handleClientUserChange}
                variant="outlined"
                label="Client User"
                size="small"
              >
                {state?.client?.contactPersons?.map((item: any, index: number) => (
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
                pattern: "[1-9]{1}[0-9]{9}",
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
              label="Email ID"
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
            <DesktopDatePicker
              label="Expiry Date"
              inputFormat="dd-MM-yyyy"
              value={state.expiryDate}
              onChange={(value) => {
                setState({
                  ...state,
                  expiryDate: value,
                });
              }}
              renderInput={(params) => (
                <TextField sx={{ mt: 3 }} fullWidth size="small" {...params} />
              )}
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
              label="PAN"
              inputProps={{
                pattern: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
                title: "Pan Number is invalid",
              }}
            />

            <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
              <LoadingButton
                loading={createLoading}
                fullWidth
                type="submit"
                loadingColor="white"
                title="Submit"
                color="secondary"
              />
            </Box>
          </form>
        </Box>
      )}
    </DrawerWrapper>
  );
}

export default AddDscRegister;
