import { Divider } from "@mui/material";
import { getProfile, updateProfile } from "api/services/users";
import BottomBar from "components/BottomBar";
import Loader from "components/Loader";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import { aadharPattern, emailPattern, panCardPattern, phonePattern } from "utils/patterns";
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
        address: res.data.profile?.address,
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
        role: res.data.role?.name,
        employeeId: res.data.profile?.employeeId,
        organizationName: res.data.organization?.legalName,
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
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleSubmit = async () => {
    if (state.mobileNumber && !phonePattern.test(state.mobileNumber)) {
      return snack.error("Invalid mobile number");
    }

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
      type: "self",
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
