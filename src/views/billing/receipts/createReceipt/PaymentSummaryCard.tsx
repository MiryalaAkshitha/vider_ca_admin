import { Grid, Box, Typography, Divider } from "@mui/material"

const PaymentSummaryCard = ({ amtReceived, amtUsedForPayment, unusedCredits }) => {
    return (
        <Box p={3} bgcolor="#0C42950D" sx={{ width: "550px" }}>
            <Box mb={1}>
                <Typography variant="caption">Payment summary</Typography>
            </Box>
            <Divider />
            <Grid mt={1} container>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={7}>
                            <Typography variant="subtitle2" >Amount received</Typography>
                        </Grid>
                        <Grid item xs={1}>:</Grid>
                        <Grid item xs={4}><Typography variant="subtitle1">{amtReceived}/-</Typography></Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={7}>
                            <Typography variant="subtitle2" >Amount used for payment</Typography>
                        </Grid>
                        <Grid item xs={1}>:</Grid>
                        <Grid item xs={4}><Typography variant="subtitle1">{amtUsedForPayment}/-</Typography></Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={7}>
                            <Typography variant="subtitle2" >Unused credits</Typography>
                        </Grid>
                        <Grid item xs={1}>:</Grid>
                        <Grid item xs={4}><Typography variant="subtitle1">{unusedCredits}/-</Typography></Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Box>
    );
}
export default PaymentSummaryCard;