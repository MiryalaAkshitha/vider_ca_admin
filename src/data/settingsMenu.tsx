export interface IMenuItem {
  title: string;
  path: string;
  children?: Array<IMenuItem>;
}

export const settingsMenu: Array<IMenuItem> = [
  {
    title: "Profile",
    path: "/settings/profile",
  },
  {
    title: "Organization",
    path: "",
    children: [
      {
        title: "Organization  Profile",
        path: "/settings/organization-profile",
        children: [],
      },
      {
        title: "Billing Entities",
        path: "/settings/billing-entities",
        children: [],
      },
    ],
  },
  {
    title: "Manage users",
    path: "",
    children: [
      {
        title: "Invited Users",
        path: "/settings/invited-users",
      },
      {
        title: "Users",
        path: "/settings/users",
      },
      {
        title: "Teams",
        path: "/settings/teams",
      },
      {
        title: "Roles and permissions",
        path: "/settings/roles-permissions",
      },
    ],
  },
  {
    title: "Categories",
    path: "/settings/categories",
  },
  {
    title: "Labels",
    path: "/settings/labels",
  },
  {
    title: "Approvals",
    path: "/settings/approvals",
  },
];