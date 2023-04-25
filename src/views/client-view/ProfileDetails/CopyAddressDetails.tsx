import { Autocomplete, Checkbox, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getStates } from "api/services/common";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";

const CopyAddressDetails = ({ data, setState }) => {
  const [isEdited, setIsEdited] = useState(false);

  const handleCheckboxChange = (name: any, value: any) => {
    setIsEdited(!isEdited);
    setState({
      ...data,
      [name]: value,
    });
  }

  return (
    <>
      <Box mt={4}>
        <Checkbox
            name="issameaddress"
            onChange={(e) => {
              handleCheckboxChange(
                'issameaddress',
                e.target.checked
              );
            }}
            checked={data?.issameaddress}
            sx={{ width: "auto", m: 0, p: 0 }}
          />
          Address same as above          
      </Box>
    </>
  );
};
export default CopyAddressDetails;