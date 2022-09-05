import { Box, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import atomByViderLogo from "assets/images/atomByViderLogo.png"
import { useState } from "react";
import GstDetails from "./GstDetails";
import PanDetails from "./PanDetails";

const OrgDetails = () => {
  const [isGstRegistered, setIsGstRegistered] = useState("");

  const RadioValue = (e: any) => {
    setIsGstRegistered(e.target.value);
  };

  return (
    <Box sx={{ maxWidth: "650px", mx: "auto", py: 4 }}>
      <Box textAlign="center">
        <img src={atomByViderLogo} height="100px" width="100px" alt="" />
        <Typography mt={1} variant="subtitle1">
          Organisation Details
        </Typography>
        <Typography mt={1} variant="body2">
          Your Sign Up has began. Enter your Organisation Details.
        </Typography>
      </Box>
      <Box mt={3}>
        <FormControl>
          <FormLabel>Is your organisation registered under GST?</FormLabel>
          <RadioGroup row>
            <FormControlLabel
              onChange={RadioValue}
              value="Yes"
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              onChange={RadioValue}
              value="No"
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
        {isGstRegistered === "Yes" && <GstDetails />}
        {isGstRegistered === "No" && <PanDetails />}
      </Box>
    </Box>
  );
};
export default OrgDetails;
