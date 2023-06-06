import { Box, Button, Typography } from "@mui/material";
import useTitle from "hooks/useTitle";

import GmailInbox from './GmailInbox';
// import { getAccessToken, getAuthUrl } from "api/services/googleAuth";

// import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useMutation } from "react-query";
import { snack } from "components/toast";
import { verifyGmailUser } from "api/services/googleAuth";
import { useState } from "react";

function decodeJwtResponse(jwtString) {
  const base64Url = jwtString.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
}


const Gmaillogins = () => {
  useTitle("Gmail Inbox");

  const [credentialResponse, setCredentialResponse] = useState<any>({});
  const [decodedResponse, setDecodedResponse] = useState<any>({});
  const [emails, setEmails] = useState(true);
  const [emailProfile, setEmailProfile] = useState<any>({});

  // const handleLogin = () => {
  //   const authUrl = getAuthUrl();
  //   window.location.href = authUrl;
  // };

  // const handleCallback = async () => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const authCode = urlParams.get('code');

  //   if (authCode) {
  //     const tokens: any = await getAccessToken(authCode);
  //     localStorage.setItem('access_token', tokens.access_token);
  //     window.location.href = '/';
  //   }
  // };

  const { mutate } = useMutation(verifyGmailUser, {
    onSuccess: (res: any) => {
      setEmails(false);
      setEmailProfile(res?.data);
      snack.success("Gmail Login successfull");
    },
    onError: (err: any) => {
      setEmails(true);
      snack.error(err.response.data.message);
    },
  });



  const responseGoogle = (credentialResponse: any) => {
    console.log(credentialResponse);
    setCredentialResponse(credentialResponse);

    const decodedResponse = decodeJwtResponse(credentialResponse.credential);
    console.log(decodedResponse);
    setDecodedResponse(decodedResponse);

    mutate({
      clientId: credentialResponse.clientId,
      credential: credentialResponse.credential
    });
  }

  const logout = () => {
    window.location.href = 'https://www.google.com/accounts/logout';
  }

  return (
    <Box p={3}>

      {emails &&
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        />
      }

      {!emails && decodedResponse && decodedResponse?.email && (
        <>
          <div>{decodedResponse?.email}</div>
          {/* <button type="button" onClick={logout} >Logout</button> */}

          <button
            onClick={() => {
              googleLogout();
              window.location.reload();
            }}
            className={"button"}
          >
            Logout
          </button>

          Name: {emailProfile?.name}
          Profile: <img src={'' + emailProfile?.picture} alt="" />

          {/* : <GmailInbox credentials={credentialResponse} /> */}
        </>
      )}



    </Box>
  );
}

export default Gmaillogins;
