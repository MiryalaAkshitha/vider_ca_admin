import { Alert, Box } from "@mui/material";
import { getClient } from "api/services/client";
import Loader from "components/Loader";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";

export const ClientDataContext = createContext<any>(null);

function ClientDataProvider({ children }) {
  const params = useParams();

  const { data, isLoading, error }: ResType = useQuery(
    ["client", params.clientId],
    getClient
  );

  if (isLoading) return <Loader minHeight="60vh" />;

  if (!data || error) {
    return (
      <Box maxWidth={500} margin="auto" mt={5}>
        <Alert severity="error">{error?.message}</Alert>
      </Box>
    );
  }

  return (
    <ClientDataContext.Provider value={{ data, isLoading, error }}>
      {children}
    </ClientDataContext.Provider>
  );
}

export const useClientData = () => useContext(ClientDataContext);

export default ClientDataProvider;
