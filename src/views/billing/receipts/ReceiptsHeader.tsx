import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import SearchContainer from "components/SearchContainer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Actions from "./Actions";

interface IProps {
  selected: any[];
  search: string;
  setSearch: (v: string) => void;
  clearSelection: () => void;
}

function ReceiptsHeader(props: IProps) {
  const { selected, search, setSearch, clearSelection } = props;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box
      mb={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <SearchContainer debounced value={search} onChange={setSearch} />
      <Box display="flex" gap={1}>
        <Button
          endIcon={<ArrowDropDownOutlinedIcon />}
          color="primary"
          variant="outlined"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          Actions
        </Button>
        <Button
          onClick={() => navigate("/billing/receipts/add")}
          variant="outlined"
          color="secondary"
          startIcon={<Add />}
        >
          Add Receipt
        </Button>
      </Box>
      <Actions
        clearSelection={clearSelection}
        selected={selected}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </Box>
  );
}

export default ReceiptsHeader;
