import { Box, Button, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { logo } from "assets";
import axios from "axios";
import Loader from "components/Loader";
import { useState } from "react";
import { useImmer } from "use-immer";
import GstDetails from "./GstDetails";
import PanDetails from "./PanDetails";

const OrgDetails = () => {
  const [isGstRegistered, setIsGstRegistered] = useState("");
  const [isGstverified, setIsGstverified] = useState(false);
  const [isPanCardverified, setIsPanCardverified] = useState(false);
  const [state, setState]: any = useImmer<any>({});
  const [data, setdata]: any = useImmer<any>({});
  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [isloading, setLoading] = useState<boolean>(false);

  const handlePanClick = async () => {
    if (!panNumber) {
      return;
    }
    setLoading(true);
    let token: any = await axios({
      url: "https://try.readme.io/https://api.sandbox.co.in/authenticate",
      method: "POST",
      headers: {
        Accept: "application/json",
        "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
        "x-api-secret": "secret_live_QTFSCuejXj3hsLDlr2UcFw4VoZN4ujQ5",
        "x-api-version": "1.0",
      },
    });
    const consent = "y";
    const reason = "For KYC of User";

    let response: any = await axios.get(
      `https://api.sandbox.co.in/pans/${panNumber}?consent=${consent}&reason=${reason}`,
      {
        headers: {
          Authorization: token?.data?.access_token,
          "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
        },
      }
    );
    const data: any = response?.data;
    setdata({
      category: data?.data?.category,
      firstName: data?.data?.first_name,
      middleName: data?.data?.middle_name,
      lastName: data?.data?.last_name,
      fullName: data?.data?.full_name,
      tradeName: data?.data?.tradeName,
      constitutionOfBusiness: data?.data?.constitutionOfBusiness,
      buildingName: data?.data?.buildingName,
      street: data?.data?.street,
      city: data?.data?.city,
      state: data?.data?.state,
      pinCode: data?.data?.pinCode,
    });
    setIsPanCardverified(true);
    setLoading(false);
  };

  const handleGstClick = async () => {
    if (!gstNumber) {
      return;
    }
    setLoading(true);

    let token: any = await axios({
      url: "https://try.readme.io/https://api.sandbox.co.in/authenticate",
      method: "POST",
      headers: {
        Accept: "application/json",
        "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
        "x-api-secret": "secret_live_QTFSCuejXj3hsLDlr2UcFw4VoZN4ujQ5",
        "x-api-version": "1.0",
      },
    });

    let response: any = await axios.get(
      `https://api.sandbox.co.in/gsp/public/gstin/${gstNumber}`,
      {
        headers: {
          Authorization: token?.data?.access_token,
          "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
        },
      }
    );

    const result: any = response.data;
    setState({
      legalName: result?.data?.lgnm,
      tradeName: result?.data?.tradeNam,
      stateJurisdiction: result?.data?.pradr?.addr?.stcd,
      dateOfRegistration: result?.data?.rgdt,
      constitutionOfBusiness: result?.data?.ctb,
      GSTNStatus: result?.data?.sts,
      buildingName: result?.data?.pradr?.addr?.bnm,
      street: result?.data?.pradr?.addr?.st,
      city: result?.data?.pradr?.addr?.dst,
      state: result?.data?.pradr?.addr?.stcd,
      pinCode: result?.data?.pradr?.addr?.pncd,
    });
    setIsGstverified(true);
    setLoading(false);
  };

  const RadioValue = (e: any) => {
    setIsGstRegistered(e.target.value);
  };

  return (
    <>
      <Box sx={{ maxWidth: "650px", margin: "auto" }}>
        <Box mt={4} p={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img src={logo} alt="" />
            <Typography mt={3} variant="subtitle1">
              Organisation Details
            </Typography>
            <Typography mt={2} variant="body2">
              Your Sign Up has been completed. Enter your organisation details.
            </Typography>
          </Box>
          <Box mt={3}>
            <FormControl>
              <FormLabel>Is this firm registered for GST?</FormLabel>
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
            {isGstRegistered === "Yes" && (
              <Box>
                <TextField
                  required
                  onChange={(e) => setGstNumber(e.target.value)}
                  value={gstNumber}
                  sx={{ mt: 2 }}
                  label="GST Number"
                  name="gstNumber"
                  size="small"
                  fullWidth
                />
                {!isGstverified ? (
                  <Typography
                    sx={{
                      marginTop: "15px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button onClick={handleGstClick} sx={{ color: "#F2353C" }}>
                      Get Tax payer details
                    </Button>
                  </Typography>
                ) : (
                  <></>
                )}
              </Box>
            )}
            {isGstRegistered === "No" && (
              <Box>
                <TextField
                  required
                  onChange={(e) => setPanNumber(e.target.value)}
                  value={panNumber}
                  sx={{ mt: 2 }}
                  label="Pan Number"
                  name="panNumber"
                  size="small"
                  fullWidth
                />
                {!isPanCardverified ? (
                  <Typography
                    sx={{
                      marginTop: "15px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button onClick={handlePanClick} sx={{ color: "#F2353C" }}>
                      Verify and get details
                    </Button>
                  </Typography>
                ) : (
                  <></>
                )}
              </Box>
            )}
          </Box>
          {isloading && !isGstverified && isGstRegistered === "Yes" && (
            <Loader />
          )}
          {isGstverified && isGstRegistered === "Yes" && (
            <GstDetails state={state} setState={setState} />
          )}
          {isloading && !isPanCardverified && isGstRegistered === "No" && (
            <Loader />
          )}
          {isPanCardverified && isGstRegistered === "No" && (
            <>
              <PanDetails state={data} setState={setdata} />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
export default OrgDetails;
