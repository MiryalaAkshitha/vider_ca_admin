import { Box } from "@mui/system";
import { getClientInfo, updateClientInfo } from "api/services/client-info";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResponseType } from "types";
import FormsContainer from "./FormsContainer";
import KybDetails from "./KybDetails";

function KybInfo() {
  const snack = useSnack();
  const [state, setState] = useState<any[]>([]);
  const [forms, setForms] = useState<any[]>([]);
  const params = useParams();
  let clientId = params.clientId || "";

  const { isLoading }: ResponseType = useQuery(
    ["client-info", { clientId, type: "kyb" }],
    getClientInfo,
    {
      refetchOnWindowFocus: false,
      onSuccess: (res: any) => {
        let data = res.data;
        setState(data);
        let forms = new Set(data.map((item: any) => item?.form));
        setForms(Array.from(forms));
      },
    }
  );

  const { mutate, isLoading: updateKybLoading } = useMutation(
    updateClientInfo,
    {
      onSuccess: () => {
        snack.success("Kyb Info Updated");
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

  if (isLoading || updateKybLoading) return <Loader />;

  return (
    <Box px={4} py={2} display="flex" justifyContent="space-between" gap={4}>
      <Box sx={{ maxWidth: 1000, width: "100%" }}>
        <KybDetails state={state} setState={setState} forms={forms} />
      </Box>
      <Box sx={{ maxWidth: 500, width: "100%" }}>
        <FormsContainer onUpdate={onUpdate} />
      </Box>
    </Box>
  );
}

export default KybInfo;
