import loadable from "@loadable/component";

const Login = loadable(() => import("pages/login"));
const Dashboard = loadable(() => import("pages/dashboard"));
const Layout = loadable(() => import("layout"));
const Settings = loadable(() => import("pages/settings"));
const Categories = loadable(() => import("pages/categories"));
const Services = loadable(() => import("pages/services"));
const AddService = loadable(() => import("pages/addservice"));

export interface IRoute {
  component: any;
  exact?: boolean;
  path: string;
  routes?: Array<IRoute>;
}

const routes: Array<IRoute> = [
  {
    component: Login,
    path: "/login",
    exact: true,
  },
  {
    component: Layout,
    path: "/",
    exact: false,
    routes: [
      {
        component: Settings,
        exact: true,
        path: "/settings",
      },
      {
        component: Dashboard,
        exact: true,
        path: "/dashboard",
      },
      {
        component: Categories,
        exact: true,
        path: "/categories",
      },
      {
        component: AddService,
        exact: true,
        path: "/services/add",
      },
      {
        component: Services,
        exact: true,
        path: "/services",
      },
    ],
  },
];

export default routes;
