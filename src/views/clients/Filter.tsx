import { AppBar, Autocomplete, Button, Dialog, IconButton, List, ListItemButton, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getLabels } from "api/services/labels";
import DrawerWrapper from "components/DrawerWrapper";
import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { DataResponse, DialogProps } from "types";
import { CLIENT_CATEGORIES } from "data/constants";
import { Close } from "@mui/icons-material";
import Loader from "components/Loader";

interface ClientFilterProps extends DialogProps {
  filters: any;
  setFilters: (v: any) => void;
}

function ClientFilter(props: ClientFilterProps) {
  const { open, setOpen, filters, setFilters } = props;

  const { data: labels, isLoading: labelsLoading }: UseQueryResult<DataResponse, Error> = useQuery(
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
    let result: any[] = [];
    state.category.forEach((item: any) => {
      if (!item.subCategories) return;
      result = result.concat(item.subCategories);
    });
    return result?.flat();
  };

  return (
    <Dialog
      sx={{ alignItems: "flex-start", maxHeight: 600 }}
      fullWidth
      maxWidth="sm"
      open={open}
      PaperProps={{
        elevation: 0,
        sx: { display: "flex", flexDirection: "column" },
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        sx={{ boxShadow: "none", borderBottom: "1px solid lightgrey" }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1">Filters</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close color="primary" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {labelsLoading ? (
        <Loader minHeight="400px" />
      ) : (
        <>

          <Box sx={{ overflowY: "auto", mt: 2, pt: 1, px: 2, pb: 4, flex: 1 }}>


            <TextField
              variant="outlined"
              fullWidth
              onChange={(e) => {
                setState({
                  ...state,
                  monthAdded: [e.target.value],
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

          </Box>

        </>

      )}

      <AppBar
        position="static"
        color="transparent"
        sx={{ boxShadow: "none", mb: 2, borderTop: "1px solid lightgrey" }}
      >
        <Toolbar sx={{ justifyContent: "flex-end", gap: 2, alignItems: "center" }}>

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

        </Toolbar>
      </AppBar>

    </Dialog>
  );
}

export default ClientFilter;
