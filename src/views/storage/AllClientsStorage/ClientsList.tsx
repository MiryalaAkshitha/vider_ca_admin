import { Avatar, Box, TextField, Typography } from "@mui/material";
import { getClients } from "api/services/clients/clients";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";

function ClientsList() {
  const { queryParams, setQueryParams } = useQueryParams();
  const [search, setSearch] = useState("");

  const { data, isLoading }: ResType = useQuery(["clients", {}], getClients, {
    onSuccess: (data) => {
      if (!queryParams.clientId) {
        setQueryParams({
          ...queryParams,
          clientId: data?.data?.result[0].id,
        });
      }
    },
  });

  let getData = () => {
    let result = data?.data?.result;
    if (search) {
      result = result?.filter((item: any) =>
        item?.displayName.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  };

  return (
    <Box
      width={320}
      sx={{ height: "80vh", px: 1, display: "flex", flexDirection: "column" }}
    >
      <Box>
        <Box>
          <Typography variant="h6">All Clients</Typography>
        </Box>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          placeholder="Search"
          size="small"
          sx={{ mt: 1 }}
        />
      </Box>
      <Box mt={2} sx={{ overflowY: "auto", flex: 1, pr: 1 }}>
        {isLoading ? (
          <Loader />
        ) : (
          getData()?.map((client: any, index: number) => (
            <ClientItem client={client} key={index} setSearch={setSearch} />
          ))
        )}
      </Box>
    </Box>
  );
}

const ClientItem = ({ client, setSearch }: any) => {
  const { queryParams, setQueryParams } = useQueryParams();

  return (
    <Box
      onClick={() => {
        setSearch("");
        setQueryParams({
          ...queryParams,
          clientId: client.id,
        });
      }}
      sx={{
        bgcolor: +queryParams?.clientId === +client?.id ? "#182F53" : "#F9FAFC",
        display: "flex",
        gap: 1,
        alignItems: "center",
        p: 2,
        mt: 1,
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      <Avatar src={client?.imageUrl} sx={{ width: 30, height: 30 }} />
      <Box flex={1}>
        <Typography
          variant="h6"
          color={+queryParams?.clientId === +client?.id ? "white" : "primary"}
        >
          {client?.displayName}
        </Typography>
      </Box>
    </Box>
  );
};

export default ClientsList;
