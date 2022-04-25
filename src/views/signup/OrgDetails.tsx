import { Box, Button, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { logo } from "assets";
import axios from "axios";
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

  const handlePanClick = async () => {
    if (!panNumber) {
      return;
    }

    const consent = "y";
    const reason = "For KYC of User";

    try {
      await axios.post("https://api.sandbox.co.in/authenticate", {
        headers: {
          "x-api-key": process.env.SANDBOX_API_KEY,
          "x-api-secret": process.env.SANDBOX_API_SECRET,
        },
      });

      let res = await axios.get(
        `https://api.sandbox.co.in/pans/${panNumber}?consent=${consent}&reason=${reason}`,
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKMFpXTm9RSFpwWkdWeUxtbHVJaXdpWVhCcFgydGxlU0k2SW10bGVWOXNhWFpsWDNSamEyNWtRazVQYTBodWQyTkNSMHQxVjNwMlFsQm9NbE0xYjJSSFZGWldJaXdpYVhOeklqb2lZWEJwTG5OaGJtUmliM2d1WTI4dWFXNGlMQ0psZUhBaU9qRTJPREl4TlRNeE1qZ3NJbWx1ZEdWdWRDSTZJbEpGUmxKRlUwaGZWRTlMUlU0aUxDSnBZWFFpT2pFMk5UQTJNVGN4TWpoOS5sckhmYmlwOUFNQXpkalU2djl3YWtJWVlCNXJEYm43bjk0ZXJtTTIwTTBmX29LbXdpSmVIQUpQMkRNT0YxVlhqQk5sNXp2eDdTbGh0YWd0YmJyTXdpUSIsInN1YiI6InRlY2hAdmlkZXIuaW4iLCJhcGlfa2V5Ijoia2V5X2xpdmVfdGNrbmRCTk9rSG53Y0JHS3VXenZCUGgyUzVvZEdUVlYiLCJpc3MiOiJhcGkuc2FuZGJveC5jby5pbiIsImV4cCI6MTY1MDcwMzUyOCwiaW50ZW50IjoiQUNDRVNTX1RPS0VOIiwiaWF0IjoxNjUwNjE3MTI4fQ.xmk6KGqFUfZeuNvmYKd8RJigoPO9QAypedzPK3XHHF6bMiXozeszLEB0aDw1MyUDmVzVQqjSW6eksA_7WD4gCA",
            "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
          },
        }
      );
      const data: any = res?.data;
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleGstClick = async () => {
    if (!gstNumber) {
      return;
    }
    try {
      await axios({
        method: "POST",
        url: `https://api.sandbox.co.in/authorize`,
        headers: {
          Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKMFpXTm9RSFpwWkdWeUxtbHVJaXdpWVhCcFgydGxlU0k2SW10bGVWOXNhWFpsWDNSamEyNWtRazVQYTBodWQyTkNSMHQxVjNwMlFsQm9NbE0xYjJSSFZGWldJaXdpYVhOeklqb2lZWEJwTG5OaGJtUmliM2d1WTI4dWFXNGlMQ0psZUhBaU9qRTJPREkwTWpNd05UTXNJbWx1ZEdWdWRDSTZJbEpGUmxKRlUwaGZWRTlMUlU0aUxDSnBZWFFpT2pFMk5UQTRPRGN3TlROOS5ZT3ZvN3dhZzZuZVVSOHBxWVlGajM5ZEc4VjhfYW51NFVYa1NXLWZTcjJmbW9tWGNwM0FwTk5sLTJRZlFSRE9vemUxNV9lZUVNV3EycDB6Z21oRnpwQSIsInN1YiI6InRlY2hAdmlkZXIuaW4iLCJhcGlfa2V5Ijoia2V5X2xpdmVfdGNrbmRCTk9rSG53Y0JHS3VXenZCUGgyUzVvZEdUVlYiLCJpc3MiOiJhcGkuc2FuZGJveC5jby5pbiIsImV4cCI6MTY1MDk3MzQ1MywiaW50ZW50IjoiQUNDRVNTX1RPS0VOIiwiaWF0IjoxNjUwODg3MDUzfQ.w3grgpEDkkhKqaX2NPPJxZ7ET1r6jtmXHLAyFRun1tbCgWTOsGwbkOZjLrCEPYBcLoiCWNLLRjGzrSf02TSGag`,
          "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
          "x-api-secret": "secret_live_QTFSCuejXj3hsLDlr2UcFw4VoZN4ujQ5",
        },
        params: {
          request_token: `eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKMFpXTm9RSFpwWkdWeUxtbHVJaXdpWVhCcFgydGxlU0k2SW10bGVWOXNhWFpsWDNSamEyNWtRazVQYTBodWQyTkNSMHQxVjNwMlFsQm9NbE0xYjJSSFZGWldJaXdpYVhOeklqb2lZWEJwTG5OaGJtUmliM2d1WTI4dWFXNGlMQ0psZUhBaU9qRTJPREkwTWpJM05UVXNJbWx1ZEdWdWRDSTZJbEpGUmxKRlUwaGZWRTlMUlU0aUxDSnBZWFFpT2pFMk5UQTRPRFkzTlRWOS4wcTNvNXNYMU5lcFE2ZzlKaDRnald1MFhkUUJHMWt6N3Bsb21xSUt6V2tCeHBCMWZOSUpvVDNuZEhud3RJd1hlLWJadHJDOThfSVNrbUMxZnpUc1FXQSIsInN1YiI6InRlY2hAdmlkZXIuaW4iLCJhcGlfa2V5Ijoia2V5X2xpdmVfdGNrbmRCTk9rSG53Y0JHS3VXenZCUGgyUzVvZEdUVlYiLCJpc3MiOiJhcGkuc2FuZGJveC5jby5pbiIsImV4cCI6MTY1MDk3MzE1NSwiaW50ZW50IjoiQUNDRVNTX1RPS0VOIiwiaWF0IjoxNjUwODg2NzU1fQ.6cPoC43ri1TdxpK7AH7KV0ni6nZywzOCWQDdvPhlV8V5ySyaHNUvHu4kH3P3kKiPd-PY28fM9nLAIYYfaDHNGw`,
        },
      });

      let res = await axios.get(
        `https://api.sandbox.co.in/gsp/public/gstin/${gstNumber}`,
        {
          headers: {
            Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKMFpXTm9RSFpwWkdWeUxtbHVJaXdpWVhCcFgydGxlU0k2SW10bGVWOXNhWFpsWDNSamEyNWtRazVQYTBodWQyTkNSMHQxVjNwMlFsQm9NbE0xYjJSSFZGWldJaXdpYVhOeklqb2lZWEJwTG5OaGJtUmliM2d1WTI4dWFXNGlMQ0psZUhBaU9qRTJPREl3T0RVM09UVXNJbWx1ZEdWdWRDSTZJbEpGUmxKRlUwaGZWRTlMUlU0aUxDSnBZWFFpT2pFMk5UQTFORGszT1RWOS5oUDF1cDY5YVVnd2dCWVZxSGlFblhFbDNGNWY5SnlnY3dNMEJLazEzeWhkZ0pFay1GeTRmd3o3Q2YwUTRIZVdVYUhDbFNzeWNxNlIwN0RUcS1LQklPQSIsInN1YiI6InRlY2hAdmlkZXIuaW4iLCJhcGlfa2V5Ijoia2V5X2xpdmVfdGNrbmRCTk9rSG53Y0JHS3VXenZCUGgyUzVvZEdUVlYiLCJpc3MiOiJhcGkuc2FuZGJveC5jby5pbiIsImV4cCI6MTY1MDYzNjE5NSwiaW50ZW50IjoiQUNDRVNTX1RPS0VOIiwiaWF0IjoxNjUwNTQ5Nzk1fQ.dENUscvyg73qbsgkJbOC_k3CFr9P8rmflfiumz58MDdWBxHWTc1WGcR1dwxywyuHGdXeK6yr45OvrUMEMlGzdA`,
            "x-api-key": "key_live_tckndBNOkHnwcBGKuWzvBPh2S5odGTVV",
          },
        }
      );
      const result: any = res.data;
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
    } catch (err: any) {
      console.log(JSON.stringify(err));
    }
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
          {isGstverified && isGstRegistered === "Yes" && (
            <GstDetails state={state} setState={setState} />
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
