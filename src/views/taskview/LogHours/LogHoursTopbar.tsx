import { Box, Button, Typography } from "@mui/material";
import { deleteLogHour } from "api/services/tasks/loghours";
import { snack } from "components/toast";
import { useMutation, useQueryClient } from "react-query";
import { StyledLogHoursTopbar } from "views/clients/styles";

type Props = {
  selectedItems: number[];
  setSelectedItems: (items: number[]) => void;
};

function LogHoursTopbar({ selectedItems, setSelectedItems }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(deleteLogHour, {
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = async () => {
    try {
      for (const id of selectedItems) {
        await mutateAsync(id);
      }
      setSelectedItems([]);
      snack.success("Log Hour(s) Deleted");
      queryClient.invalidateQueries("loghours");
    } catch (err) {
      queryClient.invalidateQueries("loghours");
    }
  };

  return (
    <StyledLogHoursTopbar active={selectedItems.length > 0 ? 1 : 0}>
      <div>
        <Typography variant="body1" color="primary">
          {selectedItems.length} item(s) selected.
        </Typography>
      </div>
      <Box>
        <Button
          variant="outlined"
          size="small"
          onClick={handleDelete}
          sx={{ minWidth: 80 }}
          color="secondary"
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setSelectedItems([])}
          sx={{ minWidth: 80, ml: 1 }}
          color="secondary"
        >
          Cancel
        </Button>
      </Box>
    </StyledLogHoursTopbar>
  );
}

export default LogHoursTopbar;
