import { v4 as uuidv4 } from "uuid";

export const FREQUENCY_TEXTS = ["Monthly", "Quarterly", "Half-Yearly", "Yearly", "Custom"];

export const MONTHS: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "December",
];

export const QPERIODS: string[] = [
  "Q1 (April - June)",
  "Q1 (July - Sep)",
  "Q1 (October - December)",
  "Q1 (January - March)",
];

export const HPERIODS: string[] = ["H1 (April - June)", "H2 (July - September)"];

export const YPERIODS: string[] = ["Y1"];

export const INITIAL_MILESTONES = [
  {
    name: "Checklist",
    checklist: [],
    id: uuidv4(),
  },
  {
    name: "Stage of Work",
    checklist: [],
    id: uuidv4(),
  },
  {
    name: "Deliverables",
    checklist: [],
    id: uuidv4(),
  },
];

export const FIELD_TYPES: Array<{ label: string; value: string }> = [
  {
    label: "Text",
    value: "text",
  },
  {
    label: "Number",
    value: "number",
  },
  {
    label: "Date",
    value: "date",
  },
  {
    label: "Multiline",
    value: "multiline",
  },
  {
    label: "Multiselect",
    value: "multiselect",
  },
  {
    label: "Dropdown",
    value: "dropdown",
  },
  {
    label: "Radio",
    value: "radio",
  },
  {
    label: "Checkbox",
    value: "checkbox",
  },
  {
    label: "URL",
    value: "url",
  },
  {
    label: "Password",
    value: "password",
  },
  {
    label: "File",
    value: "file",
  },
];

export const clientMenu: Array<{ title: string; path: string }> = [
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "DSC Register",
    path: "/dsc-register",
  },
  {
    title: "Credentials",
    path: "/credentials",
  },
  {
    title: "KYB Info",
    path: "/kyb-info",
  },
  {
    title: "Attachments",
    path: "/attachments",
  },
  {
    title: "Recurring Profile",
    path: "/recurring-profile",
  },
  {
    title: "Archives",
    path: "/archives",
  },
  {
    title: "Tasks",
    path: "/client-tasks",
  },
  {
    title : "Activity Log",
    path :"/client-activitylog",
  }
];

export const invoicingClientsMenu: Array<{ title: string; path: string }> = [
  {
    title: "Overview",
    path: "overview",
  },
  {
    title: "Unbilled Tasks",
    path: "unbilledtasks",
  },
  {
    title: "Billed Tasks",
    path: "billedtasks",
  },
  {
    title: "Billing",
    path: "billing",
  },
  // {
  //   title: "Payments received",
  //   path: "/payments-received",
  // },
  // {
  //   title: "Comments",
  //   path: "/comments",
  // },
  // {
  //   title: "Mails",
  //   path: "/mails",
  // },
  // {
  //   title: "Statements",
  //   path: "/statements",
  // },
  {
    title: "Receipts",
    path: "clientreceipts",
  },
  // {
  //   title: "Comments",
  //   path: "/comments",
  // },
  // {
  //   title: "Mails",
  //   path: "/mails",
  // },
  // {
  //   title: "Statements",
  //   path: "/statements",
  // },
];

export const userProfileMenu: Array<{ title: string; path: string }> = [
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Tasks",
    path: "/tasks",
  },
  {
    title: "Expenditure",
    path: "/expenditure",
  },
  {
    title: "Log Hours",
    path: "/log-hours",
  }
];

export const taskViewMenu: Array<{ id: string; label: string }> = [
  { id: "details", label: "Details" },
  { id: "iPro", label: "IPro" },
  { id: "description", label: "Description" },
  { id: "checklists", label: "Checklists" },
  { id: "milestones", label: "Milestones" },
  { id: "stageofwork", label: "Stage of work" },
  { id: "comments", label: "Comments" },
  { id: "expenditure", label: "Expenditure" },
  { id: "subtasks", label: "Sub Tasks" },
  { id: "attachments", label: "Attachments" },
  { id: "loghours", label: "Log Hours" },
  { id: "approvals", label: "Approvals" },
  { id: "events", label: "Events" },
];

