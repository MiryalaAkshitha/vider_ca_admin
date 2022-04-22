import { useSelector } from "react-redux";
import { selectSignup } from "redux/reducers/signUpSlice";
import CreateAccount from "views/signup/CreateAcount";
import OrgDetails from "views/signup/OrgDetails";
import Otp from "views/signup/Otp";

const SignUp = () => {
  const { step } = useSelector(selectSignup);

  return (
    <>
      {step === "signup" && <CreateAccount />}
      {step === "otp" && <Otp />}
      {step === "details" && <OrgDetails />}
    </>
  );
};

export default SignUp;
