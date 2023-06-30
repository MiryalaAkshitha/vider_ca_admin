import React from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

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

const Google = () => {

    const responseGoogle = (credentialResponse: any) => {
        console.log(credentialResponse);
        const decodedResponse = decodeJwtResponse(credentialResponse.credential);
        console.log(decodedResponse);
    }


    return (

        <GoogleOAuthProvider clientId="572654191985-eadt6fbojrom0tf9tb3rd81lpv7gbgnr.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </GoogleOAuthProvider>

    )
}

export default Google;