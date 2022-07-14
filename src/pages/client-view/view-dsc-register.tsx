import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import {
  getDscRegister,
  updateDscRegister,
} from "api/services/clients/clients";
import BottomBar from "components/BottomBar";
import Loader from "components/Loader";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import DscActivity from "views/client-view/dscregister/DscActivity";
import PasswordField from "views/login/PasswordField";

function View() {
  const queryClient = useQueryClient();
  const params = useParams();
  const [originalState, setOriginalState] = useState<any>(null);
  const [state, setState] = useState<any>(null);

  const { data, isLoading }: ResType = useQuery(
    ["dsc-register-details", { id: params.dscId }],
    getDscRegister,
    {
      onSuccess: (res: any) => {
        let data = {
          email: res.data.email || "",
          password: res.data.password,
          holderName: res.data.holderName,
          mobileNumber: res.data.mobileNumber,
          panNumber: res.data.panNumber,
          tokenNumber: res.data.tokenNumber,
          expiryDate: res.data.expiryDate,
          holderDesignation: res.data.holderDesignation,
        };
        setOriginalState({ ...data });
        setState({ ...data });
      },
      cacheTime: 0,
    }
  );

  const { mutateAsync } = useMutation(updateDscRegister, {
    onSuccess: () => {
      snack.success("Dsc Register Updated");
      queryClient.invalidateQueries("dsc-register-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message[0]);
    },
  });

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    await mutateAsync({
      id: data?.data?.id,
      data: state,
    });
  };

  const handleCancel = () => {
    setState(originalState);
  };

  if (isLoading) return <Loader />;

  return (
    <Box px={3} pt={1}>
      <Box mb={1} textAlign="right">
        <Button onClick={() => window.history.back()} startIcon={<ArrowBack />}>
          Back
        </Button>
      </Box>
      <Typography mb={3} variant="subtitle2" color="primary">
        Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="DSC Holder Name"
            name="holderName"
            value={state?.holderName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Email"
            name="email"
            value={state?.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Mobile Number"
            name="mobileNumber"
            value={state?.mobileNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="DSC Holder Designation"
            name="holderDesignation"
            value={state?.holderDesignation}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            type="date"
            label="DSC Expiry Date"
            name="expiryDate"
            value={state?.expiryDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <PasswordField
            value={state?.password}
            name="password"
            onChange={handleChange}
            label="DSC Password"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Token Number"
            name="tokenNumber"
            value={state?.tokenNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="PAN Number"
            name="panNumber"
            value={state?.panNumber}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <BottomBar
        left="72px"
        data={originalState}
        state={state}
        onUpdate={handleUpdate}
        onCancel={handleCancel}
      />
      <DscActivity data={data} />
    </Box>
  );
}

export default View;
