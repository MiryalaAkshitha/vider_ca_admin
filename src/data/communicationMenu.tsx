export interface IMenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: Array<IMenuItem>;
}

export const communicationMenu: Array<IMenuItem> = [
  {
    title: "Groups",
    path: "",
    children: [
      {
        title: "Client Groups",
        path: "/communication/client-groups",
      },
      {
        title: "User Teams",
        path: "/communication/user-teams",
      },
    ],
  },
  {
    title: "Discussions",
    path: "/communication/team-discussion",
  },
  {
    title: "Templates",
    path: "",
    children: [
      {
        title: "Email",
        path: "/communication/email",
      },
      {
        title: "Push notifications",
        path: "/communication/push-notifications",
      },
    ],
  },
];
