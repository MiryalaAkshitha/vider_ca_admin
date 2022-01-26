import {
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  TextField,
  RadioGroup,
  Typography,
  FormControlLabel,
  Radio,
  FormLabel
} from "@mui/material";
import { Box } from "@mui/system";
import { getLabels } from "api/services/labels";
import { getUsers } from "api/services/users";
import Loader from "components/Loader";
import moment from "moment";
import React from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { CLIENT_CATEGORIES, STATES } from "utils/constants";
import ContactPersonDetails from "../ContactPersonDetails";
import TextFieldWithCopy from "./TextFieldWithCopy";

interface IDetailsProps {
  data: any;
  apiData: any;
  setState: (data: any) => void;
}

function Details({ data, apiData, setState }: IDetailsProps) {

  const handleChange = (e: any) => {
    setState({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeRadio = (e: any, value: any) => {
    setState({
      ...data,
      [e.target.name]: value == 'yes' ? true : false,
    });
  };

  const state = STATES.find((item) => item?.value === data?.state) || {
    label: "",
    value: "",
  };


  return (
    <Box mt={5}>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <TextField
            label="Organization Name"
            name="companyName"
            value={data?.companyName}
            fullWidth
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldWithCopy
            label="Mobile Number"
            name="mobileNumber"
            value={data?.mobile}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldWithCopy
            label="Email"
            name="email"
            value={data?.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Organization Size"
            name="companySize"
            value={data?.companySize}
            fullWidth
            variant="outlined"
            onChange={handleChange}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={8}>
          <TextFieldWithCopy
            label="Address"
            name="address"
            value={data?.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="City"
            name="city"
            value={data?.city}
            fullWidth
            variant="outlined"
            size="small"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            onChange={(_, value) => setState({ ...data, state: value?.value })}
            value={state}
            options={STATES || []}
            getOptionLabel={(option: any) => option?.label}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                fullWidth
                label="State"
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Pincode"
            name="pincode"
            value={data?.pincode}
            fullWidth
            variant="outlined"
            onChange={handleChange}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography color="primary" variant="subtitle2" sx={{ mb: 3 }}>
            GST Details
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormLabel id="demo-row-radio-buttons-group-label">is your business registered for GST? </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="isGstRegistered"
                value={data?.isGstRegistered ? 'yes' : 'no'}
                onChange={handleChangeRadio}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>

            {
              data?.isGstRegistered && (
                <React.Fragment>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextFieldWithCopy
                          label="GST Number"
                          name="gstNumber"
                          value={data?.gstNumber}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item>
                        <Button color="primary" variant="outlined">
                          Verify
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="GST Registered Date"
                      name="dob"
                      onChange={handleChange}
                      value={data?.dob}
                      fullWidth
                      type="date"
                      variant="outlined"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </React.Fragment>
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Details;
