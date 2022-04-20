import { Box, Button } from "@mui/material";
import DrawerWrapper from "components/DrawerWrapper";
import FormInput from "components/FormFields/FormInput";
import { useForm } from "react-hook-form";
import {
  createBankdetailsDefaultValues,
  CreatebankDetailsSchema,
} from "validations/createBankDetails";
import { yupResolver } from "@hookform/resolvers/yup";
import { CloseOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import UploadImage from "components/UploadImage";
import { StyledAttachment } from "../organization/styles";
import useSnack from "hooks/useSnack";
import { useMutation, useQueryClient } from "react-query";
import { createBankAccounts } from "api/services/billingEntity";

const AddBankAccountDetails = ({ open, setOpen, state, setState }) => {
  const snack = useSnack();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createBankAccounts, {
    onSuccess: (res) => {
      snack.success("Bank Account Created");
      queryClient.invalidateQueries("bank-accounts");
      setOpen(false);
    },

    onError: (err: any) => {
      snack.error(err.response.data.message);
      console.log(err.response.data.message);
    },
  });

  const { control, handleSubmit, watch } = useForm({
    defaultValues: createBankdetailsDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreatebankDetailsSchema),
  });

  const onFormSubmit = (data: any) => {
    mutate(data);
    console.log(data);
  };

  return (
    <>
      <DrawerWrapper open={open} setOpen={setOpen} title="Bank account">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box>
            <FormInput control={control} name="bankName" label="Bank Name" />
          </Box>

          <Box mt={2}>
            <FormInput
              control={control}
              name="branchName"
              label="Bank Branch"
            />
          </Box>
          <Box mt={2}>
            <FormInput
              control={control}
              name="accountNumber"
              label="Bank Account Number"
            />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="ifscCode" label="IFSC Code" />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="upiId" label="UPI ID" />
          </Box>

          <Box mt={2}>
            <Typography gutterBottom variant="body2" color="rgba(0,0,0,0.6)">
              Upload UPI ID
            </Typography>
            {state.gstAttachment ? (
              <StyledAttachment>
                <a
                  href={state.gstAttachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="rgba(0,0,0,0.8)"
                  >
                    {state.gstAttachment}
                  </Typography>
                </a>
                <CloseOutlined
                  onClick={() =>
                    setState((draft: any) => {
                      draft.gstAttachment = "";
                    })
                  }
                  sx={{ cursor: "pointer" }}
                  fontSize="small"
                />
              </StyledAttachment>
            ) : (
              <UploadImage
                name="upiAttachment"
                widthoutIcon
                sx={{
                  minHeight: "80px",
                }}
                onChange={(v) =>
                  setState((draft: any) => {
                    draft.gstAttachment = v;
                  })
                }
              />
            )}
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
export default AddBankAccountDetails;
