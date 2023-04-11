import ClearIcon from "@mui/icons-material/Clear";
import {
  Autocomplete,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { PARTICULARS_HEADINGS } from "data/particularsHeadings";
import { TAXES } from "data/taxes";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddParticular,
  handleChangeParticular,
  handleRemoveParticular,
  selectEstimate,
} from "redux/reducers/createEstimateSlice";
import { StyledParticularsTable } from "views/billing/styles";
import { getAmount } from "../calculations";
import SelectTaskDialog from "./SelectTaskDialog";

function Particulars() {
  const state = useSelector(selectEstimate);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  function updateParticular(index: number, key: string, value: any) {
    dispatch(handleChangeParticular({ index, key, value }));
  }

  function addNewParticular() {
    dispatch(handleAddParticular());
  }

  function removeParticular(index: number) {
    dispatch(handleRemoveParticular(index));
  }

  const interState = state.billingEntityAddress?.state === state?.placeOfSupply.split("-")[1];

  return (
    <Box mt={4}>
      <SelectTaskDialog open={open} setOpen={setOpen} />
      <TableContainer>
        <StyledParticularsTable>
          <TableHead>
            <TableRow>
              {PARTICULARS_HEADINGS.map((row, index) => {
                if (interState && row.name === "GST") {
                  return (
                    <TableCell key={index} style={{ width: row.width }}>
                      <Typography>CGST / SGST</Typography>
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={index} style={{ width: row.width }}>
                    <Typography>{row.name}</Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.particulars.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Name of the Particular"
                    value={row.name}
                    onChange={(e) =>
                      updateParticular(index, "name", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="HSN / SAC"
                    variant="standard"
                    value={row.hsn}
                    onChange={(e) => {
                      updateParticular(index, "hsn", e.target.value);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    select
                    variant="standard"
                    value={row.units}
                    onChange={(e) => {
                      updateParticular(index, "units", e.target.value);
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((unit, index) => (
                      <MenuItem value={unit} key={index}>
                        {unit}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    variant="standard"
                    value={row.rate}
                    onChange={(e) => {
                      updateParticular(index, "rate", e.target.value);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <TextField
                      fullWidth
                      select
                      variant="standard"
                      value={row.discountType}
                      onChange={(e) => {
                        updateParticular(index, "discountType", e.target.value);
                      }}
                    >
                      <MenuItem value="PERCENT">%</MenuItem>
                      <MenuItem value="AMOUNT">&#8377; </MenuItem>
                    </TextField>
                    <TextField
                      fullWidth
                      type="number"
                      variant="standard"
                      value={row.discount}
                      onChange={(e) => {
                        updateParticular(index, "discount", e.target.value);
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="standard"
                    value={getAmount(row)}
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <SelectTax
                    onChange={(v: any) => {
                      updateParticular(index, "gst", v);
                    }}
                    value={row.gst}
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="secondary">
                    <ClearIcon onClick={() => removeParticular(index)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledParticularsTable>
        <Box display="flex" gap={3} mt={2}>
          <Button onClick={() => addNewParticular()} color="secondary">
            + Add New Item
          </Button>
          <Button onClick={() => setOpen(true)} color="secondary">
            + Select Task
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
}

const SelectTax = ({ onChange, value }) => {
  return (
    <Autocomplete
      options={TAXES}
      sx={{ mt: -1 }}
      autoHighlight
      value={value}
      onChange={(e, v) => onChange(v)}
      disableClearable
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Box>
            <Typography variant="body2">{option.name}</Typography>
            <Typography variant="caption" sx={{ fontSize: 11 }}>
              {option.desc}
            </Typography>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Select Tax" variant="standard" />
      )}
    />
  );
};

export default Particulars;
