export interface IMenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: Array<IMenuItem>;
}

export const settingsMenu: Array<IMenuItem> = [
  {
    title: "Profile",
    path: "/settings/profile?tab=Profile",
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
  {
    title: "Archives",
    path: "",
    children: [
      {
        title: "Completed Tasks",
        path: "/settings/completed-tasks",
      },
      {
        title: "Deleted Clients",
        path: "/settings/deleted-clients",
      },
      {
        title: "Deleted Users",
        path: "/settings/deleted-users",
      },
      {
        title: "Deleted Tasks",
        path: "/settings/deleted-tasks",
      },
      {
        title: "Upcoming Tasks",
        path: "/settings/upcoming-tasks",
      },
    ],
  },
  {
    title: "Preferences",
    path: "",
    children: [
      {
        title: "Notifications preferences",
        path: "/settings/notifications-preferences",
      },
    ],
  },

];



export const settingMenu: Array<IMenuItem> = [
  {
    title: "GST",
    path: "/gst",
    children: [
      {
        title: "GSTR-1",
        path: "/dsc-register/gst/gstr-1"
      },
      {
        title: "GSTR-3B",
        path: "/dsc-register/gst/gstr-3b"
      },
      {
        title: "GSTR-9",
        path: "/dsc-register/gst/gstr-9"
      },
      {
        title: "GSTR-9c",
        path: "/dsc-register/gst/gstr-9c"
      },
      {
        title: "GSTR-08",
        path: "/dsc-register/gst/gstr-08"
      },
    ],
  }
];