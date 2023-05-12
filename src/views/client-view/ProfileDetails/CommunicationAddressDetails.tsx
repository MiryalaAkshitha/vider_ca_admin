import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getStates } from "api/services/common";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";

const CommunicationAddressDetails = ({ data, setState, gstDetails }) => {
  const { data: states }: ResType = useQuery("states", getStates);

  const [isEdited, setIsEdited] = useState(false);

  const [address, setAddress] = useState({
    "buildingNumber": data?.address?.communicationaddress?.buildingNumber || "",
    "floornumber": data?.address?.communicationaddress?.floornumber || "",
    "buildingName": gstDetails?.pradr?.addr?.bnm == '' ? data?.address?.communicationaddress?.buildingName : gstDetails?.pradr?.addr?.bnm,
    "street": gstDetails?.pradr?.addr?.st == '' ? data?.address?.communicationaddress?.street : gstDetails?.pradr?.addr?.st,
    "locality": data?.address?.communicationaddress?.locality || "",
    "district": data?.address?.communicationaddress?.district || "",
    "city": gstDetails?.pradr?.addr?.dst == '' ? data?.address?.communicationaddress?.city : gstDetails?.pradr?.addr?.dst,
    "state": gstDetails?.pradr?.addr?.stcd == '' ? data?.address?.communicationaddress?.state : gstDetails?.pradr?.addr?.stcd,
    "pincode": gstDetails?.pradr?.addr?.pncd == '' ? data?.address?.communicationaddress?.pincode : gstDetails?.pradr?.addr?.pncd
  });

  useEffect(() => {
    setState({
      ...data,
      ['address']: {
        'communicationaddress' : address,
        'billingaddress': data?.address?.billingaddress,
        'shippingaddress': data?.address?.shippingaddress 
      },
    });
  }, [isEdited]);

  useEffect(() => {
    setAddress(prevAddress => ({
      ...prevAddress,
      ...data?.address?.communicationaddress
    }));
  }, [data?.address?.communicationaddress]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
    setIsEdited(!isEdited);
  };

  const handleStateChange = (e: any, value: any) => {
    setAddress(prevAddress => ({
      ...prevAddress,
      'state': value
    }));
    setIsEdited(!isEdited);
  }

  return (
    <>
      <Box mt={4}>
        <Typography mt={3} color="primary" variant="h6" sx={{ mb: 2 }}>
        Communication Address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              label="Building No./Flat.No."
              name="buildingNumber"
              value={address?.buildingNumber || ""}
              fullWidth
              variant="outlined"
              size="small"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Floor No."
              name="floornumber"
              value={address?.floornumber || ""}
              fullWidth
              variant="outlined"
              size="small"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Name of the Premises/Building Name"
              name="buildingName"
              value={address?.buildingName || ""}
              fullWidth
              variant="outlined"
              size="small"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Road/Street"
              name="street"
              value={address?.street || ""}
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Locality/Sub Locality"
              name="locality"
              value={address?.locality || ""}
              fullWidth
              variant="outlined"
              size="small"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="City/Town/Village"
              name="city"
              value={address?.city || ""}
              fullWidth
              variant="outlined"
              size="small"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="District"
              name="district"
              value={address?.district || ""}
              fullWidth
              variant="outlined"
              size="small"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              onChange={(_, value) => handleStateChange(_, value)}
              value={address?.state || ""}
              options={states?.data?.map((item) => item?.name) || []}
              getOptionLabel={(option: any) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="State/Union Territory"
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Pincode"
              name="pincode"
              value={address?.pincode || ""}
              fullWidth
              variant="outlined"
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default CommunicationAddressDetails;