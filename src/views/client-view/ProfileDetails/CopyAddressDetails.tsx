import { Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";

const CopyAddressDetails = ({ data, setState }) => {

  useEffect(() => {
    if(data?.issameaddress) {
      setState({
        ...data,
        ['address']: {
          'communicationaddress': data?.address?.communicationaddress,
          'billingaddress': data?.address?.communicationaddress,
          'shippingaddress': data?.address?.communicationaddress
        },
      });
    } else {
      const billingaddress = {
        "buildingNumber": "",
        "floornumber": "",
        "buildingName": "",
        "street": "",
        "location": "",
        "district": "",
        "city": "",
        "state": "",
        "pincode": ""
      };
      setState({
        ...data,
        ['address']: {
          'communicationaddress': data?.address?.communicationaddress,
          'billingaddress': billingaddress,
          'shippingaddress': billingaddress
        },
      });
    }
  }, [data?.issameaddress]);

  const handleCheckboxChange = (name: any, value: any) => {
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
            value={data?.issameaddress ? 'true' : 'false'}
            checked={data?.issameaddress ? true : false}
            sx={{ width: "auto", m: 0, p: 0 }}
          />
          Address same as above          
      </Box>
    </>
  );
};
export default CopyAddressDetails;