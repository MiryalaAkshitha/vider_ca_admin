import { Grid, TextField } from "@mui/material";
import { updateProfile } from "api/services/users";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Detail from "./Detail";
import SectionWrapper from "./SectionWrapper";

const BankDetails = ({ data }) => {
  const queryClient = useQueryClient();

  const [editable, setEditable] = useState(false);
  const [state, setState] = useState({
    bankAccountHolderName: "",
    bankAccountNumber: "",
    bankName: "",
    bankIfscCode: "",
  });

  useEffect(() => {
    setState({
      bankAccountHolderName: data?.profile?.bankAccountHolderName,
      bankAccountNumber: data?.profile?.bankAccountNumber,
      bankName: data?.profile?.bankName,
      bankIfscCode: data?.profile?.bankIfscCode,
    });
  }, [data]);

  const { mutate } = useMutation(updateProfile, {
    onSuccess: () => {
      snack.success("Profile updated successfully");
      queryClient.invalidateQueries("user-profile");
    },
    onError: () => {
      snack.error("Error updating profile");
    },
  });

  const handleSubmit = () => {
    mutate({
      ...state,
      id: data?.id,
      type: "user",
    });
  };

  return (
    <SectionWrapper
      editable={editable}
      onSave={handleSubmit}
      setEditable={setEditable}
      title="Bank Details"
    >
      {editable ? (
        <EditSection state={state} setState={setState} />
      ) : (
        <ViewSection data={data} />
      )}
    </SectionWrapper>
  );
};

const ViewSection = ({ data }) => {
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={3}>
        <Detail
          title="Bank account number"
          value={data?.profile?.bankAccountNumber}
        />
      </Grid>
      <Grid item xs={3}>
        <Detail
          title="Bank account holder name"
          value={data?.profile?.bankAccountHolderName}
        />
      </Grid>
      <Grid item xs={3}>
        <Detail title="Bank name" value={data?.profile?.bankName} />
      </Grid>
      <Grid item xs={3}>
        <Detail title="Bank IFSC Code" value={data?.profile?.bankIfscCode} />
      </Grid>
    </Grid>
  );
};

const EditSection = ({ state, setState }) => {
  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          onChange={handleChange}
          name="bankAccountHolderName"
          label="Bank account holder name"
          sx={{ mb: 2 }}
          value={state?.bankAccountHolderName}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          onChange={handleChange}
          name="bankAccountNumber"
          label="Bank account number"
          sx={{ mb: 2 }}
          value={state?.bankAccountNumber}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          onChange={handleChange}
          name="bankName"
          label="Bank name"
          sx={{ mb: 2 }}
          value={state?.bankName}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          onChange={handleChange}
          name="bankIfscCode"
          label="Bank IFSC Code"
          sx={{ mb: 2 }}
          value={state?.bankIfscCode}
        />
      </Grid>
    </Grid>
  );
};

export default BankDetails;
