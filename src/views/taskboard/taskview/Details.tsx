import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import {
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Loader from "components/Loader";
import moment from "moment";
import { getTitle } from "utils";
import { PriorityEnum } from "utils/constants";
import { TaskStatus } from "../board/utils";
import useTaskViewData from "./useTaskDetailsData";

interface Props {
  state: any;
  setState: (state: any) => void;
  handleUpdate: () => void;
}

function Details({ state, setState, handleUpdate }: Props) {
  const { users, loading, categories, labels } = useTaskViewData();

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  let subCategories = categories?.data.find(
    (item: any) => item?.id === state?.category?.id
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
              {state?.name}
            </Typography>
            <Typography variant="body2" color="gray">
              Created by {state?.user?.firstName + " " + state?.user?.lastName}{" "}
              on {moment(state?.createdAt).format("MMM Do YYYY, hh:mm a")}
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
            <Autocomplete
              multiple
              id="tags-standard"
              value={state?.members || []}
              onChange={(_, value) => setState({ ...state, members: value })}
              options={users?.data || []}
              getOptionLabel={(option) => {
                return option?.firstName + " " + option?.lastName;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="medium"
                  variant="outlined"
                  label="Select Members"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mt: 2 }}
              disabled
              size="medium"
              fullWidth
              label="Client"
              value={state?.client?.displayName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              select
              required
              name="status"
              onChange={handleChange}
              value={state?.status || ""}
              label="Status"
            >
              {Object.values(TaskStatus).map((item, index) => (
                <MenuItem key={index} value={item}>
                  {getTitle(item)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mt: 2 }}
              type="date"
              size="medium"
              fullWidth
              name="dueDate"
              onChange={handleChange}
              value={state?.dueDate || ""}
              InputLabelProps={{ shrink: true }}
              label="Due Date"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              select
              required
              name="priority"
              onChange={handleChange}
              value={state?.priority || ""}
              label="Priority"
            >
              {Object.values(PriorityEnum).map((item, index) => (
                <MenuItem key={index} value={item}>
                  {getTitle(item)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              select
              required
              value={state?.category?.id || ""}
              name="category"
              label="Category"
            >
              {categories?.data.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {subCategories?.length ? (
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                select
                required
                value={state.category || ""}
                name="subCategory"
                label="Sub Category"
              >
                {subCategories?.map((item: any, index) => (
                  <MenuItem key={index} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : null}
          <Grid item xs={6}>
            <Autocomplete
              id="tags-standard"
              sx={{ mt: 2 }}
              onChange={(_, value) => setState({ ...state, taskLeader: value })}
              value={state?.taskLeader || {}}
              options={users?.data || []}
              getOptionLabel={(option) => {
                return option?.firstName + " " + option?.lastName;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="medium"
                  variant="outlined"
                  label="Task Leader"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              multiple
              id="tags-standard"
              onChange={(_, value) => setState({ ...state, labels: value })}
              options={labels?.data || []}
              value={state?.labels || []}
              sx={{ mt: 2 }}
              getOptionLabel={(option) => option?.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="medium"
                  variant="outlined"
                  label="Labels"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mt: 2 }}
              size="medium"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Fee Amount"
              name="feeAmount"
              onChange={handleChange}
              value={state?.feeAmount || ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mt: 2 }}
              size="medium"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Directory"
              onChange={handleChange}
              name="directory"
              value={state?.directory || ""}
            />
          </Grid>
        </Grid>
        <Box sx={{ mx: "auto" }} textAlign="center" maxWidth={200} mt={4}>
          <Button
            onClick={handleUpdate}
            size="large"
            fullWidth
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
