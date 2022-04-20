import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { createBillingEntity } from "api/services/billingEntity";
import DrawerWrapper from "components/DrawerWrapper";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";
import useSnack from "hooks/useSnack";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import {
  createBillingDefaultValues,
  CreateBillingSchema,
} from "validations/createBilling";

const AddBillingEntities = ({ open, setOpen }: DialogProps) => {
  const snack = useSnack();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createBillingEntity, {
    onSuccess: (res) => {
      snack.success("Billing Entity Created");
      queryClient.invalidateQueries("billing-entities");
      setOpen(false);
    },

    onError: (err: any) => {
      snack.error(err.response.data.message);
      console.log(err.response.data.message);
    },
  });

  const { control, handleSubmit, watch } = useForm({
    defaultValues: createBillingDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreateBillingSchema),
  });

  const onFormSubmit = (data: any) => {
    const postBody = {
      ...data,
      gstRegistered: data.gstRegistered === "yes" ? true : false,
    };
    mutate(postBody);
  };

  return (
    <>
      <DrawerWrapper open={open} setOpen={setOpen} title="Billing Entity">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box>
            <FormInput
              control={control}
              name="name"
              label="Billing Entity Name"
            />
          </Box>
          <Box mt={2}>
            <FormSelect
              control={control}
              name="category"
              label="Billing Entity Category"
              options={[
                { value: "CA", label: "CA" },
                { value: "CMS", label: "CMS" },
                { value: "CS", label: "CS" },
                { value: "LAW", label: "LAW" },
              ]}
            />
          </Box>
          <Box mt={2}>
            <FormSelect
              control={control}
              name="type"
              label="Billing Entity Type"
              options={[
                { value: "SOLE_PROPRIETORSHIP", label: "Sole Proprietorship" },
                { value: "PARTNERSHIP_FIRM", label: "Partnership Firm" },
                { value: "LLP", label: "LLP" },
                {
                  value: "PRIVATE_LIMITED_COMPANY",
                  label: "Private Limited Company",
                },
              ]}
            />
          </Box>
          <Box mt={2}>
            <FormInput
              control={control}
              name="registrationNumber"
              label="Billing Entity Registration Number"
            />
          </Box>
          <Box mt={2}>
            <FormInput
              control={control}
              name="contactName"
              label="Contact Name"
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
            <FormRadio
              row
              control={control}
              name="gstRegistered"
              label="GST Registration"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </Box>
          {watch("gstRegistered") === "yes" && (
            <Box mt={2}>
              <FormInput control={control} name="gstIn" label="GSTIN" />
            </Box>
          )}
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
