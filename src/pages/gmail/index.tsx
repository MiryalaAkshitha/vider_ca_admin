import { Box, Button, Typography } from "@mui/material";
import useTitle from "hooks/useTitle";

// import GmailInbox from './GmailInbox';
import Gmaillogins from './Gmaillogin';
// import { getAccessToken, getAuthUrl } from "api/services/googleAuth";

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function Gmail() {
  useTitle("Gmail Inbox");

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


  return (
    <Box p={3}>

      <div>
        <h1>React Gmail Inbox</h1>

        <GoogleOAuthProvider clientId="572654191985-eadt6fbojrom0tf9tb3rd81lpv7gbgnr.apps.googleusercontent.com">
          <Gmaillogins />
        </GoogleOAuthProvider>

        {/* <GoogleOAuthProvider clientId="572654191985-eadt6fbojrom0tf9tb3rd81lpv7gbgnr.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </GoogleOAuthProvider> */}

        {/* {localStorage.getItem('access_token') ? (
          <GmailInbox />
        ) : (
          <button onClick={handleLogin}>Log in with Google</button>
        )}
        {window.location.search.includes('code') && handleCallback()} */}
      </div>


    </Box>
  );
}

export default Gmail;
