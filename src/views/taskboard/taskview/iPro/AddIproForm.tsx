import { Box, Button, Grid } from "@mui/material";
import { cloneForm, getForms } from "api/services/forms";
import DialogWrapper from "components/DialogWrapper";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useFilteredData from "hooks/useFilteredData";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps, ResType } from "types";
import IProFormCard from "./IProFormCard";

function AddIproForm({ open, setOpen }: DialogProps) {
  const [search, setSearch] = useState("");
  const snack = useSnack();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState("");
  const params = useParams();

  const { data, isLoading }: ResType = useQuery(
    ["task-templates", { type: "TEMPLATE" }],
    getForms,
    { enabled: open }
  );

  const filteredData = useFilteredData(data?.data, ["name", "tags"], search);

  const { mutate } = useMutation(cloneForm, {
    onSuccess: () => {
      queryClient.invalidateQueries("task-forms");
      setOpen(false);
      snack.success("Form added");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleClick = () => {
    mutate({
      id: selected,
      data: {
        type: "TASK",
        taskId: params.taskId,
      },
    });
  };

  return (
    <DialogWrapper
      width="md"
      open={open}
      setOpen={setOpen}
      title="Select a form template"
    >
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <SearchContainer
              maxWidth="200px"
              placeHolder="Search by name or tags"
              onChange={setSearch}
            />
            <Box mt={3}>
              <Grid container spacing={3}>
                {filteredData?.map((item: any, index: number) => (
                  <Grid item xs={6} key={index}>
                    <IProFormCard
                      item={item}
                      index={index}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box mt={5} mb={3} textAlign="center">
              <Button
                onClick={handleClick}
                disabled={!selected}
                variant="contained"
                color="secondary"
              >
                Select form template
              </Button>
            </Box>
          </>
        )}
      </>
    </DialogWrapper>
  );
}

export default AddIproForm;
