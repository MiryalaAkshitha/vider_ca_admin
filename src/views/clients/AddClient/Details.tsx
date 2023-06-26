import { Box, Button } from "@mui/material";
import { getGstDetails, getPanDetails, getSandboxToken } from "api/services/users";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import Loader from "components/Loader";
import { snack } from "components/toast";
import { useState } from "react";

function CompanyDetails({ control, watch, setData }) {
  const [isloading, setLoading] = useState(false);
  const panValue = watch("panNumber");
  const gstValue = watch("gstNumber");

  const handleGstClick = async () => {
    if (!gstValue) return;

    try {
      setLoading(true);
      let token: any = await getSandboxToken();

      let response: any = await getGstDetails({
        gstNumber: gstValue,
        token: token?.data?.access_token,
      });
      const result: any = response.data;

      setData({
        legalName: result?.data?.lgnm,
        tradeName: result?.data?.tradeNam,
        placeOfSupply: result?.data?.pradr?.addr?.stcd,
        constitutionOfBusiness: result?.data?.ctb,
        gstVerified: true,
      });

      setLoading(false);
    } catch {
      setLoading(false);
      alert("Invalid GST Number");
    }
  };

  const handlePanClick = async () => {
    if (!panValue) return;

    try {
      setLoading(true);
      let token: any = await getSandboxToken();

      let response: any = await getPanDetails({
        panNumber: panValue,
        token: token?.data?.access_token,
      });

      const data: any = response?.data;
      setData({
        firstName: data?.data?.first_name,
        lastName: data?.data?.last_name,
        fullName: data?.data?.full_name,
        middleName:data?.data?.middle_name,
        panVerified: true,
      });
    } catch (e: any) {
      snack.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box mt={2}>
        <FormRadio
          row
          control={control}
          name="gstRegistered"
          label="GST Registered?"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </Box>
      {watch("gstRegistered") === "yes" && (
        <Box mt={2}>
          <FormInput control={control} name="gstNumber" label="GST Number" />
          <Box textAlign="right">
            <Button onClick={handleGstClick} sx={{ color: "#F2353C" }}>
              Get Details
            </Button>
          </Box>
        </Box>
      )}
      {watch("gstRegistered") === "no" && (
        <Box mt={2}>
          <FormInput control={control} name="panNumber" label="PAN Number" />
          <Box textAlign="right">
            <Button onClick={handlePanClick} sx={{ color: "#F2353C" }}>
              Get Details
            </Button>
          </Box>
        </Box>
      )}
      {isloading && <Loader />}
      {watch("gstVerified") && watch("gstRegistered") === "yes" && (
        <>
          <Box mt={2}>
            <FormInput control={control} name="legalName" label="Legal Name" />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="tradeName" label="Trade Name" />
          </Box>
          <Box mt={2}>
            <FormInput
              control={control}
              name="placeOfSupply"
              label="State of Jurisdiction/Place of Supply"
            />
          </Box>
          <Box mt={2}>
            <FormInput
              control={control}
              name="constitutionOfBusiness"
              label="Constitution Of Business"
            />
          </Box>
        </>
      )}
      {watch("panVerified") && watch("gstRegistered") === "no" && (
        <>
          <Box mt={2}>
            <FormInput control={control} name="firstName" label="First Name" />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="lastName" label="Last Name" />
          </Box>
          <Box mt={2}>
            <FormInput control={control} name="fullName" label="Full Name" />
          </Box>
        </>
      )}
    </>
  );
}

export default CompanyDetails;
