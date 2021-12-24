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

export const QPERIODS: string[] = [
  "Q1 (April - June)",
  "Q1 (July - Sep)",
  "Q1 (October - December)",
  "Q1 (January - March)",
];

export const HPERIODS: string[] = [
  "H1 (April - June)",
  "H2 (July - September)",
];

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
  "Description",
  "Checklists",
  "Milestones",
  "Comments",
  "Sub Tasks",
  "Attachments",
  "Log Hours",
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
  CUSTOM = "custom",
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  ON_HOLD = "on_hold",
  UNDER_REVIEW = "under_review",
  DONE = "done",
}

export enum SubTaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}
