import { Add } from "@mui/icons-material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { getClients } from "api/services/clients/clients";
import { getCommonBilling } from "api/services/reports";
import SearchContainer from "components/SearchContainer";
import Table, { ColumnType } from "components/Table";
import { snack } from "components/toast";
import useTitle from "hooks/useTitle";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useConfirm } from "context/ConfirmDialog";

function ClientReceipts() {
    useTitle("Clients");
    const params = useParams();

    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState<number>(0);
    const [payload, setPayload] = useState({});
    const [data, setData] = useState();
    const [pageCount, setPageCount] = useState<number>(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selected, setSelected] = useState<any[]>([]);
    const [filters, setFilters] = useState({
        category: [],
        subCategory: [],
        monthAdded: "",
        labels: [],
    });

    const { data: result, isLoading, error }: ResType = useQuery(
        ['clientinvoicereceipts', {
            query: 'clientinvoicereceipts',
            clientId: params.clientId,search
        }],
        getCommonBilling, {
        onSuccess: (res: any) => {
            setData(res?.data);
        },
        onError: (err: any) => {
            snack.error(handleError(err));
        },
    });

    return (
       <>
                <Box display="flex" flex={1} gap={2} alignItems="center">
                <SearchContainer value={search} onChange={setSearch} debounced/>

                <Box display="flex" gap={2}>
                    {selected.length > 0 && (
                        <Button
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            variant="outlined"
                            color="secondary"
                            endIcon={<KeyboardArrowDownOutlinedIcon />}
                        >
                            Actions
                        </Button>
                    )}
                   
                </Box>
            </Box>
                <Table
                    sx={{ mt: 3 }}
                    loading={isLoading}
                    data={data || []}
                    columns={Columns}
                // pagination={{ page, setPage, pageCount, setPageCount }}
                />

        </>
    );
}

const Columns: Array<ColumnType> = [
    { key: "receipt_number", title: "Receipt Number" },
    { key: "receipt_date", title: "Receipt Date" },
    {key : "payment_mode", title: "Payment Mode"},
    {key : "amount", title: "Amount"},
    {key :"created_at" ,title :" Created Date"}
    


];
const Actions = ({ data }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const confirm = useConfirm();
  
    const { mutate } = useMutation({
      onSuccess: () => {
        snack.success("Billing entity removed");
        setAnchorEl(null);
        queryClient.invalidateQueries("billing-entities");
      },
      onError: (err: any) => {
        snack.error(err.response.data.message);
        setAnchorEl(null);
      },
    });
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleSendRemainder = () => {
        console.log("send Remainder")
    };
   const handleGenerateReceipt = () => {
    console.log("generate receipt")
   }
  
    return (
      <>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setAnchorEl(e.currentTarget);
          }}
        >
          <MoreVertOutlinedIcon color="primary" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClick={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleSendRemainder}>Send Reminder</MenuItem>
          <MenuItem onClick={handleGenerateReceipt}>Generate Receipt</MenuItem>

          {/* <MenuItem onClick={handleDelete}>Delete</MenuItem> */}
        </Menu>
      </>
    );
  };
export default ClientReceipts;
