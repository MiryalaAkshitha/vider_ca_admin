import { Box } from "@mui/system";
import { updateClient } from "api/services/client";
import { useClientData } from "context/ClientData";
import useSnack from "hooks/useSnack";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Activity from "./Acitivity";
import Details from "./Details";
import Profile from "./Profile";

function ProfileDetails() {
  const queryClient = useQueryClient();
  const params = useParams();
  const snack = useSnack();
  const [state, setState] = useState<any>({});
  const { data } = useClientData();

  useEffect(() => {
    setState(data?.data);
  }, [data]);

  const { mutate } = useMutation(updateClient, {
    onSuccess: () => {
      snack.success("Profile Updated");
      queryClient.invalidateQueries("client");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleUpdate = () => {
    const { imageUrl, ...data } = state;
    mutate({ data, id: params.clientId });
  };

  return (
    <Box px={4} pt={2} pb={10}>
      <Profile data={state} setState={setState} onUpdate={handleUpdate} />
      <Details
        apiData={data?.data}
        data={state}
        setState={setState}
        onUpdate={handleUpdate}
      />
      <Activity />
    </Box>
  );
}

export default ProfileDetails;
