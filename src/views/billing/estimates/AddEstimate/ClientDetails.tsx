import { Grid, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getClients } from "api/services/clients/clients";
import { getStates } from "api/services/common";
import { logo } from "assets";
import Loader from "components/Loader";
import { placeOfSupplyStates } from "data/placeOfSupply";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  handleClientChange,
  handlePlaceOfSupplyChange,
  selectEstimate,
} from "redux/reducers/createEstimateSlice";
import { ResType } from "types";
import SectionHeading from "../SectionHeading";
import { AddressDetail, getAddress } from "./BillingEntityDetails";
import { useState } from "react";

function ClientDetails() {
  const { billingAddress, shippingAddress, client, placeOfSupply } =
    useSelector(selectEstimate);
  const dispatch = useDispatch();

  const [gstNumber, setGstNumber] = useState('NA');

  const { data, isLoading }: ResType = useQuery(["clients", {}], getClients);

  const { data: states, isLoading: statesLoading }: ResType = useQuery(
    "states",
    getStates
  );

  const handleChange = (e: any) => {
    let client = data?.data?.result?.find(
      (item: any) => item.id === e.target.value
    );
    setGstNumber(client?.gstNumber);
    dispatch(handleClientChange({ client }));
  };

  if (isLoading || statesLoading) return <Loader />;

  return (
    <Box mt={4}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Select client"
            fullWidth
            select
            value={client}
            onChange={handleChange}
            size="small"
          >
            {data?.data?.result?.map((client: any, index: number) => (
              <MenuItem value={client?.id} key={index}>
                {client?.displayName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            onChange={(e) => {
              dispatch(handlePlaceOfSupplyChange(e.target.value));
            }}
            size="small"
            select
            fullWidth
            label="Place of Supply"
            value={placeOfSupply}
          >
            {placeOfSupplyStates.map((state: any, index: number) => (
              <MenuItem value={state} key={index}>
                {state}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid
        mt={1}
        container
        spacing={2}
        alignItems="baseline"
        columnSpacing={4}
      >
        <Grid item xs={6}>
          <SectionHeading title="Billing Address" />
          <Box p={2}>
            {/* <Box mb={1}>
              <img src={logo} alt="logo" />
            </Box> */}
            <AddressDetail
              title="Legal Name"
              value={billingAddress?.legalName}
            />
            <AddressDetail title="Address" value={getAddress(billingAddress)} />
            <AddressDetail title="Email" value={billingAddress?.email} />
            <AddressDetail
              title="Mobile Number"
              value={billingAddress?.mobileNumber}
            />
            <AddressDetail
              title="GST Number"
              value={gstNumber}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <SectionHeading title="Shipping Address" />
          <Box p={2}>
            {/* <Box mb={1}>
              <img src={logo} alt="logo" />
            </Box> */}
            <AddressDetail
              title="Legal Name"
              value={shippingAddress?.legalName}
            />
            <AddressDetail
              title="Address"
              value={getAddress(shippingAddress)}
            />
            <AddressDetail title="Email" value={shippingAddress?.email} />
            <AddressDetail
              title="Mobile Number"
              value={shippingAddress?.mobileNumber}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ClientDetails;
