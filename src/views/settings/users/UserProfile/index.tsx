import { Box, Divider } from "@mui/material";
import { getProfile } from "api/services/users";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import BankDetails from "./BankDetails";
import BasicDetails from "./BasicDetails";
import BottomBar from "./BottomBar";
import Specializations from "./Specializations";
import StatutoryInformation from "./StatutoryInformation";

function UserProfile() {
  const params = useParams();
  const [originalState, setOriginalState] = useState<any>(null);
  const [state, setState] = useState<any>(null);

  const { isLoading }: ResType = useQuery(
    ["user-profile", params.userId],
    getProfile,
    {
      onSuccess: (res: any) => {
        let data = {
          image: res.data.image,
          imageUrl: res.data?.imageUrl,
          fullName: res.data.fullName,
          email: res.data.email,
          mobileNumber: res.data.mobileNumber,
          workEmail: res.data.profile.workEmail,
          dob: res.data.profile.dob,
          fatherName: res.data.profile.fatherName,
          address: res.data.profile.address,
          specializations: res.data.profile.specializations || [],
          aadharNumber: res.data.profile.aadharNumber,
          panNumber: res.data.profile.panNumber,
          drivingLicenseNumber: res.data.profile.drivingLicenseNumber,
          aadharCard: res.data.profile.aadharCard,
          aadharCardUrl: res.data.profile.aadharCardUrl,
          panCard: res.data.profile.panCard,
          panCardUrl: res.data.profile.panCardUrl,
          drivingLicense: res.data.profile.drivingLicense,
          drivingLicenseUrl: res.data.profile.drivingLicenseUrl,
          bankAccountHolderName: res.data.profile.bankAccountHolderName,
          bankAccountNumber: res.data.profile.bankAccountNumber,
          bankName: res.data.profile.bankName,
          bankIfscCode: res.data.profile.bankIfscCode,
        };
        setOriginalState({ ...data });
        setState({ ...data });
      },
      cacheTime: 0,
    }
  );

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ mx: -3, pt: 3, pb: 10 }}>
      <BasicDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <Specializations state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <StatutoryInformation state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <BankDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <BottomBar state={state} setState={setState} data={originalState} />
    </Box>
  );
}

export default UserProfile;
