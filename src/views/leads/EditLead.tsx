import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { updateLead } from "api/services/clients/clients";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { CLIENT_CATEGORIES } from "data/constants";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, SubmitType } from "types";

interface StateProps {
  category: string;
  subCategory: string | null;
  name: string;
  clientManager: string;
  mobileNumber: string;
  email: string;
  description: string;
}

interface Props extends DialogProps {
  data: any;
}

function EditLead({ open, setOpen, data }: Props) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<StateProps>({
    category: "",
    subCategory: null,
    name: "",
    clientManager: "",
    mobileNumber: "",
    email: "",
    description: "",
  });

  useEffect(() => {
    if (open) {
      setState(data);
    }
  }, [data, open]);

  const handleChange = (e: any) => {
    if (e.target.name === "category") {
      setState({
        ...state,
        category: e.target.value,
        subCategory: null,
      });
      return;
    }
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation(updateLead, {
    onSuccess: (res) => {
      snack.success("Lead Updated");
      queryClient.invalidateQueries("leads");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({ id: data?.id, data: state });
  };

  let subCategories = CLIENT_CATEGORIES.find(
    (item) => item.value === state?.category
  )?.subCategories;

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Edit Lead">
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          select
          value={state.category || ""}
          onChange={handleChange}
          required
          name="category"
          label="Category"
        >
          {CLIENT_CATEGORIES.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
        {subCategories && (
          <TextField
            variant="outlined"
            fullWidth
            required
            sx={{ mt: 3 }}
            name="subCategory"
            value={state.subCategory || ""}
            onChange={handleChange}
            size="small"
            select
            label="Sub Category"
          >
            {subCategories.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          sx={{ mt: 3 }}
          variant="outlined"
          fullWidth
          name="name"
          required
          onChange={handleChange}
          value={state.name}
          size="small"
          label="Name"
        />
        <TextField
          sx={{ mt: 3 }}
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
          name="mobileNumber"
          value={state.mobileNumber}
          size="small"
          label="Mobile Number"
        />
        <TextField
          sx={{ mt: 3 }}
          variant="outlined"
          fullWidth
          name="email"
          required
          type="email"
          onChange={handleChange}
          size="small"
          label="Email ID"
          value={state.email}
        />
        <TextField
          sx={{ mt: 3 }}
          variant="outlined"
          fullWidth
          name="description"
          rows={4}
          multiline
          onChange={handleChange}
          size="small"
          label="Description"
          value={state.description}
        />
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Update Lead"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default EditLead;
