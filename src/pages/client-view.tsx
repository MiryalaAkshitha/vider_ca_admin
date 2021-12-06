import { Box } from "@mui/material";
import BreadCrumbs from "components/BreadCrumbs";
import useTitle from "hooks/useTitle";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { clientMenu } from "utils/constants";
import { ProfileNav, ProfileNavItem } from "views/clients/styles";

function ClientProfile() {
  const params = useParams();
  const location = useLocation();

  useTitle("Clients");

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
            <ProfileNavItem active={location.pathname.includes(item.path)}>
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
