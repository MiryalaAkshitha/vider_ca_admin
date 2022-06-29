import { Delete } from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createCategory } from "api/services/categories";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

interface StateProps {
  name: string;
  color: string;
  subCategories: Array<{ name: string }>;
}

let initialState = {
  name: "",
  color: "",
  subCategories: [],
};

function AddCategory({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<StateProps>(_.cloneDeep(initialState));
  const [subCategory, setSubCategory] = useState<string>("");

  const handleChange = (key: string, v: string) => {
    setState({ ...state, [key]: v });
  };

  const { mutate, isLoading } = useMutation(createCategory, {
    onSuccess: () => {
      snack.success("Category Created");
      queryClient.invalidateQueries("categories");
      setState(_.cloneDeep(initialState));
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const addSubCategory = () => {
    if (!subCategory) return snack.error("Enter Subcategory");
    setState({
      ...state,
      subCategories: [...state.subCategories, { name: subCategory }],
    });
    setSubCategory("");
  };

  const deleteSubCategory = (index: number) => {
    let subCategories = [...state.subCategories];
    let filteredCategories = subCategories.filter((_, i) => i !== index);
    setState({
      ...state,
      subCategories: filteredCategories,
    });
  };

  const handleSubmit = () => {
    if (!state.name) return snack.error("Name is required");
    mutate(state);
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Add Category">
      <TextField
        variant="outlined"
        fullWidth
        onChange={(e) => handleChange("name", e.target.value)}
        size="small"
        label="Name"
      />
      <Box display="flex" gap={1} mt={3}>
        <TextField
          variant="outlined"
          fullWidth
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          size="small"
          label="Add Subcategory"
        />
        <Button
          onClick={addSubCategory}
          sx={{ minWidth: 80 }}
          variant="outlined"
          color="primary"
        >
          + Add
        </Button>
      </Box>
      <Box my={2}>
        {state.subCategories.map((item, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
            gap={1}
          >
            <Typography variant="subtitle2">
              {index + 1}. {item.name}
            </Typography>
            <IconButton size="small" onClick={() => deleteSubCategory(index)}>
              <Delete color="info" />
            </IconButton>
          </Box>
        ))}
      </Box>
      <TextField
        sx={{ mt: 2, minWidth: 200 }}
        InputProps={{ sx: { padding: "0px" } }}
        variant="outlined"
        size="small"
        onChange={(e) => handleChange("color", e.target.value)}
        label="Choose Color"
        name="color"
        type="color"
        required
      />
      <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
        <LoadingButton
          onClick={handleSubmit}
          loading={isLoading}
          fullWidth
          loadingColor="white"
          title="Create Category"
          color="secondary"
        />
      </Box>
    </DrawerWrapper>
  );
}

export default AddCategory;
