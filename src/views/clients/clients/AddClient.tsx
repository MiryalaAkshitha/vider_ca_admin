import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import { createClient } from "api/services/client";
import { getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import CustomSelectField from "components/FormFields/CustomSelectField";
import CustomTextField from "components/FormFields/CustomTextField";
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

  const { watch, control, formState, handleSubmit } = useForm({
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

  const { errors } = formState;

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
          <CustomSelectField
            control={control}
            name="category"
            label="Category"
            error={errors.category}
            options={CLIENT_CATEGORIES.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
          />
          {subCategories && (
            <Box mt={2}>
              <CustomSelectField
                control={control}
                name="subCategory"
                label="Sub Category"
                error={errors.subCategory}
                options={subCategories.map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
              />
            </Box>
          )}
          <Box mt={2}>
            <CustomTextField
              control={control}
              name="displayName"
              label="Display Name"
              error={errors.displayName}
            />
          </Box>
          <Box mt={2}>
            <CustomTextField
              control={control}
              name="tradeName"
              label="Trade Name"
              error={errors.tradeName}
            />
          </Box>
          <Box mt={2}>
            <CustomSelectField
              control={control}
              name="clientManager"
              label="Client Manager"
              error={errors.clientManager}
              options={users?.data?.map((item: any) => ({
                label: item.fullName,
                value: item.id,
              }))}
            />
          </Box>
          <Box mt={2}>
            <CustomTextField
              control={control}
              name="mobileNumber"
              label="Mobile Number"
              error={errors.mobileNumber}
            />
          </Box>
          <Box mt={2}>
            <CustomTextField
              control={control}
              name="email"
              label="Email"
              error={errors.email}
            />
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
