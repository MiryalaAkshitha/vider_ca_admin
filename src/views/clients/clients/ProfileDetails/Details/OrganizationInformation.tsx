import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import axios from "axios";
import TextFieldWithCopy from "./TextFieldWithCopy";

const OrganizationInformation = ({ data, onUpdate, handleChange }) => {
  const [isPanVerified, setPanVerified] = useState(false);
  const [isGstverified, setIsGstverified] = useState(false);
  const [isPanloading, setPanLoading] = useState(false);
  const [isGstloading, setGstLoading] = useState(false);

  const gstNumber = data.gstNumber;
  const panNumber = data.panNumber;
  const verifyGst = async () => {
    try {
      setGstLoading(true);
      let token: any = await axios({
        url: "https://try.readme.io/https://api.sandbox.co.in/authenticate",
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
          "x-api-secret": "secret_live_QTFSCuejXj3hsLDlr2UcFw4VoZN4ujQ5",
          "x-api-version": "1.0",
        },
      });
      let response: any = await axios.get(
        `https://api.sandbox.co.in/gsp/public/gstin/${gstNumber}`,
        {
          headers: {
            Authorization: token?.data?.access_token,
            "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
          },
        }
      );
      const result: any = response.data;
      console.log(result);
      {
        result.data.sts === "Active"
          ? setIsGstverified(true)
          : alert("INVALID GST NUMBER");
      }
      setGstLoading(false);
    } catch {
      setGstLoading(false);
      alert("Invalid GST Number");
    }
  };
  const verifyPan = async () => {
    try {
      setPanLoading(true);
      let token: any = await axios({
        url: "https://try.readme.io/https://api.sandbox.co.in/authenticate",
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
          "x-api-secret": "secret_live_QTFSCuejXj3hsLDlr2UcFw4VoZN4ujQ5",
          "x-api-version": "1.0",
        },
      });
      const consent = "y";
      const reason = "For KYC of User";

      let response: any = await axios.get(
        `https://api.sandbox.co.in/pans/${panNumber}?consent=${consent}&reason=${reason}`,
        {
          headers: {
            Authorization: token?.data?.access_token,
            "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
          },
        }
      );

      const data: any = response?.data;
      {
        data.data.status === "VALID"
          ? setPanVerified(true)
          : alert("INVALID PAN NUMBER");
      }
      setPanLoading(false);
    } catch {
      setPanLoading(false);
      alert("INVALID PAN NUMBER");
    }
  };

  return (
    <>
      {data?.category === "company" && (
        <Box>
          <Typography mt={3} color="primary" variant="subtitle2" sx={{ mb: 3 }}>
            Organisation Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                label="GST Number"
                fullWidth
                variant="outlined"
                size="small"
                onBlur={onUpdate}
                value={data?.gstNumber || ""}
                name="gstNumber"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <>
                      {isGstloading && <CircularProgress />}
                      {isGstverified && !isGstloading ? (
                        <CheckCircleIcon
                          fontSize="small"
                          sx={{ color: "green" }}
                        />
                      ) : (
                        <Button color="error" size="small" onClick={verifyGst}>
                          Verify GST
                        </Button>
                      )}
                    </>
                  ),
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="PAN Number"
                fullWidth
                variant="outlined"
                size="small"
                onBlur={onUpdate}
                value={data?.panNumber || ""}
                name="panNumber"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <>
                      {isPanloading && <CircularProgress />}
                      {isPanVerified && !isPanloading ? (
                        <CheckCircleIcon
                          fontSize="small"
                          sx={{ color: "green" }}
                        />
                      ) : (
                        <Button color="error" size="small" onClick={verifyPan}>
                          Verify PAN
                        </Button>
                      )}
                    </>
                  ),
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextFieldWithCopy
                label="State Jurisdiction / Place of supply"
                name="palceOfSupply"
                value={data?.palceOfSupply || ""}
                onChange={handleChange}
                onBlur={onUpdate}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Legal name"
                onBlur={onUpdate}
                name="legalName"
                onChange={handleChange}
                value={data?.legalName || ""}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Trade Name"
                onBlur={onUpdate}
                name="tradeName"
                onChange={handleChange}
                value={data?.tradeName || ""}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Constitution of Business"
                onBlur={onUpdate}
                name="constitutionOfBusiness"
                onChange={handleChange}
                value={data?.constitutionOfBusiness || ""}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {data?.category === "individual" && (
        <Box>
          <Typography mt={3} color="primary" variant="subtitle2" sx={{ mb: 3 }}>
            PAN card Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                label="PAN Number"
                fullWidth
                variant="outlined"
                size="small"
                onBlur={onUpdate}
                value={data?.panNumber || ""}
                name="panNumber"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <CheckCircleIcon fontSize="small" sx={{ color: "green" }} />
                  ),
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
export default OrganizationInformation;
