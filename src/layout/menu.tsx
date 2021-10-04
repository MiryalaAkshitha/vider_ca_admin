import { VerifiedUserOutlined } from "@mui/icons-material"

interface IMenuItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  children?: Array<IMenuItem>;
}

export const menuItems: Array<IMenuItem> = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <VerifiedUserOutlined />,
  },
  {
    title: "Task Board",
    path: "/task-board",
    icon: <VerifiedUserOutlined />,
  },
  {
    title: "Calendar",
    path: "/calendar",
    icon: <VerifiedUserOutlined />,
  },
  {
    title: "Clients",
    path: "/clients",
    icon: <VerifiedUserOutlined />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <VerifiedUserOutlined />,
  },
  {
    title: "Invoicing",
    path: "/invoicing",
    icon: <VerifiedUserOutlined />,
  },
  {
    title: "My Team",
    path: "/my-team",
    icon: <VerifiedUserOutlined />,
  },
  {
    title: "Storage",
    path: "/storage",
    icon: <VerifiedUserOutlined />,
  },
  {
    title: "Broadcast",
    path: "/broadcast",
    icon: <VerifiedUserOutlined />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <VerifiedUserOutlined />,
  },
];