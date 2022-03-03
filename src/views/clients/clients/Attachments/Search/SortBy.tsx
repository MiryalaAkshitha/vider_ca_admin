import { TextField } from "@mui/material";
import useQueryParams from "hooks/useQueryParams";
import { useRef } from "react";

const SortBy = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const fieldRef = useRef<HTMLInputElement | null>(null);

  return (
    <TextField
      sx={{ minWidth: 100 }}
      value={queryParams.soryBy || ""}
      InputLabelProps={{ shrink: true }}
      onChange={(e) => {
        setQueryParams({
          ...queryParams,
          sortBy: e.target.value,
        });
      }}
      SelectProps={{
        native: true,
        autoWidth: true,
        onClose: () => {
          if (fieldRef.current) {
            fieldRef.current.blur();
          }
        },
      }}
      size="small"
      select
      label="Sort By"
    >
      <option value="">None</option>
      <option value="size_low_to_high">Size(low-high)</option>
      <option value="size_high_to_low">Size(high-low)</option>
      <option value="a_z">A-Z</option>
      <option value="z_a">Z-A</option>
      <option value="date_oldest">Date Oldest</option>
      <option value="date_newest">Date Newest</option>
    </TextField>
  );
};

export default SortBy;
