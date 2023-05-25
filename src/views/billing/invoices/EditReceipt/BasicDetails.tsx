import { Box, MenuItem, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, selectReceipt } from "redux/reducers/createReceiptSlice";
import { ResType } from "types";
import { useQuery } from "react-query";
import { getNextReceiptNumber } from "api/services/billing/receipts";
import Loader from "components/Loader";
import { getClients } from "api/services/clients/clients";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function BasicDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(selectReceipt);

  const { data, isLoading }: ResType = useQuery(
    ["next-receipt-number"],
    getNextReceiptNumber,
    {
      onSuccess: (res: any) => {
        if(state && state.particulars.length == 0) {
          navigate(`/billing/invoices`);
        }
        dispatch(handleChange({ key: "receiptNumber", value: res.data }));
        dispatch(handleChange({ key: "receiptDate", value: moment().format("YYYY-MM-DD") }));
      },
    }
  );

  const { data: clients, isLoading: clientsLoading }: ResType = useQuery(
    ["clients"],
    getClients,
    {
      onSuccess: (res: any) => {
               
      },
    }
  );

  const onChange = (event: any) => {
    const { name, value } = event.target;
    dispatch(handleChange({ key: name, value: value }));
  };

  if (isLoading || clientsLoading) return <Loader />;

  return (
    <Box sx={{ maxWidth: 600 }}>
      <TextField
        fullWidth
        label="Receipt Number"
        variant="outlined"
        size="small"
        name="receiptNumber"
        disabled
        value={state.receiptNumber}
      />
      <TextField
        fullWidth
        label="Receipt Date"
        sx={{ mt: 3 }}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        size="small"
        type="date"
        name="receiptDate"
        value={state.receiptDate}
        onChange={onChange}
      />
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        sx={{ mt: 2 }}
        select
        label="Select Client"
        name="client"
        value={state.client}
        onChange={onChange}
      >
        {clients?.data?.result?.map((client: any) => (
          <MenuItem value={client?.id}>{client?.displayName}</MenuItem>
        ))}
      </TextField>
      {state.client && (
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>What are you generating the receipt for?</FormLabel>
          <RadioGroup value={state.type} row onChange={onChange} name="type">
            <FormControlLabel
              value="INVOICE"
              control={<Radio />}
              label="Invoice"
            />
            {/* <FormControlLabel value="TASK" control={<Radio />} label="Task" /> */}
            {/* <FormControlLabel
              value="ADVANCE"
              control={<Radio />}
              label="Advance Amount"
            /> */}
          </RadioGroup>
        </FormControl>
      )}
    </Box>
  );
}

export default BasicDetails;
