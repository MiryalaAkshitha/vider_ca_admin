import { v4 as uuidv4 } from "uuid";

export const FREQUENCY_TEXTS = [
  "Monthly",
  "Quarterly",
  "Half-Yearly",
  "Yearly",
  "Custom",
];

export const MONTHS = [
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
