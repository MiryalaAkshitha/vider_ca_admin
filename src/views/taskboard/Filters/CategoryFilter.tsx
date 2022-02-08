import { Autocomplete, TextField } from "@mui/material";
import { getCategories } from "api/services/categories";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCategories,
  selectTaskBoard,
} from "redux/reducers/taskboardSlice";
import { ResType } from "types";

function CategoryFilter() {
  const dispatch = useDispatch();
  const { selectedFilters } = useSelector(selectTaskBoard);

  const { data }: ResType = useQuery("categories", getCategories);

  let getSubCategories = (): any[] => {
    let result: any[] = [];
    selectedFilters.category.forEach((item: any) => {
      if (!item.subCategories) return;
      result = result.concat(item.subCategories);
    });
    return result?.flat()?.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));
  };

  const options = data?.data?.map((item: any) => ({
    label: item?.name,
    value: item?.id,
    subCategories: item?.subCategories,
  })) as Array<{ label: string; value: string }>;

  return (
    <>
      <Autocomplete
        id="tags-standard"
        multiple
        onChange={(_, value) => {
          dispatch(handleCategories({ value: value, key: "category" }));
        }}
        value={selectedFilters.category || []}
        options={options || []}
        getOptionLabel={(option: any) => option?.label}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            variant="outlined"
            size="small"
            fullWidth
            label="Category"
          />
        )}
      />
      {getSubCategories().length !== 0 && (
        <Autocomplete
          id="tags-standard"
          multiple
          onChange={(_, value) => {
            dispatch(handleCategories({ value: value, key: "subCategory" }));
          }}
          value={selectedFilters.subCategory || []}
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
              label="Sub Category"
            />
          )}
        />
      )}
    </>
  );
}

export default CategoryFilter;
