import { MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { updateOrganizationLicense } from "api/services/organization";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import UploadImage from "components/UploadImage";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, SubmitType } from "types";
import { LICENSE_TYPES } from "utils/constants";

interface IProps extends DialogProps {
  data: any;
}

function EditLicense({ open, setOpen, data }: IProps) {
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    name: "",
    type: "",
    licenseNumber: "",
    attachment: "",
  });

  useEffect(() => {
    setState({
      name: data.name,
      type: data.type,
      licenseNumber: data.licenseNumber,
      attachment: data.attachment,
    });
  }, [data]);

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation(updateOrganizationLicense, {
    onSuccess: () => {
      snack.success("License has been updated");
      queryClient.invalidateQueries("organization_licenses");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({
      id: data.id,
      data: state,
    });
  };

  return (
    <DrawerWrapper title="Edit Lincese" open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            required
            label="License Name"
            name="name"
            size="small"
            value={state.name}
            fullWidth
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="License Number"
            name="licenseNumber"
            size="small"
            required
            fullWidth
            value={state.licenseNumber}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            required
            select
            onChange={handleChange}
            label="License Type"
            name="type"
            size="small"
            value={state.type}
          >
            {LICENSE_TYPES.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box>
          <Typography variant="body2" color="rgba(0,0,0,0.6)" gutterBottom>
            Attachment
          </Typography>
          <UploadImage
            name="attachment"
            onChange={(v) =>
              setState({
                ...state,
                attachment: v,
              })
            }
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Update License"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default EditLicense;
