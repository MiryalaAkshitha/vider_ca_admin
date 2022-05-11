import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link, { LinkProps } from "@mui/material/Link";
import useQueryParams from "hooks/useQueryParams";
import { Link as RouterLink, useParams } from "react-router-dom";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

export const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

function BreadCrumbs({ page }: { page: string }) {
  const params: any = useParams();
  const { queryParams } = useQueryParams();
  const routes = getRoutes(page, params, queryParams);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {routes.map((item, index) => {
        if (index === routes.length - 1) {
          return (
            <Typography key={index} color="text.primary">
              {item.title}
            </Typography>
          );
        }
        return (
          <LinkRouter
            key={index}
            underline="hover"
            color="inherit"
            to={item.path}
          >
            {item.title}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}

const getRoutes = (page: string, params: any, query: any) => {
  switch (page) {
    case "addService":
      return [
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
    case "labels":
      return [
        { title: "Settings", path: "/labels" },
        { title: "Labels", path: "/" },
      ];
    case "forms":
      return [
        { title: "Settings", path: "/settings" },
        { title: "Forms", path: "/" },
      ];
    case "fields":
      return [
        { title: "Forms", path: "/settings/forms" },
        { title: "Fields", path: "/" },
      ];
    case "clientProfile":
      return [
        { title: "Clients", path: "/clients" },
        { title: `${query?.displayName} - ${query?.clientId}`, path: "/" },
      ];
    case "taskView":
      return [
        { title: "Tasks", path: "/task-board" },
        { title: "Task Details", path: "/" },
      ];

    case "dueDiligence":
      return [
        { title: "Tasks Details", path: `/task-board/${params?.taskId}` },
        { title: "Due Diligence", path: "/" },
      ];
    case "viewRole":
      return [
        { title: "Roles", path: "/settings/roles-permissions" },
        { title: params?.role, path: "/" },
      ];
    case "dscRegisterDetails":
      return [
        { title: "Dsc Register", path: "/dsc-register" },
        { title: "Dsc Register Details", path: "/" },
      ];
    default:
      return [];
  }
};

export default BreadCrumbs;
