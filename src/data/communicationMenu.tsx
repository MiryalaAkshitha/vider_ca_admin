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
        title: "User Groups",
        path: "/communication/user-groups",
      },
      {
        title: "Client Groups",
        path: "/communication/client-groups",
      },
    ],
  },
  {
    title: "Team Discussion",
    path: "/communication/team-discussion",
  },
];
