import { Box } from "@mui/material";
import SearchContainer from "components/SearchContainer";

interface IProps {
  search: string;
  setSearch: (v: string) => void;
}

function ClientsHeader(props: IProps) {
  const { search, setSearch } = props;

  return (
    <Box
      mb={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <SearchContainer debounced value={search} onChange={setSearch} />
    </Box>
  );
}

export default ClientsHeader;
