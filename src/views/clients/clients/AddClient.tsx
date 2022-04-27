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
import FormRadio from "components/FormFields/FormRadio";
import {
  createClientDefaultValues,
  CreateClientSchema,
} from "validations/createCllient";

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
          <Box mt={2}>
            <FormInput
              control={control}
              name="mobileNumber"
              label="Client Mobile number"
            />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="email" label="Client Mail Id" />
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
            <FormRadio
              row
              control={control}
              name="gstRegistered"
              label="Is this firm registered for GST?"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </Box>
          {watch("gstRegistered") === "yes" && (
            <Box mt={2}>
              <FormInput
                control={control}
                name="gstNumber"
                label="GST Number"
              />
            </Box>
          )}
          {watch("gstRegistered") === "no" && (
            <Box mt={2}>
              <FormInput
                control={control}
                name="panNumber"
                label="PAN Number"
              />
            </Box>
          )}
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
