import loadable from "@loadable/component";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const BroadCast = loadable(() => import("pages/broadcast"));
const Calendar = loadable(() => import("pages/calendar"));
const Invoicing = loadable(() => import("pages/invoicing"));
const Reports = loadable(() => import("pages/reports"));
const DeletedClients = loadable(() => import("pages/settings/deleted-clients"));
const DeletedTasks = loadable(() => import("pages/settings/deleted-tasks"));
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
const Leads = loadable(() => import("views/clients/leads"));
const DscRegister = loadable(() => import("views/clients/dscregister"));
const DscRegisterView = loadable(
  () => import("views/clients/dscregister/view")
);
const ClientView = loadable(() => import("pages/clients/client-view"));
const TasksView = loadable(() => import("pages/taskboard/task-view"));
const DueDiligence = loadable(() => import("pages/taskboard/due-diligence"));
const Attachments = loadable(() => import("views/clients/clients/Attachments"));
const KybInfo = loadable(() => import("views/clients/clients/ClientInfo"));
const Passwords = loadable(() => import("views/clients/clients/Passwords"));
const Archives = loadable(() => import("views/clients/clients/Archives"));
const ProfileDetails = loadable(
  () => import("views/clients/clients/ProfileDetails")
);
const OrganizationProfile = loadable(
  () => import("pages/settings/organizationProfile/ProfileDetails")
);
const ViewRole = loadable(() => import("pages/settings/view-role"));
const Forms = loadable(() => import("pages/settings/forms"));
const Fields = loadable(() => import("pages/settings/fields"));
const Storage = loadable(() => import("pages/storage"));
const RecurringProfile = loadable(() => {
  return import("views/clients/clients/RecurringProfile");
});
const FieldsConfiguration = loadable(() => {
  return import("pages/settings/fields-configuration");
});
const RolesAndPermissions = loadable(() => {
  return import("pages/settings/roles-permissions");
});
const StorageManagement = loadable(() => {
  return import("pages/settings/storage-management");
});
const DueDiligencePreview = loadable(() => {
  return import("pages/taskboard/due-diligence-preview");
});

function RoutesContainer() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="reports" element={<Reports />} />
          <Route path="invoicing" element={<Invoicing />} />
          <Route path="storage" element={<Storage />} />
          <Route path="broadcast" element={<BroadCast />} />
          <Route path="task-board">
            <Route index element={<TaskBoard />} />
            <Route path=":taskId" element={<TasksView />} />
            <Route path=":taskId/due-diligence" element={<DueDiligence />} />
          </Route>
          <Route path="clients">
            <Route index element={<Clients />} />
            <Route path=":clientId" element={<ClientView />}>
              <Route path="kyb-info" element={<KybInfo />} />
              <Route path="passwords" element={<Passwords />} />
              <Route path="attachments" element={<Attachments />} />
              <Route path="recurring-profile" element={<RecurringProfile />} />
              <Route path="profile" element={<ProfileDetails />} />
              <Route path="archives" element={<Archives />} />
            </Route>
          </Route>
          <Route path="leads" element={<Leads />} />
          <Route path="dsc-register">
            <Route index element={<DscRegister />} />
            <Route path=":dscId" element={<DscRegisterView />} />
          </Route>
        </Route>
        <Route path="/settings" element={<SettingsLayout />}>
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
          <Route path="storage-management" element={<StorageManagement />} />
          <Route path="deleted-tasks" element={<DeletedTasks />} />
          <Route path="deleted-clients" element={<DeletedClients />} />
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
          <Route
            path="organization-profile"
            element={<OrganizationProfile />}
          />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="due-diligence/:taskId" element={<DueDiligencePreview />} />
      </Routes>
    </Router>
  );
}

export default RoutesContainer;
