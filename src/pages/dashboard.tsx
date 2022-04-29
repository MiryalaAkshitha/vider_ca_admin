import { Box, Button } from "@mui/material";
import { http } from "api/http";
import { useEffect, useState } from "react";

const OrgDashboard = () => {
  const [state, setState] = useState({
    encryptedSessionKey: "",
    encryptedJson: "",
    encryptedHashData: "",
  });

  useEffect(() => {
    http
      .get("/forms/online/esign")
      .then((res: any) => {
        setState((state) => ({
          ...state,
          encryptedSessionKey: res.data.encryptedSessionKey,
          encryptedJson: res.data.encryptedJson,
          encryptedHashData: res.data.encryptedHashData,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <form
        style={{ padding: 50 }}
        method="POST"
        action="https://demosignergateway.emsigner.com/eMsecure/V3_0/Index"
      >
        <input
          name="Parameter1"
          type="text"
          value={state.encryptedSessionKey}
        />
        <input name="Parameter2" type="text" value={state.encryptedJson} />
        <input name="Parameter3" type="text" value={state.encryptedHashData} />
        <Box mt={2}>
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};
export default OrgDashboard;
