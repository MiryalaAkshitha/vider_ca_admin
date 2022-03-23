import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
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
} from "utils/vallidations";

function AddClient() {
  const { queryParams, setQueryParams } = useQueryParams();
  const navigate = useNavigate();
  const snack = useSnack();

  const { data: users, isLoading: userLoading }: ResType = useQuery(
    "users",
    getUsers,
    {
      enabled: queryParams.createClient === "true",
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

  const { watch, control, handleSubmit } = useForm({
    defaultValues: createClientDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreateClientSchema),
  });

  let subCategories = CLIENT_CATEGORIES.find(
    (item) => item.value === watch("category")
  )?.subCategories;

  const onFormSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <DrawerWrapper
      open={queryParams.createClient === "true"}
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
            <FormInput
              control={control}
              name="displayName"
              label="Display Name"
            />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="tradeName" label="Trade Name" />
          </Box>
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
              name="mobileNumber"
              label="Mobile Number"
            />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="email" label="Email" />
          </Box>
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
