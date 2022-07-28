import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import SearchContainer from "components/SearchContainer";
import { useNavigate } from "react-router-dom";

interface IProps {
  search: string;
  setSearch: (v: string) => void;
}

function ReceiptsHeader(props: IProps) {
  const { search, setSearch } = props;
  const navigate = useNavigate();

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
          onClick={() => navigate("/billing/receipts/add")}
          variant="outlined"
          color="secondary"
          startIcon={<Add />}
        >
          Add Receipt
        </Button>
      </Box>
    </Box>
  );
}

export default ReceiptsHeader;
