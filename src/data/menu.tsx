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
    title: "Register",
    path: "/dsc-register",
    icon: icons.clients,
  },
  {
    title: "Leads",
    path: "/leads",
    icon: icons.clients,
  },
  {
    title: "Storage",
    path: "/storage/my-storage",
    icon: icons.storage,
  },
  {
    title: "Services",
    path: "/services",
    icon: icons.taskboard,
  },
  // {
  //   title: "Services",
  //   path: "",
  //   icon: icons.taskboard,
  //   children: [
  //     {
  //       title: "Services",
  //       path: "/services",
  //       icon: icons.taskboard,
  //     }, {
  //       title: "categories",
  //       path: "/categories",
  //       icon: icons.team,
  //     }
  //   ]
  // },
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
  //   title: "Broadcast",
  //   path: "/communication/client-groups",
  //   icon: icons.broadcast,
  // },
  // {
  //   title: "Billing",
  //   path: "/billing/estimates",
  //   icon: icons.broadcast,
  // },
  {
    title: "Billing",
    path: "/billing/invoices",
    icon: icons.broadcast,
  },
  // {
  //   title: "gmailInbox ",
  //   path: "/gmailInbox ",
  //   icon: icons.dashboard,
  // },
];
