import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { getTitle } from "utils";

interface FilterProps {
  items: Array<{ label: string; value: string }>;
  onChange: (value: any) => void;
}

const FilterContainer = ({ items, onChange }: FilterProps) => {
  return (
    <Box minWidth={300}>
      {items.map((item, index: number) => (
        <div key={index}>
          <FormControlLabel
            control={
              <Checkbox value={item.value} onChange={(e) => onChange(e)} />
            }
            label={getTitle(item.label)}
          />
        </div>
      ))}
    </Box>
  );
};

export default FilterContainer;
