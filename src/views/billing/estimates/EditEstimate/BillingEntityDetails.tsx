import { Close } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { getBillingEntity } from "api/services/billingEntity";
import { logo } from "assets";
import Loader from "components/Loader";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  handleApprovalChange,
  handleBillingEntityChange,
  selectEstimate,
} from "redux/reducers/createEstimateSlice";
import { ResType } from "types";
import SelectApprovalHierarchy from "views/tasks/board/CreateTask/SelectApprovalHierarchy";
import {
  StyledSelectBox,
  StyledSelectedBox,
} from "views/tasks/board/CreateTask/styles";
import SectionHeading from "../SectionHeading";

function BillingEntityDetails({ result }) {
  // const { billingEntityAddress, approvalHierarchy, billingEntity } = result;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [gstNumber, setGstNumber] = useState('NA');
  const [billingEntityAddress, setBillingEntityAddress] = useState(result?.billingEntityAddress);
  const [approvalHierarchy, setApprovalHierarchy] = useState(result?.approvalHierarchy);
  const [billingEntity, setBillingEntity] = useState(result?.billingEntity);

  const { data, isLoading }: ResType = useQuery(
    ["billing-entities"],
    getBillingEntity, {
      onSuccess: (res: any) => {
        if(result?.billingEntity && result?.billingEntity.legalName !== '') {
          dispatch(handleBillingEntityChange( result ));
        }        
      },
    }
  );

  const handleChange = (e: any) => {
    let billingEntity = data?.data?.find(
      (item: any) => item.id === e.target.value
    );
    if(e.target.name == 'billingEntity') {
      setBillingEntity(billingEntity);
      setBillingEntityAddress(billingEntity);
      setGstNumber(billingEntity?.gstNumber);
    }   

    dispatch(handleBillingEntityChange({ billingEntity }));
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box>
            <TextField
              select
              label="Select Billing Entity"
              fullWidth
              size="small"
              onChange={handleChange}
              name="billingEntity"
              value={billingEntity?.id}
            >
              {data?.data?.map((item: any, index: number) => (
                <MenuItem value={item?.id} key={index}>
                  {item?.legalName}
                </MenuItem>
              ))}
            </TextField>
            <Box mt={2}>
              <SectionHeading title="Billing Entity Address" />
              <Box p={2}>
                {/* <Box mb={1}>
                  <img src={logo} alt="logo" />
                </Box> */}
                <AddressDetail
                  title="Legal Name"
                  value={billingEntityAddress?.legalName}
                />
                <AddressDetail
                  title="Address"
                  value={getAddress(billingEntityAddress)}
                />
                <AddressDetail
                  title="Email"
                  value={billingEntityAddress?.email}
                />
                <AddressDetail
                  title="Mobile Number"
                  value={billingEntityAddress?.mobileNumber}
                />
                {gstNumber != 'NA' &&
                  <AddressDetail
                    title="GST Number"
                    value={gstNumber}
                  />
                }
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          {approvalHierarchy ? (
            <StyledSelectedBox sx={{ mt: 0 }}>
              <Box display="flex" gap={1} alignItems="center">
                <Typography variant="caption">Approval Hierarchy -</Typography>
                <Typography variant="subtitle2">
                  {approvalHierarchy?.name}
                </Typography>
              </Box>
              <IconButton
                onClick={() => dispatch(handleApprovalChange(null))}
                size="small"
              >
                <Close fontSize="small" />
              </IconButton>
            </StyledSelectedBox>
          ) : (
            <></>
            // <StyledSelectBox sx={{ mt: 0 }} onClick={() => setOpen(true)}>
            //   <Typography>+ Select Approval Hierarchy</Typography>
            // </StyledSelectBox>
          )}
        </Grid>
      </Grid>
      <SelectApprovalHierarchy
        open={open}
        setOpen={setOpen}
        onChange={(v: any) => dispatch(handleApprovalChange(v))}
      />
    </>
  );
}

export const AddressDetail = ({ title, value }) => {
  return (
    <Box sx={{ marginBottom: "16px" }}>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="body1">{title}</Typography>
        </Grid>
        <Grid item xs={1}>
          <span>:</span>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h6" sx={{ flex: 2 }}>
            {value}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export let getAddress = (address: any) => {
  let result = "";
  if (address?.buildingName) {
    result += `${address.buildingName}, `;
  }
  if (address?.street) {
    result += `${address.street}, `;
  }
  if (address?.city) {
    result += `${address.city}, `;
  }
  if (address?.state) {
    result += `${address.state}, `;
  }
  if (address?.pincode) {
    result += address.pincode;
  }
  return result;
};

export default BillingEntityDetails;
