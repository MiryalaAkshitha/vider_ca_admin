import { Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { PARTICULARS_HEADINGS } from "data/particularsHeadings";
import { TAXES } from "data/taxes";
import _ from "lodash";
import { getGstAmount } from "views/billing/estimates/calculations";
import { StyledParticularsTable } from "views/billing/styles";

interface IProps {
  result: any;
  interState: boolean;
}

function Particulars({ result, interState }: IProps) {
  return (
    <Box mt={3}>
      <TableContainer>
        <StyledParticularsTable>
          <TableHead>
            <TableRow>
              {PARTICULARS_HEADINGS.map((par, index) => {
                if (par.name === "Action") return null;

                // if (interState && par.name === "GST") {
                if(result.billingEntityAddress?.state === result?.placeOfSupply.split("-")[1] && par.name === "IGST") {
                  return (
                    <TableCell key={index}>
                      <Typography>CGST / SGST</Typography>
                    </TableCell>
                  );
                }
                return <TableCell key={index}>{par.name}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {result?.particulars?.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell sx={{ width: "20%" }}>{item?.name}</TableCell>
                <TableCell>{item?.hsn}</TableCell>
                <TableCell>{item?.units}</TableCell>
                <TableCell>{item?.rate}</TableCell>
                <TableCell>
                  {item?.discount
                    ? item?.discount + " " + item?.discountType
                    : "--"}
                </TableCell>
                <TableCell>{item?.amount}</TableCell>
                <TableCell>
                  {item?.gst
                    ? `${getGstAmount(item, item?.gst)}/- 
                      (${_.find(TAXES, { value: item?.gst })?.name})`
                    : "--"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledParticularsTable>
      </TableContainer>
    </Box>
  );
}

export default Particulars;
