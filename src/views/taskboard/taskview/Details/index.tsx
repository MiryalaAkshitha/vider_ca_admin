import { Autocomplete, Box, Button, Grid } from "@mui/material";
import { updateTask } from "api/services/tasks";
import Loader from "components/Loader";
import { useTaskData } from "context/TaskData";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { getFinancialYears, getTitle } from "utils";
import { PriorityEnum, TaskStatus } from "utils/constants";
import DetailSection from "./DetailSection";
import { CustomSelect, CustomTextField, StyledTextField } from "./Fields";
import Info from "./Info";
import useTaskViewData from "./useTaskDetailsData";
import BottomBar from "components/BottomBar";
import ValidateAccess from "components/ValidateAccess";
import { Permissions } from "utils/permissons";

function Details() {
  const queryClient = useQueryClient();

  const { users, loading, categories, labels } = useTaskViewData();
  const taskData: any = useTaskData();
  const [state, setState] = useState<any>({});

  useEffect(() => {
    if (taskData) {
      setState(taskData);
    }
  }, [taskData]);

  const { mutate } = useMutation(updateTask, {
    onSuccess: (res) => {
      queryClient.invalidateQueries("task");
      snack.success("Task Details Updated");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleUpdate = () => {
    mutate({
      id: taskData?.id,
      data: state,
    });
  };

  const handleCancel = () => {
    setState(taskData);
  };

  const handleChange = (e: any) => {
    if (e.target.name === "category") {
      setState({
        ...state,
        category: e.target.value,
        subCategory: null,
      });
      return;
    }
    setState({ ...state, [e.target.name]: e.target.value });
  };

  let subCategories = categories?.data.find(
    (item: any) =>
      item?.id === state?.category?.id || item?.id === state?.category
  )?.subCategories;

  if (loading) return <Loader minHeight="60vh" />;

  return (
    <>
      <Info state={state} />
      <Box mt={4}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <DetailSection label="Members" labelWidth="15%">
              <Autocomplete
                multiple
                value={state?.members || []}
                onChange={(_, value) => setState({ ...state, members: value })}
                options={users?.data || []}
                getOptionLabel={(option) => {
                  return option?.fullName;
                }}
                isOptionEqualToValue={(option, value) => {
                  return option?.id === value?.id;
                }}
                renderInput={(params) => <StyledTextField {...params} />}
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Client">
              <CustomTextField
                value={state?.client?.displayName}
                onChange={handleChange}
                disabled
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Task Type">
              <CustomTextField
                value={state?.recurring ? "Recurring" : "Non-recurring"}
                onChange={handleChange}
                disabled
              />
            </DetailSection>
          </Grid>
          {state?.recurring && (
            <Grid item xs={6}>
              <DetailSection label="Frequency">
                <CustomTextField
                  value={getTitle(state?.frequency)}
                  onChange={handleChange}
                  disabled
                />
              </DetailSection>
            </Grid>
          )}
          <Grid item xs={6}>
            <DetailSection label="Status">
              <CustomSelect
                value={state?.status || ""}
                onChange={handleChange}
                options={Object.values(TaskStatus).map((item) => ({
                  label: item,
                  value: item,
                }))}
                name="status"
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Start Date">
              <CustomTextField
                value={state?.taskStartDate || ""}
                onChange={handleChange}
                type="date"
                name="taskStartDate"
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Due Date">
              <CustomTextField
                value={state?.dueDate || ""}
                onChange={handleChange}
                type="date"
                name="dueDate"
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Priority">
              <CustomSelect
                value={state?.priority || ""}
                onChange={handleChange}
                options={Object.values(PriorityEnum).map((item) => ({
                  label: item,
                  value: item,
                }))}
                name="priority"
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Category">
              <CustomSelect
                value={state?.category?.id || state?.category || ""}
                onChange={handleChange}
                options={categories?.data.map((item: any) => ({
                  label: item?.name,
                  value: item?.id,
                }))}
                name="category"
              />
            </DetailSection>
          </Grid>
          {subCategories?.length ? (
            <Grid item xs={6}>
              <DetailSection label="Sub Category">
                <CustomSelect
                  value={state?.subCategory?.id || state?.subCategory || ""}
                  onChange={handleChange}
                  options={
                    subCategories?.map((item: any) => ({
                      label: item?.name,
                      value: item?.id,
                    })) || []
                  }
                  name="subCategory"
                />
              </DetailSection>
            </Grid>
          ) : null}
          <Grid item xs={6}>
            <DetailSection label="Task Leader">
              <Autocomplete
                onChange={(_, value) =>
                  setState({ ...state, taskLeader: value })
                }
                value={state?.taskLeader || null}
                options={users?.data || []}
                isOptionEqualToValue={(option, value) => {
                  return option?.id === value?.id;
                }}
                getOptionLabel={(option) => {
                  return option?.fullName;
                }}
                renderInput={(params) => <StyledTextField {...params} />}
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Labels">
              <Autocomplete
                multiple
                onChange={(_, value) => setState({ ...state, labels: value })}
                options={labels?.data ? labels?.data : []}
                value={state?.labels ? state.labels : []}
                getOptionLabel={(option) => option?.name}
                isOptionEqualToValue={(option, value) => {
                  return option?.id === value?.id;
                }}
                renderInput={(params) => <StyledTextField {...params} />}
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Financial Year">
              <Autocomplete
                onChange={(_, value) =>
                  setState({ ...state, financialYear: value })
                }
                getOptionLabel={(option) => option}
                value={state?.financialYear || ""}
                options={getFinancialYears()}
                renderInput={(params) => <StyledTextField {...params} />}
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Fee Type">
              <CustomSelect
                value={state?.feeType || ""}
                onChange={handleChange}
                options={[
                  {
                    label: "Hourly",
                    value: "HOURLY",
                  },
                  {
                    label: "Total",
                    value: "TOTAL",
                  },
                ]}
                name="feeType"
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Fee Amount">
              <CustomTextField
                value={state?.feeAmount || ""}
                onChange={handleChange}
                name="feeAmount"
                type="number"
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Directory">
              <CustomTextField
                value={state?.directory || ""}
                onChange={handleChange}
                name="directory"
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Remarks">
              <CustomTextField
                value={state?.remarks || ""}
                onChange={handleChange}
                name="remarks"
              />
            </DetailSection>
          </Grid>
        </Grid>
      </Box>
      <ValidateAccess name={Permissions.EDIT_TASK}>
        <BottomBar
          data={taskData}
          state={state}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      </ValidateAccess>
    </>
  );
}

export default Details;
