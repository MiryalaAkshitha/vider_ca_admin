import { getMyPermissions } from "api/services/roles";
import Loader from "components/Loader";
import React from "react";
import { useQuery } from "react-query";
import { ResType } from "types";

type Type = {
  role: string;
  permissions: string[];
};

export const PermissionsContext = React.createContext<Type>({
  role: "",
  permissions: [],
});

function PermissionsProvider({ children }) {
  const { data, isLoading }: ResType = useQuery(
    ["my-permissions"],
    getMyPermissions,
    {
      enabled: !!localStorage.getItem("token"),
    }
  );

  if (isLoading) return <Loader minHeight="60vh" />;

  return (
    <PermissionsContext.Provider
      value={{
        role: data?.data?.name || "",
        permissions:
          data?.data?.permissions?.map((item: any) => item?.slug) || [],
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
}

export const usePermissions = () => React.useContext(PermissionsContext);

export default PermissionsProvider;
