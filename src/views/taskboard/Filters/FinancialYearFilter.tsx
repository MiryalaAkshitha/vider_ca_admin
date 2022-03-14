import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCategories,
  selectTaskBoard,
} from "redux/reducers/taskboardSlice";

function FinancialYearFilter() {
  const dispatch = useDispatch();
  const { selectedFilters } = useSelector(selectTaskBoard);

  return (
    <>
      <Autocomplete
        sx={{ mt: 1 }}
        id="tags-standard"
        multiple
        onChange={(_, value) => {
          dispatch(handleCategories({ value: value, key: "financialYear" }));
        }}
        value={selectedFilters.financialYear || []}
        options={
          Array.from(Array(50).keys()).map((_, index) => ({
            label: `${2000 + index}-${2000 + index + 1}`,
            value: `${2000 + index}-${2000 + index + 1}`,
          })) || []
        }
        getOptionLabel={(option: any) => option?.label}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            variant="outlined"
            size="small"
            fullWidth
            label="Financial Year"
          />
        )}
      />
    </>
  );
}

export default FinancialYearFilter;
