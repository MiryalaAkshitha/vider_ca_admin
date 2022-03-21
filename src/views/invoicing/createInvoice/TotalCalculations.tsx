import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function TotalCalculations() {
  const [checkTDS, setCheckTDS] = useState(true);
  const [checkAdditionalCharges, setCheckAdditionalCharges] = useState(true);

  return (
    <Box
      sx={{
        backgroundColor: "#f3f5fa",
      }}
    >
      <Box
        sx={{
          padding: "20px 30px",
          display: "flex",
          flexDirection: "column",
          rowGap: "6px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
              fontSize: "18px",
            }}
          >
            Sub Total<span>:</span>
          </Typography>
          <Typography
            sx={{
              flex: 1,
              marginLeft: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            50,000 /-
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            + Pure Agent<span>:</span>
          </Typography>
          <Typography
            sx={{
              flex: 1,
              marginLeft: "20px",
            }}
          >
            500.5 /-
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
            }}
            component="div"
          >
            <span>
              <FormGroup>
                <FormControlLabel
                  sx={{
                    "&.MuiFormControlLabel-root": {
                      margin: "0",
                    },
                    "& .MuiCheckbox-root": {
                      marginRight: "5px",
                    },
                  }}
                  control={
                    <Checkbox
                      sx={{ padding: "0" }}
                      color="secondary"
                      onChange={(e) => {
                        setCheckTDS(!checkTDS);
                      }}
                      checked={checkTDS}
                    />
                  }
                  label="Add TDS"
                />
              </FormGroup>
            </span>
            <span>:</span>
          </Typography>
          <Typography
            sx={{
              flex: 1,
              marginLeft: "20px",
            }}
            component="div"
          >
            <TextField
              id="standard-basic"
              variant="standard"
              placeholder="Enter TDS Amount"
              disabled={!checkTDS}
            />
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
            }}
            component="div"
          >
            <span>
              <FormGroup>
                <FormControlLabel
                  sx={{
                    "&.MuiFormControlLabel-root": {
                      margin: "0",
                    },
                    "& .MuiCheckbox-root": {
                      marginRight: "5px",
                    },
                  }}
                  control={
                    <Checkbox
                      sx={{ padding: "0" }}
                      color="secondary"
                      onChange={(e) => {
                        setCheckAdditionalCharges(!checkAdditionalCharges);
                      }}
                      checked={checkAdditionalCharges}
                    />
                  }
                  label="Additional Charges"
                />
              </FormGroup>
            </span>
            <span>:</span>
          </Typography>
          <Typography
            sx={{
              flex: 1,
              marginLeft: "20px",
            }}
            component="div"
          >
            <TextField
              id="standard-basic"
              variant="standard"
              placeholder="Enter Amount"
              disabled={!checkAdditionalCharges}
            />
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            +/- Round off<span>:</span>
          </Typography>
          <Typography
            sx={{
              flex: 1,
              marginLeft: "20px",
            }}
          >
            - 0.5
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ padding: "20px 30px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
              fontSize: "19px",
            }}
          >
            Invoice Value<span>:</span>
          </Typography>
          <Typography
            sx={{
              flex: 1,
              marginLeft: "20px",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            50,500 /-
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: "17px", fontWeight: "500", marginTop: "20px" }}
        >
          Rupees Five Thousand Five Hundred Only
        </Typography>
      </Box>
    </Box>
  );
}

export default TotalCalculations;
