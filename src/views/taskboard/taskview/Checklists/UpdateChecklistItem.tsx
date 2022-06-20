import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { updateChecklistItem } from "api/services/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, SubmitType } from "types";

interface StateProps {
  name: string;
  description: string;
}

interface Props extends DialogProps {
  selectedItem: any;
}

function UpdateChecklistItem({ open, setOpen, selectedItem }: Props) {
  const queryClient = useQueryClient();

  const [state, setState] = useState<StateProps>({
    name: "",
    description: "",
  });

  useEffect(() => {
    setState({
      name: selectedItem?.name || "",
      description: selectedItem?.description || "",
    });
  }, [selectedItem]);

  const { mutate, isLoading } = useMutation(updateChecklistItem, {
    onSuccess: () => {
      snack.success("Checklist item Updated");
      setOpen(false);
      queryClient.invalidateQueries("checklists");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({
      data: {
        ...state,
        id: selectedItem?.id,
      },
    });
  };

  return (
    <DrawerWrapper open={open} title="Update Checklist Item" setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <Box display="flex" gap={2} mb={3}>
          <Box flex={1}>
            <TextField
              variant="outlined"
              sx={{ mb: 2 }}
              fullWidth
              size="small"
              name="name"
              onChange={handleChange}
              value={state.name}
              label="Checklist item name"
              required
            />
            <TextField
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              size="small"
              name="description"
              onChange={handleChange}
              value={state.description}
              label="Checklist item description"
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            loadingColor="white"
            title="Update Checklist Item"
            color="secondary"
            type="submit"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default UpdateChecklistItem;
