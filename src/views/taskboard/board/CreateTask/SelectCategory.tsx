import { Autocomplete, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { RecurringStateProps } from "./types";

interface IProps {
  state: RecurringStateProps;
  setState: Dispatch<SetStateAction<RecurringStateProps>>;
  categories: any;
}

function SelectCategory({ state, setState, categories }: IProps) {
  const subCategories = categories?.find(
    (item: any) => item.id === state.category?.id
  )?.subCategories;

  return (
    <>
      <Autocomplete
        id="tags-standard"
        onChange={(_, value) => {
          setState({ ...state, category: value });
        }}
        sx={{ mt: 3 }}
        options={categories || []}
        value={state.category}
        getOptionLabel={(option: any) => option?.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
            fullWidth
            label="Category"
          />
        )}
      />
      {subCategories?.length ? (
        <Autocomplete
          id="tags-standard"
          onChange={(_, value) => {
            setState({ ...state, subCategory: value });
          }}
          options={subCategories || []}
          value={state.subCategory}
          sx={{ mt: 3 }}
          getOptionLabel={(option: any) => option?.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              size="small"
              fullWidth
              label="Sub Category"
            />
          )}
        />
      ) : null}
    </>
  );
}

export default SelectCategory;
