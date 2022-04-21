import { Box, Button } from "@mui/material";
import DrawerWrapper from "components/DrawerWrapper";
import FormInput from "components/FormFields/FormInput";
import { useForm } from "react-hook-form";
import {
  createEntityDocumentDefaultValues,
  CreateEntityDocumentSchema,
} from "validations/createEntityDocument";
import { yupResolver } from "@hookform/resolvers/yup";
import FormSelect from "components/FormFields/FormSelect";
import { CloseOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import UploadImage from "components/UploadImage";
import { StyledAttachment } from "../organization/styles";

const AddEntityDocuments = ({ open, setOpen, state, setState }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: createEntityDocumentDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreateEntityDocumentSchema),
  });

  const onFormSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <DrawerWrapper open={open} setOpen={setOpen} title="Add licenses">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box>
            <FormSelect
              control={control}
              name="licenseType"
              label="License Type"
              options={[
                {
                  value: "organizationIncorporation",
                  label: "Organization Incorporation",
                },
                { value: "prefessionalTax", label: "Prefessional Tax" },
                { value: "tradeLicense", label: "Trade License" },
              ]}
            />
          </Box>
          <Box mt={2}>
            <FormInput
              control={control}
              name="licenseTitle"
              label="License Title"
            />
          </Box>

          <Box mt={2}>
            <FormInput
              control={control}
              name="licenseNumber"
              label="License Number"
            />
          </Box>
          <Box mt={2}>
            <Typography gutterBottom variant="body2" color="rgba(0,0,0,0.6)">
              Upload License Attachment
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
                name="gstAttachment"
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
export default AddEntityDocuments;
