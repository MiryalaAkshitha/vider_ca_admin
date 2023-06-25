import { Add, Close } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
//import ImportExportIcon from "@mui/icons-material/ImportExport";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button, Switch, Typography } from "@mui/material";
//import { getClients } from "api/services/clients/clients";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import Table, { ColumnType, ExtendedColumnType } from "components/Table";
import ValidateAccess from "components/ValidateAccess";
import { CLIENT_CATEGORIES } from "data/constants";
import { Permissions } from "data/permissons";
import useTitle from "hooks/useTitle";
import _ from "lodash";
import moment from "moment";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { getTitle } from "utils";
import Actions from "views/clients/Actions";
import AddClient from "views/clients/AddClient";
import CustomizeColumns from "views/clients/CustomizeColumns";
import ClientFilter from "views/clients/Filter";
import ImportClients from "views/clients/ImportClients";
import AppliedFilters from "views/tasks/Filters/ApplidedFilters";
import { StyledAppliedFilterItem } from "views/tasks/Filters/styles";
import { resetFilters } from "redux/reducers/taskboardSlice";
import { useDispatch } from "react-redux";
import { clearPending, createGstrPromiseClient, getGstr1 } from "api/services/clients/gstr-clients";
import PeriodSelect from "./PeriodSelect";
import AddGstRecord from "./AddGstRecord";
import { snack } from "components/toast";
import { boolean, number } from "yup";

