import { Alert, Box } from "@mui/material";
import { getProfile } from "api/services/users";
import Loader from "components/Loader";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";

export const UserProfileContext = createContext<any>(null);

function UserProfileProvider({ children }) {
  const { data, isLoading, error }: ResType = useQuery(["user"], getProfile, {
    enabled: localStorage.getItem("token") !== null,
  });

  if (isLoading) return <Loader minHeight="60vh" />;

  return (
    <UserProfileContext.Provider value={{ data: data?.data, isLoading, error }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export const useUserData = () => useContext(UserProfileContext);

export default UserProfileProvider;
