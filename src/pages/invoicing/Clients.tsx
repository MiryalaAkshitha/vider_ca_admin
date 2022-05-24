import RouterLink from "components/RouterLink";
import { Outlet, useLocation } from "react-router-dom";
import { invoicingClientsMenu } from "utils/constants";
import {
  StyledProfileNav,
  StyledProfileNavItem
} from "views/clients/clients/styles";


const Clients = () => {
  const location = useLocation();


  return (
    <>
      <StyledProfileNav>
        {invoicingClientsMenu.map((item, index) => (
          <RouterLink
            to={`/invoicing/clients/id${item.path}`}
            key={index}
          >
            <StyledProfileNavItem
              active={location.pathname.includes(item.path) ? 1 : 0}
            >
              {item.title}
            </StyledProfileNavItem>
          </RouterLink>
        ))}
      </StyledProfileNav>

      <Outlet />

    </>
  );
};
export default Clients;
