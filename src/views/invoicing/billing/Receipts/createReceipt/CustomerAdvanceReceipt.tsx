import { Button, Box, TextField, Typography, Divider, Grid } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";

const CustomerAdvanceReceipt = () => {
    interface num {
        amountReceived: number;
        setAmountReceived: number;
    }

    const [amountReceived, setAmountReceived] = useState<num>()

    const handleAmountChange = (e: any) => {
        setAmountReceived(e.target.value)
    }

    return (

        <Box mt={3} >
            <TextField sx={{ width: "500px" }} id="outlined-basic" label="Amount received" variant="outlined"
                value={amountReceived} onChange={handleAmountChange} />
            <Button variant="contained" color="info" sx={{ padding: "15px 20px" }} size="large" startIcon={<SendIcon />}> Submit</Button>
            <Box p={3} mt={3} bgcolor="#0C42950D" sx={{ width: "550px" }}>
                <Box mb={1}>
                    <Typography variant="caption">Unused credits summary</Typography>
                </Box>
                <Divider />
                <Grid mt={1} container>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={7}>
                                <Typography variant="subtitle2" >Advance Amount Received</Typography>
                            </Grid>
                            <Grid item xs={1}>:</Grid>
                            <Grid item xs={4}><Typography variant="subtitle1">{100}/-</Typography></Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={7}>
                                <Typography variant="subtitle2" >Previous Unused credits</Typography>
                            </Grid>
                            <Grid item xs={1}>:</Grid>
                            <Grid item xs={4}><Typography variant="subtitle1">{100}/-</Typography></Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={7}>
                                <Typography variant="subtitle2" >Unused credits</Typography>
                            </Grid>
                            <Grid item xs={1}>:</Grid>
                            <Grid item xs={4}><Typography variant="subtitle1">{100}/-</Typography></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
export default CustomerAdvanceReceipt;
