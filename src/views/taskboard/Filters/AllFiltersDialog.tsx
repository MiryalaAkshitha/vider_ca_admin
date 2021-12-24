import { Close } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { getLabels } from "api/services/labels";
import { getUsers } from "api/services/users";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import FilterContainer from "./FilterContainer";
import { getFilters } from "./getFilters";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface IState {
  [key: string]: Array<string>;
}

function AllFiltersDialog({ open, setOpen }: IProps) {
  const { queryParams, setQueryParams } = useQueryParams();
  const [selected, setSelected] = useState<string>("Completed on");
  const [state, setState] = useState<IState>({});

  // useEffect(() => {
  //   const result: IState = {};
  //   Object.keys(queryParams).forEach((key) => {
  //     result[key] = queryParams[key]?.split("|") || [];
  //   });
  //   setState(result);
  // }, [query]);

  const { data: labels, isLoading: labelsLoading }: ResType = useQuery(
    "labels",
    getLabels,
    { enabled: open }
  );

  const { data: users, isLoading: userLoading }: ResType = useQuery(
    "users",
    getUsers,
    { enabled: open }
  );

  const handleFilter = (e: any) => {
    const result = { ...state };
    if (e.target.checked) {
      result[selected] = [...(result[selected] || []), e.target.value];
    } else {
      result[selected] = result[selected].filter((v) => v !== e.target.value);
    }

    setState(result);
  };

  const applyFilters = () => {
    const result = {};
    Object.keys(state).forEach((key) => {
      result[key] = state[key].join("|");
    });
    setQueryParams(result);
  };

  const handleReset = () => {
    setQueryParams({});
    setOpen(false);
  };

  const filters = getFilters({ users, labels });

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
      {labelsLoading || userLoading ? (
        <Loader minHeight="400px" />
      ) : (
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
          }}
        >
          <Box
            width={200}
            sx={{ borderRight: "1px solid lightgrey", overflowY: "auto" }}
          >
            <List sx={{ p: 0 }}>
              {filters.map((filter, index: number) => (
                <ListItemButton
                  key={index}
                  selected={selected === filter.title}
                  onClick={() => setSelected(filter.title)}
                >
                  <Typography variant="body2" color="rgba(0,0,0,0.7)">
                    {filter.title}
                  </Typography>
                </ListItemButton>
              ))}
            </List>
          </Box>
          <Box sx={{ overflowY: "auto", p: 2, flex: 1 }}>
            <FilterContainer
              items={
                filters.find((filter) => filter.title === selected)!.options
              }
              onChange={handleFilter}
            />
          </Box>
        </Box>
      )}
      <AppBar
        position="static"
        color="transparent"
        sx={{ boxShadow: "none", borderTop: "1px solid lightgrey" }}
      >
        <Toolbar
          sx={{ justifyContent: "flex-end", gap: 2, alignItems: "center" }}
        >
          <Button onClick={handleReset} variant="outlined" color="secondary">
            Reset
          </Button>
          <Button onClick={applyFilters} variant="contained" color="secondary">
            Apply
          </Button>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
}

export default AllFiltersDialog;
