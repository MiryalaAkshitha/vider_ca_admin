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
        title: "Roles and Permissions",
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
  //   title: "Forms Configuration",
  //   path: "",
  //   children: [
  //     {
  //       title: "Forms",
  //       path: "/settings/forms",
  //     },
  //     {
  //       title: "Fields",
  //       path: "/settings/fields-configuration",
  //     },
  //   ],
  // },

  // {
  //   title: "Storage Management",
  //   path: "/settings/storage-management",
  // },
  // {
  //   title: "Deleted Tasks & Clients",
  //   path: "/",
  //   children: [
  //     {
  //       title: "Clients",
  //       path: "/settings/deleted-clients",
  //     },
  //     {
  //       title: "Tasks",
  //       path: "/settings/deleted-tasks",
  //     },
  //   ],
  // },
];
