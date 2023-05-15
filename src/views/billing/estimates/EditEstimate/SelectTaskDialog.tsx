import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { getInvoicingTasks } from "api/services/billing/estimates";
import DialogWrapper from "components/DialogWrapper";
import Members from "components/Members";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { snack } from "components/toast";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  handleExistingOtherParticular,
  handleAddTasksToParticular,
  selectEstimate,
} from "redux/reducers/createEstimateSlice";
import { ResType } from "types";
import { getTitle } from "utils";

const SelectTaskDialog = ({ open, setOpen }) => {
  const { client } = useSelector(selectEstimate);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(5);
  const [unbilledtasks, setUnbilledtasks] = useState([]);

  const { data, isLoading }: ResType = useQuery(
    [
      "estimate-tasks",
      {
        client: client,
        search,
      },
    ],
    getInvoicingTasks,
    {
      onSuccess: (res: any) => {
        const result = res?.data?.result.filter((obj: any) => {
          return obj?.recurringStatus !== 'pending'
        });
        result.forEach((item: any) => {
          item['additionalexpenditure'] = 0;
          if (item?.expenditure && item?.expenditure.length > 0) {
            item['additionalexpenditure'] = getTotalExpenduture(item?.expenditure);
          }
        });
        setUnbilledtasks(result);     
      },
      enabled: open && Boolean(client)
    }
  );

  const getTotalExpenduture = (expenditures: any) => {
    let sum = 0;
    expenditures.forEach((element: any) => {
      if (element.taskExpenseType == 'ADDITIONAL' && element.includeInInvoice) {
        sum += (element.amount * 1);
      }
    });
    return sum;
  };

  function onSubmit() {
    if (!selected?.length) {
      snack.error("Please select at least one task");
      return;
    }
    dispatch(handleAddTasksToParticular(selected));

    if(selected && selected.length > 0) {
      selected.forEach((particular: any, index: any) => {
        if(particular?.expenditure && particular?.expenditure.length > 0) {
          particular?.expenditure.forEach((expenditure: any, index: any) => {
            expenditure['name'] = expenditure.particularName;
            expenditure['amount'] = expenditure.amount;
            const id = expenditure.id;
            const key = expenditure.particularName;
            const value = expenditure.amount;
            const taskExpenseType = expenditure.taskExpenseType;
            dispatch(handleExistingOtherParticular({ id, index, key, value, taskExpenseType }));
          });          
        }
      });
    }
    
    setOpen(false);
  }

  const totalCount = data?.data?.totalCount || 0;

  return (
    <>
      <DialogWrapper
        width="lg"
        title="Unbilled Tasks"
        open={open}
        setOpen={setOpen}
      >
        <SearchContainer
          value={search}
          placeHolder="Search"
          onChange={setSearch}
        />
        <Table
          sx={{ mt: 3 }}
          columns={columns}
          data={unbilledtasks?.slice(page, pageCount) || []}
          loading={isLoading}
          selection={{ selected, setSelected }}
          pagination={{ totalCount, page, setPage, pageCount, setPageCount }}
        />
        <Box textAlign="center" mt={2}>
          <Button
            color="secondary"
            size="large"
            disabled={!selected?.length}
            variant="contained"
            sx={{ minWidth: 250 }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Box>
      </DialogWrapper>
    </>
  );
};

const columns = [
  {
    title: "Category",
    key: "category.name",
  },
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Status",
    key: "status",
    render: (item: any) => getTitle(item.status),
  },
  {
    title: "Fee Amount",
    key: "feeAmount",
    render: (item: any) => (item.feeAmount * 1),
  },
  {
    title: "Additional Amount",
    key: "additionalexpenditure",
    render: (item: any) => (item.additionalexpenditure)
  },
  {
    key: "Memberss",
    title: "Members",
    render: (v: any) => (
      <Members
        data={v?.members?.map((item: any) => ({
          title: item?.fullName,
        }))}
      />
    ),
  },
];

export default SelectTaskDialog;
