import { yupResolver } from "@hookform/resolvers/yup";
import { Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { createTask } from "api/services/tasks/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import { handleError } from "utils/handleError";
import { createTaskDefaultValues, createTaskSchema } from "validations/createTask";
import CommonFields from "./CommonFields";
import CustomCommonFields from "./CustomCommonFields";
import NonRecurringFields from "./NonRecurringFields";
import RecurringFields from "./RecurringFields";
import SelectApprovalHierarchy from "./SelectApprovalHierarchy";
import SelectTypes from "./SelectTypes";
import { StyledSelectBox, StyledSelectedBox } from "./styles";
import useCreateTaskInitialData from "./useCreateTaskInitialData";

interface Props extends DialogProps {
  successCb?: () => void;
}

function CreateTask({ open, setOpen, successCb }: Props) {
  const queryClient = useQueryClient();
  const [openSelectAppHier, setOpenSelectAppHier] = useState(false);
  const { users, labels, categories, clients, loading } = useCreateTaskInitialData({
    enabled: open,
  });

  const subcategoriesExist = (category: any) => {
    return categories?.data?.find((item: any) => item.id === parseInt(category))?.subCategories
      ?.length;
  };

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: createTaskDefaultValues,
    mode: "all",
    resolver: yupResolver(createTaskSchema({ subcategoriesExist })),
  });

  const { mutate, isLoading } = useMutation(createTask, {
    onSuccess: () => {
      snack.success("Task Created");
      queryClient.invalidateQueries("tasks");
      setOpen(false);
      reset(createTaskDefaultValues);
      successCb && successCb();
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const onFormSubmit = (data: any) => {
    let apiData = { ...data };
    apiData.client = data.client?.map((client: any) => parseInt(client.value));
    apiData.members = data.members?.map((member: any) => parseInt(member.value));
    apiData.labels = data.labels?.map((label: any) => parseInt(label.value));
    apiData.category = parseInt(data.category);
    apiData.subCategory = parseInt(data.subCategory);
    apiData.taskLeader = parseInt(data.taskLeader);
    apiData.feeAmount = parseFloat(data?.feeAmount);
    apiData.service = data?.service?.id;
    apiData.approvalHierarchy = data?.approvalHierarchy?.id ?? null;
    apiData.taskLeader = parseInt(data?.taskLeader?.value) ?? null;
    mutate(apiData);
  };

  console.log(errors);

  return (
    <DrawerWrapper
      open={open}
      setOpen={() => {
        reset(createTaskDefaultValues);
        setOpen(false);
      }}
      title="Create Task"
    >
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <SelectTypes control={control} watch={watch} setValue={setValue} />
          <Box mt={2}>
            <FormAutoComplete
              control={control}
              label="Client"
              multiple
              required
              name="client"
              options={clients?.data?.result?.map((item: any) => ({
                label: item.displayName,
                value: item.id,
              }))}
            />
          </Box>
          {watch("serviceType") === "custom" && (
            <CustomCommonFields control={control} watch={watch} categories={categories} />
          )}
          {watch("taskType") === "recurring" && (
            <RecurringFields control={control} watch={watch} setValue={setValue} />
          )}
          {watch("taskType") === "non_recurring" && <NonRecurringFields control={control} />}
          <CommonFields
            control={control}
            watch={watch}
            labels={labels}
            users={users}
            setValue={setValue}
          />
          <Box mt={2}>
            <Typography color="rgba(0, 0, 0, 0.54)" variant="caption">
              Approval Hierarchy Details
            </Typography>
            {watch("approvalHierarchy") ? (
              <StyledSelectedBox sx={{ mt: "4px" }}>
                <Typography variant="subtitle2">
                  {watch<any>("approvalHierarchy")?.name} - Levels (
                  {watch<any>("approvalHierarchy")?.approvalLevels?.length})
                </Typography>
                <IconButton onClick={() => setOpenSelectAppHier(true)} size="small">
                  <Edit fontSize="small" />
                </IconButton>
              </StyledSelectedBox>
            ) : (
              <StyledSelectBox sx={{ mt: "4px" }} onClick={() => setOpenSelectAppHier(true)}>
                <Typography variant="body1" color="rgba(0,0,0,0.5)">
                  Select Approval Hierarchy
                </Typography>
              </StyledSelectBox>
            )}
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type="submit"
              loadingColor="white"
              title="Create Task"
              color="secondary"
            />
          </Box>
        </form>
      )}
      <SelectApprovalHierarchy
        onChange={(data: any) => setValue("approvalHierarchy", data)}
        open={openSelectAppHier}
        setOpen={setOpenSelectAppHier}
      />
    </DrawerWrapper>
  );
}

export default CreateTask;
