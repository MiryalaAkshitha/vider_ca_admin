import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { createClient } from "api/services/clients/clients";
import { getUsers, resetPassword } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import FormInput from "components/FormFields/FormInput";
import FormSelect from "components/FormFields/FormSelect";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { DialogProps, ResType } from "types";
import { CLIENT_CATEGORIES } from "data/constants";
import { createClientDefaultValues, CreateClientSchema } from "validations/createCllient";
import Details from "./Details";
import FormAutoComplete from "components/FormFields/FormAutocomplete";

interface Props extends DialogProps {
  successCb?: () => void;
}

function AddClient({ open, setOpen, successCb }: Props) {
  const navigate = useNavigate();

  const { data: users, isLoading: userLoading }: ResType = useQuery("users", getUsers, {
    enabled: open,
  });

  const { mutate, isLoading } = useMutation(createClient, {
    onSuccess: (res) => {
      snack.success("Client Created");
      setOpen(false);
      if (successCb) {
        successCb();
        return;
      }
      navigate({
        pathname: `/clients/${res.data.id}/profile/`,
        search: `?displayName=${res.data?.displayName}&clientId=${res.data?.clientId}`,
      });
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const subCategoriesExist = (category: any) => {
    let foundCategory = CLIENT_CATEGORIES.find((item: any) => item.value === category);
    return foundCategory?.subCategories?.length;
  };

  const { watch, control, handleSubmit, reset, getValues } = useForm({
    defaultValues: createClientDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreateClientSchema({ subCategoriesExist })),
  });

  const setData = (data: any) => {
    reset({
      ...getValues(),
      ...data,
    });
  };

  let subCategories = CLIENT_CATEGORIES.find((item) => item.value === watch("category"))?.subCategories;

  const onFormSubmit = (data: any) => {
    mutate({
      ...data,
      clientManager: data?.clientManager?.value,
      gstVerified: data?.gstRegistered === "yes" && data?.gstVerified,
      panVerified: data?.gstRegistered === "no" && data?.panVerified,
    });
  };

  return (
    <DrawerWrapper
      open={open}
      setOpen={() => {
        reset(createClientDefaultValues);
        setOpen(false);
      }}
      title="Add Client"
    >
      {userLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <FormSelect
            control={control}
            required
            name="category"
            label="Category"
            options={CLIENT_CATEGORIES.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
          />
          {subCategories && (
            <Box mt={2}>
              <FormSelect
                control={control}
                name="subCategory"
                label="Sub Category"
                options={subCategories.map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
              />
            </Box>
          )}
          <Box mt={2}>
            <FormAutoComplete
              control={control}
              name="clientManager"
              label="Client Manager"
              options={users?.data?.map((item: any) => ({
                label: item.fullName,
                value: item.id,
              }))}
            />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="displayName" label="Display Name" required />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="mobileNumber" label="Mobile number" required />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="email" label="Email" required />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="authorizedPerson" label="Authorized person name" />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="designation" label="Designation" />
          </Box>
          <Details control={control} watch={watch} setData={setData} />
          <LoadingButton
            loading={isLoading}
            fullWidth
            sx={{ mt: 3 }}
            type="submit"
            loadingColor="white"
            title="Create Client"
            color="secondary"
          />
        </form>
      )}
    </DrawerWrapper>
  );
}

export default AddClient;
