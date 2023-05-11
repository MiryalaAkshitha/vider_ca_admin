import { Add } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import DrawerWrapper from "components/DrawerWrapper";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateStageOfWork } from "redux/reducers/addServiceSlice";
import { DialogProps, InputChangeType, SubmitType } from "types";

interface Props extends DialogProps {
  data: any;
  index: number;
}

function EditStageOfWork({ open, setOpen, data, index }: Props) {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    type: "Stage of work",
    description: "",
    referenceNumber: false,
    extraAttributes: [
      {
        type: "Reference Number",
        title: "",
        value: "",
      },
    ],
  });

  useEffect(() => {
    setState(_.cloneDeep(data));
  }, [data]);

  const handleChange = (e: InputChangeType) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setState({
      ...state,
      extraAttributes: [
        ...state.extraAttributes,
        {
          type: "Reference Number",
          title: "",
          value: "",
        },
      ],
    });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    dispatch(
      updateStageOfWork({
        index,
        data: state,
      })
    );
    setOpen(false);
  };

  return (
    <DrawerWrapper open={open} title="Edit Milestone" setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
          <RadioGroup
            onChange={(e: InputChangeType) => {
              setState({ ...state, type: e.target.value });
            }}
            row
            name="type"
            value={state.type}
          >
            <FormControlLabel
              value="Stage of work"
              control={<Radio />}
              label="Milestone"
            />
            <FormControlLabel
              value="Deliverables"
              control={<Radio />}
              label="Deliverables"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          variant="outlined"
          fullWidth
          onChange={handleChange}
          size="small"
          sx={{ mt: 2 }}
          value={state.name}
          name="name"
          label="Milestone name"
          required
        />
        <TextField
          variant="outlined"
          fullWidth
          onChange={handleChange}
          size="small"
          sx={{ mt: 2 }}
          rows={4}
          multiline
          value={state.description}
          name="description"
          label="Description"
          required
        />
        {state.type === "Stage of work" && (
          <FormControlLabel
            sx={{ mt: 1 }}
            label="Does this have a reference number"
            control={
              <Checkbox
                checked={state.referenceNumber}
                onChange={(e) => {
                  setState({ ...state, referenceNumber: e.target.checked });
                }}
                name="referenceNumber"
                color="primary"
              />
            }
          />
        )}
        {state.type === "Deliverables" && (
          <Box mt={2}>
            <Typography variant="body2" gutterBottom>
              Add attachments or reference numbers
            </Typography>
            <Box mt={1}>
              {state.extraAttributes.map((item, index) => (
                <Box display="flex" gap={1} mb={1} key={index}>
                  <TextField
                    sx={{ width: "30%" }}
                    select
                    onChange={(e: InputChangeType) => {
                      const newState = [...state.extraAttributes];
                      newState[index].type = e.target.value;
                      setState({ ...state, extraAttributes: newState });
                    }}
                    variant="outlined"
                    size="small"
                    value={item.type}
                  >
                    <MenuItem value="Reference Number">
                      Reference Number
                    </MenuItem>
                    <MenuItem value="Attachment">Attachment</MenuItem>
                  </TextField>
                  <TextField
                    onChange={(e: InputChangeType) => {
                      const newState = [...state.extraAttributes];
                      newState[index].title = e.target.value;
                      setState({ ...state, extraAttributes: newState });
                    }}
                    sx={{ flex: 1 }}
                    placeholder={
                      item.type === "Reference Number"
                        ? "Title of the reference number"
                        : "Title of the attachment"
                    }
                    variant="outlined"
                    size="small"
                    value={item.title}
                  />
                </Box>
              ))}
              <Box mt={1} textAlign="right">
                <Button
                  onClick={handleAdd}
                  startIcon={<Add />}
                  color="secondary"
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        <Box textAlign="right" mt={3}>
          <Button fullWidth variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default EditStageOfWork;
