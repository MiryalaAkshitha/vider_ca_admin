import { IconButton, Typography, Box, Button, Grid } from "@mui/material";
import SearchContainer from "components/SearchContainer";
import { Add, MoreVert, Update } from "@mui/icons-material";
import InvoicePreview from "pages/billing/invoices/invoice-preview";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { getClients } from "api/services/clients/clients";
import FilterListIcon from "@mui/icons-material/FilterList";
import { StyledTaskBox } from "views/dashboard/OrgDashboard/styles";
import { StyledSelectBox } from "views/tasks/board/CreateTask/styles";
import { snack } from "components/toast";
import { handleError } from "utils/handleError";
import { getCommonBilling } from "api/services/reports";
import { useParams } from "react-router-dom";
import { getStatusColor } from "views/billing/estimates/getStatusColor";

import moment from "moment";
function Billing() {
  const params = useParams();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);
  const [selected, setSelected] = useState<any[]>([]);
  const [data, setData] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(0);

  const [filters, setFilters] = useState({
    category: [],
    subCategory: [],
    monthAdded: "",
    labels: [],
    search: "",
  });

  const { data: result, isLoading, error }: ResType = useQuery(
    ['clientinvoicebilling', {
      query: 'clientinvoicebilling',
      clientId: params.clientId, search
    }],
    getCommonBilling, {
    onSuccess: (res: any) => {
      setData(res?.data);
      setSelectedInvoice(res?.data[0]['id']);
      const statuses = res?.data.map((item) => item?.status);
      console.log(statuses, 'billing');
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleInvoice = (item: any) => {
    setSelectedInvoice(item?.id);   
  }

  const activeStyle = (type: any) => {
    let isActive = selectedInvoice == type?.id;
    return isActive ? "rgba(0,0,0,0.08)" : "";
  };


  return (
    <Box>
      <Box gap={5} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", width: "40%", flexDirection: "row", gap: "5px", marginBottom: "5px", alignItems: "center" }}>
          <SearchContainer value={search} onChange={setSearch} debounced />
        </Box>

      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

        <StyledTaskBox sx={{ width: "40%", height: "500px", marginBottom: "40px", overflow: "scroll" }}>
          <Button
            sx={{
              width: "100%",
              height: "70px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ fontcolor: "#1434A4" }}>
              <span style={{ color: "#1434A4", fontSize: "70" }}>Invoices</span>
            </Typography>
            <Typography variant="h6">
              <FilterListIcon />
            </Typography>
          </Button>
          {data.map((item: any) => (
            <Button
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                background: activeStyle(item)
              }}
              onClick={(e) => handleInvoice(item)}
            >
              <Typography>
                {moment(item.invoice_date).format("DD-MM-YYYY")}<br />
                <span style={{ color: "#1434A4", fontSize: "bold" }}> {item.invoice_number}</span>
              </Typography>
              <br />
              <Typography>
                <span style={{ color: "#1434A4", fontSize: "bold" }}> {item.grand_total} </span>
                <br />
                <span style={{color:getStatusColor(item?.status), fontSize: "bold" }}>{item.status == 'APPROVAL_PENDING' ? 'INVOICED' : item.status}</span>
              </Typography>
            </Button>
          ))}
        </StyledTaskBox>

        <iframe src={`/billing/invoices/${selectedInvoice}/preview?isIframe=true`}
          id="invoiceiframepreview"
          style={{ width: "60%", height: "500px", marginLeft: "15px", border: 0 }}></iframe>

      </Box>
    </Box>
  );
}

export default Billing;
