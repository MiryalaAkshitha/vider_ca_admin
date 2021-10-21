import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link, { LinkProps } from "@mui/material/Link";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

function BreadCrumbs({ page }: { page: string }) {
  const match: any = useRouteMatch();
  let routes = getRoutes(page, match);

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {routes.map((item, index) => {
        if (index === routes.length - 1) {
          return (
            <Typography key={index} color='text.primary'>
              {item.title}
            </Typography>
          );
        }
        return (
          <LinkRouter
            key={index}
            underline='hover'
            color='inherit'
            to={item.path}>
            {item.title}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}

const getRoutes = (page: string, match: any) => {
  switch (page) {
    case "addService":
      return [
        { title: "Settings", path: "/settings" },
        { title: "Services", path: "/services" },
        { title: "Add Service", path: "/" },
      ];
    case "services":
      return [
        { title: "Settings", path: "/settings" },
        { title: "Services", path: "/" },
      ];
    case "categories":
      return [
        { title: "Settings", path: "/settings" },
        { title: "Categories", path: "/" },
      ];
    case "forms":
      return [
        { title: "Settings", path: "/settings" },
        { title: "Forms", path: "/" },
      ];
    case "fields":
      return [
        { title: "Settings", path: "/settings" },
        { title: "Forms", path: "/forms" },
        { title: "Fields", path: "/" },
      ];
    case "clientProfile":
      return [
        { title: "Clients", path: "/clients" },
        { title: match.params?.clientId, path: "/" },
      ];
    default:
      return [];
  }
};

export default BreadCrumbs;
