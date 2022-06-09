import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Grid, TextField, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { updateClient } from "api/services/client";
import {
  getGstDetails,
  getPanDetails,
  getSandboxToken,
} from "api/services/users";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import TextFieldWithCopy from "./TextFieldWithCopy";

const OrganizationInformation = ({ data, apiData, setState }) => {
  const queryClient = useQueryClient();
  const [gstLoading, setGstLoading] = useState(false);
  const [panLoading, setPanLoading] = useState(false);
  const [panChanged, setPanChanged] = useState(false);
  const [gstChanged, setGstChanged] = useState(false);

  useEffect(() => {
    setPanChanged(apiData.panNumber !== data.panNumber);
    setGstChanged(apiData.gstNumber !== data.gstNumber);
  }, [data, apiData]);

  const handleChange = (e: any) => {
    setState({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate } = useMutation(updateClient, {
    onSuccess: () => {
      snack.success("Verified Successfully");
      queryClient.invalidateQueries("client");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const verifyGst = async () => {
    if (!data.gstNumber) {
      snack.error("Please enter GST Number");
      return;
    }

    try {
      setGstLoading(true);
      let token: any = await getSandboxToken();

      let response: any = await getGstDetails({
        gstNumber: data.gstNumber,
        token: token?.data?.access_token,
      });

      const result: any = response.data;

      if (result.data.sts === "Active") {
        mutate({
          id: data?.id,
          data: {
            ...data,
            legalName: result?.data?.lgnm,
            tradeName: result?.data?.tradeNam,
            placeOfSupply: result?.data?.pradr?.addr?.stcd,
            constitutionOfBusiness: result?.data?.ctb,
            buildingName: result?.data?.pradr?.addr?.bnm,
            street: result?.data?.pradr?.addr?.st,
            city: result?.data?.pradr?.addr?.dst,
            state: result?.data?.pradr?.addr?.stcd,
            pincode: result?.data?.pradr?.addr?.pncd,
            gstVerified: true,
          },
        });
      } else {
        snack.error("GST Number is not active");
      }
    } catch (e: any) {
      snack.error(e.response.data.message);
    } finally {
      setGstLoading(false);
    }
  };

  const verifyPan = async () => {
    if (!data.panNumber) {
      snack.error("Please enter PAN Number");
      return;
    }

    try {
      setPanLoading(true);
      let token: any = await getSandboxToken();

      let response: any = await getPanDetails({
        panNumber: data?.panNumber,
        token: token?.data?.access_token,
      });

      const result: any = response?.data;
      if (result.data.status === "VALID") {
        mutate({
          id: data?.id,
          data: {
            ...data,
            firstName: result?.data?.first_name,
            lastName: result?.data?.last_name,
            fullName: result?.data?.full_name,
            panVerified: true,
          },
        });
      } else {
        snack.error("Invalid PAN Number");
      }
    } catch (e: any) {
      snack.error(e.response.data.message);
    } finally {
      setPanLoading(false);
    }
  };

  const GstAdornment = () => {
    const showGstActive = data?.gstVerified && !gstChanged;
    const showGstVerify = !data?.gstVerified || gstChanged;

    return (
      <>
        {gstLoading && <CircularProgress size="1rem" />}
        {showGstActive && !gstLoading && (
          <CheckCircleIcon fontSize="small" sx={{ color: "green" }} />
        )}
        {showGstVerify && !gstLoading && (
          <Button color="error" size="small" onClick={verifyGst}>
            Verify
          </Button>
        )}
      </>
    );
  };

  const PanAdornment = () => {
    const showPanActive = data?.panVerified && !panChanged;
    const showPanVerify = !data?.panVerified || panChanged;

    return (
      <>
        {panLoading && <CircularProgress size="1rem" />}
        {showPanActive && !panLoading && (
          <CheckCircleIcon fontSize="small" sx={{ color: "green" }} />
        )}
        {showPanVerify && !panLoading && (
          <Button color="error" size="small" onClick={verifyPan}>
            Verify
          </Button>
        )}
      </>
    );
  };

  return (
    <>
      <Box mt={4}>
        <Typography mt={3} color="primary" variant="h6" sx={{ mb: 2 }}>
          Organisation Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="GST Number"
              fullWidth
              variant="outlined"
              size="small"
              value={data?.gstNumber || ""}
              name="gstNumber"
              onChange={handleChange}
              InputProps={{
                endAdornment: <GstAdornment />,
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="PAN Number"
              fullWidth
              variant="outlined"
              size="small"
              value={data?.panNumber || ""}
              name="panNumber"
              onChange={handleChange}
              InputProps={{
                endAdornment: <PanAdornment />,
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="First Name"
              name="firstName"
              disabled
              onChange={handleChange}
              value={data?.firstName || ""}
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              disabled
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data?.lastName || ""}
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Full Name"
              name="fullName"
              disabled
              onChange={handleChange}
              value={data?.fullName || ""}
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithCopy
              disabled
              label="State Jurisdiction / Place of supply"
              name="placeOfSupply"
              value={data?.placeOfSupply || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              disabled
              label="Legal name"
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
              disabled
              label="Trade Name"
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
              disabled
              label="Constitution of Business"
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
    </>
  );
};
export default OrganizationInformation;
