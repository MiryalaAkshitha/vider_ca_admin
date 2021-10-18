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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilters,
  handleFilter,
  resetFilters,
  selectClient,
} from "redux/reducers/clientSlice";
import { DialogProps } from "types";

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
    setOpen(false);
    dispatch(resetFilters());
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setOpen(false);
    dispatch(applyFilters());
  };

  return (
    <Drawer
      anchor='right'
      PaperProps={{ sx: { width: 450 } }}
      open={open}
      onClose={setOpen}>
      <AppBar position='static'>
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant='subtitle1'>Filters</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        <TextField
          sx={{ mt: 3 }}
          variant='outlined'
          fullWidth
          onChange={handleChange}
          value={filter.monthAdded}
          name='monthAdded'
          required
          InputLabelProps={{ shrink: true }}
          size='small'
          label='Month Added'
          type='month'
        />
        <TextField
          sx={{ mt: 2 }}
          variant='outlined'
          fullWidth
          onChange={handleChange}
          value={filter.clientType}
          size='small'
          select
          required
          name='clientType'
          label='Client Type'>
          <MenuItem value='company'>Company</MenuItem>
          <MenuItem value='individual'>Individual</MenuItem>
        </TextField>
        {filter.clientType == "company" && (
          <TextField
            sx={{ mt: 3 }}
            variant='outlined'
            fullWidth
            value={filter.companyType}
            onChange={handleChange}
            required
            name='companyType'
            size='small'
            select
            label='Company Type'>
            <MenuItem value='Private Limited Company'>
              Private Limited Company
            </MenuItem>
            <MenuItem value='Public Limited Company'>
              Public Limited Company
            </MenuItem>
          </TextField>
        )}
        <Box display='flex' gap={2} justifyContent='flex-end'>
          <Button
            onClick={handleResetFilters}
            sx={{ mt: 3 }}
            variant='outlined'
            color='secondary'
            type='submit'>
            Reset
          </Button>
          <Button
            sx={{ mt: 3 }}
            variant='contained'
            onClick={handleSubmit}
            color='secondary'
            type='submit'>
            Apply
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default ClientFilter;
