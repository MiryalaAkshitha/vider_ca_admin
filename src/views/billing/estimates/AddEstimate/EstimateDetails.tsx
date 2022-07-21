import { Grid, MenuItem, TextField } from "@mui/material";
import { DUE_TERMS } from "data/dueTerms";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFieldChange,
  selectEstimate,
} from "redux/reducers/createEstimateSlice";
import SectionHeading from "../SectionHeading";

function EstimateDetails() {
  const { estimateNumber, estimateDate, estimateDueDate, terms } =
    useSelector(selectEstimate);
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    dispatch(
      handleFieldChange({
        key: e.target.name,
        value: e.target.value,
      })
    );
  };

  return (
    <Grid container mt={5}>
      <Grid item xs={12}>
        <SectionHeading title="Estimate Details" />
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Estimate number"
              variant="outlined"
              name="estimateNumber"
              value={estimateNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Estimate Date"
              variant="outlined"
              value={estimateDate}
              name="estimateDate"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              size="small"
              label="Terms"
              variant="outlined"
              value={terms}
              name="terms"
              onChange={handleChange}
            >
              {DUE_TERMS.map((item, index) => (
                <MenuItem value={item.value} key={index}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Due Date"
              size="small"
              variant="outlined"
              value={estimateDueDate}
              name="estimateDueDate"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EstimateDetails;
