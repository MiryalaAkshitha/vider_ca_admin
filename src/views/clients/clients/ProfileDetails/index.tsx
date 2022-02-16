import { Box } from "@mui/system";
import { getClient, updateClient } from "api/services/client";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import Activity from "./Acitivity";
import Details from "./Details";
import Profile from "./Profile";

function ProfileDetails() {
  const queryClient = useQueryClient();
  const params = useParams();
  const snack = useSnack();
  const [state, setState] = useState<any>({});

  const { data, isLoading }: ResType = useQuery(
    ["client", params.clientId],
    getClient,
    {
      onSuccess: (res: any) => {
        setState(res.data);
      },
      cacheTime: 0,
    }
  );

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

  if (isLoading) return <Loader />;

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
