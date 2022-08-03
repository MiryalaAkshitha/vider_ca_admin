import { yupResolver } from "@hookform/resolvers/yup";
import { Close } from "@mui/icons-material";
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
import {
  createTaskDefaultValues,
  createTaskSchema,
} from "validations/createTask";
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
  const { users, labels, categories, clients, loading } =
    useCreateTaskInitialData({ enabled: open });

  const subcategoriesExist = (category: any) => {
    return categories?.data?.find((item: any) => item.id === parseInt(category))
      ?.subCategories?.length;
  };

  const { watch, control, handleSubmit, setValue, reset } = useForm({
    defaultValues: createTaskDefaultValues,
    mode: "onChange",
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
    data.client = data.client?.map((client: any) => parseInt(client.value));
    data.members = data.members?.map((member: any) => parseInt(member.value));
    data.labels = data.labels?.map((label: any) => parseInt(label.value));
    data.category = parseInt(data.category);
    data.subCategory = parseInt(data.subCategory);
    data.taskLeader = parseInt(data.taskLeader);
    data.feeAmount = parseFloat(data?.feeAmount);
    data.service = data?.service?.id;
    data.dueDay = parseInt(data.dueDay?.value);
    data.recurringEndDate = data?.neverExpires ? null : data.recurringEndDate;
    data.approvalHierarchy = data?.approvalHierarchy?.id ?? null;
    mutate(data);
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Create Task">
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
            <CustomCommonFields
              control={control}
              watch={watch}
              categories={categories}
            />
          )}
          {watch("taskType") === "recurring" && (
            <RecurringFields control={control} watch={watch} />
          )}
          {watch("taskType") === "non_recurring" && (
            <NonRecurringFields control={control} />
          )}
          <CommonFields
            control={control}
            watch={watch}
            labels={labels}
            users={users}
            setValue={setValue}
          />
          {watch("approvalHierarchy") && (
            <StyledSelectedBox>
              <Box display="flex" gap={1} alignItems="center">
                <Typography variant="caption">Approval Hierarchy -</Typography>
                <Typography variant="subtitle2">
                  {watch<any>("approvalHierarchy")?.name}
                </Typography>
              </Box>
              <IconButton
                onClick={() => setValue("approvalHierarchy", null)}
                size="small"
              >
                <Close fontSize="small" />
              </IconButton>
            </StyledSelectedBox>
          )}
          {!watch("approvalHierarchy") && (
            <StyledSelectBox onClick={() => setOpenSelectAppHier(true)}>
              <Typography variant="body1" color="rgba(0,0,0,0.5)">
                Select Approval Hierarchy
              </Typography>
            </StyledSelectBox>
          )}
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
