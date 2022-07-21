import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getInvoicingTasks } from "api/services/billing";
import DialogWrapper from "components/DialogWrapper";
import Members from "components/Members";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { snack } from "components/toast";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddTasksToParticular,
  selectInvoice,
} from "redux/reducers/createInvoiceSlice";
import { ResType } from "types";

const SelectTaskDialog = ({ open, setOpen }) => {
  const { client } = useSelector(selectInvoice);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const { data, isLoading }: ResType = useQuery(
    [
      "invocing-tasks",
      +{
        client: client,
      },
    ],
    getInvoicingTasks,
    { enabled: open }
  );

  function onSubmit() {
    if (!selected?.length) {
      snack.error("Please select at least one task");
      return;
    }
    dispatch(handleAddTasksToParticular(selected));
    setOpen(false);
  }

  const getData = () => {
    let result = data?.data || [];
    if (search) {
      result = result?.filter((item) => {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item?.category?.name.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    return result;
  };

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
          columns={[
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
            },
            {
              key: "Memberss",
              title: "Members",
              render: (v) => (
                <Members
                  data={v?.members?.map((item: any) => ({
                    title: item?.fullName,
                  }))}
                />
              ),
            },
          ]}
          data={getData()}
          loading={isLoading}
          selection={{
            onSelect: (v) => {
              setSelected(v);
            },
          }}
        />
        <Box textAlign="center" mt={5}>
          <Button
            color="secondary"
            variant="contained"
            sx={{ padding: "12px 120px", margin: "30px auto" }}
            onClick={onSubmit}
          >
            <Typography>Select Task</Typography>
          </Button>
        </Box>
      </DialogWrapper>
    </>
  );
};

export default SelectTaskDialog;
