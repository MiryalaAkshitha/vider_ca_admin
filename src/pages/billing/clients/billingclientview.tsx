import { Box } from "@mui/material";
import { getClient } from "api/services/clients/clients";
import { snack } from "components/toast";
import { invoicingClientsMenu } from "data/constants";
import useQueryParams from "hooks/useQueryParams";
import { useState, useEffect } from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import { StyledProfileNav, StyledProfileNavItem } from "views/clients/styles";
import Billingclientoverview from "./billingclientoverview";
import UnBilledTasks from "./unbilledtasks";
import BilledTasks from "./billedtasks";
import Billing from "./billing";
import PaymentsReceived from "./clientreceipts";
import Billingoverview from "./billingoverview";
import ClientReceipts from "./clientreceipts";
function Billingclientview() {
  const [clientId, setClientId] = useState();
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { queryParams } = useQueryParams();
  const active = queryParams.tab;

  const params = useParams();

  const { data: clientprofile, isLoading, error }: ResType = useQuery(
    ["client", params.clientId],
    getClient, {
      onSuccess: (res: any) => {
        setClientId(res?.data?.id);
        navigate(`/billing/clients/${res?.data?.id}?tab=overview`);
      },
      onError: (err: any) => {
          snack.error(handleError(err));
      },
  });

  return (
    <Box px={4} pt={2} pb={10}>


      <>
        <Box sx={{ position: "sticky", top: 65, bgcolor: "white", zIndex: 2 }}>
          <StyledProfileNav sx={{ marginTop: "none" }}>
            {invoicingClientsMenu.map((item, index) => (
              <StyledProfileNavItem
                key={index}
                onClick={() => navigate(`?tab=${item.path}`)}
                active={active === item.path ? 1 : 0}
              >
                {item.title}
              </StyledProfileNavItem>
            ))}
          </StyledProfileNav>
        </Box>
        <Box px={2} py={3}>
          {active === "overview" && <Billingoverview/>}
          {active === "unbilledtasks" && <UnBilledTasks/>}
          {active === "billedtasks" && <BilledTasks />}
          {active === "billing" && <Billing />}
          {active === "clientreceipts" && <ClientReceipts />} 
        </Box>
      </>

      {/* <Activity /> */}
      {/* <ValidateAccess name={Permissions.EDIT_CLIENT_PROFILE}>
        <BottomBar data={originalState} setState={setState} state={state} />
      </ValidateAccess> */}
    </Box>
  );
}

export default Billingclientview;

