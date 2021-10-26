import { Box } from "@mui/system";
import { getClientInfo, updateClientInfo } from "api/client-info";
import FullLoader from "components/FullLoader";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { useRouteMatch } from "react-router-dom";
import { DataResponse } from "types";
import FormsContainer from "./FormsContainer";
import KybDetails from "./PasswordDetails";

function Passwords() {
  const snack = useSnack();
  const [state, setState] = useState<any[]>([]);
  const [forms, setForms] = useState<any[]>([]);
  const match: any = useRouteMatch();
  let clientId = match.params.clientId;

  const { isLoading }: UseQueryResult<DataResponse, Error> = useQuery(
    ["client-info", { clientId, type: "passwords" }],
    getClientInfo,
    {
      refetchOnWindowFocus: false,
      onSuccess: (res: any) => {
        let data = res.data;
        setState(data);
        let forms = new Set(data.map((item) => item?.form));
        setForms(Array.from(forms));
      },
    }
  );

  const { mutate, isLoading: updateKybLoading } = useMutation(
    updateClientInfo,
    {
      onSuccess: () => {
        snack.success("Passwords Updated");
      },
      onError: (err: any) => {
        snack.error(err.response.data.message);
      },
    }
  );

  const onUpdate = () => {
    mutate({
      data: state,
      clientId,
    });
  };

  if (isLoading || updateKybLoading) return <FullLoader />;

  return (
    <Box px={4} py={2} display='flex' justifyContent='space-between' gap={4}>
      <Box sx={{ maxWidth: 1000, width: "100%" }}>
        <KybDetails state={state} setState={setState} forms={forms} />
      </Box>
      <Box sx={{ maxWidth: 500, width: "100%" }}>
        <FormsContainer onUpdate={onUpdate} />
      </Box>
    </Box>
  );
}

export default Passwords;
