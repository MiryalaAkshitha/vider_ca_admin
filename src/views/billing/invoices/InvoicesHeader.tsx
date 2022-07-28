import { Add } from "@mui/icons-material";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import BrowserUpdatedOutlinedIcon from "@mui/icons-material/BrowserUpdatedOutlined";
import { Box, Button } from "@mui/material";
import { exportInvoices } from "api/services/billing/invoices";
import SearchContainer from "components/SearchContainer";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { handleError } from "utils/handleError";
import Actions from "./Actions";

interface IProps {
  selected: any[];
  search: string;
  setSearch: (v: string) => void;
  clearSelection: () => void;
}

function InvoicesHeader(props: IProps) {
  const { selected, search, setSearch, clearSelection } = props;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { mutate } = useMutation(exportInvoices, {
    onSuccess: (res: any) => {
      const arr = new Uint8Array(res.data?.data);
      const blob = new Blob([arr], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const pdf = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = pdf;
      link.download = "invoices.xlsx";
      link.click();
      snack.success("Invoices exported successfully");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleExport = () => {
    mutate();
  };

  return (
    <>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <SearchContainer debounced value={search} onChange={setSearch} />
        <Box display="flex" gap={1}>
          <Button
            onClick={handleExport}
            endIcon={<BrowserUpdatedOutlinedIcon fontSize="small" />}
            color="primary"
            variant="outlined"
          >
            Export
          </Button>
          <Button
            endIcon={<ArrowDropDownOutlinedIcon />}
            color="primary"
            variant="outlined"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Actions
          </Button>
          <Button
            onClick={() => navigate("/billing/invoices/add")}
            variant="outlined"
            color="secondary"
            startIcon={<Add />}
          >
            Add Invoice
          </Button>
        </Box>
      </Box>
      <Actions
        clearSelection={clearSelection}
        selected={selected}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
}

export default InvoicesHeader;
