import loadable from "@loadable/component";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Permissions } from "utils/permissons";
import PageWithPermission from "components/PageWithPermission";

const BroadCast = loadable(() => import("pages/broadcast"));
const Calendar = loadable(() => import("pages/calendar"));
const Invoicing = loadable(() => import("pages/invoicing"));
const InvoicingDashboard = loadable(() => import("pages/invoicing/Dashboard"));
const Invoices = loadable(() => import("pages/invoicing/invoices"));
const Receipts = loadable(() => import("pages/invoicing/Receipts"));
const Estimates = loadable(() => import("pages/invoicing/Estimates"));
const ClientsTable = loadable(
  () => import("views/invoicing/clients/ClientsTable")
);
const ClientDashboard = loadable(() => import("pages/invoicing/Clients"));
const RecurringInvoices = loadable(
  () => import("views/invoicing/billing/RecurringInvoices")
);
const CreateInvoice = loadable(
  () => import("views/invoicing/billing/invoices/createInvoice/index")
);
const InvoicePreview = loadable(
  () => import("views/invoicing/billing/invoices/createInvoice/InvoicePreview")
);
const SentEmail = loadable(
  () => import("views/invoicing/billing/invoices/createInvoice/SendEmail")
);
const CreateEstimate = loadable(
  () => import("views/invoicing/billing/Estimates/createEstimate/index")
);
const EstimatePreview = loadable(
  () =>
    import("views/invoicing/billing/Estimates/createEstimate/EstimatePreview")
);
const CreateReceipt = loadable(
  () => import("views/invoicing/billing/Receipts/createReceipt/index")
);
const Overview = loadable(
  () => import("views/invoicing/clients/clientDashboard/Overview")
);
const UnbilledTasks = loadable(
  () => import("views/invoicing/clients/clientDashboard/UnbilledTasks")
);
const BilledTask = loadable(
  () => import("views/invoicing/clients/clientDashboard/BilledTask")
);
const ClientInvoicing = loadable(
  () => import("views/invoicing/clients/clientDashboard/ClientInvoicing")
);
const PaymentReceived = loadable(
  () => import("views/invoicing/clients/clientDashboard/PaymentReceived")
);
const Comments = loadable(
  () => import("views/invoicing/clients/clientDashboard/Comments")
);
const Mails = loadable(
  () => import("views/invoicing/clients/clientDashboard/Mails")
);
const Statements = loadable(
  () => import("views/invoicing/clients/clientDashboard/Statements")
);

const Reports = loadable(() => import("pages/reports"));
const DeletedClients = loadable(() => import("pages/settings/deleted-clients"));
const DeletedTasks = loadable(() => import("pages/settings/deleted-tasks"));
const Login = loadable(() => import("pages/login"));
const ResetPassword = loadable(() => import("pages/reset-password"));
const Join = loadable(() => import("pages/join"));
const SignUp = loadable(() => import("pages/signup"));
const Dashboard = loadable(() => import("pages/dashboard"));
const Layout = loadable(() => import("layout/primarylayout"));
const SettingsLayout = loadable(() => import("layout/settingslayout"));
const TaskBoard = loadable(() => import("pages/taskboard"));
const Categories = loadable(() => import("pages/settings/categories"));
const BillingEntities = loadable(
  () => import("pages/settings/billing-entities")
);
const ViewBillingEntityUser = loadable(
  () => import("pages/settings/viewBillingEntityUser")
);
const MyProfile = loadable(() => import("pages/settings/UserProfile"));
const Labels = loadable(() => import("pages/settings/labels"));
const Users = loadable(() => import("pages/settings/users"));
const InviteUsers = loadable(() => import("pages/settings/invited-users"));
const ViewUser = loadable(() => import("pages/settings/ViewUser"));
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
const KybInfo = loadable(() => import("views/clients/clients/KybInfo"));
const Passwords = loadable(() => import("views/clients/clients/Passwords"));
const Archives = loadable(() => import("views/clients/clients/Archives"));
const ProfileDetails = loadable(
  () => import("views/clients/clients/ProfileDetails")
);
const KybFormDetails = loadable(() => import("pages/clients/kyb-form-details"));
const EditKybDetails = loadable(() => import("pages/clients/kyb-form-edit"));
const KybFormAuditLog = loadable(
  () => import("pages/clients/kyb-form-audit-log")
);
const OrganizationProfile = loadable(
  () => import("pages/settings/organization-profile")
);
const Storage = loadable(() => import("pages/storage"));
const MyStorage = loadable(() => import("views/storage/MyStorage"));
const AllClientsStorage = loadable(
  () => import("views/storage/AllClientsStorage")
);
const RecurringProfile = loadable(() => {
  return import("views/clients/clients/RecurringProfile");
});
const Roles = loadable(() => {
  return import("pages/settings/roles-permissions");
});
const EditPermissions = loadable(() => {
  return import("pages/settings/roles-permissions/edit-permissions");
});
const StorageManagement = loadable(() => {
  return import("pages/settings/storage-management");
});
const Forms = loadable(() => import("pages/forms"));
const Esign = loadable(() => import("pages/forms/Esign"));
const TaskForms = loadable(() => import("pages/forms/TaskForms"));
const FormTemplates = loadable(() => import("pages/forms/FormTemplates"));
const FormValidations = loadable(() => import("pages/forms/FormValidations"));
const FormBuilder = loadable(() => import("pages/forms/FormBuilder"));
const AccessForm = loadable(() => import("pages/forms/AccessForm"));
const ViewIproForm = loadable(() => import("pages/taskboard/view-ipro"));
const ViewIproFormEntry = loadable(
  () => import("pages/taskboard/view-ipro-entry")
);
const IProAuditLog = loadable(() => import("pages/taskboard/ipro-audit-log"));
const IProShareLink = loadable(() => import("pages/taskboard/ipro-share-link"));
const Services = loadable(() => import("pages/services"));
const AddService = loadable(() => import("pages/services/add-service"));

