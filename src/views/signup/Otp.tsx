import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { sendOtp, verifyOtp } from "api/services/users";
import useSnack from "hooks/useSnack";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  handleStep,
  handleToken,
  selectSignup,
} from "redux/reducers/signUpSlice";
import BackgroundWrapper from "./BackgroundWrapper";

function Otp() {
  const snack = useSnack();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { mobileNumber, token } = useSelector(selectSignup);
  const [count, setCount] = useState(60);

  useEffect(() => {
    if (count === 0) return;
    let time = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    return () => clearTimeout(time);
  }, [count]);

  const { mutate: verify } = useMutation(verifyOtp, {
    onSuccess: () => {
      dispatch(handleStep("details"));
      snack.success("OTP verified successfully");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate } = useMutation(sendOtp, {
    onSuccess: (res) => {
      setCount(60);
      dispatch(handleToken(res?.data?.token ?? ""));
      snack.success("OTP sent successfully");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const resendOtp = () => {
    setOtp("");
    mutate({ mobileNumber });
  };

  const handleVerifyOtp = () => {
    verify({ mobileNumber, otp, token });
  };

  return (
    <BackgroundWrapper>
      <Box>
        <Button
          onClick={() => dispatch(handleStep("signup"))}
          startIcon={<ArrowBack />}
        ></Button>
        <Box textAlign="center">
          <Typography sx={{ mb: 2, textAlign: "center" }} variant="subtitle1">
            Otp Verification
          </Typography>
          <Typography variant="body2">
            Enter the 4 digit OTP sent to your mobile number
          </Typography>
          <Typography variant="h6">{mobileNumber}</Typography>
          <Box width="80%" margin="auto" mt={5}>
            <OtpInput
              containerStyle={{
                width: "100%",
                justifyContent: "space-between",
                gap: 30,
              }}
              value={otp}
              inputStyle={{
                width: "100%",
                border: "none",
                borderBottom: "2px solid black",
                outline: "none",
                fontSize: 25,
              }}
              shouldAutoFocus
              onChange={(otp: string) => setOtp(otp)}
              numInputs={4}
            />
            <Button
              variant="contained"
              disabled={otp.length !== 4}
              color="secondary"
              onClick={handleVerifyOtp}
              fullWidth
              sx={{ mt: 7 }}
            >
              Submit
            </Button>
            {count > 0 ? (
              <Box
                mt={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <Typography variant="body2" color="secondary">
                  Resend Otp in
                </Typography>
                <Typography variant="body2" color="green">
                  {count}
                </Typography>
              </Box>
            ) : (
              <Button sx={{ mt: 2 }} onClick={resendOtp} color="secondary">
                Resend
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </BackgroundWrapper>
  );
}

export default Otp;
