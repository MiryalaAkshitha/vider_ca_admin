import { Divider, Grid, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import converter from "number-to-words";
import { StyledParticularsTable } from "views/billing/styles";

interface IProps {
  result: any;
  interState: boolean;
}

function OtherParticulars({ result, interState }: IProps) {
  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TableContainer>
            <StyledParticularsTable>
              <TableHead>
                <TableRow>
                  <TableCell>Expense Type</TableCell>
                  <TableCell>
                    <Typography>Particulars</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Amount</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result?.otherParticulars?.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography>Pure Agent</Typography>
                      {/* {item?.taskExpenseType} */}
                    </TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.amount} /-</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledParticularsTable>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              maxWidth: 500,
              ml: "auto",
              p: 2,
              backgroundColor: "#f3f5fa",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Typography variant="body1" flex={1}>
                Sub Total
              </Typography>
              <Typography variant="subtitle2">{result?.subTotal} /-</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Typography variant="caption" flex={1}>
                {result.billingEntityAddress?.state === result?.placeOfSupply.split("-")[1] ? "CGST" : "GST"}
              </Typography>
              <Typography variant="body2">
                {+result?.totalGstAmount / 2}/-
              </Typography>
            </Box>
            {result.billingEntityAddress?.state === result?.placeOfSupply.split("-")[1] && <>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Typography variant="caption" flex={1}>
                  SGST
                </Typography>
                <Typography variant="body2">
                  {+result?.totalGstAmount / 2}/-
                </Typography>
              </Box>
            </>}

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Typography variant="caption" flex={1}>
                Additional Charge
                {/* Pure Agent Charges */}
              </Typography>
              <Typography variant="body2">{result.totalCharges} /-</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Box flex={1} display="flex" gap={1} alignItems="center">
                <Typography variant="caption" flex={1}>
                  Adjustment
                </Typography>
              </Box>
              <Typography variant="body2">{result.adjustment} /-</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Typography variant="caption" flex={1}>
                +/- Round Off
              </Typography>
              <Typography variant="body2">{result?.roundOff} /-</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Typography variant="body1" flex={1}>
                Invoice Value
              </Typography>
              <Typography variant="subtitle2">
                {result?.grandTotal} /-
              </Typography>
            </Box>
            <Typography sx={{ mt: 1, textAlign: "right" }} variant="body2">
              ({converter.toWords(result?.grandTotal)})
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OtherParticulars;
