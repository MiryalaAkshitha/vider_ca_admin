import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { createBillingEntity } from "api/services/billingEntity";
import DrawerWrapper from "components/DrawerWrapper";
import FormInput from "components/FormFields/FormInput";
import FormSelect from "components/FormFields/FormSelect";
import { snack } from "components/toast";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import {
  createBillingDefaultValues,
  CreateBillingSchema,
} from "validations/createBilling";

const AddBillingEntities = ({ open, setOpen }: DialogProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createBillingEntity, {
    onSuccess: () => {
      snack.success("Billing Entity Created");
      queryClient.invalidateQueries("billing-entities");
      setOpen(false);
    },

    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { control, handleSubmit } = useForm({
    defaultValues: createBillingDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreateBillingSchema),
  });

  const onFormSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <>
      <DrawerWrapper open={open} setOpen={setOpen} title="Billing Entity">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box>
            <FormInput control={control} name="legalName" label="Legal Name" />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="tradeName" label="Trade Name" />
          </Box>
          <Box mt={2}>
            <FormSelect
              control={control}
              name="category"
              label="Category"
              options={[
                { value: "COMPANY", label: "Company" },
                { value: "INDIVIDUAL", label: "Individual" },
              ]}
            />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="email" label="Email Address" />
          </Box>
          <Box mt={2}>
            <FormInput
              control={control}
              name="mobileNumber"
              label="Mobile Number"
            />
          </Box>
          <Box mt={2}>
            <Button type="submit" variant="contained" fullWidth color="error">
              Create Entity
            </Button>
          </Box>
        </form>
      </DrawerWrapper>
    </>
  );
};
export default AddBillingEntities;
