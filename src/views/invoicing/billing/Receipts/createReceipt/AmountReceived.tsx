import { TextField, FormControlLabel, Box, Typography } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";

const AmountReceived = () => {

    const [amountReceived, setAmountReceived] = useState(500)
    const [checked, setChecked] = useState(false);

    let unusedCreidts = 500;
    let amtReceived = Number(amountReceived)
    if (checked) {
        amtReceived = Number(amountReceived) + Number(unusedCreidts);
        unusedCreidts = 0;
    }

    const handleChange = (event: any) => {
        setChecked(event.target.checked);
    };

    const handleAmountChange = (e: any) => {
        setAmountReceived(e.target.value)
    }

    return (
        <Box>
            {checked && <TextField disabled sx={{ width: "500px", mt: "20px" }} id="outlined-basic" label="Amount received" variant="outlined"
                value={amtReceived} onChange={handleAmountChange} />}
            {!checked && <TextField sx={{ width: "500px", mt: "20px" }} id="outlined-basic" label="Amount received" variant="outlined"
                value={amtReceived} onChange={handleAmountChange} />}

            <Typography mt={2} variant="body2" component="div">Unused Credits : <b>{unusedCreidts}</b></Typography>
            <FormControlLabel control={<Checkbox onChange={handleChange} />} label=" Use Available Unused credits" sx={{ color: "green" }} />
        </Box>
    );
}
export default AmountReceived