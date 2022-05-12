import { Delete } from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { updateCategory } from "api/services/categories";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import UploadImage from "components/UploadImage";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import { Category } from "./CategoryCard";

interface StateProps {
  name: string;
  image: string | undefined | null;
  color: string | undefined;
  subCategories: Array<{ name: string }>;
}

interface EditCategoryProps extends DialogProps {
  data: Category;
}

function EditCategory({ open, setOpen, data }: EditCategoryProps) {
  const queryClient = useQueryClient();

  const [state, setState] = useState<StateProps>({
    name: "",
    image: "",
    color: "",
    subCategories: [],
  });
  const [subCategory, setSubCategory] = useState<string>("");

  useEffect(() => {
    setState({
      name: data.name,
      image: data.image,
      color: data.color,
      subCategories: data.subCategories,
    });
  }, [data]);

  const handleChange = (key: string, v: string) => {
    setState({ ...state, [key]: v });
  };

  const { mutate, isLoading } = useMutation(updateCategory, {
    onSuccess: () => {
      snack.success("Category Updated");
      setOpen(false);
      queryClient.invalidateQueries("categories");
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

  const deleteSubCategory = (index: any) => {
    let subCategories = [...state.subCategories];
    subCategories.splice(index, 1);
    setState({
      ...state,
      subCategories: subCategories,
    });
  };

  const handleSubmit = () => {
    if (!state.name) return snack.error("Name is required");
    mutate({
      id: data.id,
      data: state,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Edit Category">
      <TextField
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        fullWidth
        value={state.name}
        onChange={(e) => handleChange("name", e.target.value)}
        size="small"
        label="Name"
      />
      <UploadImage
        sx={{ mt: 2 }}
        name="image"
        onChange={(v) => handleChange("image", v)}
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
        value={state.color}
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
          title="Update"
          color="secondary"
        />
      </Box>
    </DrawerWrapper>
  );
}

export default EditCategory;
