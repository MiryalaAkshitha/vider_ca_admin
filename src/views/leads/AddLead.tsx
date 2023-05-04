import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createLead } from "api/services/clients/clients";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { CLIENT_CATEGORIES } from "data/constants";
import _ from "lodash";
import { useState } from "react";
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

let initialState = {
  category: "",
  subCategory: null,
  name: "",
  clientManager: "",
  mobileNumber: "",
  email: "",
  description: "",
};

function AddLead({ open, setOpen }: DialogProps) {
  
  const queryClient = useQueryClient();
  const [state, setState] = useState<StateProps>(_.cloneDeep(initialState));

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
      setState(_.cloneDeep(initialState));
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
    <DrawerWrapper open={open} setOpen={setOpen} title="Add New Lead">
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
          size="small"
          label="Display Name"
        />
        <TextField
          sx={{ mt: 3 }}
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
          name="mobileNumber"
          size="small"
          inputProps={{
            pattern: "[1-9]{1}[0-9]{9}",
            title: "Enter 10 digit mobile number",
          }}
          label="Mobile Number"
        />
        {/* <TextField
          sx={{ mt: 3 }}
          variant="outlined"
          fullWidth
          name="email"
          required
          type="email"
          onChange={handleChange}
          size="small"
          label="Email ID"
        /> */}
<TextField
  sx={{ mt: 3 }}
  variant="outlined"
  fullWidth
  name="email"
  required
  type="email"
  onChange={handleChange}
  size="small"
  inputProps={{
    pattern: "/^[^\s@]+@[^\s@]+\.[^\s@]+$/",
    title: "Enter a valid email address",
  }}
  label="Email ID"
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
