import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { signField } from "api/services/forms";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

const Esign = () => {
  const params = useParams();

  const { mutate, error } = useMutation(signField, {
    onSuccess: (res) => {
      let result = res.data;
      let form = document.createElement("form");
      form.action = process.env.REACT_APP_EMSIGNER_URL || "";
      form.method = "POST";
      Object.keys(result).forEach((key) => {
        let input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = result[key];
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    },
    onError: (err: any) => {
      console.log(err.response.data);
    },
  });

  useEffect(() => {
    mutate({
      formId: params.formId,
      fieldId: params.fieldId,
      data: {
        successUrl: "http://localhost:5000/forms/sign/redirect",
        failureUrl: "http://localhost:5000/forms/sign/redirect",
        cancelUrl: "http://localhost:5000/forms/sign/redirect",
      },
    });
  }, []);

  if (error) {
    return (
      <Alert severity="error" sx={{ maxWidth: 500, mx: "auto", mt: 15 }}>
        Something went wrong
      </Alert>
    );
  }

  return (
    <Box textAlign="center" mt={15}>
      <Typography variant="subtitle2">Please Wait</Typography>
      <CircularProgress sx={{ mt: 3 }} />
    </Box>
  );
};
export default Esign;
