import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Loader from "components/Loader";
import moment from "moment";
import { getTitle } from "utils";
import { PriorityEnum, TaskStatus } from "utils/constants";
import DetailSection from "./DetailSection";
import { CustomSelect, CustomTextField } from "./Fields";
import useTaskViewData from "./useTaskDetailsData";
import { Link } from "react-router-dom";
import useQueryParams from "hooks/useQueryParams";

interface Props {
  state: any;
  staticState: any;
  setState: (state: any) => void;
  handleUpdate: () => void;
}

function Details({ state, staticState, setState, handleUpdate }: Props) {
  const { users, loading, categories, labels } = useTaskViewData();
  const { queryParams } = useQueryParams();

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
      <Box
        display="flex"
        p={3}
        bgcolor="#FBF9F2"
        justifyContent="space-between"
      >
        <Box display="flex" gap={2} alignItems="center">
          <Box bgcolor="white" p={2} borderRadius={2}>
            <AssignmentOutlinedIcon fontSize="medium" />
          </Box>
          <div>
            <Typography variant="subtitle2" color="primary">
              {state?.name}{" "}
            </Typography>
            <Typography variant="body2" color="gray">
              Created by {state?.user?.fullName} on{" "}
              {moment(state?.createdAt).format("MMM Do YYYY, hh:mm a")}{" "}
              {state?.parentTask && (
                <>
                  - Sub task of{" "}
                  <Link
                    style={{
                      color: "#4a89dc",
                    }}
                    to={`/task-board/${state?.parentTask?.id}?clienId=${queryParams.clientId}`}
                  >
                    {" "}
                    {state?.parentTask?.name}
                  </Link>
                </>
              )}
            </Typography>
          </div>
        </Box>
        <Box textAlign="right">
          <Typography variant="body2" color="gray">
            Task ID
          </Typography>
          <Typography variant="subtitle2" color="primary">
            {state?.taskId}
          </Typography>
        </Box>
      </Box>
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderWidth: 1,
                        },
                      "& fieldset": {
                        border: 0,
                      },
                    }}
                  />
                )}
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
                value={state?.taskLeader || {}}
                options={users?.data || []}
                isOptionEqualToValue={(option, value) => {
                  return option?.id === value?.id;
                }}
                getOptionLabel={(option) => {
                  return option?.fullName;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="medium"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderWidth: 1,
                        },
                      "& fieldset": {
                        border: 0,
                      },
                    }}
                  />
                )}
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Labels">
              <Autocomplete
                multiple
                id="tags-standard"
                onChange={(_, value) => setState({ ...state, labels: value })}
                options={labels?.data ? labels?.data : []}
                value={state?.labels ? state.labels : []}
                getOptionLabel={(option) => option?.name}
                isOptionEqualToValue={(option, value) => {
                  return option?.id === value?.id;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="medium"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderWidth: 1,
                        },
                      "& fieldset": {
                        border: 0,
                      },
                    }}
                  />
                )}
              />
            </DetailSection>
          </Grid>
          <Grid item xs={6}>
            <DetailSection label="Financial Year">
              <Autocomplete
                onChange={(_, value) =>
                  setState({ ...state, financialYear: value })
                }
                value={state?.financialYear}
                options={
                  Array.from(Array(50).keys()).map(
                    (_, index) => `${2000 + index}-${2000 + index + 1}`
                  ) || []
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="medium"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderWidth: 1,
                        },
                      "& fieldset": {
                        border: 0,
                      },
                    }}
                  />
                )}
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
          <Grid item xs={12}>
            <DetailSection label="Remarks" labelWidth="15%">
              <CustomTextField
                value={state?.remarks || ""}
                onChange={handleChange}
                name="remarks"
              />
            </DetailSection>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }} mt={4}>
          <Button
            onClick={() => setState(staticState)}
            size="large"
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            size="large"
            variant="contained"
            color="secondary"
          >
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Details;
