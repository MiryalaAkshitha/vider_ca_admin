import { TextField } from "@mui/material";
import { updateFormValidation } from "api/services/forms";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, SubmitType } from "types";

interface Props extends DialogProps {
  data: any;
}

function EditFormValidation({ open, setOpen, data }: Props) {
  const snack = useSnack();
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    name: "",
    format: "",
    message: "",
  });

  useEffect(() => {
    setState({
      name: data.name || "",
      format: data.format || "",
      message: data.message || "",
    });
  }, [data]);

  const { mutate } = useMutation(updateFormValidation, {
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries("form-validations");
      snack.success("Form validation updated");
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
      id: data?._id,
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
          value={state.name}
          onChange={handleChange}
        />
        <TextField
          label="Validation Format"
          name="format"
          required
          size="small"
          sx={{ mt: 2 }}
          fullWidth
          value={state.format}
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
          value={state.message}
          required
          onChange={handleChange}
        />
        <LoadingButton
          loading={false}
          fullWidth
          sx={{ mt: 3 }}
          type="submit"
          loadingColor="white"
          title="Update Form Validation"
          color="secondary"
        />
      </form>
    </DrawerWrapper>
  );
}

export default EditFormValidation;
