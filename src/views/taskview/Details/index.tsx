import { DesktopDatePicker } from "@mui/lab";
import { Autocomplete, Box, Grid, Typography } from "@mui/material";
import { updateTask } from "api/services/tasks/tasks";
import BottomBar from "components/BottomBar";
import Loader from "components/Loader";
import { snack } from "components/toast";
import ValidateAccess from "components/ValidateAccess";
import { useTaskData } from "context/TaskData";
import { PriorityEnum, TaskPaymentStatus, TaskStatus } from "data/constants";
import { Permissions } from "data/permissons";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { getTitle } from "utils";
import { getFinancialYears } from "utils/getFinancialYears";
import DetailSection from "./DetailSection";
import { CustomSelect, CustomTextField, StyledTextField } from "./Fields";
import Info from "./Info";
import useTaskViewData from "./useTaskDetailsData";
import AddRemarks from "views/tasks/board/AddRemarks";

function Details() {
  const queryClient = useQueryClient();
  const taskData: any = useTaskData();
  const { users, loading, categories, labels } = useTaskViewData();
  const [state, setState] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [remarksPromise, setRemarksPromise] = useState<Function[]>([]);

  useEffect(() => {
    if (taskData) {
      setState(taskData);
    }
  }, [taskData]);

  const { mutateAsync } = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("task");
      // snack.success("Task Details Updated");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleUpdate = async () => {
    if (state.members.length < 1) {
      return snack.error("Please select atleast one error");
    }
    await mutateAsync({
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

  const handleRemkars = () => {
    return new Promise((resolve, reject) => {
      setOpen(true);
      setRemarksPromise([resolve, reject]);
    });
  };

  const handleStatusUpdate = async (e: any) => {
    if (e.target.value === TaskStatus.ON_HOLD) {
      try {
        await handleRemkars();
        await mutateAsync({
          id: taskData?.id,
          data: { ...state, status: e.target.value },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      setState({ ...state, status: e.target.value });
    }
  };

  let subCategories = categories?.data.find((item: any) => {
    return item?.id === state?.category?.id || item?.id === state?.category;
  })?.subCategories;

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
                onChange={handleStatusUpdate}
                options={Object.values(TaskStatus).map((item) => ({
                  label: item,
                  value: item,
                }))}
                name="status"
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Payment Status">
              <CustomSelect
                value={state?.paymentStatus || ""}
                onChange={handleStatusUpdate}
                options={Object.values(TaskPaymentStatus).map((item) => ({
                  label: item,
                  value: item,
                }))}
                name="paymentstatus"
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Start Date">
              <DesktopDatePicker
                inputFormat="dd-MM-yyyy"
                value={state.taskStartDate}
                onChange={(v: any) => {
                  let date = moment(v).format("YYYY-MM-DD");
                  setState({ ...state, taskStartDate: date });
                }}
                renderInput={(params) => <StyledTextField fullWidth size="small" {...params} />}
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Due Date">
              <DesktopDatePicker
                inputFormat="dd-MM-yyyy"
                value={state.dueDate}
                onChange={(v: any) => {
                  let date = moment(v).format("YYYY-MM-DD");
                  setState({ ...state, dueDate: date });
                }}
                renderInput={(params) => <StyledTextField fullWidth size="small" {...params} />}
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
                onChange={(_, value) => setState({ ...state, taskLeader: value })}
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
                onChange={(_, value) => setState({ ...state, financialYear: value })}
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
                withCopy
                value={state?.directory || ""}
                onChange={handleChange}
                name="directory"
              />
            </DetailSection>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ borderBottom: "1px dashed rgba(0,0,0,0.1)" }}>
              <Typography gutterBottom variant="body1">
                Remarks
              </Typography>
            </Box>
            <Box>
              <ol>
                {state?.activity?.map((item: any, index: number) => (
                  <li key={index} style={{ marginBottom: 20 }}>
                    <Typography gutterBottom variant="body1">
                      {item.remarks} -{" "}
                      <span style={{ fontSize: 12 }}>{getTitle(item?.remarkType)}</span>
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      sx={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}
                    >
                      Created By {item.user?.fullName} on{" "}
                      {moment(item.createdAt).format("DD-MM-YYYY")}
                    </Typography>
                  </li>
                ))}
              </ol>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ValidateAccess name={Permissions.EDIT_TASK}>
        <BottomBar
          left="72px"
          data={taskData}
          state={state}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      </ValidateAccess>
      <AddRemarks
        open={open}
        setOpen={setOpen}
        onHoldTaskId={taskData?.id}
        remarksPromise={remarksPromise}
      />
    </>
  );
}

export default Details;
