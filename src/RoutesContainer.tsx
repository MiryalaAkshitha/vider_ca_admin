import loadable from "@loadable/component";
import Calendar from "pages/calendar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Login = loadable(() => import("pages/login"));
const SignUp = loadable(() => import("pages/signup"));
const Dashboard = loadable(() => import("pages/dashboard"));
const Layout = loadable(() => import("layout/primarylayout"));
const SettingsLayout = loadable(() => import("layout/settingslayout"));
const TaskBoard = loadable(() => import("pages/taskboard"));
const Categories = loadable(() => import("pages/settings/categories"));
const Labels = loadable(() => import("pages/settings/labels"));
const Users = loadable(() => import("pages/settings/users"));
const Teams = loadable(() => import("pages/settings/teams"));
const Clients = loadable(() => import("pages/clients"));
const ClientView = loadable(() => import("pages/client-view"));
const TasksView = loadable(() => import("pages/task-view"));
const Attachments = loadable(() => import("views/clients/Attachments"));
const KybInfo = loadable(() => import("views/clients/ClientInfo"));
const Passwords = loadable(() => import("views/clients/Passwords"));
const ProfileDetails = loadable(() => import("views/clients/ProfileDetails"));
const RecurringProfile = loadable(
  () => import("views/clients/RecurringProfile")
);

const Forms = loadable(() => import("pages/settings/forms"));
const Fields = loadable(() => import("pages/settings/fields"));
const FieldsConfiguration = loadable(
  () => import("pages/settings/fields-configuration")
);
const RolesAndPermissions = loadable(
  () => import("pages/settings/roles-permissions")
);
const ViewRole = loadable(() => import("pages/settings/view-role"));

function RoutesContainer() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="task-board">
            <Route index element={<TaskBoard />} />
            <Route path=":taskId" element={<TasksView />} />
          </Route>
          <Route path="clients">
            <Route index element={<Clients />} />
            <Route path=":clientId" element={<ClientView />}>
              <Route path="kyb-info" element={<KybInfo />} />
              <Route path="passwords" element={<Passwords />} />
              <Route path="attachments" element={<Attachments />} />
              <Route path="recurring-profile" element={<RecurringProfile />} />
              <Route path="profile" element={<ProfileDetails />} />
            </Route>
          </Route>
        </Route>
        <Route path="/settings" element={<SettingsLayout />}>
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
          <Route path="teams" element={<Teams />} />
          <Route path="labels" element={<Labels />} />
          <Route path="roles-permissions">
            <Route index element={<RolesAndPermissions />} />
            <Route path=":role" element={<ViewRole />} />
          </Route>
          <Route path="forms">
            <Route index element={<Forms />}></Route>
            <Route path=":formId/fields" element={<Fields />} />
          </Route>
          <Route
            path="fields-configuration"
            element={<FieldsConfiguration />}
          />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default RoutesContainer;
