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
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  handleApply,
  handleSelected,
  resetFilters,
  selectTaskBoard,
} from "redux/reducers/taskboardSlice";
import { ResType } from "types";
import CategoryFilter from "./CategoryFilter";
import ClientCategoryFilter from "./ClientCategoryFilter";
import FilterContainer from "./FilterContainer";
import { getFilters } from "./getFilters";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function AllFiltersDialog({ open, setOpen }: IProps) {
  const dispatch = useDispatch();
  const { selected } = useSelector(selectTaskBoard);

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

  const applyFilters = () => {
    dispatch(handleApply());
    setOpen(false);
  };

  const handleReset = () => {
    dispatch(resetFilters());
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
              <ListItemButton
                selected={selected === "category"}
                onClick={() => dispatch(handleSelected("category"))}
              >
                <Typography variant="body2" color="rgba(0,0,0,0.7)">
                  Category
                </Typography>
              </ListItemButton>
              <ListItemButton
                selected={selected === "clientCategory"}
                onClick={() => dispatch(handleSelected("clientCategory"))}
              >
                <Typography variant="body2" color="rgba(0,0,0,0.7)">
                  Client Category
                </Typography>
              </ListItemButton>
              {filters.map((filter) => (
                <ListItemButton
                  key={filter.key}
                  selected={selected === filter.key}
                  onClick={() => dispatch(handleSelected(filter.key))}
                >
                  <Typography variant="body2" color="rgba(0,0,0,0.7)">
                    {filter.title}
                  </Typography>
                </ListItemButton>
              ))}
            </List>
          </Box>
          <Box sx={{ overflowY: "auto", pt: 1, px: 2, pb: 4, flex: 1 }}>
            {filters.map((filter) => {
              if (selected === filter.key) {
                return (
                  <FilterContainer key={filter.key} items={filter.options} />
                );
              }
              return null;
            })}
            {selected === "category" && <CategoryFilter />}
            {selected === "clientCategory" && <ClientCategoryFilter />}
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
