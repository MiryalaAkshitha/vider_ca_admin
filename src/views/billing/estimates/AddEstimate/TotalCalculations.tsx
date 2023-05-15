import {
  Checkbox,
  Divider,
  FormControlLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import converter from "number-to-words";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFieldChange,
  selectEstimate,
} from "redux/reducers/createEstimateSlice";
import {
  getGrandTotal,
  getRoundOff,
  getSubTotal,
  getTotalCharges,
  getTotalGst,
} from "../calculations";

function TotalCalculations() {
  const state = useSelector(selectEstimate);
  const dispatch = useDispatch();
  const [showAdjustment, setShowAdjustment] = useState(false);

  return (
    <Box sx={{ maxWidth: 500, ml: "auto", p: 2, backgroundColor: "#f3f5fa" }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Typography variant="body1" flex={1}>
          Sub Total
        </Typography>
        <Typography variant="subtitle2">
          {getSubTotal(state.particulars)} /-
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Typography variant="caption" flex={1}>
          {state.billingEntityAddress?.state === state?.placeOfSupply.split("-")[1] ? "CGST" : "GST"}
        </Typography>
        <Typography variant="body2">
          {state.billingEntityAddress?.state === state?.placeOfSupply.split("-")[1] ? (getTotalGst(state.particulars) / 2) : getTotalGst(state.particulars)}/-
        </Typography>
      </Box>
      {state.billingEntityAddress?.state == state?.placeOfSupply.split("-")[1] &&
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Typography variant="caption" flex={1}>
            SGST
          </Typography>
          <Typography variant="body2">
            {state.billingEntityAddress?.state === state?.placeOfSupply.split("-")[1] ? getTotalGst(state.particulars) / 2 : getTotalGst(state.particulars)}/-
          </Typography>
        </Box>
      }      
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Typography variant="caption" flex={1}>
          {/* Additional Charge */}
          Pure Agent Charges
        </Typography>
        <Typography variant="body2">
          {getTotalCharges(state.otherParticulars)} /-
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box flex={1} display="flex" gap={1} alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setShowAdjustment(e.target.checked);
                  if (!e.target.checked) {
                    dispatch(
                      handleFieldChange({ key: "adjustment", value: 0 })
                    );
                  }
                }}
                size="small"
                color="secondary"
              />
            }
            label={<Typography variant="caption">Adjustment</Typography>}
          />
          <OutlinedInput
            disabled={!showAdjustment}
            size="small"
            placeholder="Enter Amount"
            value={state.adjustment}
            sx={{ width: 150, background: "white", height: 30 }}
            onChange={(e) => {
              dispatch(
                handleFieldChange({ key: "adjustment", value: e.target.value })
              );
            }}
            fullWidth
            type="number"
          />
        </Box>
        <Typography variant="body2">{state.adjustment} /-</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Typography variant="caption" flex={1}>
          +/- Round Off
        </Typography>
        <Typography variant="body2">{getRoundOff(state)} /-</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Typography variant="body1" flex={1}>
          Invoice Value
        </Typography>
        <Typography variant="subtitle2">{getGrandTotal(state)} /-</Typography>
      </Box>
      <Typography sx={{ mt: 1, textAlign: "right" }} variant="body2">
        ({converter.toWords(getGrandTotal(state))})
      </Typography>
    </Box>
  );
}

export default TotalCalculations;
