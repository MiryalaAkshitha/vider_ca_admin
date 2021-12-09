import { v4 as uuidv4 } from "uuid";

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

export const QPERIODS = [
  "Q1 (April - June)",
  "Q1 (July - Sep)",
  "Q1 (October - December)",
  "Q1 (January - March)",
];

export const HPERIODS = ["H1 (April - June)", "H2 (July - September)"];

export const YPERIODS = ["Y1"];

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
];

export const clientMenu: Array<{ title: string; path: string }> = [
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Passwords",
    path: "/passwords",
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
];

export const taskViewMenu: string[] = [
  "Details",
  "Comments",
  "Sub Tasks",
  "Attachments",
];

export const CLIENT_CATEGORIES: Array<{
  label: string;
  value: string;
  subCategories?: Array<{ label: string; value: string }>;
}> = [
  { label: "INDIVIDUAL", value: "individual" },
  { label: "HUF", value: "huf" },
  {
    label: "PARTNERSHIP_FIRM",
    value: "partnership_firm",
  },
  {
    label: "LLP",
    value: "llp",
    subCategories: [
      { label: "INDIAN", value: "indian" },
      { label: "FOREIGN", value: "foreign" },
    ],
  },
  {
    label: "COMPNAY",
    value: "company",
    subCategories: [
      { label: "PRIVATE", value: "private" },
      { label: "PUBLIC", value: "public" },
      { label: "GOVERNMENT", value: "government" },
      { label: "OPC", value: "opc" },
      { label: "SEC-8", value: "sec_8" },
      { label: "FOREIGN", value: "foreign" },
    ],
  },
  {
    label: "TRUST",
    value: "trust",
    subCategories: [
      { label: "TRUST", value: "trust" },
      {
        label: "PRIVATE DISCRETIONARY TRUST",
        value: "private_discretionary_trust",
      },
    ],
  },
  {
    label: "SOCIETY",
    value: "society",
    subCategories: [
      { label: "SOCIETY", value: "society" },
      { label: "CO-OPERATIVE SOCIETY", value: "cooperative_society" },
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
    label: "CORPORATIONS",
    value: "corporations",
  },
  {
    label: "GOVERNMENT",
    value: "govermanment",
    subCategories: [
      { label: "STATE", value: "state" },
      { label: "CENTRAL", value: "central" },
    ],
  },
  {
    label: "ARTIFICIAL JUDICIAL PERSON",
    value: "artificial_judicial_person",
  },
];

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
