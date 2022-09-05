import { Box, Button, Divider } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { getDefaultFormValidations, importFormValidations } from "api/services/forms";
import DialogWrapper from "components/DialogWrapper";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { snack } from "components/toast";
import useFilteredData from "hooks/useFilteredData";
import * as React from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType } from "types";
import { StyledServicesContainer } from "views/tasks/board/CreateTask/styles";
import Table from "components/Table";

const columns = [
  {
    id: 1,
    key: "clientname",
    title: "Client name",
  },
  {
    id: 2,
    key: "entitycategory",
    title: "Entity Category",
    // render: (rowData: any) => getTitle(rowData?.subCategory),
  },
  {
    id: 3,
    key: "mailid",
    title: "Mail ID",
  },
];

interface Props extends DialogProps {
  successCb?: () => void;
}

function GroupAdd({ open, setOpen, successCb }: Props) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(10);

  const { data, isLoading }: ResType = useQuery("default-validations", getDefaultFormValidations, {
    enabled: open,
  });

  const filteredData = useFilteredData(data?.data, ["name"], search);

  const { mutate } = useMutation(importFormValidations, {
    onSuccess: () => {
      queryClient.invalidateQueries("form-validations");
      setOpen(false);
      setSelected([]);
      successCb && successCb();
    },
    onError: (err: any) => {
      snack.error(err.response?.data?.message);
    },
  });

  const handleChange = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSubmit = () => {
    mutate({
      validations: selected,
    });
  };

  return (
    <DialogWrapper width="md" open={open} setOpen={setOpen} title="Add members">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <SearchContainer value={search} placeHolder="Search" minWidth="300px" onChange={setSearch} />
        <SelectLabels />
      </Box>
      <Divider sx={{ mt: 2 }} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <StyledServicesContainer>
            <Table
              data={[
                { id: 1, clientname: "a", entitycategory: "GST1", mailid: "a@vider.in" },
                { id: 2, clientname: "b", entitycategory: "GST2", mailid: "b@vider.in" },
                { id: 3, clientname: "c", entitycategory: "GST3", mailid: "c@vider.in" },
                { id: 4, clientname: "d", entitycategory: "GST4", mailid: "d@vider.in" },
                { id: 5, clientname: "e", entitycategory: "GST5", mailid: "e@vider.in" },
              ]}
              columns={columns}
              selection={{ selected, setSelected }}
            />
          </StyledServicesContainer>
          <Box
            sx={{
              textAlign: "center",
              background: "white",
            }}
          >
            <Button
              sx={{ minWidth: 300 }}
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
              size="large"
            >
              Select Task
            </Button>
          </Box>
        </>
      )}
    </DialogWrapper>
  );
}

export default GroupAdd;

//select label
function SelectLabels() {
  const [group, setGroup] = React.useState("");

  const handleChange = (event) => {
    setGroup(event.target.value);
    console.log(group);
  };

  return (
    <div>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          value={group}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>Groups</em>
          </MenuItem>
          <MenuItem value="value1">Value1</MenuItem>
          <MenuItem value="value2">Value2</MenuItem>
          <MenuItem value="value3">Value3</MenuItem>
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
    </div>
  );
}
