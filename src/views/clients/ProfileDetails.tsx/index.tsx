import { Box } from "@mui/system";
import { getOneClient, updateClient } from "api/client";
import FullLoader from "components/FullLoader";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { useRouteMatch } from "react-router-dom";
import { DataResponse } from "types";
import Details from "./Details";
import Profile from "./Profile";

function ProfileDetails() {
  const match: any = useRouteMatch();
  const snack = useSnack();
  const [state, setState] = useState<any>({});
  const queryClient = useQueryClient();

  const { isLoading }: UseQueryResult<DataResponse, Error> = useQuery(
    ["client", match.params.clientId],
    getOneClient,
    {
      onSuccess: (res: any) => {
        setState(res.data);
      },
      refetchOnWindowFocus: false,
    }
  );

  const { mutate, isLoading: updateProfileLoading } = useMutation(
    updateClient,
    {
      onSuccess: (res: any) => {
        queryClient.invalidateQueries("client");
        snack.success("Profile Updated");
      },
      onError: (err: any) => {
        snack.error(err.response.data.message);
      },
    }
  );

  const handleUpdate = () => {
    let { imageUrl, ...data } = state;
    mutate({ data, clientId: match.params.clientId });
  };

  if (isLoading || updateProfileLoading) return <FullLoader />;

  return (
    <Box px={4} pt={2} pb={10}>
      <Profile data={state} setState={setState} onUpdate={handleUpdate} />
      <Details data={state} setState={setState} />
    </Box>
  );
}

export default ProfileDetails;
