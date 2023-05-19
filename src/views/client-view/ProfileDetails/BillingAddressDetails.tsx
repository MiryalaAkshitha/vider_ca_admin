import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getStates } from "api/services/common";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";

const BillingAddressDetails = ({ data, setState }) => {
  const { data: states }: ResType = useQuery("states", getStates);

  const [isEdited, setIsEdited] = useState(false);

  const [address, setAddress] = useState({
    "buildingNumber": data?.address?.billingaddress?.buildingNumber || "",
    "floornumber": data?.address?.billingaddress?.floornumber || "",
    "buildingName": data?.address?.billingaddress?.buildingName || "",
    "street": data?.address?.billingaddress?.street || "",
    "locality": data?.address?.billingaddress?.locality || "",
    "location": data?.address?.billingaddress?.location || "",
    "district": data?.address?.billingaddress?.district || "",
    "city": data?.address?.billingaddress?.city || "",
    "state": data?.address?.billingaddress?.state || "",
    "pincode": data?.address?.billingaddress?.pincode || ""
  });

  useEffect(() => {
    setState({
      ...data,
      ['address']: {
        'communicationaddress' : data?.address?.communicationaddress,
        'billingaddress': address,
        'shippingaddress': data?.address?.shippingaddress 
      },
    });
  }, [isEdited]);

  useEffect(() => {
    setAddress(prevAddress => ({
      ...prevAddress,
      ...data?.address?.billingaddress
    }));
  }, [data?.address?.billingaddress]);

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
          Billing Address
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
              name="location"
              value={address?.location || ""}
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
export default BillingAddressDetails;