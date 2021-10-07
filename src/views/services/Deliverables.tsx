import { Delete } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeliverable,
  deleteDeliverable,
  selectDeliverables,
  updateDeliverable,
} from "redux/reducers/addServiceSlice";

function Deliverables() {
  const dispatch = useDispatch();
  const addedDeliverables = useSelector(selectDeliverables);

  const handleAdd = () => {
    dispatch(addDeliverable());
  };

  const handleUpdate = (index: number, value: string) => {
    dispatch(updateDeliverable({ index, value }));
  };

  const handleDelete = (index: number) => {
    dispatch(deleteDeliverable(index));
  };

  return (
    <Box mt={4}>
      <Typography variant='subtitle2' color='primary'>
        Deliverables
      </Typography>
      <Container sx={{ mt: 4 }}>
        <Box mt={3}>
          <Typography variant='body2' color='primary'>
            Deliverable Name
          </Typography>
          {addedDeliverables.map((item, index) => (
            <Box display='flex' mt={2} gap={1}>
              <TextField
                onChange={(e) => handleUpdate(index, e.target.value)}
                key={index}
                fullWidth
                value={item}
                placeholder='Deliverable'
                size='small'
              />
              <div>
                <IconButton onClick={() => handleDelete(index)}>
                  <Delete />
                </IconButton>
              </div>
            </Box>
          ))}
        </Box>
        <Button onClick={handleAdd} sx={{ mt: 1 }} color='secondary'>
          + Add New
        </Button>
      </Container>
    </Box>
  );
}

export default Deliverables;
