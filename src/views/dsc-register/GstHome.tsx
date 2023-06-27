import { Add, } from "@mui/icons-material";

import { Box, Button, } from "@mui/material";
import SearchContainer from "components/SearchContainer";
import Table, { ExtendedColumnType } from "components/Table";
import useTitle from "hooks/useTitle";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { resetFilters } from "redux/reducers/taskboardSlice";
import { useDispatch } from "react-redux";
import { clearPending, createGstrPromiseClient, getGstr1 } from "api/services/clients/gstr-clients";
import PeriodSelect from "./PeriodSelect";
import AddGstRecord from "./AddGstRecord";
import { snack } from "components/toast";

const returnSatatusConstants = {
    Filled: "Filled",
    Pending: "Pending",
    NotSelected: "Not Selected",
    ClickSyncAllToGetLatestData: "Click Sync All to get latest data"



}

function GstHome() {
    useTitle("Gstr");
    const currentPath = window.location.pathname;
    const path = currentPath.split("/");
    const currentGst = path[path.length - 1].toLocaleUpperCase();
    const returnValue = currentGst.split("-");
    const returnResult = returnValue.join("");
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(10);
    const [clients, setClients] = useState<any[]>([]);
    const [forGstr, setForGstr] = useState<any[]>([]);
    const [columns, setColumns] = useState(_.cloneDeep(defaultColumns));
    const [filters, setFilters] = useState({
        labels: [],
        search: "",
    });
    const [period, setTimePeriod] = useState("");
    const [financialYear, setFinancialYear] = useState("");
    const [month, setMonth] = useState(Number);
    const queryClient = useQueryClient();
    const [tableData, setTableData] = useState<any[]>([]);
    //const [forPromise, setForPromise] = useState<any[]>([]);
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
                type: currentGst
            },
        ],
        getGstr1, {
        onSuccess: (res: any) => {
            const result = partition(res?.data?.result, (el: any) => el.status === 'INACTIVE')
            if (period === "") {
                const clientDetails = result.map(singleDetails => {
                    const a = singleDetails.client
                    let gstrData = returnSatatusConstants.Pending
                    let dateOfFiling = "---"
                    let arn = "---"
                    return {
                        ...a,
                        gstrData,
                        dateOfFiling,
                        arn,
                        action: true
                    }
                })
                setTableData(clientDetails)
            } else {
                const date = period.split(" ");
                const dateFormate = date.join("-");
                const clientDetails = result.map(singleClient => {
                    let gstrData = returnSatatusConstants.Pending;
                    let dateOfFiling = "---";
                    let arn = "---"
                    let action = true;
                    const a = singleClient.client;
                    if (excludes.includes(singleClient.client.id)) {
                        gstrData = returnSatatusConstants.NotSelected;
                        action = false;
                    } else {
                        let dateDateFormate = "---";
                        let arnNumber = "---"
                        const exactArray = singleClient?.gstrData?.find(item => {
                            dateDateFormate = item?.dof;
                            const dateFormate1 = dateDateFormate?.slice(-7);
                            const returnType = returnResult
                            arnNumber = item?.arn
                            return (dateFormate1 === dateFormate && returnType === item?.rtntype)
                        })
                        if (exactArray) {
                            gstrData = returnSatatusConstants.Filled;
                            dateOfFiling = dateDateFormate;
                            arn = arnNumber;
                        }
                    }
                    return {
                        ...a,
                        gstrData,
                        dateOfFiling,
                        arn,
                        action
                    }
                })
                setTableData(clientDetails)
            };
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
    // const getfilterkeys = (filters: any) => {
    //     const obj = getfilterkeysObj(filters);
    //     return Object.keys(obj);
    // }
    const getfilterkeysObj = (filters: any) => {
        const obj = JSON.parse(JSON.stringify(filters));
        delete obj?.search;
        delete obj?.monthAdded;
        return obj;
    }
    const getValues = (row: any, event: any) => {
        const newTableData = tableData.map((singleClient) => {
            if (singleClient.id === row.id) {
                return { ...row, action: !row.action }
            }
            return singleClient
        })
        setTableData(newTableData)
        const gstrClientIs = forGstr?.map(item => item?.client?.id)
        const rowId = row?.id;
        if (excludes.includes(rowId)) {
            const newNewExcludes = excludes.filter((ids) => ids !== rowId);
            setExcludes(newNewExcludes);
        } else {
            const newNewExcludes = [...excludes, rowId];
            setExcludes(newNewExcludes)
        }
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

        },
        onError: (err: any) => {
            snack.error(err.response.data.message);
        },
    });
    const getGstReturnClients = async () => {
        const forPromisee = tableData.filter(singleClient => {
            const status = singleClient.gstrData;
            return (status === returnSatatusConstants.ClickSyncAllToGetLatestData)
        });

        const newArray: any = []
        for (let i of forPromisee) {
            for (let j of forGstr) {
                if (j?.client?.gstNumber === i?.gstNumber && j?.client?.id === i?.id && i.gstrData === returnSatatusConstants.ClickSyncAllToGetLatestData) {
                    newArray.push(j)

                }
            }
        }
        mutate({
            month,
            financialYear,
            newArray
        });

    };
    const { data: forLoad, isLoading: load }: ResType = useQuery(
        "promise",
        clearPending, {
        onSuccess: (res) => {

            period && queryClient.invalidateQueries("clients");
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
            let action = true;
            let a = singleClient.client;
            if (excludes.includes(singleClient?.client?.id)) {
                gstrData = "Not Selected";
                action = false;
            } else {
                a = singleClient.client;
                gstrData = returnSatatusConstants.ClickSyncAllToGetLatestData;
                dateOfFiling = "---"
                arn = "---"
                dateDateFormate = "---";
                arnNumber = "---"
                let exactArray = singleClient?.gstrData?.find(item => {
                    dateDateFormate = item?.dof;
                    const dateFormate1 = dateDateFormate?.slice(-7);
                    const returnType = returnResult

                    arnNumber = item?.arn


                    return (dateFormate1 === dateFormate && returnType === item?.rtntype)

                })

                if (exactArray) {
                    gstrData = returnSatatusConstants.Filled;
                    dateOfFiling = dateDateFormate;
                    arn = arnNumber;

                }
            }
            return {
                ...a,
                gstrData,
                dateOfFiling,
                arn,
                action

            }
        })

        setTableData(clientDetails);
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
                        maxWidth="500px"
                        onChange={(v) => {
                            setFilters({
                                ...filters,
                                search: v,
                            });
                        }}
                        placeHolder="Search by Display Name | Gst Number"
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
                        size="large"
                        color="secondary"
                        variant="contained"
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

            <AddGstRecord open={open} setOpen={setOpen} setClientList={setClients} clientList={forGstr} title={`Add ${currentGst} Record`} />

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

export default GstHome;
