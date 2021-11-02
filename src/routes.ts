import loadable from "@loadable/component";

const Login = loadable(() => import("pages/login"));
const Dashboard = loadable(() => import("pages/dashboard"));
const Layout = loadable(() => import("layout"));
const Settings = loadable(() => import("pages/settings"));
const TaskBoard = loadable(() => import("pages/taskboard"));
const Categories = loadable(() => import("pages/categories"));
const Labels = loadable(() => import("pages/labels"));
const Services = loadable(() => import("pages/services"));
const AddService = loadable(() => import("pages/addservice"));
const Clients = loadable(() => import("pages/clients"));
const ClientView = loadable(() => import("pages/client-view"));
const Forms = loadable(() => import("pages/forms"));
const Fields = loadable(() => import("pages/fields"));
const FieldsConfiguration = loadable(
  () => import("pages/fields-configuration")
);

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
  },
  {
    component: ClientView,
    path: "/clients/:clientId",
  },
  {
    component: Layout,
    path: "/",
    exact: false,
    routes: [
      {
        component: TaskBoard,
        exact: true,
        path: "/task-board",
      },
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
        component: Labels,
        exact: true,
        path: "/labels",
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

      {
        component: Clients,
        exact: true,
        path: "/clients",
      },
      {
        component: Fields,
        exact: true,
        path: "/forms/:formId/fields",
      },
      {
        component: Forms,
        exact: true,
        path: "/forms",
      },
      {
        component: FieldsConfiguration,
        exact: true,
        path: "/fields-configuration",
      },
    ],
  },
];

export default routes;
