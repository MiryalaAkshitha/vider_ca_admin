import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import { getRoles } from "api/services/roles";
import { createUser, inviteUser } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import FormInput from "components/FormFields/FormInput";
import FormSelect from "components/FormFields/FormSelect";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { DialogProps, ResType } from "types";
import { inviteUserDefaultValues, inviteUserSchema } from "validations/inviteUser";

interface Props extends DialogProps {
  successCb?: () => void;
}

const defalutValues = {
  fullName: "",
  email: "",
  passw: "",
  mobileNumber: "",
};

function AddMemberToEspo({ open, setOpen, successCb }: Props) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defalutValues,
  });

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: () => {
      snack.success("succussfully added to espo!");
      reset(defalutValues);
      setOpen(false);
      successCb && successCb();
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <DrawerWrapper title="Add EspoMember" open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <FormInput control={control} name="fullName" label="Full Name *" />
        </Box>
        <Box mb={2}>
          <FormInput control={control} name="mobileNumber" label="Mobile Number *" />
        </Box>
        <Box mb={2}>
          <FormInput control={control} name="email" label="Email *" />
        </Box>
        <Box mb={2}>
          <FormInput control={control} name="password" label="password *" />
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Invite Espo User"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddMemberToEspo;
