import { MenuItem, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { RecurringStateProps } from "types/createTask.types";

interface IProps {
  state: RecurringStateProps;
  setState: Dispatch<SetStateAction<RecurringStateProps>>;
  categories: any;
}

function SelectCategory({ state, setState, categories }: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  let subCategories = categories?.find(
    (item: any) => item.id === state.category
  )?.subCategories;

  return (
    <>
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        sx={{ mt: 3 }}
        onChange={handleChange}
        select
        required
        value={state.category || ""}
        name="category"
        label="Category"
      >
        {categories?.map((item: any, index: number) => (
          <MenuItem value={item.id} key={index}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
      {subCategories?.length ? (
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          sx={{ mt: 3 }}
          select
          required
          value={state.subCategory || ""}
          onChange={handleChange}
          name="subCategory"
          label="Sub Category"
        >
          {subCategories?.map((item: any, index: number) => (
            <MenuItem key={index} value={item?.id}>
              {item?.name}
            </MenuItem>
          ))}
        </TextField>
      ) : null}
    </>
  );
}

export default SelectCategory;
