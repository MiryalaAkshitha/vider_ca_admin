import { Box, Button, Divider } from "@mui/material";
import { createService, getService, updateService } from "api/services/services";
import BreadCrumbs from "components/BreadCrumbs";
import Loader from "components/Loader";
import { snack } from "components/toast";
import useQueryParams from "hooks/useQueryParams";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addServiceState, resetData, setData } from "redux/reducers/addServiceSlice";
import { ResType } from "types";
import BasicDetails from "views/services/BasicDetails";
import Checklists from "views/services/Checklists";
import StageOfWork from "views/services/StagesOfWork";
import Subtasks from "views/services/SubTasks";
import Milestones from "views/services/Milestones";
import { handleError } from "utils/handleError";
import ArrowBack from "@mui/icons-material/ArrowBack";

function AddService() {
  useTitle("Services");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(addServiceState);
  const { queryParams } = useQueryParams();
  const serviceId = queryParams.serviceId;

  const { data, isLoading }: ResType = useQuery(["service-details", serviceId], getService, {
    onSuccess: (res: any) => {
      dispatch(setData(res?.data));
    },
    enabled: !!serviceId,
  });

  useEffect(() => {
    if (!serviceId) dispatch(resetData());
  }, [serviceId, dispatch]);

  const { mutate } = useMutation(createService, {
    onSuccess: () => {
      snack.success("Service added successfully");
      dispatch(resetData());
      navigate("/services");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const { mutate: update } = useMutation(updateService, {
    onSuccess: () => {
      snack.success("Service updated successfully");
      dispatch(resetData());
      navigate("/services");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleSubmit = () => {
    if (serviceId) {
      update({
        id: serviceId,
        data: state,
      });
    } else {
      mutate(state);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Box p={3} pb={15}>
      <Box display="flex" justifyContent="space-between">
        <BreadCrumbs page="addService" />
        {data?.data?.fromAdmin && (
          <Button
            sx={{ minWidth: 130 }}
            onClick={() => navigate(-1)}
            variant="outlined"
            color="secondary"
          >
            Back
          </Button>
        )}
        {!data?.data?.fromAdmin && (
          <Box display="flex" gap={1}>
            <Button
              onClick={() => {
                navigate("/services");
              }}
              sx={{ minWidth: 130 }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{ minWidth: 130 }}
              disableElevation
              variant="contained"
              color="secondary"
            >
              Save
            </Button>
          </Box>
        )}
      </Box>
      <BasicDetails />
      <Divider sx={{ my: 5 }} />
      <Checklists />
      {/* <Divider sx={{ my: 5 }} /> */}
      {/* <Milestones /> */}
      <Divider sx={{ my: 5 }} /> 
      <StageOfWork />
      <Divider sx={{ my: 5 }} />
      <Subtasks />
    </Box>
  );
}

export default AddService;
