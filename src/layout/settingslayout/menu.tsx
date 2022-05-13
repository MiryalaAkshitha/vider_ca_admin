export interface IMenuItem {
  title: string;
  path: string;
  children?: Array<IMenuItem>;
}

export const menuItems: Array<IMenuItem> = [
  {
    title: "Organization Details",
    path: "",
    children: [
      {
        title: "Organization profile",
        path: "/settings/organization-profile",
      },
      {
        title: "Billing Entities",
        path: "/settings/billing-entities",
      },
    ],
  },
  {
    title: "Manage users",
    path: "",
    children: [
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
];