export const CLIENT_CATEGORIES: Array<{
  label: string;
  value: string;
  subCategories?: Array<{ label: string; value: string }>;
}> = [
  { label: "Individual", value: "individual" },
  { label: "HUF", value: "huf" },
  {
    label: "Partnership Firm",
    value: "partnership_firm",
  },
  {
    label: "LLP",
    value: "llp",
    subCategories: [
      { label: "Indian", value: "indian" },
      { label: "Foreign", value: "foreign" },
    ],
  },
  {
    label: "Company",
    value: "company",
    subCategories: [
      { label: "Private", value: "private" },
      { label: "Public", value: "public" },
      { label: "Government", value: "government" },
      { label: "OPC", value: "opc" },
      { label: "Section-8", value: "sec_8" },
      { label: "Foreign", value: "foreign" },
    ],
  },
  {
    label: "Trust",
    value: "trust",
    subCategories: [
      { label: "Pubilc Trust", value: "trust" },
      {
        label: "Private Discretionary Trust",
        value: "private_discretionary_trust",
      },
    ],
  },
  {
    label: "Society",
    value: "society",
    subCategories: [
      { label: "Society", value: "society" },
      { label: "Co-Operative Society", value: "cooperative_society" },
    ],
  },
  {
    label: "AOP",
    value: "aop",
  },
  {
    label: "BOI",
    value: "boi",
  },
  {
    label: "Corporations",
    value: "corporations",
  },
  {
    label: "Government",
    value: "government",
    subCategories: [
      { label: "State", value: "state" },
      { label: "Central", value: "central" },
    ],
  },
  {
    label: "Artificial Judicial Person",
    value: "artificial_judicial_person",
  },
];

export enum FormType {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
}

export enum RecurringFrequency {
  CUSTOM = "custom",
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  HALF_YEARLY = "half_yearly",
  YEARLY = "yearly",
}

