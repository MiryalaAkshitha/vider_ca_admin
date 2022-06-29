import { TextField } from "@mui/material";
import { createFormValidation } from "api/services/forms";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, SubmitType } from "types";

let initialState = {
  name: "",
  format: "",
  message: "",
};

function AddFormValidation({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const [state, setState] = useState({ ...initialState });

  const { mutate } = useMutation(createFormValidation, {
    onSuccess: () => {
      queryClient.invalidateQueries("form-validations");
      snack.success("Form validation created");
      setState({ ...initialState });
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({
      data: state,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Add form validation">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Validation Name"
          name="name"
          size="small"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          label="Validation Format"
          name="format"
          required
          size="small"
          sx={{ mt: 2 }}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          label="Validation Message"
          name="message"
          size="small"
          fullWidth
          sx={{ mt: 2 }}
          multiline
          rows={3}
          required
          onChange={handleChange}
        />
        <LoadingButton
          loading={false}
          fullWidth
          sx={{ mt: 3 }}
          type="submit"
          loadingColor="white"
          title="Create Form Validation"
          color="secondary"
        />
      </form>
    </DrawerWrapper>
  );
}

export default AddFormValidation;
