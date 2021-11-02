import { Close } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilters,
  handleFilter,
  resetFilters,
  selectClient,
} from "redux/reducers/clientSlice";
import { DialogProps } from "types";
import { CLIENT_CATEGORIES } from "utils/constants";

function ClientFilter({ open, setOpen }: DialogProps) {
  const dispatch = useDispatch();
  const { filter } = useSelector(selectClient);

  const handleChange = (e: any) => {
    dispatch(
      handleFilter({
        key: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(applyFilters());
    setOpen(false);
  };

  let subCategories = CLIENT_CATEGORIES.find(
    (item) => item.value === filter.category
  )?.subCategories;

  return (
    <Drawer
      anchor="right"
      PaperProps={{ sx: { width: 450 } }}
      open={open}
      onClose={setOpen}
    >
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1">Filters</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        <TextField
          sx={{ mt: 3 }}
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={filter.monthAdded}
          name="monthAdded"
          required
          InputLabelProps={{ shrink: true }}
          size="small"
          label="Month Added"
          type="month"
        />
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          sx={{ mt: 3 }}
          select
          onChange={handleChange}
          value={filter?.category ?? ""}
          required
          name="category"
          label="Category"
        >
          {CLIENT_CATEGORIES.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
        {subCategories && (
          <TextField
            variant="outlined"
            fullWidth
            required
            sx={{ mt: 3 }}
            name="subCategory"
            onChange={handleChange}
            size="small"
            value={filter?.subCategory || ""}
            select
            label="Sub Category"
          >
            {subCategories.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        )}
        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button
            onClick={handleResetFilters}
            sx={{ mt: 3 }}
            variant="outlined"
            color="secondary"
            type="submit"
          >
            Reset
          </Button>
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={handleSubmit}
            color="secondary"
            type="submit"
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default ClientFilter;
