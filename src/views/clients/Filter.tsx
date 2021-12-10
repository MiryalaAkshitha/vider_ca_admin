import { Close } from "@mui/icons-material";
import {
  AppBar,
  Autocomplete,
  Button,
  Drawer,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getLabels } from "api/services/labels";
import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { DataResponse, DialogProps } from "types";
import { CLIENT_CATEGORIES } from "utils/constants";

interface ClientFilterProps extends DialogProps {
  filters: any;
  setFilters: (v: any) => void;
}

function ClientFilter(props: ClientFilterProps) {
  const { open, setOpen, filters, setFilters } = props;

  const { data: labels }: UseQueryResult<DataResponse, Error> = useQuery(
    "labels",
    getLabels
  );

  const [state, setState] = useState<any>({
    category: [],
    subCategory: [],
    monthAdded: "",
    labels: [],
  });

  useEffect(() => {
    if (!open) return;
    setState({
      ...filters,
    });
  }, [open, filters]);

  const handleResetFilters = () => {
    setFilters({
      ...filters,
      category: [],
      subCategory: [],
      monthAdded: "",
      labels: [],
    });
    setOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setOpen(false);
    setFilters({
      ...filters,
      ...state,
    });
  };

  let getSubCategories = (): any[] => {
    let result = [];
    state.category.forEach((item: any) => {
      if (!item.subCategories) return;
      result = result.concat(item.subCategories);
    });
    return result?.flat();
  };

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
          onChange={(e) => {
            setState({
              ...state,
              monthAdded: e.target.value,
            });
          }}
          value={state.monthAdded}
          name="monthAdded"
          required
          InputLabelProps={{ shrink: true }}
          size="small"
          label="Month Added"
          type="month"
        />
        <Autocomplete
          id="tags-standard"
          multiple
          onChange={(_, value) => {
            setState({
              ...state,
              category: value,
            });
          }}
          value={state.category || []}
          options={CLIENT_CATEGORIES || []}
          sx={{ mt: 3 }}
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
              setState({
                ...state,
                subCategory: value,
              });
            }}
            value={state.subCategory || []}
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
        <Autocomplete
          id="tags-standard"
          multiple
          onChange={(_, value) => {
            setState({
              ...state,
              labels: value,
            });
          }}
          value={state.labels || []}
          options={labels?.data || []}
          sx={{ mt: 3 }}
          getOptionLabel={(option: any) => option?.name}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              variant="outlined"
              size="small"
              fullWidth
              label="Labels"
            />
          )}
        />
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
