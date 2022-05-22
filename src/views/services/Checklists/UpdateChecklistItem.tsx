import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateChecklistItem } from "redux/reducers/addServiceSlice";
import { DialogProps, SubmitType } from "types";

interface StateProps {
  name: string;
  description: string;
}

interface Props extends DialogProps {
  data: any;
  index: number;
  checklistIndex;
}

function UpdateChecklistItem(props: Props) {
  const dispatch = useDispatch();
  const { open, setOpen, data, checklistIndex, index } = props;

  const [state, setState] = useState<StateProps>({
    name: "",
    description: "",
  });

  useEffect(() => {
    setState({
      name: data.name || "",
      description: data.description || "",
    });
  }, [data]);

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    dispatch(
      updateChecklistItem({
        checklistIndex,
        itemIndex: index,
        data: state,
      })
    );
    setOpen(false);
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
              required
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={false}
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
