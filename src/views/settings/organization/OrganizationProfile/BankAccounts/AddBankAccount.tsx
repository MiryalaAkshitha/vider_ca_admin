import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { createBankAccount } from "api/services/organization";
import DrawerWrapper from "components/DrawerWrapper";
import FormInput from "components/FormFields/FormInput";
import UploadImage from "components/UploadImage";
import { snack } from "components/toast";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
  createBankdetailsDefaultValues,
  CreatebankDetailsSchema,
} from "validations/createBankDetails";
import { useParams } from "react-router-dom";

const AddBankAccountDetails = ({ open, setOpen }) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const queryKey = params.billingEntityId
    ? "billing-entity-bank-accounts"
    : "bank-accounts";

  const { mutate } = useMutation(createBankAccount, {
    onSuccess: () => {
      snack.success("Bank Account Created");
      queryClient.invalidateQueries(queryKey);
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { control, handleSubmit } = useForm({
    defaultValues: createBankdetailsDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreatebankDetailsSchema),
  });

  const onFormSubmit = (data: any) => {
    mutate({
      billingEntityId: params.billingEntityId,
      data: data,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Create bank account">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box>
          <FormInput control={control} name="bankName" label="Bank Name" required/>
        </Box>
        <Box mt={2}>
          <FormInput control={control} name="branchName" label="Bank Branch" required />
        </Box>
        <Box mt={2}>
          <FormInput
            control={control}
            name="accountNumber"
            label="Bank Account Number"
            required
          />
        </Box>
        <Box mt={2}>
          <FormInput control={control} name="ifscCode" label="IFSC Code" required />
        </Box>
        <Box mt={2}>
          <FormInput control={control} name="upiId" label="UPI ID" required/>
        </Box>
        <Box mt={2}>
          <Controller
            control={control}
            name="upiAttachment"
            render={({ field, fieldState: { error } }) => (
              <>
                <UploadImage name="upiAttachment" onChange={field.onChange} />
                {error && (
                  <Typography
                    variant="caption"
                    sx={{ pl: "2px", display: "block", mt: 1 }}
                    color="rgb(211, 47, 47)"
                  >
                    {error.message}
                  </Typography>
                )}
              </>
            )}
          />
        </Box>
        <Box mt={2}>
          <Button type="submit" variant="contained" fullWidth color="error">
            Create bank account
          </Button>
        </Box>
      </form>
    </DrawerWrapper>
  );
};
export default AddBankAccountDetails;
