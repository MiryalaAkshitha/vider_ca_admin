import { icons } from "assets";

interface IMenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: Array<IMenuItem>;
}

export const menu: Array<IMenuItem> = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: icons.dashboard,
  },
  {
    title: "Task Board",
    path: "/task-board",
    icon: icons.taskboard,
  },
  {
    title: "Calendar",
    path: "/calendar",
    icon: icons.calendar,
  },
  {
    title: "Clients",
    path: "/clients",
    icon: icons.clients,
  },
  {
    title: "DSC Register",
    path: "/dsc-register",
    icon: icons.clients,
  },
  {
    title: "Leads",
    path: "/leads",
    icon: icons.clients,
  },
  // {
  //   title: "Billing",
  //   path: "/billing/clients",
  //   icon: icons.invoicing,
  // },
  {
    title: "Storage",
    path: "/storage/my-storage",
    icon: icons.storage,
  },
  {
    title: "Services",
    path: "/services",
    icon: icons.broadcast,
  },
  {
    title: "Forms",
    path: "/forms",
    icon: icons.formIcon,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: icons.reports,
  },
  // {
  //   title: "Brodcast",
  //   path: "/brodcast",
  //   icon: icons.reports,
  // },
];
