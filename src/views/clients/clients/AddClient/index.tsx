import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { createClient } from "api/services/client";
import { getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import FormInput from "components/FormFields/FormInput";
import FormSelect from "components/FormFields/FormSelect";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useQueryParams from "hooks/useQueryParams";
import useSnack from "hooks/useSnack";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { CLIENT_CATEGORIES } from "utils/constants";
import {
  createClientDefaultValues,
  CreateClientSchema,
} from "validations/createCllient";
import Details from "./Details";

function AddClient() {
  const { queryParams, setQueryParams } = useQueryParams();
  const navigate = useNavigate();
  const snack = useSnack();
  const open = queryParams.createClient === "true";

  const { data: users, isLoading: userLoading }: ResType = useQuery(
    "users",
    getUsers,
    {
      enabled: open,
    }
  );

  const { mutate, isLoading } = useMutation(createClient, {
    onSuccess: (res) => {
      snack.success("Client Created");
      navigate(
        `/clients/${res.data.id}/profile/?displayName=${res.data?.displayName}&clientId=${res.data?.clientId}`
      );
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const subCategoriesExist = (category: any) => {
    let foundCategory = CLIENT_CATEGORIES.find(
      (item: any) => item.value === category
    );
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

  let subCategories = CLIENT_CATEGORIES.find(
    (item) => item.value === watch("category")
  )?.subCategories;

  const onFormSubmit = (data: any) => {
    mutate({
      ...data,
      gstVerified: data?.gstRegistered === "yes" && data?.gstVerified,
      panVerified: data?.gstRegistered === "no" && data?.panVerified,
    });
  };

  return (
    <DrawerWrapper
      open={open}
      setOpen={() => {
        delete queryParams.createClient;
        setQueryParams({
          ...queryParams,
        });
      }}
      title="Add Client"
    >
      {userLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <FormSelect
            control={control}
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
            <FormSelect
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
            <FormInput
              control={control}
              name="displayName"
              label="Display Name"
            />
          </Box>
          <Box mt={2}>
            <FormInput
              control={control}
              name="mobileNumber"
              label="Mobile number"
            />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="email" label="Email" />
          </Box>
          <Box mt={2}>
            <FormInput
              control={control}
              name="authorizedPerson"
              label="Authorized person name"
            />
          </Box>
          <Box mt={2}>
            <FormInput
              control={control}
              name="designation"
              label="Designation"
            />
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
