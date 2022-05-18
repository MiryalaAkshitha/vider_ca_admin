import { TextField, FormControlLabel, Box, Typography } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";



const InvoiceReceipt = () => {
    const [checked, setChecked] = useState(false);

    const val = 300;
    let unusedCreidts = 500;
    let amountReceived = 200;

    if (checked) {
        amountReceived = amountReceived + unusedCreidts;
        unusedCreidts = 0;
    }

    const handleChange = (event: any) => {
        setChecked(event.target.checked);
    };

    return (

        <Box>

            <TextField sx={{ width: "500px", mt: "20px" }} id="outlined-basic" label="Amount received" variant="outlined" value={amountReceived} />
            <Typography mt={2} variant="body2" component="div">Unused Credits : <b>{unusedCreidts}</b></Typography>
            <FormControlLabel control={<Checkbox onChange={handleChange} />} label=" Use Available Unused credits" />
        </Box>
    );
}
export default InvoiceReceipt;
