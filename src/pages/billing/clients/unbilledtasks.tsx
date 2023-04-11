import { Add } from "@mui/icons-material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Box, Button } from "@mui/material";
import { getClients } from "api/services/clients/clients";
import { getCommonBilling } from "api/services/reports";
import SearchContainer from "components/SearchContainer";
import Table, { ColumnType } from "components/Table";
import { snack } from "components/toast";
import useTitle from "hooks/useTitle";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import Actions from "views/clients/Actions";
// interface IProps {
//     search: string;
//     setSearch: (v: string) => void;
//   }
function UnBilledTasks() {
    // const { search, setSearch } = props;
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
        name: [],
        search: "",
    });

    const { data: result, isLoading, error }: ResType = useQuery(
        ['clientinvoiceunbilled', {
            query: 'clientinvoiceunbilled',
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
    // if (query.search) {
        // receipts = receipts.andWhere('client.displayName LIKE :search', {
        //   search: `%${query.search}%`,
//         });
//       }
    return (
        // <Box px={3} pt={3}>
        //     <Box display="flex" gap={2}>
        //         <Box display="flex" flex={1} gap={2} alignItems="center">
        <>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                <SearchContainer value={search} onChange={setSearch} debounced/>

                    
                
                     <Button
                        onClick={() => navigate("/billing/invoices/add")}
                        variant="outlined"
                        color="secondary"
                        startIcon={<Add />}
                    > Add New Invoice
                    </Button> 
                   
                </Box>

                <Table
                    sx={{ mt: 3 }}
                    loading={isLoading}
                    data={data || []}
                    columns={Columns}
                    selection={{ selected, setSelected }}
                    // pagination={{ totalCount, page, setPage, pageCount, setPageCount }}
                    />
</>
    );
}

const Columns: Array<ColumnType> = [
    {key:"tasknumber", title: "Task ID"},
    { key: "name", title: "Task Name" },
    { key: "status", title: "Task Status" },
    { key: "fee_amount", title: "Fee" },
    {key : "additional" , title :" Additional Charges"},
    {key : "pureagent", title :"Pure Agent"}

];

export default UnBilledTasks;
