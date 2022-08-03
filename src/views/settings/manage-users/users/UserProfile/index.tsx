import { Divider } from "@mui/material";
import { getProfile, updateProfile } from "api/services/users";
import BottomBar from "components/BottomBar";
import Loader from "components/Loader";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { aadharPattern, emailPattern, panCardPattern } from "utils/patterns";
import BankDetails from "./BankDetails";
import BasicDetails from "./BasicDetails";
import Specializations from "./Specializations";
import StatutoryInformation from "./StatutoryInformation";

function UserProfile() {
  const queryClient = useQueryClient();
  const [originalState, setOriginalState] = useState<any>(null);
  const [state, setState] = useState<any>(null);

  const { isLoading }: ResType = useQuery(["user-profile"], getProfile, {
    onSuccess: (res: any) => {
      let data = {
        image: res.data.image,
        imageUrl: res.data?.imageUrl,
        fullName: res.data.fullName,
        email: res.data.email,
        mobileNumber: res.data.mobileNumber,
        workEmail: res.data.profile?.workEmail,
        dob: res.data.profile?.dob,
        fatherName: res.data.profile?.fatherName,
        address: res.data.profile.address,
        specializations: res.data.profile?.specializations || [],
        aadharNumber: res.data.profile?.aadharNumber,
        panNumber: res.data.profile?.panNumber,
        drivingLicenseNumber: res.data.profile?.drivingLicenseNumber,
        aadharCard: res.data.profile?.aadharCard,
        aadharCardUrl: res.data.profile?.aadharCardUrl,
        panCard: res.data.profile?.panCard,
        panCardUrl: res.data.profile?.panCardUrl,
        drivingLicense: res.data.profile?.drivingLicense,
        drivingLicenseUrl: res.data.profile?.drivingLicenseUrl,
        bankAccountHolderName: res.data.profile?.bankAccountHolderName,
        bankAccountNumber: res.data.profile?.bankAccountNumber,
        bankName: res.data.profile?.bankName,
        bankIfscCode: res.data.profile?.bankIfscCode,
      };
      setOriginalState({ ...data });
      setState({ ...data });
    },
    cacheTime: 0,
  });

  const { mutateAsync } = useMutation(updateProfile, {
    onSuccess: () => {
      snack.success("Profile updated successfully");
      queryClient.invalidateQueries("user-profile");
    },
    onError: () => {
      snack.error("Error updating profile");
    },
  });

  const handleSubmit = async () => {
    if (state.workEmail && !emailPattern.test(state.workEmail)) {
      return snack.error("Invalid email");
    }

    if (state.aadharNumber && !aadharPattern.test(state.aadharNumber)) {
      return snack.error("Invalid aadhar number");
    }

    if (state.panNumber && !state.panNumber.match(panCardPattern)) {
      return snack.error("Invalid pan number");
    }

    await mutateAsync({
      ...state,
      id: originalState?.id,
      type: "user",
    });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <BasicDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <Specializations state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <StatutoryInformation state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <BankDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <BottomBar
        data={originalState}
        state={state}
        onCancel={() => setState(originalState)}
        onUpdate={handleSubmit}
      />
    </>
  );
}

export default UserProfile;
