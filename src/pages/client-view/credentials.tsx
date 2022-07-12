import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { Box } from "@mui/system";
import { getClientPasswords } from "api/services/client-info";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import ValidateAccess from "components/ValidateAccess";
import { usePermissions } from "context/PermissionsProvider";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { Permissions } from "data/permissons";
import CredentialsCard from "views/client-view/Credentials/CredentialsCard";
import AddCredentials from "views/client-view/Credentials/AddCredentials";

function Credentials() {
  const { permissions } = usePermissions();
  const params = useParams();
  const clientId = params.clientId || "";
  const [open, setOpen] = useState(false);

  const { data, isLoading }: ResType = useQuery(
    ["client-passwords", clientId],
    getClientPasswords
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box sx={{ maxWidth: 1200, width: "100%", p: 2, py: 5, margin: "auto" }}>
        {data?.data?.map((item: any) => (
          <CredentialsCard key={item.id} data={item} />
        ))}
      </Box>
      {!(data?.data?.length > 0) && (
        <EmptyPage
          minHeight="50vh"
          title="There is no password added"
          desc="Click on Add password to add a new password"
          {...(permissions.includes(Permissions.CREATE_CLIENT_PASSWORDS) && {
            btn2Title: "Add Credentials",
            btn2Action: () => setOpen(true),
          })}
        />
      )}
      {data?.data?.length > 0 && (
        <ValidateAccess name={Permissions.CREATE_CLIENT_PASSWORDS}>
          <Fab
            onClick={(e) => setOpen(true)}
            size="medium"
            color="secondary"
            sx={{
              position: "fixed",
              bottom: 40,
              right: 40,
              borderRadius: "8px",
            }}
            aria-label="add"
          >
            <Add />
          </Fab>
        </ValidateAccess>
      )}
      <AddCredentials open={open} setOpen={setOpen} />
    </>
  );
}

export default Credentials;
