import loadable from "@loadable/component";

const Login = loadable(() => import("pages/login"));
const Dashboard = loadable(() => import("pages/dashboard"));
const Layout = loadable(() => import("layout"));
const Settings = loadable(() => import("pages/settings"));

export interface IRoute {
  component: any;
  exact?: boolean;
  name: string;
  path: string;
  routes?: Array<IRoute>;
}

const routes: Array<IRoute> = [
  {
    component: Login,
    name: "Login",
    path: "/login",
    exact: true,
  },
  {
    component: Layout,
    name: "Dashboard",
    path: "/",
    exact: false,
    routes: [
      {
        component: Settings,
        exact: true,
        name: "Settings",
        path: "/settings",
      },
      {
        component: Dashboard,
        exact: true,
        name: "Dashboard",
        path: "/dashboard",
      },
    ],
  },
];

export default routes;
