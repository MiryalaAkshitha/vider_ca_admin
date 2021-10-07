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
  addDocument,
  deleteDocument,
  selectDocuments,
  updateDocument,
} from "redux/reducers/addServiceSlice";

function Documents() {
  const dispatch = useDispatch();
  const addedDocuments = useSelector(selectDocuments);

  const handleAdd = () => {
    dispatch(addDocument());
  };

  const handleUpdate = (index: number, value: string) => {
    dispatch(updateDocument({ index, value }));
  };

  const handleDelete = (index: number) => {
    dispatch(deleteDocument(index));
  };

  return (
    <Box mt={4}>
      <Typography variant='subtitle2' color='primary'>
        Documents
      </Typography>
      <Container sx={{ mt: 4 }}>
        <Box mt={3}>
          <Typography variant='body2' color='primary'>
            Document Name
          </Typography>
          {addedDocuments.map((item, index) => (
            <Box display='flex' mt={2} gap={1}>
              <TextField
                onChange={(e) => handleUpdate(index, e.target.value)}
                key={index}
                fullWidth
                value={item}
                placeholder='Document'
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

export default Documents;
