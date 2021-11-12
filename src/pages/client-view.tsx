import { Box } from "@mui/material";
import BreadCrumbs from "components/BreadCrumbs";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useEffect } from "react";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { clientMenu } from "utils/constants";
import Attachments from "views/clients/Attachments";
import KybInfo from "views/clients/ClientInfo";
import Passwords from "views/clients/Passwords";
import ProfileDetails from "views/clients/ProfileDetails.tsx";
import RecurringProfile from "views/clients/RecurringProfile";
import { ProfileNav, ProfileNavItem } from "views/clients/styles";

function ClientProfile() {
  useTitle("Clients");
  const { location } = useHistory();
  let { path, url }: any = useRouteMatch();

  useEffect(() => {
    console.log(moment("2021-11-11").isBefore("2021-12-11"));
  }, []);

  return (
    <div>
      <Box p={2}>
        <BreadCrumbs page="clientProfile" />
      </Box>
      <ProfileNav>
        {clientMenu.map((item, index) => (
          <Link
            to={url + item.path}
            key={index}
            style={{ textDecoration: "none" }}
          >
            <ProfileNavItem active={location.pathname === url + item.path}>
              {item.title}
            </ProfileNavItem>
          </Link>
        ))}
      </ProfileNav>
      <Switch>
        <Route path={`${path}/profile`}>
          <ProfileDetails />
        </Route>
        <Route path={`${path}/kyb-info`}>
          <KybInfo />
        </Route>
        <Route path={`${path}/passwords`}>
          <Passwords />
        </Route>
        <Route path={`${path}/attachments`}>
          <Attachments />
        </Route>
        <Route path={`${path}/recurring-profile`}>
          <RecurringProfile />
        </Route>
      </Switch>
    </div>
  );
}

export default ClientProfile;
