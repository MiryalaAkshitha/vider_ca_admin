import { Grid, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getClients } from "api/services/clients/clients";
import { getStates } from "api/services/common";
import { logo } from "assets";
import Loader from "components/Loader";
import { placeOfSupplyStates } from "data/placeOfSupply";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  handleClientChange,
  handleExistingClientChange,
  handlePlaceOfSupplyChange,
  handleResetParticular,
  selectEstimate,
} from "redux/reducers/createEstimateSlice";
import { ResType } from "types";
import SectionHeading from "../SectionHeading";
import { AddressDetail, getAddress } from "./BillingEntityDetails";
import { snack } from "components/toast";

function ClientDetails({ result }) {
  const { billingAddress, shippingAddress, client, placeOfSupply } = useSelector(selectEstimate);
  const dispatch = useDispatch();

  // const [billingAddress, setBillingAddress] = useState(result?.billingAddress);
  // const [shippingAddress, setShippingAddress] = useState(result?.shippingAddress);
  // const [client, setClient] = useState(result?.client);
  // const [placeOfSupply, setPlaceOfSupply] = useState(result?.placeOfSupply);
  const [gstNumber, setGstNumber] = useState('NA');

  const { data, isLoading }: ResType = useQuery(["clients", {}], getClients);

  const { data: states, isLoading: statesLoading }: ResType = useQuery(
    "states",
    getStates,
    {
      onSuccess: (res: any) => {
        if (result?.client && result?.client?.id !== '') {
          dispatch(handleExistingClientChange(result));
          dispatch(handlePlaceOfSupplyChange(result?.placeOfSupply));
        }
      },
    }
  );

  const handleChange = (e: any) => {
    if (e.target.name == 'placeOfSupply') {
      dispatch(handlePlaceOfSupplyChange(e.target.value));
    }
    if (e.target.name == 'client') {
      let client = data?.data?.result?.find(
        (item: any) => item.id === e.target.value
      );
      if ((client?.address?.billingaddress?.locality == '')
        && (client?.address?.billingaddress?.street == '')
        && (client?.address?.billingaddress?.city == '')
        && (client?.address?.billingaddress?.district == '')
        && (client?.address?.billingaddress?.state == '')
        && (client?.address?.billingaddress?.pincode == '')) {
        snack.error("Please update Billing address in client profile.");
      } else {
        dispatch(handleResetParticular());
        setGstNumber(client?.gstNumber);
        dispatch(handleClientChange({ client }));
        if (e.target.name == 'placeOfSupply') {
          dispatch(handlePlaceOfSupplyChange(e.target.value));
        }
      }
    }
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
            name="client"
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
            onChange={handleChange}
            size="small"
            select
            fullWidth
            label="Place of Supply"
            name="placeOfSupply"
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
          {/* <SectionHeading title="Shipping Address" />
          <Box p={2}> */}
          {/* <Box mb={1}>
              <img src={logo} alt="logo" />
            </Box> */}
          {/* <AddressDetail
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
          </Box> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ClientDetails;
