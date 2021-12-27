import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTaskBoard } from "redux/reducers/taskboardSlice";
import { getTitle } from "utils";

interface FilterProps {
  items: Array<{ label: string; value: string }>;
  onChange: (value: any) => void;
}

const FilterContainer = ({ items, onChange }: FilterProps) => {
  const { appliedFilters, selected } = useSelector(selectTaskBoard);
  return (
    <Box minWidth={300}>
      {items.map((item, index: number) => (
        <div key={index}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={appliedFilters[selected]?.includes(item.value)}
                value={item.value}
                onChange={(e) => onChange(e)}
              />
            }
            label={getTitle(item.label)}
          />
        </div>
      ))}
    </Box>
  );
};

export default FilterContainer;
