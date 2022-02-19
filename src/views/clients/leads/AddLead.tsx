import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createLead } from "api/services/client";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, SubmitType } from "types";
import { CLIENT_CATEGORIES } from "utils/constants";

interface StateProps {
  category: string;
  subCategory: string | null;
  name: string;
  clientManager: string;
  mobileNumber: string;
  email: string;
  description: string;
}

function AddLead({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<StateProps>({
    category: "",
    subCategory: null,
    name: "",
    clientManager: "",
    mobileNumber: "",
    email: "",
    description: "",
  });
  let formRef = useRef<HTMLFormElement>(null);

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

  const { mutate, isLoading } = useMutation(createLead, {
    onSuccess: (res) => {
      snack.success("Lead Created");
      queryClient.invalidateQueries("leads");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate(state);
  };

  let subCategories = CLIENT_CATEGORIES.find(
    (item) => item.value === state.category
  )?.subCategories;

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Add new lead">
      <form onSubmit={handleSubmit} ref={formRef}>
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
        />
        <TextField
          sx={{ mt: 3 }}
          variant="outlined"
          fullWidth
          name="description"
          required
          rows={4}
          multiline
          onChange={handleChange}
          size="small"
          label="Description"
        />
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Create Lead"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddLead;