import loadable from "@loadable/component";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Permissions } from "data/permissons";
import PageWithPermission from "components/PageWithPermission";


const Calendar = loadable(() => import("pages/calendar"));
const Billing = loadable(() => import("pages/billing"));
const BillingClients = loadable(() => import("pages/billing/clients"));
const Billingclientview = loadable(() => import("pages/billing/clients/billingclientview"));
const Billingclientoverview = loadable(() => import("pages/billing/clients/billingclientoverview"));

const Estimates = loadable(() => import("pages/billing/estimates"));
const Invoices = loadable(() => import("pages/billing/invoices"));
const AddInvoice = loadable(() => import("pages/billing/invoices/add-invoice"));
const AddInvoiceReceipt = loadable(() => import("pages/billing/invoices/create-receipt"));
const EditInvoiceReceipt = loadable(() => import("pages/billing/invoices/edit-receipt"));
const EditInvoice = loadable(() => import("pages/billing/invoices/edit-invoice"));
const InvoicePreview = loadable(() => import("pages/billing/invoices/invoice-preview"));
const Receipts = loadable(() => import("pages/billing/receipts"));
const ReceiptPreview = loadable(() => import("pages/billing/receipts/receipt-preview"));
const AddReceipt = loadable(() => import("pages/billing/receipts/add-receipt"));
const DeletedClients = loadable(() => import("pages/settings/deleted-clients"));
const DeletedTasks = loadable(() => import("pages/settings/deleted-tasks"));
const CompletedTasks = loadable(() => import("pages/settings/completed-tasks"));
const UpcomingTasks = loadable(() => import("pages/settings/upcoming-tasks"));
const DeletedUsers = loadable(() => import("pages/settings/deleted-users"));
const Login = loadable(() => import("pages/login"));
const ResetPassword = loadable(() => import("pages/reset-password"));
const Join = loadable(() => import("pages/join"));
const SignUp = loadable(() => import("pages/signup"));
const Layout = loadable(() => import("layout/primarylayout"));
const SettingsLayout = loadable(() => import("layout/settingslayout"));
const TaskBoard = loadable(() => import("pages/tasks"));
const Categories = loadable(() => import("pages/settings/categories"));
const BillingEntities = loadable(() => import("pages/settings/organization/billing-entities"));
const BillingEntityProfile = loadable(
  () => import("pages/settings/organization/billing-entity-profile")
);
const MyProfile = loadable(() => import("pages/settings/profile"));
const Labels = loadable(() => import("pages/settings/labels"));
const Users = loadable(() => import("pages/settings/manage-users/users"));
const InviteUsers = loadable(() => import("pages/settings/manage-users/invited-users"));
const ViewUser = loadable(() => import("pages/settings/manage-users/users/view-user"));
const Teams = loadable(() => import("pages/settings/manage-users/teams"));
const ViewTeam = loadable(() => import("pages/settings/manage-users/teams/view-team"));
const NotificationsPreferences = loadable(() => import("pages/settings/notifications-preferences"));
const Clients = loadable(() => import("pages/clients"));
const Leads = loadable(() => import("pages/leads"));
const DscRegister = loadable(() => import("pages/dscregister/dsc-register"));
const ClientDscRegister = loadable(() => import("pages/client-view/dsc-register"));
const ClientDscRegisterView = loadable(() => import("pages/client-view/view-dsc-register"));
const GstUi = loadable(() => import("pages/dscregister"));
const GstHome = loadable(() => import("views/dsc-register/GstHome"));
//const Gstr3b = loadable(() => import("views/dsc-register/Gstr3b"));
const ClientView = loadable(() => import("pages/client-view"));
const TasksView = loadable(() => import("pages/task-view"));
const Attachments = loadable(() => import("pages/client-view/attachments"));
const KybInfo = loadable(() => import("pages/client-view/kyb-info"));
const Credentials = loadable(() => import("pages/client-view/credentials"));
const Archives = loadable(() => import("pages/client-view/archives"));
const Tasks = loadable(() => import("pages/client-view/clientTasks"));
const ClientActivityLog = loadable(() => import("pages/client-view/client-activitylog"));
const ProfileDetails = loadable(() => import("pages/client-view/profile"));

const OrganizationProfile = loadable(
  () => import("pages/settings/organization/organization-profile")
);

const RecurringProfile = loadable(() => {
  return import("pages/client-view/recurring-profile");
});

// Dashboard
const Dashboard = loadable(() => import("pages/dashboard"));
const TasksByService = loadable(() => import("pages/dashboard/tasks-by-service"));
const OverDueTasks = loadable(() => import("pages/dashboard/over-due-tasks"));
const EmployeeTasksByStatus = loadable(() => import("pages/dashboard/employee-tasks-by-status"));

//ROLES AND PERMISSIONS
const Roles = loadable(() => {
  return import("pages/settings/manage-users/roles-permissions");
});
const EditPermissions = loadable(() => {
  return import("pages/settings/manage-users/roles-permissions/edit-permissions");
});

// STORAGE MANAGEMENT
const StorageManagement = loadable(() => {
  return import("pages/settings/storage-management");
});
const OnedriveAuth = loadable(() => {
  return import("pages/onedrive-auth");
});
const Storage = loadable(() => import("pages/storage"));
const MyStorage = loadable(() => import("views/storage/MyStorage"));
const AllClientsStorage = loadable(() => import("views/storage/AllClientsStorage"));
const OneDriveStorage = loadable(() => import("views/storage/OneDrive"));

// ESTIMATES
const AddEstimate = loadable(() => import("pages/billing/estimates/add-estimate"));
const EstimatePreview = loadable(() => import("pages/billing/estimates/estimate-preview"));

// FORMS
const Forms = loadable(() => import("pages/forms"));
const Esign = loadable(() => import("pages/forms/Esign"));
const FormTemplates = loadable(() => import("pages/forms/FormTemplates"));
const FormValidations = loadable(() => import("pages/forms/FormValidations"));
const FormBuilder = loadable(() => import("pages/forms/FormBuilder"));
const AccessForm = loadable(() => import("pages/forms/AccessForm"));

// IPRO
const ViewIproForm = loadable(() => import("pages/task-view/view-ipro"));
const ViewIproFormEntry = loadable(() => import("pages/task-view/view-ipro-entry"));
const IProAuditLog = loadable(() => import("pages/task-view/ipro-audit-log"));
const IProApprovals = loadable(() => import("pages/task-view/ipro-approvals"));

// KYB DETAILS
const ViewKyb = loadable(() => import("pages/client-view/view-kyb"));

// SERVICES
const Services = loadable(() => import("pages/services"));
const AddService = loadable(() => import("pages/services/add-service"));

// APPROVALS
const Approvals = loadable(() => import("pages/settings/approval-hierarchies"));
const AddApproval = loadable(
  () => import("pages/settings/approval-hierarchies/add-approval-hierarchy")
);

// REPORTS
const InvoiceReports = loadable(() => import("pages/reports/invoice-reports"));
const Reports = loadable(() => import("pages/reports"));
const LogHoursReport = loadable(() => import("pages/reports/log-hours-report"));
const EmployeeLogHoursReport = loadable(() => import("pages/reports/employee-log-hours-report"));
const ClientsReport = loadable(() => import("pages/reports/clients-report"));
const TasksReport = loadable(() => import("pages/reports/tasks-report"));
const CustomReports = loadable(() => import("pages/reports/custom-reports"));
const PredefinedReports = loadable(() => import("pages/reports/predefined-reports"));
const StatusWiseTasks = loadable(() => import("pages/reports/status-wise-tasks"));
const ServiceCategoryStatusWiseTasks = loadable(() => import("pages/reports/service-category-status-wise-tasks"));
const ServiceandSubCategoryWiseTasks = loadable(() => import("pages/reports/service-subcategory-wise-tasks"));
const UserBasedMasterReport = loadable(() => import("pages/reports/user-based-master-report"));
const OverDueTasksReport = loadable(() => import("pages/reports/over-due-tasks-report"));
const DetailedOverDueTasksReport = loadable(() => import("pages/reports/detailed-over-due-tasks-report"));
const EfficiencyReport = loadable(() => import("pages/reports/efficiency-report"));
const HighestNoOfTaskCompletion = loadable(() => import("pages/reports/highest-task-completion-reports"))
// Invoice REPORTS
const TasksCompletedToBilledTasksReport = loadable(() => import("pages/reports/invoice/TasksCompletedToBilledTasksReport"));
const TasksCompletedToUnBilledTasksReport = loadable(() => import("pages/reports/invoice/TasksCompletedToUnBilledTasksReport"));
const ClientWiseTasksCompletedToBilledReport = loadable(() => import("pages/reports/invoice/ClientWiseTasksCompletedToBilledReport"));
const ClientWiseTasksCompletedToUnBilledReport = loadable(() => import("pages/reports/invoice/ClientWiseTasksCompletedToUnBilledReport"));
const InvoiceOverDueReport = loadable(() => import("pages/reports/invoice/InvoiceOverDueReport"));
const BalanceDueForInvoicesRaisedReport = loadable(() => import("pages/reports/invoice/BalanceDueForInvoicesRaisedReport"));
const ReceiptManagementReport = loadable(() => import("pages/reports/invoice/ReceiptManagementReport"));

//BRODCAST
const Communication = loadable(() => import("pages/communication"));
const TeamDiscussion = loadable(() => import("pages/communication/team-discussion"));
const UserGroups = loadable(() => import("pages/communication/userTeams"));
const ClientGroups = loadable(() => import("pages/communication/clientGroups"));
const UserView = loadable(() => import("pages/communication/userTeams/user-view"));
const ClientGroupView = loadable(
  () => import("pages/communication/clientGroups/client-group-view")
);
const ClientGroupTeamView = loadable(
  () => import("pages/communication/clientGroups/client-group-teamView")
);
const EmailTemplates = loadable(() => import("pages/communication/templates/email"));
const EmailTemplatesView = loadable(
  () => import("pages/communication/templates/email/add-email-template")
);

const PushNotifications = loadable(
  () => import("pages/communication/templates/push-notifications")
);

const Gmail = loadable(() => import("pages/gmail"));

function RoutesContainer() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard">
            <Route index element={<Dashboard />} />
            <Route path="tasks-by-service" element={<TasksByService />} />
            <Route path="over-due-tasks" element={<OverDueTasks />} />
            <Route path="employee-tasks-by-status" element={<EmployeeTasksByStatus />} />
          </Route>
          <Route path="services">
            <Route index element={<Services />} />
            <Route path="add" element={<AddService />} />
          </Route>
          {/* <Route
            path="categories"
            element={
              <PageWithPermission name={Permissions.VIEW_CATEGORIES}>
                <Categories />
              </PageWithPermission>
            }
          /> */}

          <Route path="calendar" element={<Calendar />} />
          <Route path="reports" element={<Reports />}>
            {/* <Route
              index
              element={
                <PageWithPermission name={Permissions.VIEW_REPORTS}>
                  <Reports />
                </PageWithPermission>
              }
            /> */}
            <Route index element={<PredefinedReports />} />
            <Route path="status-wise-tasks" element={<StatusWiseTasks />} />
            <Route path="service-category-status-wise-tasks" element={<ServiceCategoryStatusWiseTasks />} />
            <Route path="service-subcategory-wise-tasks" element={<ServiceandSubCategoryWiseTasks />} />
            <Route path="user-based-master-report" element={<UserBasedMasterReport />} />
            <Route path="over-due-tasks-report" element={<OverDueTasksReport />} />
            <Route path="detailed-over-due-tasks-report" element={<DetailedOverDueTasksReport />} />
            <Route path="efficiency-report" element={<EfficiencyReport />} />
            <Route path="highest-task-completion-reports" element={<HighestNoOfTaskCompletion />} />
            <Route path="TasksCompletedToBilledTasksReport" element={<TasksCompletedToBilledTasksReport />} />
            <Route path="TasksCompletedToUnBilledTasksReport" element={<TasksCompletedToUnBilledTasksReport />} />
            <Route path="ClientWiseTasksCompletedToBilledReport" element={<ClientWiseTasksCompletedToBilledReport />} />
            <Route path="ClientWiseTasksCompletedToUnBilledReport" element={<ClientWiseTasksCompletedToUnBilledReport />} />
            <Route path="InvoiceOverDueReport" element={<InvoiceOverDueReport />} />
            <Route path="BalanceDueForInvoicesRaisedReport" element={<BalanceDueForInvoicesRaisedReport />} />
            <Route path="ReceiptManagementReport" element={<ReceiptManagementReport />} />
            <Route path="invoice-reports" element={<InvoiceReports />} />
            <Route path="custom-reports" element={<CustomReports />} />
            <Route path="log-hours-report" element={<LogHoursReport />} />
            <Route path="employee-log-hours-report" element={<EmployeeLogHoursReport />} />
            <Route path="clients-report" element={<ClientsReport />} />
            <Route path="tasks-report" element={<TasksReport />} />
          </Route>
          <Route path="billing" element={<Billing />}>
            <Route path="clients/:clientId" element={<Billingclientview />} />
            <Route path="clients/" element={<Billingclientoverview />} />
            <Route path="estimates" element={<Estimates />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="receipts" element={<Receipts />} />
            <Route path="clients" element={<BillingClients />} />
          </Route>
          <Route path="communication" element={<Communication />}>
            <Route path="user-teams" element={<UserGroups />} />
            <Route path="user-teams/:userGroupId" element={<UserView />} />
            <Route path="team-discussion" element={<TeamDiscussion />} />
            <Route path="client-groups" element={<ClientGroups />} />
            <Route path="client-groups/:userGroupId" element={<ClientGroupView />} />
            <Route path="client-groups/:userGroupId/:id" element={<ClientGroupTeamView />} />
            <Route path="email" element={<EmailTemplates />} />
            <Route path="email/:emailTemplateView" element={<EmailTemplatesView />} />

            <Route path="push-notifications" element={<PushNotifications />} />
          </Route>
          <Route path="billing/estimates/add" element={<AddEstimate />} />
          <Route path="billing/invoices/add" element={<AddInvoice />} />
          <Route path="billing/receipts/add" element={<AddReceipt />} />
          {/* <Route path="billing/invoices/:invoiceId/receipt" element={<AddInvoiceReceipt />} />  */}
          <Route path="billing/invoices/:invoiceId/receipt" element={<EditInvoiceReceipt />} />
          <Route path="billing/invoices/:invoiceId/edit" element={<EditInvoice />} />

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
              path="onedrive-storage"
              element={
                <PageWithPermission name={Permissions.VIEW_STORAGE}>
                  <OneDriveStorage />
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
          <Route path="forms" element={<Forms />}>
            <Route index element={<FormTemplates />} />
            <Route path="form-validations" element={<FormValidations />} />
          </Route>
          <Route path="task-board">
            <Route
              index
              element={
                <PageWithPermission
                  name={[Permissions.VIEW_ALL_TASKS, Permissions.VIEW_ASSIGNED_TASKS]}
                >
                  <TaskBoard />
                </PageWithPermission>
              }
            />
            <Route path=":taskId" element={<TasksView />} />
          </Route>
          
          <Route path="leads" element={<Leads />} />
          {/* <Route path="gmailInbox" element={<Gmail />} /> */}
          
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
                path="credentials"
                element={
                  <PageWithPermission name={Permissions.VIEW_CLIENT_PASSWORDS}>
                    <Credentials />
                  </PageWithPermission>
                }
              />
              <Route
                path="attachments"
                element={
                  <PageWithPermission name={Permissions.VIEW_CLIENT_ATTACHMENTS}>
                    <Attachments />
                  </PageWithPermission>
                }
              />
              <Route
                path="recurring-profile"
                element={
                  <PageWithPermission name={Permissions.VIEW_CLIENT_RECURRING_PROFILE}>
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
              <Route path="client-tasks" element={<Tasks />} />
              <Route path="client-activitylog" element={<ClientActivityLog />} />
              <Route path="dsc-register">
                <Route index element={<ClientDscRegister />} />
                <Route path=":dscId" element={<ClientDscRegisterView />} />
              </Route>
            </Route>
          </Route>
          <Route path="dsc-register" element={<GstUi />}>
            <Route index element={<DscRegister />} />
            <Route path="gst">
              <Route path="gstr-1" element={<GstHome />} />
              <Route path="gstr-3b" element={<GstHome />} />
              <Route path="gstr-9" element={<GstHome />} />
              <Route path="gstr-9c" element={<GstHome />} />
              <Route path="gstr-08" element={<GstHome />} />
            </Route>
            <Route path=":dscId" element={<ClientDscRegisterView />} />
          </Route>
        </Route>

        <Route path="/settings" element={<SettingsLayout />}>
          <Route path="approvals">
            <Route index element={<Approvals />} />
            <Route path="add-approval" element={<AddApproval />} />
          </Route>
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
            <Route path=":billingEntityId" element={<BillingEntityProfile />} />
          </Route>
          <Route path="profile" element={<MyProfile />} />
          <Route path="users">
            <Route
              index
              element={
                <PageWithPermission name={Permissions.VIEW_USERS}>
                  <Users />
                </PageWithPermission>
              }
            />
            <Route
              path=":userId"
              element={
                <PageWithPermission name={Permissions.VIEW_USERS}>
                  <ViewUser />
                </PageWithPermission>
              }
            />
          </Route>
          <Route path="invited-users" element={<InviteUsers />} />
          <Route path="storage-management" element={<StorageManagement />} />
          <Route path="completed-tasks" element={<CompletedTasks />} />
          <Route path="deleted-tasks" element={<DeletedTasks />} />
          <Route path="deleted-clients" element={<DeletedClients />} />
          <Route path="deleted-users" element={<DeletedUsers />} />
          <Route path="upcoming-tasks" element={<UpcomingTasks />} />
          <Route path="notifications-preferences" element={<NotificationsPreferences />} />
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
          <Route path="approvals" element={<IProApprovals />} />
        </Route>
        <Route path="/clients/:clientId/kyb-info/:formId" element={<ViewKyb />}>
          <Route path="view" element={<ViewIproFormEntry />} />
          <Route path="edit" element={<FormBuilder />} />
          <Route path="fill-details" element={<AccessForm withoutAppbar />} />
          <Route path="audit-log" element={<IProAuditLog />} />
        </Route>
        <Route path="/billing/estimates/:estimateId/preview" element={<EstimatePreview />} />
        <Route path="/billing/invoices/:invoiceId/preview" element={<InvoicePreview />} />
        <Route path="/billing/receipts/:receiptId/preview" element={<ReceiptPreview />} />
        <Route path="/forms/:formId/fields/:fieldId/esign" element={<Esign />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/join" element={<Join />} />
        <Route path="/onedrive-auth" element={<OnedriveAuth />} />

        
      </Routes>
    </Router >
  );
}

export default RoutesContainer;
