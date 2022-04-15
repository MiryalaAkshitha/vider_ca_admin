import loadable from "@loadable/component";
import GlobalDrawers from "GlobalDrawers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const BroadCast = loadable(() => import("pages/broadcast"));
const Calendar = loadable(() => import("pages/calendar"));
const Invoicing = loadable(() => import("pages/invoicing"));
const CreateInvoice = loadable(
  () => import("views/invoicing/createInvoice/index")
);
const Reports = loadable(() => import("pages/reports"));
const DeletedClients = loadable(() => import("pages/settings/deleted-clients"));
const DeletedTasks = loadable(() => import("pages/settings/deleted-tasks"));
const Login = loadable(() => import("pages/login"));
const Join = loadable(() => import("pages/join"));
const SignUp = loadable(() => import("pages/signup"));
const Dashboard = loadable(() => import("pages/dashboard"));
const Layout = loadable(() => import("layout/primarylayout"));
const SettingsLayout = loadable(() => import("layout/settingslayout"));
const TaskBoard = loadable(() => import("pages/taskboard"));
const Categories = loadable(() => import("pages/settings/categories"));
const Labels = loadable(() => import("pages/settings/labels"));
const Users = loadable(() => import("pages/settings/users"));
const ViewUser = loadable(() => import("pages/settings/ViewUser"));
const UserProfile = loadable(() => import("views/settings/users/Profile"));
const UserTasks = loadable(() => import("views/settings/users/Tasks"));
const UserExpenditure = loadable(
  () => import("views/settings/users/Expenditure")
);
const Teams = loadable(() => import("pages/settings/teams"));
const ViewTeam = loadable(() => import("pages/settings/ViewTeam"));
const Clients = loadable(() => import("pages/clients"));
const Leads = loadable(() => import("views/clients/leads"));
const DscRegister = loadable(() => import("views/clients/dscregister"));
const DscRegisterView = loadable(
  () => import("views/clients/dscregister/view")
);
const ClientView = loadable(() => import("pages/clients/client-view"));
const TasksView = loadable(() => import("pages/taskboard/task-view"));
const Attachments = loadable(() => import("views/clients/clients/Attachments"));
const KybInfo = loadable(() => import("views/clients/clients/ClientInfo"));
const Passwords = loadable(() => import("views/clients/clients/Passwords"));
const Archives = loadable(() => import("views/clients/clients/Archives"));
const ProfileDetails = loadable(
  () => import("views/clients/clients/ProfileDetails")
);
const OrganizationProfile = loadable(
  () => import("pages/settings/organization-profile")
);
const ViewRole = loadable(() => import("pages/settings/view-role"));
const Storage = loadable(() => import("pages/storage"));
const MyStorage = loadable(() => import("views/storage/MyStorage"));
const AllClientsStorage = loadable(
  () => import("views/storage/AllClientsStorage")
);
const RecurringProfile = loadable(() => {
  return import("views/clients/clients/RecurringProfile");
});
const RolesAndPermissions = loadable(() => {
  return import("pages/settings/roles-permissions");
});
const StorageManagement = loadable(() => {
  return import("pages/settings/storage-management");
});
const Forms = loadable(() => import("pages/forms"));
const MyForms = loadable(() => import("pages/forms/MyForms"));
const StandardForms = loadable(() => import("pages/forms/StandardForms"));
const FormSettings = loadable(() => import("pages/forms/FormSettings"));
const CreateForm = loadable(() => import("pages/forms/FormBuilder"));
const ViewForm = loadable(() => import("pages/forms/AccessForm"));

function RoutesContainer() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="reports" element={<Reports />} />
          <Route path="invoicing">
            <Route index element={<Invoicing />} />
            <Route path="create" element={<CreateInvoice />} />
          </Route>
          <Route path="storage" element={<Storage />}>
            <Route path="my-storage" element={<MyStorage />} />
            <Route path="all-clients-storage" element={<AllClientsStorage />} />
          </Route>
          <Route path="broadcast" element={<BroadCast />} />
          <Route path="forms" element={<Forms />}>
            <Route index element={<MyForms />} />
            <Route path="standard-forms" element={<StandardForms />} />
            <Route path="form-settings" element={<FormSettings />} />
          </Route>
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
          <Route path="users">
            <Route index element={<Users />} />
            <Route path=":userId" element={<ViewUser />}>
              <Route path="profile" element={<UserProfile />} />
              <Route path="tasks" element={<UserTasks />} />
              <Route path="expenditure" element={<UserExpenditure />} />
            </Route>
          </Route>
          <Route path="storage-management" element={<StorageManagement />} />
          <Route path="deleted-tasks" element={<DeletedTasks />} />
          <Route path="deleted-clients" element={<DeletedClients />} />
          <Route path="teams">
            <Route index element={<Teams />} />
            <Route path=":teamId" element={<ViewTeam />} />
          </Route>
          <Route path="labels" element={<Labels />} />
          <Route path="roles-permissions">
            <Route index element={<RolesAndPermissions />} />
            <Route path=":role" element={<ViewRole />} />
          </Route>
          <Route
            path="organization-profile"
            element={<OrganizationProfile />}
          />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/forms/builder/:formId" element={<CreateForm />} />
        <Route path="/forms/:formId" element={<ViewForm />} />
      </Routes>
      <GlobalDrawers />
    </Router>
  );
}

export default RoutesContainer;
