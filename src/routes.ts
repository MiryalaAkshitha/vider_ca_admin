import loadable from "@loadable/component";
const Login = loadable(() => import("pages/login"));
const Dashboard = loadable(() => import("pages/dashboard"));
const Layout = loadable(() => import("layout/primarylayout"));
const SettingsLayout = loadable(() => import("layout/settingslayout"));
const TaskBoard = loadable(() => import("pages/taskboard"));
const Categories = loadable(() => import("pages/settings/categories"));
const Labels = loadable(() => import("pages/settings/labels"));
const Users = loadable(() => import("pages/settings/users"));
const Services = loadable(() => import("pages/settings/services"));
const AddService = loadable(() => import("pages/settings/addservice"));
const Clients = loadable(() => import("pages/clients"));
const ClientView = loadable(() => import("pages/client-view"));
const TasksView = loadable(() => import("pages/task-view"));
const Forms = loadable(() => import("pages/settings/forms"));
const Fields = loadable(() => import("pages/settings/fields"));
const FieldsConfiguration = loadable(
  () => import("pages/settings/fields-configuration")
);
const RolesAndPermissions = loadable(
  () => import("pages/settings/roles-permissions")
);
const ViewRole = loadable(() => import("pages/settings/view-role"));
const SignUp = loadable(() => import("pages/signup"));

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
    component: SignUp,
    path: "/signup",
  },
  {
    component: ClientView,
    path: "/clients/:clientId",
  },
  {
    component: TasksView,
    path: "/task-details/:taskId",
  },
  {
    component: SettingsLayout,
    path: "/settings",
    exact: false,
    routes: [
      {
        component: Categories,
        exact: true,
        path: "/settings/categories",
      },
      {
        component: Users,
        exact: true,
        path: "/settings/users",
      },
      {
        component: Labels,
        exact: true,
        path: "/settings/labels",
      },
      {
        component: Fields,
        exact: true,
        path: "/settings/forms/:formId/fields",
      },
      {
        component: Forms,
        exact: true,
        path: "/settings/forms",
      },
      {
        component: FieldsConfiguration,
        exact: true,
        path: "/settings/fields-configuration",
      },
      {
        component: AddService,
        exact: true,
        path: "/settings/services/add",
      },
      {
        component: Services,
        exact: true,
        path: "/settings/services",
      },
      {
        component: ViewRole,
        exact: true,
        path: "/settings/roles-permissions/:role",
      },
      {
        component: RolesAndPermissions,
        exact: true,
        path: "/settings/roles-permissions",
      },
    ],
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
        component: Dashboard,
        exact: true,
        path: "/dashboard",
      },
      {
        component: Clients,
        exact: true,
        path: "/clients",
      },
    ],
  },
];

export default routes;