function Gstr3b() {
    useTitle("Gstr");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(10);
    // const [openImportDialog, setOpenImportDialog] = useState<boolean>(false);
    const [openCustomColumns, setOpenCustomColumns] = useState<boolean>(false);
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [clients, setClients] = useState<any[]>([]);
    const [forGstr, setForGstr] = useState<any[]>([]);
    const [selected, setSelected] = useState<any[]>([]);
    const [columns, setColumns] = useState(_.cloneDeep(defaultColumns));
    const [filters, setFilters] = useState({


        monthAdded: "",
        labels: [],
        search: "",
    });
    const [period, setTimePeriod] = useState("");
    const [financialYear, setFinancialYear] = useState("");
    const [month, setMonth] = useState(Number);
    const queryClient = useQueryClient();
    const [tableData, setTableData] = useState<any[]>([]);
    const [forPromise, setForPromise] = useState<any[]>([]);
    const [forLoading, searchForLoading] = useState(false);
    const [excludes, setExcludes] = useState<any[]>([]);




    useEffect(() => {
        return () => {
            dispatch(resetFilters());
        };
    }, []);

    const { data, isLoading }: ResType = useQuery(
        [
            "clients",
            {
                limit: pageCount,
                offset: page * pageCount,
                query: {
                    ...filters,


                    labels: filters.labels.map((c: any) => c?.id),
                },
                type: "GSTR-3B"
            },
        ],
        getGstr1, {
        onSuccess: (res: any) => {

            const result = partition(res?.data?.result, (el: any) => el.status === 'INACTIVE')

            if (period === "") {
                const clientDetails = result.map(singleDetails => {
                    const a = singleDetails.client
                    let gstrData = "Pending"
                    let dateOfFiling = "---"
                    let arn = "---"
                    return {
                        ...a,
                        gstrData,
                        dateOfFiling,
                        arn

                    }
                })
                setTableData(clientDetails)

            } else {
                const date = period.split(" ");
                const dateFormate = date.join("-");
                const clientDetails = result.map(singleClient => {
                    let gstrData = "Pending";
                    let dateOfFiling = "---";
                    let arn = "---"
                    const a = singleClient.client;

                    if (excludes.includes(singleClient.client.id)) {
                        gstrData = "Not Selected";

                    } else {





                        let dateDateFormate = "---";
                        let arnNumber = "---"
                        const exactArray = singleClient?.gstrData?.find(item => {
                            dateDateFormate = item?.dof;
                            const dateFormate1 = dateDateFormate?.slice(-7);
                            const returnType = "GSTR1"

                            arnNumber = item?.arn

                            return (dateFormate1 === dateFormate && returnType === item?.rtntype)

                        })
                        if (exactArray) {
                            gstrData = "Filled";
                            dateOfFiling = dateDateFormate;
                            arn = arnNumber;

                        }
                    }




                    return {
                        ...a,
                        gstrData,
                        dateOfFiling,
                        arn

                    }



                })
                setTableData(clientDetails)
            }





            setClients(result);

            setForGstr(result);


        }
    });


    const partition = (arr: any, condition: any) => {
        const actives = arr.filter((el: any) => condition(el));
        const inactives = arr.filter((el: any) => !condition(el));
        return [...inactives, ...actives];
    };



    const onRemoveFilter = (filterKey: any, filterItemIndex: any) => {
        const appliedFilters = JSON.parse(JSON.stringify(filters))[filterKey].filter(
            (item: any, index: number) => index !== filterItemIndex
        );
        setFilters({
            ...filters,
            [filterKey]: appliedFilters
        });
    }


    const totalCount = data?.data?.count;

    const getfilterkeys = (filters: any) => {
        const obj = getfilterkeysObj(filters);
        return Object.keys(obj);
    }

    const getfilterkeysObj = (filters: any) => {
        const obj = JSON.parse(JSON.stringify(filters));
        delete obj?.search;
        delete obj?.monthAdded;
        return obj;
    }
    const getValues = (row: any, event: any) => {
        const gstrClientIs = forGstr?.map(item => item?.client?.id)
        console.log(row)
        const rowId = row?.id;
        const excludeValues = [...excludes, rowId];
        setExcludes(excludeValues)

        if (gstrClientIs.includes(rowId)) {
            const filterGstrClientValues = forGstr.filter((rows) => rows?.client?.["id"] !== rowId);
            setForGstr(filterGstrClientValues)
        } else {
            const addGstrClientValues = [...forGstr, row]
            setForGstr(addGstrClientValues);
        }
    };

    const { mutate, isLoading: loading } = useMutation(createGstrPromiseClient, {
        onSuccess: (res) => {

            setTimeout(() => {


                snack.success("Sync is successfull");
                searchForLoading(false);


            }, 40000)

        },
        onError: (err: any) => {
            snack.error(err.response.data.message);
        },
    });





    const getGstReturnClients = () => {




        mutate({
            month,
            financialYear,
            forPromise
        });

    };





    const { data: forLoad, isLoading: load }: ResType = useQuery(

        "promise",
        clearPending, {
        onSuccess: (res) => {
            queryClient.invalidateQueries("clients");
            searchForLoading(false);

        }
    })



    const handleAnotherClick = () => {
        queryClient.invalidateQueries("promise");
        searchForLoading(true);


    }




    const setPeriod = (e: any) => {



        const date = e.split(" ");


        let month: number = parseInt(date[0]);



        let year: number = parseInt(date[1]);
        if (month === 0) {
            month = 12;
            year -= 1
        }

        if (month >= 1 && month <= 3) {

            const firstYear = year - 1;
            const lastYear = year.toString().slice(-2);
            const financialYear = `${firstYear}-${lastYear}`;
            setFinancialYear(financialYear);
            setMonth(month);

        } else {

            const firstYear = year
            const lastYear = (year + 1).toString().slice(-2);
            const financialYear = `${firstYear}-${lastYear}`;

            setFinancialYear(financialYear);
            setMonth(month)

        }
        setTimePeriod(e);

        let dateFormate = date.join("-");
        const months = parseInt(dateFormate.slice(0, 2))
        const years = parseInt(dateFormate.slice(-4))

        if (months === 0) {
            dateFormate = `12-${years - 1}`
        }



        const clientDetails = clients.map(singleClient => {
            let gstrData = "clicks";
            let dateOfFiling = "---";
            let arn = "---"
            let dateDateFormate = "---";
            let arnNumber = "---"
            let a = singleClient.client;
            if (excludes.includes(singleClient?.client?.id)) {
                gstrData = "Not Selected";




            } else {



                a = singleClient.client;
                gstrData = "click Sync All to get latest data";
                dateOfFiling = "---"
                arn = "---"
                dateDateFormate = "---";
                arnNumber = "---"
                let exactArray = singleClient?.gstrData?.find(item => {
                    dateDateFormate = item?.dof;
                    const dateFormate1 = dateDateFormate?.slice(-7);
                    const returnType = "GSTR1"

                    arnNumber = item?.arn


                    return (dateFormate1 === dateFormate && returnType === item?.rtntype)

                })

                if (exactArray) {
                    gstrData = "Filled";
                    dateOfFiling = dateDateFormate;
                    arn = arnNumber;

                }

            }



            return {
                ...a,
                gstrData,
                dateOfFiling,
                arn

            }



        })

        setTableData(clientDetails);
        const forPromise = tableData.filter(singleClient => {
            const status = singleClient.gstrData;
            return status === "Pending"
        })


        const clientIds = clientDetails.map(item => item.id)
        const gstNumbers = clientDetails.map(item => item.gstNumber)
        const newArray: any = []
        for (let i of forGstr) {
            console.log(i)
            for (let j of forPromise) {
                if (i?.client?.gstNumber === j?.gstNumber && i?.client?.id === j?.id) {
                    newArray.push(i)
                }
            }
        }




        setForPromise(newArray)



    }





    return (
        <Box p={3} >
            <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                    <b>Period</b>&nbsp;&nbsp;
                    <PeriodSelect setPeriod={setPeriod} />&emsp;
                    <SearchContainer
                        value={filters.search}
                        debounced
                        minWidth="200px"
                        onChange={(v) => {
                            setFilters({
                                ...filters,
                                search: v,
                            });
                        }}
                        placeHolder="Search by Display Name | Trade Name"
                    />
                </Box>
                <Box>
                    <Button variant="outlined" startIcon={<Add />} onClick={() => setOpen(true)} >
                        Add Record
                    </Button>&emsp;&emsp;
                    {period ? <Button
                        size="large"
                        color="secondary"
                        variant="contained"
                        onClick={() => { getGstReturnClients(); handleAnotherClick(); }}
                    >
                        Sync All
                    </Button> : <Button
                        variant="outlined"
                        disabled
                    >
                        Sync All
                    </Button>}
                </Box>
            </Box>
            <Table
                sx={{ mt: 3 }}
                loading={!isLoading ? forLoading : true}



                getValues={getValues}

                data={tableData || []}
                columns={columns}

                pagination={{ totalCount, page, setPage, pageCount, setPageCount }}
            />

            <AddGstRecord open={open} setOpen={setOpen} setClientList={setClients} clientList={forGstr} title="Add GSTR-3B Record" />

        </Box >
    );
}


const defaultColumns: Array<ExtendedColumnType> = [
    { key: "displayName", title: "Client", default: true },
    { key: "gstNumber", title: "GSTIN", default: true },
    { key: "gstrData", title: "Status", default: true },
    { key: "dateOfFiling", title: "Date of File", default: true },
    { key: "arn", title: "Arn", default: true },
    { key: "action", title: "Action", },


]

export default Gstr3b;
