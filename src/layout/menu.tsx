import { icons } from "assets";

interface IMenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: Array<IMenuItem>;
}

export const menuItems: Array<IMenuItem> = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: icons.dashboard,
  },
  {
    title: "Task Board",
    path: "/task-board",
    icon: icons.taskboard
  },
  {
    title: "Calendar",
    path: "/calendar",
    icon: icons.calendar
  },
  {
    title: "Clients",
    path: "/clients",
    icon: icons.clients
  },
  {
    title: "Reports",
    path: "/reports",
    icon: icons.reports
  },
  {
    title: "Invoicing",
    path: "/invoicing",
    icon: icons.invoicing
  },
  {
    title: "My Team",
    path: "/my-team",
    icon: icons.team
  },
  {
    title: "Storage",
    path: "/storage",
    icon: icons.storage,
  },
  {
    title: "Broadcast",
    path: "/broadcast",
    icon: icons.broadcast
  },
  {
    title: "Settings",
    path: "/settings",
    icon: icons.settings
  },
];