import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link, { LinkProps } from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

function BreadCrumbs({ page }: { page: string }) {
  let routes = getRoutes(page);

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {routes.map((item, index) => {
        if (index === routes.length - 1) {
          return <Typography color='text.primary'>{item.title}</Typography>;
        }
        return (
          <LinkRouter underline='hover' color='inherit' to={item.path}>
            {item.title}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}

const getRoutes = (page: string) => {
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
    default:
      return [];
  }
};

export default BreadCrumbs;
