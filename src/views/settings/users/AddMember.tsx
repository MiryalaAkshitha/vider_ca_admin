import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import { getRoles } from "api/services/roles";
import { inviteUser } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import FormInput from "components/FormFields/FormInput";
import FormSelect from "components/FormFields/FormSelect";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { DialogProps, ResType } from "types";
import {
  inviteUserDefaultValues,
  inviteUserSchema,
} from "validations/inviteUser";

interface Props extends DialogProps {
  successCb?: () => void;
}

function AddMember({ open, setOpen, successCb }: Props) {
  const { data, isLoading: dataLoading }: ResType = useQuery(
    "roles",
    getRoles,
    { enabled: open }
  );

  const { control, handleSubmit, reset } = useForm({
    defaultValues: inviteUserDefaultValues,
    resolver: yupResolver(inviteUserSchema()),
  });

  const { mutate, isLoading } = useMutation(inviteUser, {
    onSuccess: () => {
      snack.success("An invitation has been sent to the user");
      reset(inviteUserDefaultValues);
      setOpen(false);
      successCb && successCb();
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <DrawerWrapper title="Add Member" open={open} setOpen={setOpen}>
      {dataLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <FormInput control={control} name="fullName" label="Full Name" />
          </Box>
          <Box mb={2}>
            <FormInput control={control} name="email" label="Email" />
          </Box>
          <Box mb={2}>
            <FormInput
              control={control}
              name="mobileNumber"
              label="Mobile Number"
            />
          </Box>
          <Box>
            <FormSelect
              control={control}
              name="role"
              label="role"
              options={data?.data?.map((item: any) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type="submit"
              loadingColor="white"
              title="Invite User"
              color="secondary"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default AddMember;
