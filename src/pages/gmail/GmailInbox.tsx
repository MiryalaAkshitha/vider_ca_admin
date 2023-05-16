import { Box, Button, Typography } from "@mui/material";
import useTitle from "hooks/useTitle";
import React, { useEffect, useState } from 'react';

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

const auth: any = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/gmail.readonly'], // Add necessary scopes
});

// Configure the HTTP transport client
auth.auth.clientOptions = {
  fetch: fetch as any, // Use the 'node-fetch' library
};

const gmail = google.gmail({ version: 'v1', auth });


const GmailInbox = ({credentials}) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    // Load the required OAuth2 client credentials
    // const credentials = require('./path/to/your/credentials.json');

    // Create a new OAuth2 client
    const oAuth2Client = new google.auth.OAuth2(
      credentials.web.client_id,
      credentials.web.client_secret,
      credentials.web.redirect_uris[0]
    );

    // Set the token for the authenticated user
    oAuth2Client.setCredentials({
      access_token: 'ACCESS_TOKEN',
      refresh_token: 'REFRESH_TOKEN',
      // token_type: 'Bearer', // Optional
      // expiry_date: 1234567890, // Optional
    });

    // Create a new Gmail API client
    // const gmail = google.gmail({ version: 'v1', auth });
    // const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    // Fetch the list of emails from the inbox
    gmail.users.messages.list(
      {
        userId: 'me',
        labelIds: ['INBOX'],
        maxResults: 10,
      },
      (err: any, res: any) => {
        if (err) {
          console.error('Error fetching emails:', err);
          return;
        }

        const emails = res.data.messages || [];
        setEmails(emails);
      }
    );
  }, []);

  return (
    <div>
      <h2>Inbox Emails</h2>
      <ul>
        {emails.map((email: any) => (
          <li key={email.id}>{email.snippet}</li>
        ))}
      </ul>
    </div>
  );
};

export default GmailInbox;