export enum PriorityEnum {
  NONE = "none",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum FILETYPES {
  JPEG = "image/jpeg",
  PNG = "image/png",
  SVG = "image/svg+xml",
  JPG = "image/jpg",
  TEXT = "text/plain",
  CSV = "text/csv",
  MP4 = "video/mp4",
  AUDIO = "audio/mpeg",
  WEBM = "video/webm",
  PDF = "application/pdf",
  ZIP1 = "application/zip",
  ZIP2 = "application/vnd.android.package-archive",
  SHEET1 = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  SHEET2 = "application/vnd.oasis.opendocument.spreadsheet",
  SHEET3 = "application/vnd.ms-excel",
  DOC1 = "application/vnd.oasis.opendocument.text",
  DOC2 = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  DOC3 = "application/msword",
  PRESENTATION1 = "application/vnd.oasis.opendocument.presentation",
  PRESENTATION2 = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  PRESENTATION3 = "application/vnd.ms-powerpoint",
}

export enum Reminders {
  "30_MINUTES_BEFORE" = "30_minutes_before",
  "1_HOUR_BEFORE" = "1_hour_before",
  "2_HOUR_BEFORE" = "2_hours_before",
  "1_DAY_BEFORE" = "1_day_before",
}

export enum DateFilters {
  TODAY = "today",
  YESTERDAY = "yesterday",
  THIS_WEEK = "this_week",
  LAST_WEEK = "last_week",
  THIS_MONTH = "this_month",
  LAST_MONTH = "last_month",
  OVERDUE = "overdue",
  CUSTOM = "custom",
}

export enum TaskPaymentStatus {
  BILLED = "BILLED",
  UNBILLED = "UNBILLED"
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  ON_HOLD = "on_hold",
  UNDER_REVIEW = "under_review",
  DONE = "done",
  TERMINATED = "terminated",
}

export enum SubTaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export enum REPORT {
  user_name = "User Name",
  full_name = "User Name",
  todo = "Todo",
  in_progress = "In Progress",
  on_hold = "On Hold",
  Hold = "On Hold",
  under_review = "Under Review",
  terminated = "Terminated",
  completed = "completed",
  done_completed = "Done/Completed",
  total = "Total",
  wip = "In Progress",
  category = "Category",
  clientname = "Client Name",
  taskname ="Task Name",
  status ="Status",
  dueDate ="Due Date",
  daysoverdue ="OverDue By(Days)",
  totaltasksassigned ="Total Tasks Assigned",
  fee = 'Fee',
  pureagentpaid ="PureAgentPaid",
  receipts ="Receipts",
  invoicedate ="Invoice Date",
  receiptdate ="Receipt Date",
  invoiceduedate ="Invoice Due Date",
  invoiceamount ="Invoice Amount",
  invoicenumber ="Invoice Number",
  amountrecieved ="Amount Received",
  balancedueamount ="Balance Due Amount",
  receiptamount ="Receipt Amount",
  receiptnumber ="Receipt Number",
  pureagent ="Pure Agent",
  additionalchargers ="Additional Charges",
  tasknumber = "Task ID",
  dueamount ="Due Amount"
}

export const STATES = [
  {
    value: "AN",
    label: "Andaman and Nicobar Islands",
  },
  {
    value: "AP",
    label: "Andhra Pradesh",
  },
  {
    value: "AR",
    label: "Arunachal Pradesh",
  },
  {
    value: "AS",
    label: "Assam",
  },
  {
    value: "BR",
    label: "Bihar",
  },
  {
    value: "CH",
    label: "Chandigarh",
  },
  {
    value: "CT",
    label: "Chhattisgarh",
  },
  {
    value: "DN",
    label: "Dadra and Nagar Haveli",
  },
  {
    value: "DD",
    label: "Daman and Diu",
  },
  {
    value: "DL",
    label: "Delhi",
  },
  {
    value: "GA",
    label: "Goa",
  },
  {
    value: "GJ",
    label: "Gujarat",
  },
  {
    value: "HR",
    label: "Haryana",
  },
  {
    value: "HP",
    label: "Himachal Pradesh",
  },
  {
    value: "JK",
    label: "Jammu and Kashmir",
  },
  {
    value: "JH",
    label: "Jharkhand",
  },
  {
    value: "KA",
    label: "Karnataka",
  },
  {
    value: "KL",
    label: "Kerala",
  },
  {
    value: "LD",
    label: "Lakshadweep",
  },
  {
    value: "MP",
    label: "Madhya Pradesh",
  },
  {
    value: "MH",
    label: "Maharashtra",
  },
  {
    value: "MN",
    label: "Manipur",
  },
  {
    value: "ML",
    label: "Meghalaya",
  },
  {
    value: "MZ",
    label: "Mizoram",
  },
  {
    value: "NL",
    label: "Nagaland",
  },
  {
    value: "OR",
    label: "Odisha",
  },
  {
    value: "PY",
    label: "Puducherry",
  },
  {
    value: "PB",
    label: "Punjab",
  },
  {
    value: "RJ",
    label: "Rajasthan",
  },
  {
    value: "SK",
    label: "Sikkim",
  },
  {
    value: "TN",
    label: "Tamil Nadu",
  },
  {
    value: "TG",
    label: "Telangana",
  },
  {
    value: "TR",
    label: "Tripura",
  },
  {
    value: "UP",
    label: "Uttar Pradesh",
  },
  {
    value: "UT",
    label: "Uttarakhand",
  },
  {
    value: "WB",
    label: "West Bengal",
  },
];

export const CONTACT_PERSON_ROLES = ["Accountant", "Admin", "Staff"];

export const ORGANIZATION_CATEGORIES = [
  {
    label: "CA",
    value: "CA",
  },
  {
    label: "CMS",
    value: "CMS",
  },
  {
    label: "CS",
    value: "CS",
  },
  {
    label: "Law",
    value: "Law",
  },
];

export const ORGANIZATION_TYPES = [
  {
    label: "Sole Proprietorship",
    value: "SOLE_PROPRIETORSHIP",
  },
  {
    label: "Partnership Firm",
    value: "PARTNERSHIP_FIRM",
  },
  {
    label: "LLP",
    value: "LLP",
  },
  {
    label: "Private Limited Company",
    value: "PRIVATE_LIMITED_COMPANY",
  },
];

export const LICENSE_TYPES = [
  {
    label: "Organization Incorporation",
    value: "ORGANIZATION_INCORPORATION",
  },
  {
    label: "Professional Tax",
    value: "PROFESSIONAL_TAX",
  },
  {
    label: "Trade License",
    value: "TRADE_LICENSE",
  },
];

export const COLORS = [
  "#88B151",
  "#F7964F",
  "#673AB7",
  "#64B5F6",
  "#C0FF8C",
  "#FFCDD2",
  "#FF8A65",
  "#FF5252",
  "#FF1744",
  "#D50000",
  "#3F51B5",
  "#2196F3",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#9E9E9E",
  "#607D8B",
  "#000000",
  "#FFFFFF",
];
