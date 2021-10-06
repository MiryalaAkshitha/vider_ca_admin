import { Close, Delete } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { createCategory } from "api/categories";
import LoadingButton from "components/LoadingButton";
import UploadImage from "components/UploadImage";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

interface StateProps {
  name: string;
  image: string;
  subCategories: Array<{ name: string }>;
}

function AddCategory({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<StateProps>({
    name: "",
    image: "",
    subCategories: [],
  });
  const [subCategory, setSubCategory] = useState<string>("");

  const handleChange = (key: string, v: string) => {
    setState({ ...state, [key]: v });
  };

  const { mutate, isLoading } = useMutation(createCategory, {
    onSuccess: () => {
      snack.success("Category Created");
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

  const deleteSubCategory = (index: number) => {
    let subCategories = [...state.subCategories];
    let filteredCategories = subCategories.filter((_, i) => i !== index);
    setState({
      ...state,
      subCategories: filteredCategories,
    });
  };

  const handleSubmit = () => {
    const { name, image } = state;
    if (!name) return snack.error("Name is required");
    if (!image) return snack.error("Image is required");
    mutate(state);
  };

  return (
    <Drawer
      anchor='right'
      PaperProps={{ sx: { width: 550 } }}
      open={open}
      onClose={setOpen}>
      <AppBar position='static'>
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant='subtitle1'>Add Category</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        <TextField
          sx={{ mt: 2 }}
          variant='outlined'
          fullWidth
          onChange={(e) => handleChange("name", e.target.value)}
          size='small'
          label='Name'
        />
        <UploadImage
          sx={{ mt: 2 }}
          name='image'
          onChange={(v) => handleChange("image", v)}
        />
        <Box display='flex' gap={1} mt={3}>
          <TextField
            variant='outlined'
            fullWidth
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            size='small'
            label='Add Subcategory'
          />
          <Button
            onClick={addSubCategory}
            sx={{ minWidth: 80 }}
            variant='outlined'
            color='primary'>
            + Add
          </Button>
        </Box>
        <Box my={2}>
          {state.subCategories.map((item, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mt={1}
              gap={1}>
              <Typography variant='subtitle2'>
                {index + 1}. {item.name}
              </Typography>
              <IconButton size='small' onClick={() => deleteSubCategory(index)}>
                <Delete color='info' />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Box display='flex' justifyContent='flex-end' mt={3} gap={2}>
          <LoadingButton
            onClick={handleSubmit}
            loading={isLoading}
            fullWidth
            loadingColor='white'
            title='Save'
            color='secondary'
          />
        </Box>
      </Box>
    </Drawer>
  );
}

export default AddCategory;
