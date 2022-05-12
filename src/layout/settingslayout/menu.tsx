export interface IMenuItem {
  title: string;
  path: string;
  children?: Array<IMenuItem>;
}

export const menuItems: Array<IMenuItem> = [
  {
    title: "Organization profile",
    path: "/settings/organization-profile",
  },
  {
    title: "Manage Users",
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
  // {
  //   title: "Billing Entities",
  //   path: "/settings/billing-entities",
  // },
];
