import { Box } from "@mui/material";
import BreadCrumbs from "components/BreadCrumbs";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { clientMenu } from "utils/constants";
import { ProfileNav, ProfileNavItem } from "views/clients/styles";

function ClientProfile() {
  const params = useParams();
  const location = useLocation();

  useTitle("Clients");

  useEffect(() => {
    console.log(location);
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
            to={`/clients/${params.clientId}${item.path}`}
            key={index}
            style={{ textDecoration: "none" }}
          >
            <ProfileNavItem active={location.pathname === item.path}>
              {item.title}
            </ProfileNavItem>
          </Link>
        ))}
      </ProfileNav>
      <Outlet />
    </div>
  );
}

export default ClientProfile;
