import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCategories,
  selectTaskBoard,
} from "redux/reducers/taskboardSlice";
import { CLIENT_CATEGORIES } from "data/constants";

function ClientCategoryFilter() {
  const dispatch = useDispatch();
  const { selectedFilters } = useSelector(selectTaskBoard);

  let getSubCategories = (): any[] => {
    let result: any[] = [];

    selectedFilters.clientCategory.forEach((item: any) => {
      if (!item.subCategories) return;
      result = result.concat(item.subCategories);
    });

    return result?.flat();
  };

  return (
    <>
      <Autocomplete
        id="tags-standard"
        multiple
        onChange={(_, value) => {
          dispatch(handleCategories({ value: value, key: "clientCategory" }));
        }}
        value={selectedFilters.clientCategory || []}
        options={CLIENT_CATEGORIES || []}
        getOptionLabel={(option: any) => option?.label}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            variant="outlined"
            size="small"
            fullWidth
            label="Client Category"
          />
        )}
      />
      {getSubCategories().length !== 0 && (
        <Autocomplete
          id="tags-standard"
          multiple
          onChange={(_, value) => {
            dispatch(
              handleCategories({ value: value, key: "clientSubCategory" })
            );
          }}
          value={selectedFilters.clientSubCategory || []}
          options={getSubCategories() || []}
          sx={{ mt: 3 }}
          getOptionLabel={(option: any) => option?.label}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              variant="outlined"
              size="small"
              fullWidth
              label="Client Sub Category"
            />
          )}
        />
      )}
    </>
  );
}

export default ClientCategoryFilter;