function RoutesContainer() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="services">
            <Route index element={<Services />} />
            <Route path="add" element={<AddService />} />
          </Route>
          <Route path="calendar" element={<Calendar />} />
          <Route path="reports" element={<Reports />} />
          <Route path="invoicing" element={<Invoicing />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<InvoicingDashboard />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="clients">
              <Route index element={<ClientsTable />} />
              <Route path="id" element={<ClientDashboard />}>
                <Route path="overview" element={<Overview />} />
                <Route path="unbilled-tasks" element={<UnbilledTasks />} />
                <Route path="billed-tasks" element={<BilledTask />} />
                <Route path="payments-received" element={<PaymentReceived />} />
                <Route path="invoices" element={<ClientInvoicing />} />
                <Route path="comments" element={<Comments />} />
                <Route path="mails" element={<Mails />} />
                <Route path="statements" element={<Statements />} />
              </Route>
            </Route>
            <Route path="estimates" element={<Estimates />} />
            <Route path="receipts" element={<Receipts />} />
            <Route path="recurring-invoices" element={<RecurringInvoices />} />
          </Route>
          <Route path="invoicing/create-invoice" element={<CreateInvoice />} />
          <Route path="invoicing/send-email" element={<SentEmail />} />
          <Route
            path="invoicing/invoice-preview"
            element={<InvoicePreview />}
          />
          <Route
            path="invoicing/create-estimate"
            element={<CreateEstimate />}
          />
          <Route
            path="invoicing/estimate-preview"
            element={<EstimatePreview />}
          />
          <Route path="invoicing/create-receipt" element={<CreateReceipt />} />

          <Route path="storage" element={<Storage />}>
            <Route
              path="my-storage"
              element={
                <PageWithPermission name={Permissions.VIEW_STORAGE}>
                  <MyStorage />
                </PageWithPermission>
              }
            />
            <Route
              path="all-clients-storage"
              element={
                <PageWithPermission name={Permissions.VIEW_CLIENT_STORAGE}>
                  <AllClientsStorage />
                </PageWithPermission>
              }
            />
          </Route>
          <Route path="broadcast" element={<BroadCast />} />
          <Route path="forms" element={<Forms />}>
            <Route index element={<FormTemplates />} />
            <Route path="form-validations" element={<FormValidations />} />
            <Route path="task-forms" element={<TaskForms />} />
          </Route>
          <Route path="task-board">
            <Route
              index
              element={
                <PageWithPermission name={Permissions.VIEW_TASK}>
                  <TaskBoard />
                </PageWithPermission>
              }
            />
            <Route path=":taskId" element={<TasksView />} />
          </Route>
          <Route path="clients">
            <Route index element={<Clients />} />
            <Route path=":clientId" element={<ClientView />}>
              <Route
                path="kyb-info"
                element={
                  <PageWithPermission name={Permissions.VIEW_CLIENT_KYB}>
                    <KybInfo />
                  </PageWithPermission>
                }
              />
              <Route
                path="passwords"
                element={
                  <PageWithPermission name={Permissions.VIEW_CLIENT_PASSWORDS}>
                    <Passwords />
                  </PageWithPermission>
                }
              />
              <Route
                path="attachments"
                element={
                  <PageWithPermission
                    name={Permissions.VIEW_CLIENT_ATTACHMENTS}
                  >
                    <Attachments />
                  </PageWithPermission>
                }
              />
              <Route
                path="recurring-profile"
                element={
                  <PageWithPermission
                    name={Permissions.VIEW_CLIENT_RECURRING_PROFILE}
                  >
                    <RecurringProfile />
                  </PageWithPermission>
                }
              />
              <Route
                path="profile"
                element={
                  <PageWithPermission name={Permissions.VIEW_CLIENT_PROFILE}>
                    <ProfileDetails />
                  </PageWithPermission>
                }
              />
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
          <Route
            path="categories"
            element={
              <PageWithPermission name={Permissions.VIEW_CATEGORIES}>
                <Categories />
              </PageWithPermission>
            }
          />
          <Route path="billing-entities">
            <Route index element={<BillingEntities />} />
            <Route path=":billingId" element={<ViewBillingEntityUser />} />
          </Route>
          <Route index element={<Navigate to="profile" />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="users">
            <Route index element={<Users />} />
            <Route path=":userId" element={<ViewUser />} />
          </Route>
          <Route path="invited-users" element={<InviteUsers />} />
          <Route path="storage-management" element={<StorageManagement />} />
          <Route path="deleted-tasks" element={<DeletedTasks />} />
          <Route path="deleted-clients" element={<DeletedClients />} />
          <Route path="teams">
            <Route index element={<Teams />} />
            <Route path=":teamId" element={<ViewTeam />} />
          </Route>
          <Route path="labels" element={<Labels />} />
          <Route path="roles-permissions">
            <Route
              index
              element={
                <PageWithPermission name={Permissions.MANAGE_ORG_ROLES}>
                  <Roles />
                </PageWithPermission>
              }
            />
            <Route path=":roleId" element={<EditPermissions />} />
          </Route>
          <Route
            path="organization-profile"
            element={
              <PageWithPermission name={Permissions.MANAGE_ORG_PROFILE}>
                <OrganizationProfile />
              </PageWithPermission>
            }
          />
        </Route>
        <Route path="/forms/builder/:formId" element={<FormBuilder />} />
        <Route path="/forms/access/:formId" element={<AccessForm />} />
        <Route path="/tasks/:taskId/iPro/:formId" element={<ViewIproForm />}>
          <Route path="view" element={<ViewIproFormEntry />} />
          <Route path="edit" element={<FormBuilder />} />
          <Route path="audit-log" element={<IProAuditLog />} />
          <Route path="share-link" element={<IProShareLink />} />
        </Route>
        <Route
          path="/clients/:clientId/kyb-info/:formId"
          element={<KybFormDetails />}
        />
        <Route
          path="/clients/:clientId/kyb-info/:formId/edit"
          element={<EditKybDetails />}
        />
        <Route
          path="/clients/:clientId/kyb-info/:formId/audit-log"
          element={<KybFormAuditLog />}
        />
        <Route
          path="/forms/:formId/fields/:fieldId/esign"
          element={<Esign />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default RoutesContainer;
